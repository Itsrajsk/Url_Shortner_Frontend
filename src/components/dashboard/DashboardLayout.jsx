// src/DashboardLayout.jsx
import React, { useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../context/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import { motion } from "framer-motion";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    navigate("/error");
  }
  const {
    data: myShortenUrls,
    isLoading,
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const { data: totalClicks, isLoading: loader } = useFetchTotalClicks(
    token,
    onError
  );

  const hasData = totalClicks && totalClicks.length > 0;

  return (
    <div className="lg:px-14 sm:px-8 min-h-[calc(100vh-64px)]">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-10">
          <div className="h-full relative">
            {/* The Graph component is always rendered as the base layer */}
            <div className="w-full h-full bg-white rounded-xl shadow-lg border border-gray-300 p-5 relative overflow-hidden">
              <Graph dataSource={totalClicks} />

              {/* The "No Data" overlay, positioned on top */}
              {!hasData && (
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
            </div>
          </div>
          <div className="my-5 py-5 sm:text-end text-center">
            <button
              onClick={() => setShortenPopUp(true)}
              className="px-6 py-3 rounded-full bg-slate-800 text-white font-semibold transition-colors duration-300 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Create A New Short URL
            </button>
          </div>

          <div>
            {!isLoading && myShortenUrls.length === 0 ? (
              <motion.div
                className="flex justify-center items-center rounded-xl text-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <h1 className="text-2xl font-bold text-gray-900 mr-5">
                  You haven't created any short link yet
                </h1>
                <FaLink className="text-blue-500 sm:text-2xl text-2xl" />
              </motion.div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>

        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
