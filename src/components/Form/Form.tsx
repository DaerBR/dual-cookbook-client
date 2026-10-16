import { FormProvider, UseFormReturn, useFormState } from 'react-hook-form';
import { BaseSyntheticEvent, CSSProperties, ReactNode, SubmitEvent } from 'react';

interface FormProps {
	children: ReactNode;
	disableHiddenSubmit?: boolean;
	form: UseFormReturn<any>;
	formStyles?: CSSProperties;
	onSubmit?: (event?: BaseSyntheticEvent) => Promise<void> | void;
}

export const Form = ({ children, disableHiddenSubmit, form, onSubmit, formStyles }: FormProps) => {
	const { isSubmitting } = useFormState({ control: form.control });

	const handleFormSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isSubmitting) {
			return;
		}

		onSubmit?.(event);
	};

	return (
		<FormProvider {...form}>
			<form onSubmit={handleFormSubmit} style={formStyles}>
				{children}
				{!disableHiddenSubmit && <input hidden type="submit" />}
			</form>
		</FormProvider>
	);
};
