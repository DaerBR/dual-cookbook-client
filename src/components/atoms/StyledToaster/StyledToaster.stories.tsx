import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'sonner';

import { StyledToaster } from './StyledToaster';
import { Button } from '../Button';

const meta = {
	title: 'Atoms/StyledToaster',
	component: StyledToaster,
	parameters: {
		// Toasts are fixed to the viewport corner, so the story uses the whole canvas
		layout: 'fullscreen',
	},
} satisfies Meta<typeof StyledToaster>;

export default meta;

type Story = StoryObj<typeof meta>;

// The toaster has no props: toasts are fired through sonner's global `toast()`, as useThunk does in the app
export const Playground: Story = {
	render: function Render() {
		// sonner keeps toasts in a module-level store, so clear them when leaving the story
		useEffect(
			() => () => {
				toast.dismiss();
			},
			[],
		);

		return (
			<div css={{ display: 'flex', flexWrap: 'wrap', gap: '12px', padding: '16px' }}>
				<Button color="success" onClick={() => toast.success('Рецепт збережено')}>
					Success
				</Button>
				<Button color="error" onClick={() => toast.error('Не вдалося завантажити рецепт')}>
					Error
				</Button>
				<Button variant="outlined-primary" onClick={() => toast.info('Рецепт імпортовано, перевірте поля')}>
					Info
				</Button>
				<Button variant="outlined-neutral" onClick={() => toast('Звичайне повідомлення')}>
					Default
				</Button>
				<StyledToaster />
			</div>
		);
	},
};

// Static showcase: all styled types are shown at once and stay until you leave the story
export const AllTypes: Story = {
	render: function Render() {
		useEffect(() => {
			toast.success('Рецепт збережено', { duration: Infinity });
			toast.error('Не вдалося завантажити рецепт', { duration: Infinity });
			toast.info('Рецепт імпортовано, перевірте поля', { duration: Infinity });

			return () => {
				toast.dismiss();
			};
		}, []);

		return <StyledToaster />;
	},
};
