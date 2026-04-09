import { ChangeEvent, createRef, useState } from 'react';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { Controller, useFormContext } from 'react-hook-form';

import { useAppTheme } from '../../../styles/hooks.ts';
import { Icon } from '../Icon';
import { processFieldValidationErrors } from '../../../utils/utils.tsx';
import { Button } from '../Button';

interface ImageInputProps {
	name: string;
}

export const ImageInput = ({ name }: ImageInputProps) => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const imageInputRef = createRef<HTMLInputElement>();

	const theme = useAppTheme();
	const { setValue, formState, control } = useFormContext() ?? {};
	const { errors } = formState ?? {};
	const fieldErrors = errors ? errors[name] : undefined;

	const imageFieldStyles = {
		backgroundColor: '#fff',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
		border: `2px solid ${theme.colors.primary.borderDefault}`,
		borderRadius: '4px',
		padding: '40px',
		fontSize: theme.typography.paragraphS.fontSize,
		lineHeight: theme.typography.paragraphS.lineHeight,
		color: theme.colors.text.main,
		width: '400px',
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
		height: '240px',
		boxSizing: 'border-box' as const,
	};

	return (
		<div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<div css={imageFieldStyles}>
				{!imagePreview && (
					<Icon icon={faPizzaSlice} fontSize={48} customStyles={{ color: theme.colors.primary.borderDarker }} />
				)}
			</div>
			<div>{fieldErrors && processFieldValidationErrors(fieldErrors)}</div>
			<Controller
				control={control}
				name={name}
				render={() => (
					<label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
						<input
							style={{ display: 'none' }}
							accept="image/jpeg, image/png"
							id={name}
							name={name}
							type="file"
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								if (event.target?.files) {
									const file = event.target?.files[0];

									const imageUrl = URL.createObjectURL(file);

									setImagePreview(imageUrl);
									setValue(name, file);
								}
							}}
							ref={imageInputRef}
						/>
						<Button
							css={{ marginTop: '16px' }}
							variant="secondary"
							onClick={() => {
								imageInputRef.current!.click();
							}}
						>
							Оберіть зображення
						</Button>
					</label>
				)}
			/>
		</div>
	);
};
