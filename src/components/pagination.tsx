import { useReactiveVar } from '@apollo/client';
import { currentPageVar, filteredLaunchesVar, totalPagesVar } from '../common/cache';

const Pagination = () => {
  const filteredLaunchData = useReactiveVar(filteredLaunchesVar);
  const currentPage = useReactiveVar(currentPageVar);
  const totalPages = useReactiveVar(totalPagesVar);

  if (!filteredLaunchData?.length) {
    return null;
  }

  const changePage = (target: string | number) => {
    switch (target) {
      case 'prev':
        if (currentPage === 1) return;
        currentPageVar(currentPage - 1);
        break;
      case 'next':
        if (currentPage === totalPages) return;
        currentPageVar(currentPage + 1);
        break;
      default:
        currentPageVar(target as number);
        break;
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item cursor-pointer">
          <button
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => { changePage('prev') }}
          >Previous</button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          index + 1 === currentPage ? (
            <li className="page-item active" aria-current="page" key={index}>
              <button className="page-link">{currentPage}</button>
            </li>
          ) : (
            <li className="page-item" key={index}>
              <button className="page-link" onClick={() => { changePage(index + 1) }}>{index + 1}</button>
            </li>
          )
        ))}
        <li className="page-item">
          <button
            className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => { changePage('next') }}
          >Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
