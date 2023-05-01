import { useState } from 'react';
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
  const filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const perPage = 20;
  const [launchColumns, setLaunchColumns] = useState<LaunchColumn[]>(columns);

  const { loading, } = useQuery(GET_LAUNCHES, {
    onCompleted: (data) => {
      launchesVar(data?.launches);
      filteredLaunchesVar(data?.launches);

      const pagination = Math.ceil(data?.launches.length / perPage);
      totalPagesVar(pagination);
    }
  });

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const getLaunches = filteredLaunchData.slice(start, end);

  if (loading) {
    return <LoadingPage />
  }

  if (!getLaunches?.length) {
    return <div>No record found.</div>
  }

  const sort = (order: string, field: string) => {
    const indexOfSort = columns.findIndex((column) => column.name === field);

    if (indexOfSort < 0) {
      return false;
    }

    const newColumns = [...columns];
    console.log(order);
    newColumns[indexOfSort].orderBy = order;
    setLaunchColumns(newColumns);
  };

  const renderHeadSort = (column: LaunchColumn) => {
    if (!column.orderBy) {
      return (
        <TiArrowSortedUp
          className="sort-icon unsorted"
          onClick={() => { sort('asc', column.name) }}
        />
      );
    }

    switch (column.orderBy) {
      case 'asc':
        return (
          <TiArrowSortedUp
            className="sort-icon sorted"
            onClick={() => { sort('desc', column.name) }}
          />
        );
      case 'desc':
        return (
          <TiArrowSortedDown
            className="sort-icon sorted"
            onClick={() => { sort('', column.name) }}
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
