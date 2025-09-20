import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaRegCopy,
    FaExternalLinkAlt,
    FaCalendarAlt,
    FaLink,
} from "react-icons/fa";
import { FiBarChart2, FiLink2 } from "react-icons/fi";
import { MdAnalytics } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../../context/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";

const ShortenItem = ({ orignalUrl, shortUrl, clickCount, createdDate }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [loader, setLoader] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);

    const analyticsHandler = () => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    };

    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
            const { data } = await api.get(
                `/api/urls/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&endDate=2025-12-31T00:00:00`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            console.log(data);
            setAnalyticsData(data);
            setSelectedUrl("");
        } catch (error) {
            navigate("/error");
            console.log("Error : ", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    const isLocalhost = window.location.hostname.endsWith("localhost");
    const port = isLocalhost ? ":5173" : "";
    const protocol = isLocalhost ? "http" : "https";
    const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN.replace(
        /^https?:\/\//, ""
    ).replace(/:\d+$/, "");
    const shortLink = `${protocol}://${subDomain}${port}/${shortUrl}`;



    // Display version (no https://)
    const displayLink = `${subDomain}/${shortUrl}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shortLink);
        toast.success("Short URL copied!");
    };

    return (
        <div className="p-8 bg-white border border-gray-300 rounded-xl shadow-sm shadow-gray-400 hover:shadow-md transition-shadow duration-300">
            {/* Original URL */}
            <div className="flex items-center gap-2 text-gray-900 text-sm truncate">
                <FaLink className="text-blue-600 text-lg" />
                <span className="font-semibold">Original:</span>
                <a
                    href={orignalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-md font-semibold hover:underline flex items-center gap-1"
                >
                    {orignalUrl}
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                </a>
            </div>

            {/* Short URL with Copy + Analytics button */}
            <div className="flex items-center justify-between mt-4">
                <a
                    href={shortLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-800 font-semibold hover:underline flex items-center gap-2"
                >
                    <FiLink2 className="text-slate-600" />
                    {displayLink}
                </a>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 text-gray-700 hover:text-slate-800 transition-colors"
                    >
                        <FaRegCopy className="text-md text-gray-800" />
                        <span className="text-sm font-semibold">Copy</span>
                    </button>

                    <button
                        onClick={analyticsHandler}
                        className="flex items-center gap-1 text-gray-700 hover:text-blue-700 transition-colors"
                    >
                        <MdAnalytics className="text-lg text-blue-600" />
                        <span className="text-sm font-semibold">Analytics</span>
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex items-center justify-between mt-5 text-gray-800 text-sm">
                <span className="flex items-center gap-1 font-semibold">
                    <FiBarChart2 className="text-gray-600" /> Clicks:{" "}
                    <span className="font-semibold">{clickCount}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold">
                    <FaCalendarAlt className="text-gray-900" />{" "}
                    {new Date(createdDate).toLocaleDateString()}
                </span>
            </div>

            <React.Fragment>
                <div
                    className={`${analyticToggle ? "flex" : "hidden"
                        } max-h-96 sm:mt-5 mt-5 min-h-96 relative border-t border-t-gray-300 w-[100%] overflow-hidden`}
                >
                    {loader ? <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
                        <div className="flex flex-col items-center gap-1"><Hourglass
                            visible={true}
                            height="50"
                            width="50"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#306cce', '#72a1ed']}
                        />
                            <p>Please wait...</p></div>
                    </div> : <>
                        {analyticsData.length === 0 && (
                            <motion.div
                                className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 rounded-xl text-center z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    No Data For This Time Period
                                </h1>
                                <h3 className="text-lg text-gray-900 max-w-md">
                                    Share your short link to view where your engagements are
                                    coming from
                                </h3>
                            </motion.div>
                        )}
                        <Graph dataSource={analyticsData} />
                    </>}
                </div>
            </React.Fragment>
        </div>
    );
};

export default ShortenItem;
