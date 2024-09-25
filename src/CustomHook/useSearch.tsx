import { useState } from "react";

const useSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchText(value);
    setIsSearchActive(value.trim() !== "");
    if (!value.trim()) {
      setSearchText("");
    }
  };

  return { searchText, isSearchActive, handleSearchChange };
};

export default useSearch;
