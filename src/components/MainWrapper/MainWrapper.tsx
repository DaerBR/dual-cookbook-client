import { ReactNode, useState } from 'react';

import { LoadingIndicator } from '../LoadingIndicator';
import { GlobalLoadingIndicatorContext } from '../../contexts/GlobalLoadingIndicator.tsx';

interface MainWrapperProps {
	children: ReactNode;
}

export const MainWrapper = ({ children }: MainWrapperProps) => {
	const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

	const globalLoadingIndicatorContextValue = {
		handleShowLoadingIndicator: (isVisible: boolean) => setShowLoadingIndicator(isVisible),
		isVisible: showLoadingIndicator,
	};

	return (
		<div>
			<GlobalLoadingIndicatorContext value={globalLoadingIndicatorContextValue}>
				{showLoadingIndicator && <LoadingIndicator />}
				{children}
			</GlobalLoadingIndicatorContext>
		</div>
	);
};
