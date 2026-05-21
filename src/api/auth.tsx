import type { RootState } from '../store/store';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const Auth = ({ children }: { children: ReactNode }) => {
	const accessToken = useSelector((state: RootState) => state.user.accessToken);

	if (!accessToken) {
		return <Navigate to="/auth/login" replace />;
	}
	return <>{children}</>;
}; 