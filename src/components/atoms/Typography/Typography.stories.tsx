import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './Typography';
import type { TypographyVariant } from './types.ts';

const VARIANTS: TypographyVariant[] = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
	'paragraphL',
	'paragraphM',
	'paragraphS',
	'paragraphXs',
];

const meta = {
	title: 'Atoms/Typography',
	component: Typography,
	args: {
		children: 'Швидкий рецепт борщу',
		variant: 'paragraphM',
		color: 'textMain',
	},
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
	render: (args) => (
		<div css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
			{VARIANTS.map((variant) => (
				<Typography key={variant} {...args} variant={variant}>
					{`${variant} — ${args.children as string}`}
				</Typography>
			))}
		</div>
	),
};

export const WithThemeTokens: Story = {
	args: {
		children:
			'Used tokens: customStyles: marginTop: 6, color: error.main, padding: [2, 3], backgroundColor: error.surfaceSubtle',
		customStyles: { marginTop: 6, padding: [2, 3], color: 'error.main', backgroundColor: 'error.surfaceSubtle' },
	},
};
