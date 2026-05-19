import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


export const Auth = ({ children }: { children: ReactNode }) => {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		return <Navigate to="/auth/login" replace />;
	}
	return <>{children}</>;
}; 