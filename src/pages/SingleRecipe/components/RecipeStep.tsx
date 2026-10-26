import { useState } from 'react';

import { useAppTheme } from '../../../styles/hooks.ts';
import { stepItemStyles } from '../styles.ts';

const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

interface RecipeStepProps {
	description: string;
}

export const RecipeStep = ({ description }: RecipeStepProps) => {
	const theme = useAppTheme();
	const [isCompleted, setIsCompleted] = useState(false);

	const toggleCompleted = () => {
		if (window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
			setIsCompleted((prev) => !prev);
		}
	};

	return (
		// Had to add this. The feature is touch-only visual marker (if the in-progress recipe step is completed, mobile-only), not an actual control element
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<li
			css={[
				stepItemStyles,
				isCompleted && { [`@media ${MOBILE_MEDIA_QUERY}`]: { color: theme.colors.neutral.disabled } },
			]}
			onClick={toggleCompleted}
		>
			{description}
		</li>
	);
};
