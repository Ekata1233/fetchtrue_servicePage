// src/contexts/ServiceContext.jsx
import React, { createContext, useContext, useEffect, useId, useState } from 'react';
import axios from 'axios';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const sId = urlParams.get('serviceId');
  const uId = urlParams.get('userId') || "";

  const [serviceId, setServiceId] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedProviderId, setSelectedProviderId] = useState("fetch-true"); // default

  // console.log("service Id : ", serviceId)
  // console.log("User Id : ", userId)

  useEffect(() => {

    localStorage.removeItem("serviceId");
    localStorage.removeItem("userId");

    if (sId) {
      setServiceId(sId);
      localStorage.setItem("serviceId", sId);
    } else {
      const storedServiceId = localStorage.getItem("serviceId");
      if (storedServiceId) setServiceId(storedServiceId);
    }

    if (uId) {
      setUserId(uId);
      localStorage.setItem("userId", uId);
    } else {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) setUserId(storedUserId);
    }
  }, []);

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [totalReviews, setTotalReviews] = useState(0);

  const [providers, setProviders] = useState([]); // 🔥 New: providers subscribed to this service
  const [providersLoading, setProvidersLoading] = useState(true);

  const [providerReviews, setProviderReviews] = useState({
    reviews: [],
    averageRating: 0,
    ratingDistribution: {},
    totalReviews: 0
  });


  const [customerSubmitting, setCustomerSubmitting] = useState(false);
  const [customerError, setCustomerError] = useState(null);

  const [commission, setCommission] = useState(null);
  const [loadingCommission, setLoadingCommission] = useState(true);

  const [coupon, setCoupon] = useState(null);
  const [loadingCoupon, setLoadingCoupon] = useState(true);


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
  }, [serviceId]);

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

  const createServiceCustomer = async (formData) => {
    setCustomerSubmitting(true);
    setCustomerError(null);

    try {
      const res = await axios.post(
        `https://biz-booster.vercel.app/api/service-customer`,
        formData
      );

      if (res.data.success) {
        return { success: true, data: res.data.data };
      } else {
        setCustomerError(res.data.message || "Something went wrong");
        return { success: false, error: res.data.message };
      }
    } catch (error) {
      console.error("Failed to create service customer:", error);
      const message = error.response?.data?.message || error.message;
      setCustomerError(message);
      return { success: false, error: message };
    } finally {
      setCustomerSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/commission`);
        if (res.status === 200) {
          setCommission(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch commission:", err);
      } finally {
        setLoadingCommission(false);
      }
    };

    fetchCommission();
  }, []);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/coupon`);
        if (res.status === 200) {
          setCoupon(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch commission:", err);
      } finally {
        setLoadingCoupon(false);
      }
    };

    fetchCoupon();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://biz-booster.vercel.app/api/provider/review`);
        if (res.data.success) {
          const reviews = res.data.reviews || [];

          const ratings = reviews.map(r => r.rating);
          const averageRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 0;

          const ratingDistribution = [1, 2, 3, 4, 5].reduce((acc, star) => {
            acc[star] = ratings.filter(r => r === star).length;
            return acc;
          }, {});

          setProviderReviews({
            reviews,
            averageRating,
            ratingDistribution,
            totalReviews: ratings.length
          });
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);



  return (
    <ServiceContext.Provider value={{
      service, loading, reviews,
      averageRating,
      ratingDistribution,
      totalReviews,
      serviceId,
      userId, providers, providersLoading,
      createServiceCustomer,
      customerSubmitting,
      customerError,
      commission, loadingCommission,
      coupon, loadingCoupon, providerReviews , selectedProviderId,
        setSelectedProviderId,
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
