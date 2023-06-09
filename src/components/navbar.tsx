import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useReactiveVar } from '@apollo/client';
import { utcConvertTimestamp, dateFormat } from '../utils/date';
import {
  launchesVar,
  filteredLaunchesVar,
  totalPagesVar,
  currentPageVar,
} from '../common/cache';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const launchesData = useReactiveVar(launchesVar);

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const normalizeString = (str: string) => {
    if (!str) {
      return str;
    }
    return str.replace(/\s/g, '').toLowerCase();
  };

  const handleSearch = () => {
    const perPage = +import.meta.env.VITE_PER_PAGE;
    const keyword = normalizeString(searchInput);
    const result = launchesData
      .filter(({
        mission_name,
        rocket_name,
        rocket_type,
        launch_date_utc,
      }) => normalizeString(mission_name) === keyword
      ||
      normalizeString(rocket_name) === keyword
      ||
      normalizeString(rocket_type) === keyword
        ||
        utcConvertTimestamp(launch_date_utc)
        ===
        dateFormat(keyword)
      );

    filteredLaunchesVar(result);
    const pagination = Math.ceil(result?.length / perPage);

    totalPagesVar(pagination);
    currentPageVar(1);
    setSearchInput('');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">SpaceX Launches</a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <div className="d-flex">
            <input
              value={searchInput}
              onChange={handleSearchInput}
              onKeyDown={handleKeyDown}
              className="form-control me-2"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-success" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
