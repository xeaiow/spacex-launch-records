import { useState, ChangeEvent } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_LAUNCH } from '../hooks/launches/useGetLaunshes';
import { launchesVar } from '../common/cache';
import LoadingPage from './loadingPage';
import ErrorPage from './errorPage';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  const [searchLaunch, { loading, error }] = useLazyQuery(GET_LAUNCH, {
    onCompleted: (data) => {
      launchesVar([data?.launch]);
    }
  });

  if (loading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleChangeTheme = () => {
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
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <input
            value={searchInput}
            onChange={handleSearchInput}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success" onClick={handleChangeTheme}>Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
