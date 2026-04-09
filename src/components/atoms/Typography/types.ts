import { CSSProperties, ReactNode } from 'react';

type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'paragraphL'
	| 'paragraphM'
	| 'paragraphS'
	| 'paragraphXs';

type TypographyColor =
	| 'primary'
	| 'success'
	| 'error'
	| 'neutral'
	| 'textMain'
	| 'textTitle'
	| 'textSubtitle'
	| 'textDisabled'
	| 'textCaption';

type TypographyWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export interface TypographyProps {
	children: ReactNode | string;
	color?: TypographyColor;
	component?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	customStyles?: CSSProperties;
	variant?: TypographyVariant;
	weight?: TypographyWeight;
}
