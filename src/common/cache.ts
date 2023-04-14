import { makeVar } from '@apollo/client';
import { Launch } from '../interfaces/launch';

export const launches: Launch[] = [];
export const launchesVar = makeVar(launches);
