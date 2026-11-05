import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { ModalPresentation } from './components/ModalPresentation.tsx';
import { Icon } from '../Icon';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../Typography';
import {
	buttonsContainerStyles,
	closeButtonStyles,
	contentWrapperStyles,
	getModalBodyStyles,
	iconWrapperStyles,
	modalWrapperStyles,
} from './styles.ts';
import { LoadingIndicator } from '../../LoadingIndicator';

interface ModalProps {
	buttons: ReactNode[];
	content: string | ReactNode;
	isLoading?: boolean;
	isOpen: boolean;
	onClose: () => void;
	showCloseIcon?: boolean;
	title?: string | ReactNode;
	titleIcon?: IconDefinition;
	titleIconColor?: 'primary' | 'success' | 'error';
	width?: number;
}

export const Modal = ({
	buttons,
	content,
	isOpen,
	onClose,
	showCloseIcon,
	title,
	titleIcon,
	titleIconColor = 'primary',
	isLoading,
	width = 450,
}: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const theme = useAppTheme();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	if (!isOpen) {
		return null;
	}

	const modalBodyStyles = getModalBodyStyles({ width });

	return (
		<ModalPresentation>
			<div ref={modalRef} css={modalBodyStyles}>
				<div css={modalWrapperStyles}>
					{isLoading && <LoadingIndicator sizePx={42} />}
					{showCloseIcon && (
						<button css={closeButtonStyles} onClick={onClose}>
							<Icon icon={faXmark} fontSize={16} />
						</button>
					)}
					{titleIcon && (
						<div css={{ padding: '0 32px' }}>
							<div css={{ ...iconWrapperStyles, backgroundColor: theme.colors[titleIconColor].surfaceLighter }}>
								<Icon icon={titleIcon} fontSize={22} color="white" />
							</div>
						</div>
					)}
					<div css={contentWrapperStyles}>
						{title && (
							<Typography variant="h6" weight={700} component="div" customStyles={{ marginBottom: '8px' }}>
								{title}
							</Typography>
						)}
						<Typography color="textSubtitle" variant="paragraphS" component="div">
							{content}
						</Typography>
					</div>
					<div css={buttonsContainerStyles}>{buttons.map((button) => button)}</div>
				</div>
			</div>
		</ModalPresentation>
	);
};
