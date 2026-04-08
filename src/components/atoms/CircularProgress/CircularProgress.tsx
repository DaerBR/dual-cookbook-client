import type { CSSObject } from '@emotion/react';
import { dash, rotate, strokeColorByVariant } from './constants.ts';

export type CircularProgressColor = 'primary' | 'error' | 'success' | 'neutral' | 'white';

export interface CircularProgressProps {
	color?: CircularProgressColor;
	sizePx?: number;
}

export const CircularProgress = ({ sizePx = 24, color = 'primary' }: CircularProgressProps) => {
	const rootCss: CSSObject = {
		display: 'inline-block',
		lineHeight: 0,
		width: `${sizePx}px`,
		height: `${sizePx}px`,
		color: strokeColorByVariant[color],
	};

	const svgCss: CSSObject = {
		display: 'block',
		width: '100%',
		height: '100%',
		animation: `${rotate} 1.4s linear infinite`,
	};

	const circleCss: CSSObject = {
		display: 'block',
		animation: `${dash} 1.4s ease-in-out infinite`,
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 3.6,
		strokeLinecap: 'round',
	};

	return (
		<span css={rootCss} role="progressbar" aria-busy="true" aria-label="Loading">
			<svg css={svgCss} viewBox="22 22 44 44" focusable="false">
				<circle css={circleCss} cx="44" cy="44" r="20.2" />
			</svg>
		</span>
	);
};
