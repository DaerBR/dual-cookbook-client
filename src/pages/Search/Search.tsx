import { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { Typography } from '../../components/atoms/Typography';
import { TextInput } from '../../components/atoms/TextInput';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks.ts';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { RecipeCard } from '../../components/RecipeCard';
import { useThunk } from '../../store/hooks/useThunk.ts';
import { searchRecipes } from '../../store/thunks/recipes.ts';
import { getQueryParameter } from '../../utils/utils.tsx';
import { Pagination } from '../../components/atoms/Pagination/Pagination.tsx';
import { Form } from '../../components/Form';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { FieldsGroupTitle } from '../../components/FieldsGroupTitle';
import { resetSearchData } from '../../store/slices/recipesSlice.ts';
import { Select } from '../../components/atoms/Select';
import { SearchFormValues, searchValidationSchema } from './validations.ts';
import { fetchAllCategories } from '../../store/thunks/categories.ts';

export const Search = () => {
	const [dispatchSearchRecipes] = useThunk(searchRecipes);
	const dispatch = useAppDispatch();
	const isSearching = useAppSelector((state) => state.recipes.search.isSearching);
	const searchResults = useAppSelector((state) => state.recipes.search.recipesList);
	const initialSearchTerm = getQueryParameter('searchTerm');
	const searchResultsPagination = useAppSelector((state) => state.recipes.search.pagination);
	const categoriesList = useAppSelector((state) => state.categories.categories);
	const areCategoriesFetched = useAppSelector((state) => state.categories.areCategoriesFetched);

	const categoriesOptions = categoriesList.map((category) => ({ value: category.id, label: category.name }));

	const [dispatchFetchCategories] = useThunk(fetchAllCategories);

	useEffect(() => {
		if (!areCategoriesFetched) {
			dispatchFetchCategories();
		}
	}, [dispatchFetchCategories, areCategoriesFetched]);

	const form = useForm<SearchFormValues>({
		mode: 'onChange',
		defaultValues: {
			searchInput: '',
			recipeAuthor: '',
			category: '',
		},
		resolver: zodResolver(searchValidationSchema),
	});

	const { control, handleSubmit, reset } = form;
	const searchTermValue = useWatch({ control, name: 'searchInput' });

	const handleResetForm = () => {
		reset();
		dispatch(resetSearchData());
	};

	useEffect(() => {
		if (initialSearchTerm) {
			reset({
				searchInput: initialSearchTerm,
			});
			dispatchSearchRecipes({
				limit: 10,
				page: 1,
				search: initialSearchTerm,
			});
		}
	}, [dispatchSearchRecipes, initialSearchTerm, reset]);

	const handleSearchFormSubmit = handleSubmit(async (formValues) => {
		const { category, searchInput, recipeAuthor } = formValues;
		await dispatchSearchRecipes({
			limit: 10,
			page: 1,
			search: searchInput,
			category: category && category !== '' ? category : undefined,
			recipeAuthor: recipeAuthor && recipeAuthor !== '' ? recipeAuthor : undefined,
		});
	});

	return (
		<div>
			<Typography variant="paragraphL" weight={700}>
				Пошук рецептів
			</Typography>

			<div css={{ display: 'flex', justifyContent: 'center', marginTop: '12px', flexDirection: 'column' }}>
				<Form form={form}>
					<div css={{ marginBottom: '24px', maxWidth: '450px' }}>
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
						<Typography
							variant="paragraphM"
							weight={600}
							customStyles={{ marginTop: '24px', marginBottom: '16px' }}
							component="div"
						>
							Фільтри
						</Typography>
						<div css={{ display: 'flex', gap: '24px' }}>
							<Controller
								name="category"
								control={control}
								render={({ field }) => (
									<Select
										label="Категорія"
										placeholder="Оберіть категорію"
										name="category"
										onBlur={field.onBlur}
										onChange={field.onChange}
										options={categoriesOptions}
										value={field.value}
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
										options={[
											{ label: 'Дуал', value: '69c3fd63b42b6ce465cfe18b' },
											{ label: 'Дуалька', value: '69c3ffc4448a9114c2640cae' },
										]}
										value={field.value}
									/>
								)}
							/>
						</div>
					</div>
					<div css={{ display: 'flex', gap: '24px', margin: '36px 0' }}>
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

				{isSearching ? (
					<LoadingIndicator />
				) : searchResults?.length > 0 ? (
					<div css={{ display: 'flex', marginTop: '12px', flexDirection: 'column' }}>
						<FieldsGroupTitle title="Результати:" />
						{searchResults.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				) : null}
				{searchResultsPagination && (
					<Pagination
						currentPage={searchResultsPagination.page}
						fetchDataMethod={dispatchSearchRecipes}
						fetchParams={{ limit: 10, search: searchTermValue }}
						totalPages={searchResultsPagination.totalPages}
					/>
				)}
			</div>
		</div>
	);
};
