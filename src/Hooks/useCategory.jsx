import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
export default function useCategory() {
  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let responseObject = useQuery({
    queryKey: ["allCategory"],
    queryFn: getCategory,
    staleTime: 50000,
    retry: 8,
    retryDelay: 1000,
    //   refetchInterval: 6000,
    // refetchIntervalInBackground:true,
    select: (data) => data.data.data,
  });

  return responseObject;
}
