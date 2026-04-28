import AsyncSelect from 'react-select/async';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import type { SingleValue } from 'react-select';

import { Typography } from '../../components/atoms/Typography';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks.ts';
import { searchRecipes } from '../../store/thunks/recipes.ts';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { RecipeCard } from '../../components/RecipeCard';
import { useSearchAsyncSelectComponents } from './asyncSelectComponents.tsx';
import { createDebouncedRecipeSearch } from './utils.ts';
import { RecipeOption } from './types.ts';

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 400;

export const Search = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const isSearching = useAppSelector((state) => state.recipes.search.isSearching);
	const searchResults = useAppSelector((state) => state.recipes.search.recipesList);
	const searchSelectComponents = useSearchAsyncSelectComponents();

	const handleSearch = useCallback(
		async (query: string) => {
			const result = await dispatch(
				searchRecipes({
					limit: 10,
					page: 1,
					search: query,
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
		(option: SingleValue<RecipeOption>) => {
			if (option) {
				navigate(`/recipe/${option.value}`);
			}
		},
		[navigate],
	);

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>
				Пошук
			</Typography>

			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				<div css={{ marginBottom: '24px', maxWidth: '450px' }}>
					<AsyncSelect<RecipeOption, false>
						cacheOptions={false}
						components={searchSelectComponents}
						defaultOptions={false}
						isClearable
						isLoading={isSearching}
						loadOptions={loadOptions}
						loadingMessage={() => 'Завантаження...'}
						noOptionsMessage={({ inputValue }: { inputValue: string }) =>
							inputValue.trim().length < MIN_QUERY_LENGTH
								? `Введіть щонайменше ${MIN_QUERY_LENGTH} символи`
								: 'Нічого не знайдено'
						}
						onChange={handleOptionClick}
						placeholder="Почніть вводити назву страви..."
						unstyled
					/>
				</div>
				{isSearching ? (
					<LoadingIndicator />
				) : (
					searchResults.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
				)}
			</div>
		</div>
	);
};
