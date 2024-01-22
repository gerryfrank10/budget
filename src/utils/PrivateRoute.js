import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;