import { ChangeEvent, SyntheticEvent, useState } from "react";
import CardList from "../../Components/CardList/CardList";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import Search from "../../Components/Search/Search";
import { searchCompanies } from "../../api";
import { CompanySearch } from "../../company";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("Search term changed: ", e.target.value);
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Button clicked. Current search term: ", search);

    const result = await searchCompanies(search);

    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
      console.log("Search result set: ", result.data);
    }
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const newPortfolioValue = e.target[0].value;
    const exists = portfolioValues.includes(newPortfolioValue);

    if (!exists) {
      const updatedPortfolio = [...portfolioValues, newPortfolioValue];
      setPortfolioValues(updatedPortfolio);
    }

    console.log(e);
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    const valueToRemove = e.target[0].value;
    const updatedPortfolio = portfolioValues.filter(
      (value) => value !== valueToRemove
    );
    setPortfolioValues(updatedPortfolio);
  };

  return (
    <>
      <Search
        search={search}
        onSearchSubmit={onSearchSubmit}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />

      {serverError && <div>shits broke</div>}
    </>
  );
};

export default SearchPage;
