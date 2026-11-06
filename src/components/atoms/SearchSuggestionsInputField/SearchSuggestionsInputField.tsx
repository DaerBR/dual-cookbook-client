import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { GroupBase, SingleValue, StylesConfig } from 'react-select';

import { useAppDispatch } from '../../../store/hooks/hooks.ts';
import { Icon } from '../Icon';
import { useSearchAsyncSelectComponents, useSearchAsyncSelectStyles } from './asyncSelectComponents.tsx';
import { recipesListQueryOptions } from '../../../queries/recipes';
import { DEBOUNCE_MS, MIN_QUERY_LENGTH } from './constants.ts';
import { createDebouncedRecipeSearch } from './utils.ts';
import type { SelectOption } from '../Select/types.ts';
import { Button } from '../Button';
import { searchContainerStyles } from './styles.ts';
import { resetSearch } from '../../../store/slices/searchSlice.ts';

export const SearchSuggestionsInputField = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedOption, setSelectedOption] = useState<SingleValue<SelectOption>>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
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
			// Imperative read through the cache: typing the same text again within staleTime makes no request.
			// It's a separate cache entry from the Search page results, so there's no `asSuggestions` special case.
			const result = await queryClient.fetchQuery(recipesListQueryOptions({ limit: 10, page: 1, search: query }));

			return result.data;
		},
		[queryClient],
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
			dispatch(resetSearch());
		} else {
			// The Search page fetches by itself once the query is set
			dispatch(resetSearch(searchTerm));
		}
		navigate('/search');
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
