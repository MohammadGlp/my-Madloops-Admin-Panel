import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import _ from "lodash";

const PaginationIcons = ({
  itemsCount,
  pageSize,
  currentPage,
  onPageChange,
  onNext,
  onPrev,
}) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1 || pagesCount === 0) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <Pagination className="d-flex justify-content-end">
      <PaginationItem>
        <PaginationLink onClick={onPrev} first>
          <ChevronLeft size={15} />
        </PaginationLink>
      </PaginationItem>
      {pages.map((data) => (
        <PaginationItem active={data === currentPage ? true : false} key={data}>
          <PaginationLink onClick={() => onPageChange(data)}>
            {data}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink onClick={onNext} last>
          <ChevronRight size={15} />
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationIcons;
