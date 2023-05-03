import { useEffect, useState, useMemo } from 'react';
import { Launch } from '../interfaces/launch';
import LoadingPage from './loadingPage';
import { GET_LAUNCHES } from '../hooks/launches/useGetLaunshes';
import { useQuery, useReactiveVar } from '@apollo/client';
import { LaunchColumn } from '../interfaces/column';
import { columns } from '../constants/columns';
import {
  launchesVar,
  totalPagesVar,
  currentPageVar,
  filteredLaunchesVar
} from '../common/cache';
import { prettyDateFormat, unixConvertDate } from '../utils/date';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import './launchList.css';

const LaunchList = () => {
  const [currentSorted, setCurrentSorted] = useState({
    columnName: '',
    orderBy: '',
  });

  const filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const perPage = +import.meta.env.VITE_PER_PAGE;

  const { loading } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      const launches = data?.launches.map((launch: Launch) => {
        return {
          ...launch,
          rocket_name: launch.rocket.rocket_name,
          rocket_type: launch.rocket.rocket_type,
        }
      });

      launchesVar(launches);
      filteredLaunchesVar(launches);
    }
  });

  const pagination = useMemo(() => {
    return Math.ceil(filteredLaunchData.length / perPage)
  }, [
    filteredLaunchData.length,
    perPage,
  ]);

  useEffect(() => {
    totalPagesVar(pagination);
  }, [pagination]);

  const getPagination = () => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return {
      start,
      end,
    }
  };

  const getLaunches = useMemo(() => {
    const { start, end } = getPagination();
    const { columnName, orderBy } = currentSorted;

    return [...filteredLaunchData]
      .sort((a, b) => {
        const valueA = a[columnName as keyof typeof a];
        const valueB = b[columnName as keyof typeof b];

        if (orderBy === 'asc') {
          return valueA > valueB ? 1 : -1;
        } else if (orderBy === 'desc') {
          return valueA < valueB ? 1 : -1;
        } else {
          return 0;
        }
      })
      .slice(start, end);

  }, [
    filteredLaunchData,
    currentSorted,
    currentPage
  ]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!getLaunches?.length) {
    return <div>No record found.</div>;
  }

  const renderHeadSort = ({ name }: LaunchColumn) => {
    const isSorted = currentSorted.columnName === name;
    const orderBy = isSorted ? currentSorted.orderBy : '';
    const sortIcons = {
      '': <TiArrowSortedUp
        className="sort-icon unsorted"
        onClick={() => setCurrentSorted({ columnName: name, orderBy: 'asc' })}
      />,
      'asc': <TiArrowSortedUp
        className="sort-icon sorted"
        onClick={() => setCurrentSorted({ columnName: name, orderBy: 'desc' })}
      />,
      'desc': <TiArrowSortedDown
        className="sort-icon sorted"
        onClick={() => setCurrentSorted({ columnName: name, orderBy: '' })}
      />,
    };
    return sortIcons[orderBy as keyof typeof sortIcons];
  };

  return (
    <table className="table table-hover">
      <thead className="table-condensed">
        <tr>
          {
            columns?.map((column) => (
              <th key={column.label} style={{ width: column.width }}>
                <div className="sort-column">
                  {column.label}
                  {renderHeadSort(column)}
                </div>
              </th>
            ))
          }
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {
          getLaunches?.map(({
            id,
            mission_name,
            launch_date_local,
            launch_date_unix,
            rocket: { rocket_name, rocket_type }
          }: Launch) => (
            <tr key={`${id}-${mission_name}`}>
              <td>
                {mission_name}
              </td>
              <td>
                {unixConvertDate(launch_date_unix)}
                <br />
                {prettyDateFormat(launch_date_local)}
              </td>
              <td>
                {rocket_name}</td>
              <td>
                {rocket_type}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
};

export default LaunchList;
