import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from './Button';
import { Icon } from '../Icon';
import type { Variants } from './types.ts';

const VARIANTS: Variants[] = [
	'primary',
	'secondary',
	'outlined-neutral',
	'outlined-primary',
	'outlined-success',
	'outlined-error',
];

const meta = {
	title: 'Atoms/Button',
	component: Button,
	args: {
		children: 'Зберегти рецепт',
		color: 'primary',
		variant: 'primary',
		onClick: fn(),
	},
	argTypes: {
		startIcon: { control: false },
		endIcon: { control: false },
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllVariants: Story = {
	render: (args) => (
		<div css={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
			{VARIANTS.map((variant) => (
				<Button key={variant} {...args} variant={variant}>
					{variant}
				</Button>
			))}
		</div>
	),
};

export const Colors: Story = {
	render: (args) => (
		<div css={{ display: 'flex', gap: '12px' }}>
			<Button {...args} color="primary">
				primary
			</Button>
			<Button {...args} color="success">
				success
			</Button>
			<Button {...args} color="error">
				error
			</Button>
		</div>
	),
};

export const WithIcons: Story = {
	args: {
		startIcon: <Icon icon={faPlus} color="white" />,
		endIcon: <Icon icon={faArrowRight} color="white" />,
	},
};

export const Busy: Story = {
	args: { isBusy: true },
};

export const Disabled: Story = {
	args: { isDisabled: true },
};

export const FullWidth: Story = {
	args: { fullWidth: true },
};
