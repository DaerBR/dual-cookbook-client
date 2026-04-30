import { CircularProgress } from '../atoms/CircularProgress';

interface LoadingIndicatorProps {
	asGlobal?: boolean;
}

export const LoadingIndicator = ({ asGlobal }: LoadingIndicatorProps) => (
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
		<CircularProgress sizePx={68} />
	</div>
);
