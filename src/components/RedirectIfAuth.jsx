import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/authContext.jsx";

export default function RedirectIfAuth({ children }){
    const { user } = useAuth();

    if (user){
        return <Navigate to='/' replace />;
    }

    return children;
}