// src/contexts/ServiceContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded serviceId OR fetch it dynamically from query or localStorage
  const serviceId = "687767fb4f90fe641a20cf48";

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/service/${serviceId}`);
        if (res.data.success) {
          setService(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, []);

  return (
    <ServiceContext.Provider value={{ service, loading }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
