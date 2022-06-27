import React from "react";
import {Navigate} from "react-router";

export function ProtectedRoute({children, redirectTo, isLoggin}) {
    return isLoggin ? children : <Navigate to="/" />
};
