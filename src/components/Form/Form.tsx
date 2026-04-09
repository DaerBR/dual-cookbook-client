import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CSSProperties, ReactNode } from 'react';

interface FormProps {
	children: ReactNode;
	disableHiddenSubmit?: boolean;
	form: UseFormReturn<any>;
	formStyles?: CSSProperties;
	onSubmit?: () => void;
}

export const Form = ({ children, disableHiddenSubmit, form, onSubmit, formStyles }: FormProps) => (
	<FormProvider {...form}>
		<form onSubmit={onSubmit} style={formStyles}>
			{children}
			{!disableHiddenSubmit && <input hidden type="submit" />}
		</form>
	</FormProvider>
);
