import { keyframes } from '@emotion/react';
import { CircularProgressColor } from './CircularProgress.tsx';
import { colors } from '../../../styles/colors.ts';

export const dash = keyframes`
	0% {
		stroke-dasharray: 1px, 200px;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 100px, 200px;
		stroke-dashoffset: -15px;
	}
	100% {
		stroke-dasharray: 100px, 200px;
		stroke-dashoffset: -125px;
	}
`;

export const rotate = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

export const strokeColorByVariant: Record<CircularProgressColor, string> = {
	primary: colors.orange[600],
	error: colors.red[600],
	success: colors.green[600],
	neutral: colors.grey[600],
	white: '#fff',
};
