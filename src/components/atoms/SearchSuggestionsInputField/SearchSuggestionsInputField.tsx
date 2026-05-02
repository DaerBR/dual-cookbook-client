import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import type { GroupBase, SingleValue, StylesConfig } from 'react-select';

import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks.ts';
import { Icon } from '../Icon';
import { useSearchAsyncSelectComponents, useSearchAsyncSelectStyles } from './asyncSelectComponents.tsx';
import { searchRecipes } from '../../../store/thunks/recipes.ts';
import { DEBOUNCE_MS, MIN_QUERY_LENGTH } from './constants.ts';
import { createDebouncedRecipeSearch } from './utils.ts';
import { SelectOption } from '../Select/types.ts';
import { Button } from '../Button';
import { searchContainerStyles } from './styles.ts';

export const SearchSuggestionsInputField = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearching = useAppSelector((state) => state.recipes.search.isSearching);
	const searchSelectComponents = useSearchAsyncSelectComponents();
	const baseSelectStyles = useSearchAsyncSelectStyles();

	const searchSelectStyles = useMemo(
		(): StylesConfig<SelectOption, false, GroupBase<SelectOption>> => ({
			...baseSelectStyles,
			control: (base, state) => ({
				...(baseSelectStyles.control?.(base, state) ?? base),
			}),
		}),
		[baseSelectStyles],
	);

	const handleSearch = useCallback(
		async (query: string) => {
			setSearchTerm(query);
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
		(option: SingleValue<SelectOption>) => {
			if (option) {
				navigate(`/recipe/${option.value}`);
			}
			setSelectedOption(null);
			setSearchTerm('');
		},
		[navigate],
	);

	const handleNavigateToSearch = () => {
		if (searchTerm === '') {
			navigate('/search');
		} else {
			navigate(`/search?searchTerm=${searchTerm}`);
		}
	};

	return (
		<div css={searchContainerStyles}>
			<div
				css={{
					position: 'relative',
					width: '100%',
				}}
			>
				<AsyncSelect<SelectOption, false>
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
					value={selectedOption}
					styles={searchSelectStyles}
					unstyled
					inputId="header-search-input"
				/>
			</div>
			<Button
				variant="outlined-primary"
				onClick={handleNavigateToSearch}
				customStyles={{ minWidth: 0, padding: '10px 12px', border: 'none', boxShadow: 'none' }}
			>
				<Icon icon={faMagnifyingGlass} fontSize={14} customStyles={{ color: 'inherit' }} />
			</Button>
		</div>
	);
};
