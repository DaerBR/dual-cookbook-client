import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { Typography } from '../../components/atoms/Typography';
import { TextInput } from '../../components/atoms/TextInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks.ts';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { RecipeCard } from '../../components/RecipeCard';
import { Pagination } from '../../components/atoms/Pagination/Pagination.tsx';
import { Form } from '../../components/Form';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { FieldsGroupTitle } from '../../components/FieldsGroupTitle';
import { resetSearch, setSearchPage, setSearchQuery } from '../../store/slices/searchSlice.ts';
import { Select } from '../../components/atoms/Select';
import type { SearchFormValues } from './validations.ts';
import { searchValidationSchema } from './validations.ts';
import { useCategoryOptions } from '../../queries/categories';
import { useRecipesList } from '../../queries/recipes';
import { MultiSelect } from '../../components/atoms/MultiSelect';
import { mobileSearchButtonStyles } from './styles.ts';
import { recipeAuthorOptions } from '../../constants/recipeAuthors.ts';
import { toSearchRequestParams } from './utils.ts';
import { emptySearchFormValues } from './constants.ts';

export const Search = () => {
	const dispatch = useAppDispatch();
	// Client state (Redux): what was searched + current page. Server state (TanStack): the results for that.
	const searchQuery = useAppSelector((state) => state.search.query);
	const page = useAppSelector((state) => state.search.page);

	// `null` until the first search → the query stays idle (that's the old `wasSearchInitiated`)
	const searchParams = useMemo(
		() => (searchQuery ? { limit: 10, page, ...toSearchRequestParams(searchQuery) } : null),
		[searchQuery, page],
	);

	const { data: searchData, isFetching: isSearching, isPlaceholderData } = useRecipesList(searchParams);
	const searchResults = searchData?.data ?? [];
	const searchResultsPagination = searchData?.pagination;
	// `isFetching` (not `isPending`) for the buttons: also true while paging / re-searching over placeholder data
	const isLoadingFirstResults = isSearching && !searchData;
	const { data: categoriesOptions = [] } = useCategoryOptions();

	const form = useForm<SearchFormValues>({
		mode: 'all',
		defaultValues: searchQuery ?? emptySearchFormValues,
		resolver: zodResolver(searchValidationSchema),
	});

	const { control, handleSubmit, reset } = form;

	useEffect(() => {
		if (!searchQuery) {
			reset(emptySearchFormValues);
		}
	}, [searchQuery, reset]);

	const handleResetForm = () => {
		reset(emptySearchFormValues);
		dispatch(resetSearch());
	};

	// Submitting only stores the query; the new key makes useRecipesList fetch (or read a cached result)
	const handleSearchFormSubmit = handleSubmit((formValues) => {
		dispatch(setSearchQuery(formValues));
	});

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>
				Пошук рецептів
			</Typography>

			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				<Form form={form} onSubmit={handleSearchFormSubmit}>
					<div css={{ marginBottom: '24px', maxWidth: '450px' }}>
						<div css={{ display: 'flex' }}>
							<Controller
								control={control}
								name="searchInput"
								render={({ field }) => (
									<TextInput
										isFullWidth
										name="searchInput"
										placeholder="Ведіть назву страви"
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<Button isBusy={isSearching} onClick={handleSearchFormSubmit} css={mobileSearchButtonStyles}>
								<Icon icon={faSearch} fontSize={14} customStyles={{ color: '#fff' }} />
							</Button>
						</div>
						<Typography
							variant="paragraphM"
							weight={600}
							customStyles={{ marginTop: '24px', marginBottom: '16px' }}
							component="div"
						>
							Фільтри
						</Typography>
						<Controller
							name="categories"
							control={control}
							render={({ field }) => (
								<MultiSelect
									isFullWidth
									label="Категорії"
									placeholder="Оберіть категорії"
									name="categories"
									onChange={(newValue) => field.onChange([...newValue])}
									options={categoriesOptions}
									value={field.value}
									customStyles={{ marginBottom: '16px' }}
								/>
							)}
						/>
						<Controller
							name="recipeAuthor"
							control={control}
							render={({ field }) => (
								<Select
									label="Користувач"
									placeholder="Ким додано"
									name="recipeAuthor"
									onBlur={field.onBlur}
									onChange={field.onChange}
									options={recipeAuthorOptions}
									value={field.value}
								/>
							)}
						/>
					</div>
					<div css={{ display: 'flex', gap: '24px', margin: '36px 0', alignItems: 'center', justifyContent: 'center' }}>
						<Button
							isBusy={isSearching}
							onClick={handleSearchFormSubmit}
							startIcon={<Icon icon={faSearch} fontSize={14} />}
						>
							Шукати
						</Button>
						<Button variant="outlined-neutral" onClick={handleResetForm}>
							Скинути
						</Button>
					</div>
				</Form>

				{isLoadingFirstResults ? (
					<LoadingIndicator />
				) : searchResults.length > 0 ? (
					<div
						css={{
							display: 'flex',
							marginTop: '12px',
							flexDirection: 'column',
							opacity: isPlaceholderData ? 0.5 : 1,
						}}
					>
						<FieldsGroupTitle title="Результати:" />
						{searchResults.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				) : searchData ? (
					<div css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<Typography variant="paragraphL" color="primary" weight={500}>
							Нічого не знайдено...
						</Typography>
					</div>
				) : null}
				{searchResultsPagination && searchQuery && (
					<Pagination
						currentPage={page}
						onPageChange={(newPage) => dispatch(setSearchPage(newPage))}
						totalPages={searchResultsPagination.totalPages}
					/>
				)}
			</div>
		</div>
	);
};
