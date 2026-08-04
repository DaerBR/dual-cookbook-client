import { useContext, useEffect } from 'react';

import { GlobalLoadingIndicatorContext } from '../contexts/GlobalLoadingIndicator.tsx';

export const useGlobalLoadingIndicator = (isActive: boolean) => {
	const { handleShowLoadingIndicator } = useContext(GlobalLoadingIndicatorContext);

	useEffect(() => {
		handleShowLoadingIndicator(isActive);

		return () => handleShowLoadingIndicator(false);
	}, [isActive, handleShowLoadingIndicator]);
};
