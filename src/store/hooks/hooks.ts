import { useDispatch, useSelector } from 'react-redux';
import type { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { AppDispatch } from '../store.ts';

export type ThunkAppDispatch = ThunkDispatch<RootState, undefined, UnknownAction> & Dispatch<any>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
