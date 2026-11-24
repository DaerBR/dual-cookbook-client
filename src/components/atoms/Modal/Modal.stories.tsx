import { faMagicWandSparkles, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';

import { Modal } from './Modal';
import { Button } from '../Button';

const meta = {
	title: 'Atoms/Modal',
	component: Modal,
	args: {
		isOpen: true,
		title: 'Видалити рецепт?',
		content: 'Цей рецепт буде видалений безповоротно. Ви впевнені, що хочете продовжити?',
		titleIcon: faTrash,
		titleIconColor: 'error',
		// Real buttons are built in render, because they have to close the modal through updateArgs
		buttons: [],
		onClose: fn(),
	},
	argTypes: {
		buttons: { control: false },
		titleIcon: { control: false },
	},
	parameters: {
		// Modal is a fixed full-screen overlay, the default padding would only offset the "open" button
		layout: 'fullscreen',
		confirmLabel: 'Видалити',
	},
	// Controlled modal: closing (button, backdrop click, Escape) writes isOpen back into args
	render: function Render(args, { parameters }) {
		const [, updateArgs] = useArgs();

		const handleOpen = () => updateArgs({ isOpen: true });

		const handleClose = () => {
			args.onClose();
			updateArgs({ isOpen: false });
		};

		const buttons = [
			<Button key="confirm" color={args.titleIconColor} onClick={handleClose} fullWidth>
				{parameters.confirmLabel}
			</Button>,
			<Button key="cancel" variant="outlined-neutral" onClick={handleClose} fullWidth>
				Скасувати
			</Button>,
		];

		return (
			<div css={{ padding: '16px' }}>
				<Button onClick={handleOpen}>Відкрити модальне вікно</Button>
				<Modal {...args} buttons={buttons} onClose={handleClose} />
			</div>
		);
	},
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithCloseIcon: Story = {
	args: {
		title: 'Імпортувати рецепт за посиланням',
		content: 'Вставте посилання на рецепт, і ми заповнимо форму за вас.',
		titleIcon: faMagicWandSparkles,
		titleIconColor: 'primary',
		showCloseIcon: true,
		width: 500,
	},
	parameters: { confirmLabel: 'Імпортувати' },
};

export const Loading: Story = {
	args: { isLoading: true },
};

export const WithoutIcon: Story = {
	args: {
		titleIcon: undefined,
		title: 'Зберегти зміни?',
		content: 'У рецепті є незбережені зміни.',
		titleIconColor: 'primary',
	},
	parameters: { confirmLabel: 'Зберегти' },
};
