import type { CSSObject } from '@emotion/react';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { faChevronDown, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { keyframes } from '@emotion/react';
import { components } from 'react-select';
import type {
	ClearIndicatorProps,
	ControlProps,
	DropdownIndicatorProps,
	GroupBase,
	IndicatorSeparatorProps,
	IndicatorsContainerProps,
	InputProps,
	LoadingIndicatorProps,
	MenuListProps,
	MenuProps,
	NoticeProps,
	OptionProps,
	PlaceholderProps,
	SelectComponentsConfig,
	SingleValueProps,
	ValueContainerProps,
} from 'react-select';

import { useAppTheme } from '../../styles/hooks.ts';
import { useCommonFieldStyles } from '../../components/atoms/TextInput/hooks.ts';
import { Icon } from '../../components/atoms/Icon';
import type { RecipeOption } from './types.ts';

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`;

type Config = SelectComponentsConfig<RecipeOption, false, GroupBase<RecipeOption>>;

export const useSearchAsyncSelectComponents = (): Config => {
	const theme = useAppTheme();
	const { fieldStyles } = useCommonFieldStyles({ isFullWidth: true });

	return useMemo(() => {
		const fieldBase = { ...fieldStyles } as CSSObject;
		delete fieldBase['&:focus'];
		delete fieldBase['&:disabled'];

		const focusRing = {
			borderColor: theme.colors.primary.borderLighter,
			boxShadow: theme.boxShadows.xs,
		};

		const disabledControl = {
			borderColor: theme.colors.neutral.borderLighter,
			backgroundColor: theme.colors.neutral.surfaceSubtle,
			color: theme.colors.text.disabled,
			cursor: 'not-allowed' as const,
		};

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

		const Control = (props: ControlProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
			const { isFocused, isDisabled } = props;

			return (
				<components.Control
					{...props}
					css={[
						fieldBase,
						{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'center',
							minHeight: '40px',
							outline: 'none',
							cursor: isDisabled ? 'not-allowed' : 'pointer',
							...(isFocused ? focusRing : {}),
							...(isDisabled ? disabledControl : {}),
						},
					]}
				/>
			);
		};

		const ValueContainer = (props: ValueContainerProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.ValueContainer
				{...props}
				css={{
					flex: '1 1 0%',
					minWidth: 0,
					padding: 0,
				}}
			/>
		);

		const Input = (props: InputProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.Input
				{...props}
				css={{
					margin: 0,
					padding: 0,
					border: 0,
					backgroundColor: 'transparent',
					font: 'inherit',
					color: 'inherit',
					outline: 'none',
					flex: '1 1 auto',
				}}
			/>
		);

		const Placeholder = (props: PlaceholderProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.Placeholder {...props} css={{ color: theme.colors.text.disabled }} />
		);

		const SingleValue = (props: SingleValueProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.SingleValue {...props} css={{ color: theme.colors.text.main }} />
		);

		const IndicatorsContainer = (props: IndicatorsContainerProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.IndicatorsContainer
				{...props}
				css={{
					display: 'flex',
					alignItems: 'center',
					flexShrink: 0,
				}}
			/>
		);

		const DropdownIndicator = (props: DropdownIndicatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
			const { isDisabled } = props;

			return (
				<components.DropdownIndicator {...props}>
					<Icon
						icon={faChevronDown}
						customStyles={{
							color: isDisabled ? theme.colors.text.disabled : chevronColor,
							pointerEvents: 'none',
							display: 'none',
						}}
					/>
				</components.DropdownIndicator>
			);
		};

		const ClearIndicator = (props: ClearIndicatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
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

		const IndicatorSeparator = (props: IndicatorSeparatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.IndicatorSeparator {...props} css={{ display: 'none' }} />
		);

		const LoadingIndicator = (props: LoadingIndicatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
			const isDisabled = props.selectProps.isDisabled ?? false;

			return (
				<components.LoadingIndicator {...props}>
					<Icon
						icon={faSpinner}
						customStyles={{
							animation: `${spin} 0.65s linear infinite`,
							color: isDisabled ? theme.colors.text.disabled : theme.colors.primary.main,
						}}
					/>
				</components.LoadingIndicator>
			);
		};

		const Menu = (props: MenuProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.Menu {...props} css={listPanel} />
		);

		const MenuList = (props: MenuListProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.MenuList
				{...props}
				css={{
					maxHeight: '300px',
					overflowY: 'auto',
					padding: 0,
				}}
			/>
		);

		const Option = (props: OptionProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
			const { isFocused, isSelected } = props;

			return <components.Option {...props} css={getOptionStyles(isFocused, isSelected)} />;
		};

		const LoadingMessage = (props: NoticeProps<RecipeOption, false, GroupBase<RecipeOption>>): ReactElement => (
			<components.LoadingMessage
				{...props}
				css={{
					padding: '8px 12px',
					fontSize: theme.typography.paragraphS.fontSize,
					color: theme.colors.text.caption,
				}}
			/>
		);

		const NoOptionsMessage = (props: NoticeProps<RecipeOption, false, GroupBase<RecipeOption>>): ReactElement => (
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
			Control,
			DropdownIndicator,
			IndicatorSeparator,
			Input,
			LoadingIndicator,
			LoadingMessage,
			Menu,
			MenuList,
			NoOptionsMessage,
			Option,
			Placeholder,
			SingleValue,
			ValueContainer,
			IndicatorsContainer,
		};
	}, [fieldStyles, theme]);
};
