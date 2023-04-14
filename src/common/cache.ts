import { makeVar } from '@apollo/client';
import { Launch } from '../interfaces/launch';

export const currentPage: number = 1;
export const currentPageVar = makeVar(currentPage);
export const totalPages: number = 0;
export const totalPagesVar = makeVar(totalPages);
export const offset: number = 0;
export const launches: Launch[] = [];
export const launchesVar = makeVar(launches);
