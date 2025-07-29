import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setError("ID is required in the query parameters.");
                return;
            }
            setLoading(true);
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "zoneId": "a1614dbe-4732-11ee-9702-dee6e8d77be4",
                        "X-localization": "en",
                        "Authorization": `Bearer ${localStorage.getItem("authToken") || "null"}`, // Dynamic token if needed
                        "guest_id": "eb61fbf0-da54-11ef-827d-cb75bb9f7dbf",
                    },
                };

                const response = await axios.get(
                    `https://bizbooster.lifelinecart.com/api/v1/customer/service/detail/${id}`,
                    config
                );
                setData(response.data);
            } catch (err) {
                // Enhanced error handling
                if (err.response) {
                    setError(`Error: ${err.response.status} - ${err.response.data.message || err.response.statusText}`);
                } else {
                    setError(`Error: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <ApiContext.Provider value={{ data, loading, error }}>
            {children}
        </ApiContext.Provider>
    );
};
ApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (context === null) {
        throw new Error("useApi must be used within an ApiProvider");
    }
    return context;
};
