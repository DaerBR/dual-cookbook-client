import { ChangeEvent, createRef, useEffect, useState } from 'react';
import { faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import { Controller, useFormContext } from 'react-hook-form';
import { CSSObject } from '@emotion/react';

import { useAppTheme } from '../../../styles/hooks.ts';
import { Icon } from '../Icon';
import { processFieldValidationErrors } from '../../../utils/utils.tsx';
import { Button } from '../Button';
import { imageFieldStaticStyles } from './styles.ts';

interface ImageInputProps {
	customHeight?: number;
	customWidth?: number;
	customWrapperStyles?: CSSObject;
	initialImageUrl?: string;
	isEdit?: boolean;
	name: string;
}

export const ImageInput = ({
	customHeight,
	customWidth,
	customWrapperStyles,
	isEdit,
	initialImageUrl,
	name,
}: ImageInputProps) => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const imageInputRef = createRef<HTMLInputElement>();

	const theme = useAppTheme();
	const { setValue, formState, control } = useFormContext() ?? {};
	const { errors } = formState ?? {};
	const fieldErrors = errors ? errors[name] : undefined;

	useEffect(() => {
		if (isEdit && initialImageUrl) {
			setImagePreview(initialImageUrl);
		}
	}, [isEdit, initialImageUrl]);

	const imageFieldStyles = {
		...imageFieldStaticStyles,
		border: `2px solid ${theme.colors.primary.borderDefault}`,
		fontSize: theme.typography.paragraphS.fontSize,
		lineHeight: theme.typography.paragraphS.lineHeight,
		color: theme.colors.text.main,
		width: customWidth ? `${customWidth}px` : '400px',
		height: customHeight ? `${customHeight}px` : '240px',
		backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
		'@media (max-width: 768px)': {
			width: '100%',
		},
	};

	return (
		<div css={{ display: 'flex', flexDirection: 'column', width: '100%', ...customWrapperStyles }}>
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
