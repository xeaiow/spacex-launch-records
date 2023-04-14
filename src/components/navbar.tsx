import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LAUNCH } from '../hooks/launches/useGetLaunshes';
import { currentPageVar, launchesVar, totalPagesVar } from '../common/cache';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  const [searchLaunch] = useLazyQuery(GET_LAUNCH, {
    onCompleted: (data) => {
      if (data?.launch) {
        launchesVar([data?.launch]);
      }

      currentPageVar(1);
      totalPagesVar(1);
    },
    onError: () => {
      alert('No record found.');
      setSearchInput('');
    }
  });

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    searchLaunch({
      variables: {
        id: searchInput,
      },
    })
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        <div className="navbar-brand">SpaceX Launches</div>
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
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-success" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
