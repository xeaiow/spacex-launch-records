import { useReactiveVar } from '@apollo/client';
import {
  filteredLaunchesVar,
  launchesVar,
  totalPagesVar,
  currentPageVar
} from '../common/cache';
import { TiDelete } from 'react-icons/ti';
import './clearSearch.css';

const ClearSearch = () => {
  const perPage = +import.meta.env.VITE_PER_PAGE;
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
      Clear
      <TiDelete className="clear-button" />
    </button>
  );
};

export default ClearSearch;
