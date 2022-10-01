import { useCallback } from "react";
import "./Pagination.scss";
import { ReactComponent as AngleDoubleLeft } from "../../Icons/angle-double-left.svg";
import { ReactComponent as AngleDoubleRight } from "../../Icons/angle-double-right.svg";
import { ReactComponent as AngleLeft } from "../../Icons/angle-left.svg";
import { ReactComponent as AngleRight } from "../../Icons/angle-right.svg";

interface Pages {
  first?: number;
  prev?: number;
  next?: number;
  last?: number;
}

/**
 * Props.
 */
interface PaginationProps {
  pages: Pages;
  onChangePage: (page: number) => void;
}

/**
 * Component that renders pages to allow the user to change the page of the results.
 */
function Pagination(props: PaginationProps) {
  const { pages, onChangePage } = props;

  /**
   * Renders a single pagination button.
   */
  const renderButton = useCallback((IconComponent: React.FunctionComponent, page: number, title: string) => {
    return (
      <button
        disabled={!page}
        onClick={() => onChangePage(page)}
        title={title}
        data-testid={title}
      >
        <IconComponent />
      </button>
    );
  }, [onChangePage]);

  return (
    <footer>
      {renderButton(AngleDoubleLeft, pages.first || 0, "first")}
      {renderButton(AngleLeft, pages.prev || 0, "prev")}
      {renderButton(AngleRight, pages.next || 0, "next")}
      {renderButton(AngleDoubleRight, pages.last || 0, "last")}
    </footer>
  );
}

export default Pagination;
export type { Pages };

