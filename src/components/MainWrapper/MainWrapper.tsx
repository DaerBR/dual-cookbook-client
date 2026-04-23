import { ReactNode, useCallback, useMemo, useState } from 'react';

import { LoadingIndicator } from '../LoadingIndicator';
import { GlobalLoadingIndicatorContext } from '../../contexts/GlobalLoadingIndicator.tsx';

interface MainWrapperProps {
	children: ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

	const handleShowLoadingIndicator = useCallback((isVisible: boolean) => {
		setShowLoadingIndicator(isVisible);
	}, []);

	const globalLoadingIndicatorContextValue = useMemo(
		() => ({
			handleShowLoadingIndicator,
			isVisible: showLoadingIndicator,
		}),
		[handleShowLoadingIndicator, showLoadingIndicator],
	);

	return (
		<div>
			<GlobalLoadingIndicatorContext value={globalLoadingIndicatorContextValue}>
				{showLoadingIndicator && <LoadingIndicator />}
				{children}
			</GlobalLoadingIndicatorContext>
		</div>
	);
};
