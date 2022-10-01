import { useCallback } from "react";
import "./Results.scss";

interface GithubUser {
  avatar_url: string;
  id: number;
  login: string;
  type: "User" | "Organization";
}

/**
 * Props.
 */
interface ResultsProps {
  data: GithubUser[];
  loading?: boolean;
}

/**
 * Table component that renders the `data` prop.
 */
function Results(props: ResultsProps) {
  const { data, loading } = props;

  /**
   * Renders a single row in the body of the table.
   */
  const renderRow = useCallback((item: GithubUser, index: number) => {
    // `delay` is the animation delay to appear/disappear the rows.
    // we use a value of 0.05 for appearing because it can be smoother.
    // we use a faster value (0.01) to remove the rows, because we don"t know
    // how long the window is for the rows to disappear.
    const delay = index * (loading ? 0.01 : 0.05);
    return (
      <tr
        key={item.id}
        data-testid={`user-${item.id}`}
        className={loading ? "" : "visible"}
        style={{ animationDelay: `${delay}s` }}
      >
        <td className="avatar-td">
          <img
            src={item.avatar_url}
            alt={`Github user ${item.login}`}
            data-testid={`user-${item.id}-img`}
          />
        </td>

        <td className="login-td">
          <a
            target="_blank"
            href={`https://github.com/${item.login}`}
            rel="noreferrer"
            data-testid={`user-${item.id}-login`}
          >
            <span>{item.login}</span>
          </a>
        </td>

        <td className="type-td" data-testid={`user-${item.id}-type`}>
          {item.type}
        </td>
      </tr>
    );
  }, [loading]);

  return (
    <div className="results">
      <table>
        <thead>
          <tr>
            <th className="avatar-th"></th>
            <th className="login-th">Login</th>
            <th className="type-th">Type</th>
          </tr>
        </thead>

        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
export type { GithubUser };
