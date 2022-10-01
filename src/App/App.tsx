import axios from "axios";
import { useCallback, useRef, useState } from "react";
import "./App.scss";
import Message from "../Components/Message/Message";
import Pagination, { Pages } from "../Components/Pagination/Pagination";
import Results, { GithubUser } from "../Components/Results/Results";
import Search from "../Components/Search/Search";
import { parseLinkHeader } from "../Helpers/parseLinkHeader";

/**
 * Endpoint of the Github API.
 */
const API_ENDPOINT = `https://api.github.com/search/users`;

/**
 * This is the glue component of the system. It ties the search and results
 * components together to create the application.
 */
function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [results, setResults] = useState<GithubUser[]>([]);
  const [pages, setPages] = useState<Pages>({});
  const activeQuery = useRef<string>(""); // use ref to prevent unnecessary re-renders
  const activePage = useRef<number>(1); // use ref to prevent unnecessary re-renders

  /**
   * Performs the search using the github API endpoint and the query + page.
   */
  const search = useCallback(async () => {
    try {
      setLoading(true);
      setFirstTime(false);

      const response = await axios.get(API_ENDPOINT, {
        params: {
          q: `${activeQuery.current} in:login`,
          page: activePage.current,
          per_page: 9,
        }
      });

      const list = response.data.items;
      const parsedPages = await parseLinkHeader(response.headers?.link).catch(() => null);

      setPages(parsedPages || {});
      setResults(list);
      setLoading(false);
      setError("");
    } catch (ex: any) {
      const err = ex?.message;
      setError(err);
    }
  }, []);

  /**
   * Called when the user submits the text in the input.
   * This function should update the active query and search it.
   */
  const onSubmitQuery = useCallback(async (q: string) => {
    activeQuery.current = q;
    activePage.current = 1;
    await search();
  }, [search]);

  /**
   * Called when the user changes the pages via the pagination component.
   * This function should update the active page and search it.
   */
  const onChangePage = useCallback(async (newPage: number) => {
    activePage.current = newPage;
    await search();
  }, [search]);

  return (
    <div className="app">
      <div className="search-container">
        <Search onSubmit={onSubmitQuery} />
      </div>

      <div className="division" />

      <div className="results-container">
        <Results
          data={results}
          loading={loading}
        />

        <Pagination
          pages={pages}
          onChangePage={onChangePage}
        />

        <Message
          visible={firstTime}
          content={(
            <>
              No results yet.<br />
              Why not search for a github user?
            </>
          )}
        />

        <Message
          visible={!!error}
          content={(
            <>
              Something went wrong:<br />
              {error}
            </>
          )}
        />
      </div>
    </div>
  );
}

export default App;
export { API_ENDPOINT };
