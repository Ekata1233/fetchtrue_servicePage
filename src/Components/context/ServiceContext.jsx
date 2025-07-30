"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ServiceContext = createContext(undefined);

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState(null);

  const [singleService, setSingleService] = useState(null);
  const [loadingSingleService, setLoadingSingleService] = useState(false);
  const [errorSingleService, setErrorSingleService] = useState(null);

  const fetchServices = async () => {
    setLoadingServices(true);
    try {
      const res = await axios.get("https://biz-booster.vercel.app/api/service");
      setServices(res.data?.data || []);
      setErrorServices(null);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setErrorServices("Something went wrong while fetching services.");
    } finally {
      setLoadingServices(false);
    }
  };

  const fetchSingleService = async (id) => {
    setLoadingSingleService(true);
    try {
      const res = await axios.get(`https://biz-booster.vercel.app/api/service/${id}`);
      setSingleService(res.data?.data || null);
      setErrorSingleService(null);
    } catch (err) {
      console.error("Failed to fetch single service:", err);
      setErrorSingleService("Something went wrong while fetching single service.");
    } finally {
      setLoadingSingleService(false);
    }
  };

  const updateProviderPrice = async (id, data) => {
    try {
      const res = await axios.put(
        `https://biz-booster.vercel.app/api/service/provider-price/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update success:", res.data);
      return true;
    } catch (err) {
      console.error("Error updating provider price:", err);
      return false;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider
      value={{
        services,
        loadingServices,
        errorServices,
        refetchServices: fetchServices,
        singleService,
        loadingSingleService,
        errorSingleService,
        fetchSingleService,
        updateProviderPrice,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }
  return context;
};
