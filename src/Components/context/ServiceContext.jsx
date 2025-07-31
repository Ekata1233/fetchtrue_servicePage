// src/contexts/ServiceContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);

  const [providers, setProviders] = useState([]); // 🔥 New: providers subscribed to this service
  const [providersLoading, setProvidersLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('serviceId') || "687767fb4f90fe641a20cf48";
  const userId = urlParams.get('userId') || "";

  // const serviceId = "";

  useEffect(() => {
    if (!serviceId) return;

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

  useEffect(() => {
    if (!serviceId) return;

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/service/review/${serviceId}`);
        if (res.data.success) {
          setReviews(res.data.reviews || []);
          setAverageRating(res.data.averageRating || 0);
          setRatingDistribution(res.data.ratingDistribution || {});
          setTotalReviews(res.data.totalReviews || 0);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [serviceId]);

  useEffect(() => {
    if (!serviceId) return;

    const fetchProviders = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/provider/findByService/${serviceId}`);
        if (res.data.success) {
          setProviders(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      } finally {
        setProvidersLoading(false);
      }
    };

    fetchProviders();
  }, [serviceId]);

  return (
    <ServiceContext.Provider value={{
      service, loading, reviews,
      averageRating,
      ratingDistribution,
      totalReviews,
      serviceId,
      userId,  providers, providersLoading
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
