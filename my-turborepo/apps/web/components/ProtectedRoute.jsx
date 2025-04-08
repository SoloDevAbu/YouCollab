import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ allowedCategories }) => {
    const { isLoggedin, category } = useContext(AppContext);

    if (!isLoggedin) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedCategories.includes(category)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
