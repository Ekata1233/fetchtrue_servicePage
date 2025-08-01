import { useContext } from "react";
import { ApiContext } from "./ApiContext";

export const useApi = () => {
    return useContext(ApiContext);
};
