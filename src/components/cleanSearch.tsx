import { useReactiveVar } from '@apollo/client';
import {
  filteredLaunchesVar,
  launchesVar,
  totalPagesVar,
  currentPageVar
} from '../common/cache';
import { TiDelete } from 'react-icons/ti';

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
      className="btn btn-primary"
      onClick={handleClearSearch}
    >
      Clear search results
      <TiDelete style={{ fontSize: 24, marginTop: -3 }} />
    </button>
  );
};

export default CleanSearch;
