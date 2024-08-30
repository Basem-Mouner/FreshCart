import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
export default function useProduct() {


    function getRecentProducts() {
      return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    }

    let responseObject = useQuery({
      queryKey: ["recentProducts"],
      queryFn: getRecentProducts,
      staleTime: 50000,
      retry: 8,
      retryDelay:1000,
    //   refetchInterval: 6000,
      // refetchIntervalInBackground:true,
      select: (data) => data.data.data,
    });


  return responseObject;
}
