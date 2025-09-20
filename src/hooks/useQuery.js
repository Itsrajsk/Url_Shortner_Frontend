import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

// helper function to always format as yyyy-MM-dd
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export const useFetchMyShortUrls = (token, onError) => {
  return useQuery({
    queryKey: ["my-shortenurls"],

    queryFn: async () => {
      return await api.get(`/api/urls/myurls`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },

    select: (data) => {
      const sortedData = data.data.sort(
        (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
      );
      return sortedData;
    },

    onError,
    staleTime: 5000,
  });
};

export const useFetchTotalClicks = (token, onError) => {
  return useQuery({
    queryKey: ["url-totalclick"],

    queryFn: async () => {
      const startDate = formatDate(new Date("2025-01-01"));
      const endDate = formatDate(new Date("2025-12-31"));

      return await api.get(
        `/api/urls/totalclicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    select: (data) => {
      const convertToArray = Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      }));
      return convertToArray;
    },

    onError,
    staleTime: 5000,
  });
};
