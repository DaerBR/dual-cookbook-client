import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface ModelPresentationProps {
	children: ReactNode;
}

export const ModelPresentation = ({ children }: ModelPresentationProps) => {
	const outerStyles = { position: 'fixed' as const, zIndex: 1300, right: 0, bottom: 0, top: 0, left: 0 };
	const backdropStyles = {
		opacity: 1,
		backgroundColor: 'rgba(112, 117, 125, 0.4)',
		backdropFilter: 'blur(8px)',
		transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)',
		position: 'fixed' as const,
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		zIndex: -1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return createPortal(
		<div css={outerStyles}>
			<div css={backdropStyles}>{children}</div>
		</div>,
		document.body,
	);
};
