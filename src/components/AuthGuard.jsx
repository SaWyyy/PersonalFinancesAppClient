import React, { useEffect, useState } from "react";
import userService from "../services/userService";

const AuthGuard = (props) => {
	const [authStatus, setAuthStatus] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
        const token = localStorage.getItem("token")
		if (!token) {
			setIsLoading(false)
			return
		}
		userService.validateToken(token).then((res) => {
            if(res == 200){
			    setAuthStatus(true);
            }
		}).catch((err) => {
			console.log("Unauthorized.");
		}).finally(() => {
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}
	return authStatus ? props.onAuth : props.onNotAuth;
};

export default AuthGuard;
