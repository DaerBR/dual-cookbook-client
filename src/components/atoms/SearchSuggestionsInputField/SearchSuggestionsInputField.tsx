import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router';
import { useCallback, useMemo } from 'react';
import type { GroupBase, SingleValue, StylesConfig } from 'react-select';

import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks.ts';
import { useAppTheme } from '../../../styles/hooks.ts';
import { Icon } from '../Icon';
import { useSearchAsyncSelectComponents, useSearchAsyncSelectStyles } from './asyncSelectComponents.tsx';
import { searchRecipes } from '../../../store/thunks/recipes.ts';
import { DEBOUNCE_MS, MIN_QUERY_LENGTH } from './constants.ts';
import { createDebouncedRecipeSearch } from './utils.ts';
import { Option } from '../Select/types.ts';

export const SearchSuggestionsInputField = () => {
	const theme = useAppTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearching = useAppSelector((state) => state.recipes.search.isSearching);
	const searchSelectComponents = useSearchAsyncSelectComponents();
	const baseSelectStyles = useSearchAsyncSelectStyles();

	const searchSelectStyles = useMemo(
		(): StylesConfig<Option, false, GroupBase<Option>> => ({
			...baseSelectStyles,
			control: (base, state) => ({
				...(baseSelectStyles.control?.(base, state) ?? base),
			}),
		}),
		[baseSelectStyles],
	);

	const handleSearch = useCallback(
		async (query: string) => {
			const result = await dispatch(
				searchRecipes({
					limit: 10,
					page: 1,
					search: query,
					asSuggestions: true,
				}),
			).unwrap();

			return result.data;
		},
		[dispatch],
	);

	const loadOptions = useMemo(
		() => createDebouncedRecipeSearch(handleSearch, DEBOUNCE_MS, MIN_QUERY_LENGTH),
		[handleSearch],
	);

	const handleOptionClick = useCallback(
		(option: SingleValue<Option>) => {
			if (option) {
				navigate(`/search?searchTerm=${option.value}`);
				// Reset input value ?
			}
		},
		[navigate],
	);

	return (
		<div
			css={{
				position: 'relative',
				width: '100%',
			}}
		>
			<span
				aria-hidden
				css={{
					position: 'absolute',
					left: 0,
					top: '50%',
					transform: 'translateY(-50%)',
					zIndex: 1,
					display: 'flex',
					alignItems: 'center',
					pointerEvents: 'none',
					color: theme.colors.primary.disabled,
				}}
			>
				<Icon icon={faMagnifyingGlass} fontSize={14} customStyles={{ color: 'inherit' }} />
			</span>
			<AsyncSelect<Option, false>
				cacheOptions={false}
				components={searchSelectComponents}
				defaultOptions={false}
				isClearable
				isLoading={isSearching}
				loadOptions={loadOptions}
				loadingMessage={() => 'Пошук...'}
				noOptionsMessage={() => 'Нічого не знайдено'}
				onChange={handleOptionClick}
				placeholder="Шукати"
				styles={searchSelectStyles}
				unstyled
				inputId="header-search-input"
			/>
		</div>
	);
};
