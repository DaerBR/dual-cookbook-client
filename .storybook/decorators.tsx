import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import type { Decorator } from '@storybook/react-vite';

interface StoryFormProviderProps {
	children: ReactNode;
	errorMessage?: string;
	fieldName?: string;
}

// Form atoms read their errors from react-hook-form's context, so error states need a real form around them.
const StoryFormProvider = ({ children, errorMessage, fieldName }: StoryFormProviderProps) => {
	// Memoized: useForm re-applies the `errors` option whenever its reference changes
	const errors = useMemo<FieldErrors>(
		() => (errorMessage && fieldName ? { [fieldName]: { type: 'manual', message: errorMessage } } : {}),
		[errorMessage, fieldName],
	);
	const form = useForm({ errors });

	return <FormProvider {...form}>{children}</FormProvider>;
};

/**
 * Wraps a story in a react-hook-form `FormProvider`.
 * Set `parameters: { formError: 'Message' }` on a story to show that error for the field named by `args.name`.
 */
export const withForm: Decorator = (Story, { args, parameters }) => (
	<StoryFormProvider
		errorMessage={parameters.formError}
		fieldName={typeof args.name === 'string' ? args.name : undefined}
	>
		<Story />
	</StoryFormProvider>
);
