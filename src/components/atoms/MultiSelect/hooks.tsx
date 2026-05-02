import { faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { type ReactElement, useMemo } from 'react';
import { CSSObject } from '@emotion/react';
import {
	type ClearIndicatorProps,
	type DropdownIndicatorProps,
	GroupBase,
	type IndicatorSeparatorProps,
	type IndicatorsContainerProps,
	type MenuListProps,
	type MenuProps,
	type NoticeProps,
	type OptionProps,
	PlaceholderProps,
	type SingleValueProps,
	type StylesConfig,
	components,
} from 'react-select';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Icon } from '../Icon';
import { SelectOption } from '../Select/types.ts';

interface UseCommonFieldStylesProps {
	isFullWidth?: boolean;
}

export const useCommonFieldStyles = ({ isFullWidth }: UseCommonFieldStylesProps) => {
	const theme = useAppTheme();

	return {
		fieldStyles: {
			minHeight: '38px',
			backgroundColor: '#fff',
			boxShadow: theme.boxShadows.xs,
			border: `1px solid ${theme.colors.neutral.borderDefault}`,
			borderRadius: '4px',
			padding: '8px 16px',
			fontSize: theme.typography.paragraphS.fontSize,
			lineHeight: theme.typography.paragraphS.lineHeight,
			color: theme.colors.text.main,
			boxSizing: 'border-box' as const,
			width: isFullWidth ? '100%' : '300px',
			maxWidth: isFullWidth ? '100%' : '300px',
			'&:focus': {
				outline: 'none',
				borderColor: theme.colors.primary.borderLighter,
				boxShadow: '0 0 0 3px rgba(254, 186, 152, 0.20)',
			},
			'&:disabled': {
				borderColor: theme.colors.neutral.borderLighter,
				backgroundColor: theme.colors.neutral.surfaceSubtle,
				color: theme.colors.text.disabled,
			},
		},
		errorStyles: {
			borderColor: theme.colors.error.borderDarker,
			boxShadow: '0 0 0 3px rgba(236, 95, 81, 0.20)',
		},
	};
};

export const useMultiSelectStyles = (): StylesConfig<any> => {
	const theme = useAppTheme();
	const { fieldStyles } = useCommonFieldStyles({ isFullWidth: true });

	return useMemo(() => {
		const fieldBase = { ...fieldStyles } as CSSObject;
		delete fieldBase['&:disabled'];

		return {
			control: (base, state) => ({
				...base,
				...fieldBase,
				padding: '4px 8px 4px 16px',
				outline: 'none',
				cursor: state.isDisabled ? 'not-allowed' : 'pointer',
				'&:hover': {
					borderColor: theme.colors.neutral.borderDefault,
				},
				...(state.isFocused
					? {
							borderColor: theme.colors.primary.borderLighter,
						}
					: {}),
				...(state.isDisabled
					? {
							borderColor: theme.colors.neutral.borderLighter,
							backgroundColor: theme.colors.neutral.surfaceSubtle,
							color: theme.colors.text.disabled,
						}
					: {}),
			}),
		};
	}, [fieldStyles, theme]);
};

export const useMultiSelectComponents = (): any => {
	const theme = useAppTheme();

	return useMemo(() => {
		const listPanel = {
			marginTop: '4px',
			padding: 0,
			backgroundColor: '#fff',
			border: `1px solid ${theme.colors.neutral.borderDefault}`,
			borderRadius: '4px',
			boxShadow: theme.boxShadows.xs,
			overflow: 'hidden',
			zIndex: 10,
		};

		const getOptionStyles = (isHighlighted: boolean, isSelected: boolean) => ({
			minHeight: '20px',
			padding: '8px 12px',
			fontSize: theme.typography.paragraphS.fontSize,
			lineHeight: theme.typography.paragraphS.lineHeight,
			cursor: 'pointer' as const,
			color: theme.colors.text.main,
			backgroundColor: isHighlighted || isSelected ? theme.colors.neutral.surfaceSubtle : '#fff',
		});

		const chevronColor = theme.colors.text.subtitle;

		const Placeholder = (props: PlaceholderProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.Placeholder {...props} css={{ color: theme.colors.text.disabled, margin: 0 }} />
		);

		const SingleValue = (props: SingleValueProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.SingleValue {...props} css={{ color: theme.colors.text.main }} />
		);

		const IndicatorsContainer = (props: IndicatorsContainerProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.IndicatorsContainer
				{...props}
				css={{
					alignItems: 'center',
					flexShrink: 0,
				}}
			/>
		);

		const DropdownIndicator = (props: DropdownIndicatorProps<SelectOption, false, GroupBase<SelectOption>>) => {
			const { isDisabled } = props;

			return (
				<components.DropdownIndicator {...props}>
					<Icon
						icon={faChevronDown}
						customStyles={{
							color: isDisabled ? theme.colors.text.disabled : chevronColor,
						}}
					/>
				</components.DropdownIndicator>
			);
		};

		const ValueContainer = (props: any) => <components.ValueContainer {...props} css={{ margin: 0, padding: 0 }} />;
		const MultiValueContainer = (props: any) => (
			<components.MultiValueContainer {...props} css={{ margin: 0, padding: 0 }} />
		);
		const MultiValue = (props: any) => (
			<components.MultiValue
				{...props}
				css={{
					backgroundColor: theme.colors.primary.surfaceDefault,
					color: '#fff',
					borderRadius: '16px',
					paddingLeft: '6px',
					paddingRight: '4px',
					'&:hover': {
						backgroundColor: theme.colors.primary.surfaceDefault,
						color: '#fff!important',
					},
				}}
			/>
		);

		const ClearIndicator = (props: ClearIndicatorProps<SelectOption, false, GroupBase<SelectOption>>) => {
			const isDisabled = props.selectProps.isDisabled ?? false;

			return (
				<components.ClearIndicator {...props} css={{ padding: '0 0 0 6px' }}>
					<Icon
						icon={faXmark}
						fontSize={12}
						customStyles={{
							color: isDisabled ? theme.colors.text.disabled : chevronColor,
							cursor: isDisabled ? 'not-allowed' : 'pointer',
						}}
					/>
				</components.ClearIndicator>
			);
		};

		const IndicatorSeparator = (props: IndicatorSeparatorProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.IndicatorSeparator {...props} css={{ display: 'none' }} />
		);

		const Menu = (props: MenuProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.Menu {...props} css={listPanel} />
		);

		const MenuList = (props: MenuListProps<SelectOption, false, GroupBase<SelectOption>>) => (
			<components.MenuList
				{...props}
				css={{
					maxHeight: '300px',
					overflowY: 'auto',
					padding: 0,
				}}
			/>
		);

		const Option = (props: OptionProps<SelectOption, false, GroupBase<SelectOption>>) => {
			const { isFocused, isSelected } = props;

			return <components.Option {...props} css={getOptionStyles(isFocused, isSelected)} />;
		};

		const NoOptionsMessage = (props: NoticeProps<SelectOption, false, GroupBase<SelectOption>>): ReactElement => (
			<components.NoOptionsMessage
				{...props}
				css={{
					padding: '8px 12px',
					fontSize: theme.typography.paragraphS.fontSize,
					color: theme.colors.text.caption,
				}}
			/>
		);

		return {
			ClearIndicator,
			DropdownIndicator,
			IndicatorSeparator,
			Menu,
			MenuList,
			NoOptionsMessage,
			Option,
			Placeholder,
			SingleValue,
			ValueContainer,
			IndicatorsContainer,
			MultiValueContainer,
			MultiValue,
		};
	}, [theme]);
};
