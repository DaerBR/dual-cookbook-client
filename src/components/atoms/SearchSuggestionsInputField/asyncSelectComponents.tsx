import type { CSSObject } from '@emotion/react';
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { faChevronDown, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { keyframes } from '@emotion/react';
import { components } from 'react-select';
import type {
	ClearIndicatorProps,
	DropdownIndicatorProps,
	GroupBase,
	IndicatorSeparatorProps,
	IndicatorsContainerProps,
	LoadingIndicatorProps,
	MenuListProps,
	MenuProps,
	NoticeProps,
	OptionProps,
	PlaceholderProps,
	SelectComponentsConfig,
	SingleValueProps,
	StylesConfig,
} from 'react-select';

import { useAppTheme } from '../../../styles/hooks.ts';
import { useCommonFieldStyles } from '../TextInput/hooks.ts';
import { Icon } from '../Icon';
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

export const useSearchAsyncSelectStyles = (): StylesConfig<RecipeOption, false, GroupBase<RecipeOption>> => {
	const theme = useAppTheme();
	const { fieldStyles } = useCommonFieldStyles({ isFullWidth: true });

	return useMemo(() => {
		const fieldBase = { ...fieldStyles } as CSSObject;
		delete fieldBase['&:focus'];
		delete fieldBase['&:disabled'];

		return {
			control: (base, state) => ({
				...base,
				...fieldBase,
				outline: 'none',
				border: 'none',
				boxShadow: 'none',
				borderRadius: 0,
				borderBottom: `1px solid ${theme.colors.primary.borderDarker}`,
				cursor: state.isDisabled ? 'not-allowed' : 'pointer',
				paddingLeft: '24px',
			}),
		};
	}, [fieldStyles, theme]);
};

export const useSearchAsyncSelectComponents = (): Config => {
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

		const Placeholder = (props: PlaceholderProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.Placeholder {...props} css={{ color: theme.colors.primary.disabled }} />
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

		const DropdownIndicator = (props: DropdownIndicatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => (
			<components.DropdownIndicator {...props}>
				<Icon
					icon={faChevronDown}
					customStyles={{
						pointerEvents: 'none',
						display: 'none',
					}}
				/>
			</components.DropdownIndicator>
		);

		const ClearIndicator = (props: ClearIndicatorProps<RecipeOption, false, GroupBase<RecipeOption>>) => {
			const isDisabled = props.selectProps.isDisabled ?? false;

			return (
				<components.ClearIndicator {...props} css={{ padding: '0 0 0 6px' }}>
					<Icon
						icon={faXmark}
						fontSize={12}
						color="primary"
						customStyles={{
							color: isDisabled ? theme.colors.text.disabled : theme.colors.primary.main,
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
			DropdownIndicator,
			IndicatorSeparator,
			LoadingIndicator,
			LoadingMessage,
			Menu,
			MenuList,
			NoOptionsMessage,
			Option,
			Placeholder,
			SingleValue,
			IndicatorsContainer,
		};
	}, [theme]);
};
