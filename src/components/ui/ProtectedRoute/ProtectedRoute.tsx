import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';

export function ProtectedRoute() {
	const accessToken = useSelector((state: RootState) => state.user.accessToken);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!accessToken) {
			navigate('/auth/sign');
		} else {
			setIsLoading(false);
		}
	}, [accessToken, navigate]);

	if (isLoading) {
		return null; 
	}

	return <Outlet />;
}