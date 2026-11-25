import { useBlocker } from 'react-router';

import { useUnsavedFormWarning } from '../../hooks/useUnsavedFormWarning.ts';
import { FORBIDDEN_ROUTE, NOT_FOUND_ROUTE } from '../../constants/routes.ts';
import { FormIsUnsavedModal } from './FormIsUnsavedModal.tsx';

interface UnsavedChangesGuardProps {
	isActive: boolean;
}

/**
 * Warns before leaving a page with unsaved changes
 *
 * Tab close / reload → the browser's native prompt (`beforeunload`). In-app navigation (links, `navigate()`,
 * back/forward) → `FormIsUnsavedModal`, whose open state is derived from the blocker itself.
 * The API interceptor's 401/403/404 redirects are never blocked.
 *
 * @param {boolean} isActive - whether to warn; pages pass e.g. `isDirty && !isSubmitting`, so their own
 * post-submit redirects (made while RHF `isSubmitting` is still true) go through
 */
export const UnsavedChangesGuard = ({ isActive }: UnsavedChangesGuardProps) => {
	useUnsavedFormWarning(isActive);

	const blocker = useBlocker(
		({ nextLocation }) =>
			isActive && nextLocation.pathname !== FORBIDDEN_ROUTE && nextLocation.pathname !== NOT_FOUND_ROUTE,
	);

	return (
		<FormIsUnsavedModal
			isModalOpen={blocker.state === 'blocked'}
			onCancel={() => blocker.reset?.()}
			onConfirm={() => blocker.proceed?.()}
		/>
	);
};
