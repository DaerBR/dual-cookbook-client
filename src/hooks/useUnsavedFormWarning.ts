import { useEffect } from 'react';

/**
 * Hook blocking browser tab closing if the form is not saved
 *
 * The hook adds `beforeunload` event listener preventing browser tab closing / reloading if the form has unsaved changes.
 *
 * @param {boolean} isDirty - RHF form state parameter, indicating whether the form has unsaved changes
 */

export const useUnsavedFormWarning = (isDirty: boolean) => {
	useEffect(() => {
		if (!isDirty) {
			return undefined;
		}

		const formCloseWarning = (event: BeforeUnloadEvent) => {
			event.preventDefault();
		};

		window.addEventListener('beforeunload', formCloseWarning);

		return () => {
			window.removeEventListener('beforeunload', formCloseWarning);
		};
	}, [isDirty]);
};
