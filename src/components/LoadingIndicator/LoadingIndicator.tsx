import { CircularProgress } from '../atoms/CircularProgress';

interface LoadingIndicatorProps {
	asGlobal?: boolean;
	sizePx?: number;
}

export const LoadingIndicator = ({ asGlobal, sizePx = 68 }: LoadingIndicatorProps) => (
	<div
		css={{
			backgroundColor: 'rgb(255 255 255 / 70%)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			position: asGlobal ? 'fixed' : 'absolute',
			left: 0,
			top: 0,
			zIndex: 3,
		}}
	>
		<CircularProgress sizePx={sizePx} />
	</div>
);
