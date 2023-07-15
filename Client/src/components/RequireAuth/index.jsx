import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequiredAuth() {
    const [hasToken, setHasToken] = useState(localStorage.getItem("accessToken"))
    const location = useLocation();

    return (
        (hasToken && hasToken !== "" && hasToken !== null) ? <Outlet /> : <Navigate to="/Login" replace />
    )
}

export default RequiredAuth;