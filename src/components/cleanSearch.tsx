import { useReactiveVar } from '@apollo/client';
import {
  filteredLaunchesVar,
  launchesVar,
  totalPagesVar,
  currentPageVar
} from '../common/cache';

const CleanSearch = () => {
  const perPage = 20;
  const launchesData = useReactiveVar(launchesVar);

  const handleClearSearch = () => {
    filteredLaunchesVar(launchesData);
    const pagination = Math.ceil(launchesData.length / perPage);

    totalPagesVar(pagination);
    currentPageVar(1);
  };

  return (
    <button
      type="button"
      className="btn btn-dark"
      onClick={handleClearSearch}
    >
      清除搜尋
    </button>
  );
};

export default CleanSearch;
