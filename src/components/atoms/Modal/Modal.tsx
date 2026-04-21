import { ReactNode, useEffect, useRef } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { ModelPresentation } from './components/ModelPresentation.tsx';
import { Icon } from '../Icon';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Typography } from '../Typography';
import {
	buttonsContainerStyles,
	closeButtonStyles,
	contentWrapperStyles,
	iconWrapperStyles,
	modalBodyStyles,
	modalWrapperStyles,
} from './styles.ts';

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

	if (!isOpen) return null;

	return (
		<ModelPresentation>
			<div ref={modalRef} css={modalBodyStyles}>
				<div css={modalWrapperStyles}>
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
		</ModelPresentation>
	);
};
