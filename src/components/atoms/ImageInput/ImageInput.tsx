import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { faPizzaSlice, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
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
	const [filePreviewUrl, setFilePreviewUrl] = useState<string | undefined>(undefined);
	const imageInputRef = useRef<HTMLInputElement>(null);

	const theme = useAppTheme();
	const { setValue, formState, control } = useFormContext() ?? {};
	const { errors } = formState ?? {};
	const fieldErrors = errors ? errors[name] : undefined;
	const fieldValue = useWatch({ control, name });

	useEffect(() => {
		if (!(fieldValue instanceof File)) {
			setFilePreviewUrl(undefined);

			if (imageInputRef.current) {
				// Lets the same file be picked again after the value was cleared
				imageInputRef.current.value = '';
			}

			return undefined;
		}

		const objectUrl = URL.createObjectURL(fieldValue);
		setFilePreviewUrl(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [fieldValue]);

	// In edit mode a `null` value means "keep the current image", so the initial image is shown as a fallback
	const imagePreview = filePreviewUrl ?? (isEdit ? initialImageUrl : undefined);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		setValue(name, file, { shouldDirty: true, shouldValidate: true });
	};

	const handleClearImage = () => setValue(name, null, { shouldDirty: true, shouldValidate: true });

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
							onChange={handleImageChange}
							ref={imageInputRef}
						/>
						<div
							css={{
								marginTop: '16px',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: '24px',
							}}
						>
							<Button
								variant="secondary"
								onClick={() => {
									imageInputRef.current!.click();
								}}
							>
								Оберіть зображення
							</Button>
							{fieldValue && (
								<Button
									startIcon={<Icon icon={faTrash} fontSize={12} />}
									variant="outlined-error"
									onClick={handleClearImage}
								>
									Очистити
								</Button>
							)}
						</div>
					</label>
				)}
			/>
		</div>
	);
};
