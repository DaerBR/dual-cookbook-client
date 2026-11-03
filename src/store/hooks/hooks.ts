import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../index';
import type { AppDispatch } from '../store.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
