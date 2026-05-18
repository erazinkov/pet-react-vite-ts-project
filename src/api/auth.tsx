import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


export const Auth = ({ children }: { children: ReactNode }) => {
	const jwt = localStorage.getItem('accessToken');

	if (!jwt) {
		return <Navigate to="/auth/login" replace />;
	}
	return <>{children}</>;
}; 