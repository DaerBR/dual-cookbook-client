import type { NavigateFunction } from 'react-router';

let navigate: NavigateFunction | null = null;

export const setNavigate = (navigateFunction: NavigateFunction) => {
	navigate = navigateFunction;
};

export const navigateTo = (route: string) => {
	navigate?.(route);
};
