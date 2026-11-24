import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Pagination } from './Pagination';

const meta = {
	title: 'Atoms/Pagination',
	component: Pagination,
	args: {
		currentPage: 1,
		totalPages: 20,
		fetchParams: { limit: 10 },
		fetchDataMethod: fn(),
	},
	argTypes: {
		currentPage: { control: { type: 'number', min: 1 } },
		totalPages: { control: { type: 'number', min: 0 } },
		fetchDataMethod: { control: false },
	},
	// In the app fetchDataMethod dispatches a thunk; here it is logged in Actions and switches the page
	render: function Render(args) {
		const [, updateArgs] = useArgs();

		const handleFetch = (params: { page: number }) => {
			args.fetchDataMethod(params);
			updateArgs({ currentPage: params.page });
		};

		return <Pagination {...args} fetchDataMethod={handleFetch} />;
	},
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const MiddlePage: Story = {
	args: { currentPage: 10 },
};

export const LastPage: Story = {
	args: { currentPage: 20 },
};

// Up to 7 pages are all shown, without an ellipsis
export const FewPages: Story = {
	args: { totalPages: 6, currentPage: 3 },
};

export const SinglePage: Story = {
	args: { totalPages: 1 },
};
