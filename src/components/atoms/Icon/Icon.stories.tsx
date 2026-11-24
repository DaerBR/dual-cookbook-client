import { faCheckCircle, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import {
	faArrowLeft,
	faArrowRight,
	faChevronDown,
	faChevronUp,
	faGridVertical,
	faInfoCircle,
	faMagicWandSparkles,
	faMagnifyingGlass,
	faPencilAlt,
	faPizzaSlice,
	faPlus,
	faSignOut,
	faSpinner,
	faTrash,
	faXmark,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from './Icon';
import type { IconColor } from './types.ts';

// Icons used across the app
const ICONS = {
	faArrowLeft,
	faArrowRight,
	faCheckCircle,
	faChevronDown,
	faChevronUp,
	faCircleXmark,
	faGridVertical,
	faInfoCircle,
	faMagicWandSparkles,
	faMagnifyingGlass,
	faPencilAlt,
	faPizzaSlice,
	faPlus,
	faSignOut,
	faSpinner,
	faTrash,
	faXmark,
	faXmarkCircle,
};

type IconName = keyof typeof ICONS;

const ICON_NAMES = Object.keys(ICONS) as IconName[];
const COLORS: IconColor[] = ['neutral', 'primary', 'success', 'error', 'white'];
const SIZES = [10, 14, 22, 32];

// Icon definitions are objects and can't be picked in Controls, so stories take an icon name instead.
// No `component` field: its props (icon: IconDefinition) would clash with these args, so controls are declared here.
type IconStoryArgs = Omit<ComponentProps<typeof Icon>, 'icon'> & { icon: IconName };

const meta = {
	title: 'Atoms/Icon',
	args: {
		icon: 'faPlus',
		color: 'neutral',
		fontSize: 22,
	},
	argTypes: {
		icon: { control: 'select', options: ICON_NAMES },
		color: { control: 'select', options: COLORS },
		fontSize: { control: { type: 'number', min: 8 } },
		customStyles: { control: false },
	},
	render: ({ icon, ...args }) => <Icon {...args} icon={ICONS[icon]} />,
} satisfies Meta<IconStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllIcons: Story = {
	render: ({ icon: _, ...args }) => (
		<div css={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
			{ICON_NAMES.map((name) => (
				<div key={name} css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
					<Icon {...args} icon={ICONS[name]} />
					<span css={{ fontSize: '12px' }}>{name}</span>
				</div>
			))}
		</div>
	),
};

// White is shown on a dark tile, otherwise it would be invisible
export const Colors: Story = {
	render: ({ icon, ...args }) => (
		<div css={{ display: 'flex', gap: '16px' }}>
			{COLORS.map((color) => (
				<div
					key={color}
					css={{ padding: '12px', borderRadius: '4px', backgroundColor: color === 'white' ? '#333' : 'transparent' }}
				>
					<Icon {...args} icon={ICONS[icon]} color={color} />
				</div>
			))}
		</div>
	),
};

export const Sizes: Story = {
	render: ({ icon, ...args }) => (
		<div css={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
			{SIZES.map((size) => (
				<Icon key={size} {...args} icon={ICONS[icon]} fontSize={size} />
			))}
		</div>
	),
};
