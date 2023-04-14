import { launchesVar } from './cache';

export const typePolicies = {
  typePolicies: {
    Query: {
      fields: {
        launches: {
          read() {
            return launchesVar;
          }
        }
      },
    }
  }
};
