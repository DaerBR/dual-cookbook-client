import { CircularProgress } from '../atoms/CircularProgress';

export const LoadingIndicator = () => (
	<div
		css={{
			backgroundColor: 'rgb(255 255 255 / 70%)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			position: 'absolute',
			left: 0,
			top: 0,
			zIndex: 3,
		}}
	>
		<CircularProgress sizePx={68} />
	</div>
);
