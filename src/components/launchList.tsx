import { useState, useMemo } from 'react';
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
  const [launchColumns, setLaunchColumns] = useState<LaunchColumn[]>(columns);
  let filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const perPage = 20;

  const { loading } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      const result = data?.launches.map((launch: Launch) => {
        return {
          ...launch,
          rocket_name: launch.rocket.rocket_name,
          rocket_type: launch.rocket.rocket_type,
        }
      });

      launchesVar(result);
      filteredLaunchesVar(result);

      const pagination = Math.ceil(result.length / perPage);
      totalPagesVar(pagination);
    }
  });

  const getLaunches = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    let result: Launch[] = [...filteredLaunchData];

    const { columnName, orderBy } = currentSorted;
    switch (orderBy) {
      case 'asc':
        result = result.sort((a, b) => (a[columnName as keyof typeof a] > b[columnName as keyof typeof a]) ? 1 : -1);
        break;
      case 'desc':
        result = result.sort((a, b) => (a[columnName as keyof typeof a] < b[columnName as keyof typeof a]) ? 1 : -1);
        break;
      default:
        break;
    }

    return result.slice(start, end);
  }, [filteredLaunchData, currentSorted, currentPage]);

  if (loading) {
    return <LoadingPage />
  }

  if (!getLaunches?.length) {
    return <div>No record found.</div>
  }

  const renderHeadSort = (column: LaunchColumn) => {
    if (!currentSorted.orderBy || column.name !== currentSorted.columnName) {
      return (
        <TiArrowSortedUp
          className="sort-icon unsorted"
          onClick={() => {
            setCurrentSorted({
              columnName: column.name,
              orderBy: 'asc',
            })
          }}
        />
      );
    }

    switch (currentSorted.orderBy) {
      case 'asc':
        return (
          <TiArrowSortedUp
            className="sort-icon sorted"
            onClick={() => {
              setCurrentSorted({
                columnName: column.name,
                orderBy: 'desc',
              })
            }}
          />
        );
      case 'desc':
        return (
          <TiArrowSortedDown
            className="sort-icon sorted"
            onClick={() => {
              setCurrentSorted({
                columnName: column.name,
                orderBy: '',
              })
            }}
          />
        );
      default:
        break;
    }
  };

  return (
    <table className="table table-hover">
      <thead className="table-condensed">
        <tr>
          {
            launchColumns?.map((column) => (
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
