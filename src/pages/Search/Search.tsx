import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Typography } from '../../components/atoms/Typography';
import { TextInput } from '../../components/atoms/TextInput';
import { useAppSelector } from '../../store/hooks/hooks.ts';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { RecipeCard } from '../../components/RecipeCard';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { searchRecipes } from '../../store/thunks/recipes.ts';
import { getQueryParameter } from '../../utils/utils.tsx';
import { DEBOUNCE_MS, MIN_QUERY_LENGTH } from './constants.ts';
import { createDebouncedRecipeSearch } from './utils.ts';

export const Search = () => {
	const [dispatchSearchRecipes] = useThunk(searchRecipes);
	const isSearching = useAppSelector((state) => state.recipes.search.isSearching);
	const searchResults = useAppSelector((state) => state.recipes.search.recipesList);
	const initialSearchTerm = getQueryParameter('searchTerm');
	const [searchTerm, setSearchTerm] = useState<string | null>(null);

	const handleSearch = useCallback(
		async (query: string) => {
			await dispatchSearchRecipes({
				limit: 10,
				page: 1,
				search: query,
			});

			return [];
		},
		[dispatchSearchRecipes],
	);

	const debouncedRecipeSearch = useMemo(
		() => createDebouncedRecipeSearch(handleSearch, DEBOUNCE_MS, MIN_QUERY_LENGTH),
		[handleSearch],
	);

	const handleSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const value = event.target.value;
			setSearchTerm(value);
			debouncedRecipeSearch(value).catch(() => undefined);
		},
		[debouncedRecipeSearch],
	);

	useEffect(() => {
		if (initialSearchTerm) {
			setSearchTerm(initialSearchTerm);
			dispatchSearchRecipes({
				limit: 10,
				page: 1,
				search: initialSearchTerm,
			});
		}
	}, [dispatchSearchRecipes, initialSearchTerm]);

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>
				Пошук
			</Typography>

			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				<div css={{ marginBottom: '24px', maxWidth: '450px' }}>
					<TextInput
						isFullWidth
						name="searchInput"
						onChange={handleSearchInputChange}
						placeholder="Почніть вводити назву страви..."
						value={searchTerm ?? ''}
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
