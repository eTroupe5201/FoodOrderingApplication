import React, {useEffect, createContext, useContext, useState } from "react";

const SortProviderContext = createContext({
  selectedOption: "",
  updateSelectedOption: () => {},
  selectedFilter: "",
  updateSelectedFilter: () => {},
});

export const useSortProvider = () => useContext(SortProviderContext);

export const SortProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Simulated asynchronous operation to fetch selected option
  const fetchSelectedOption = async () => {
    try {
      // Simulate fetching data asynchronously
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ""; // Return selected option after resolving Promise
    } catch (error) {
      console.error("Error fetching selected option:", error);
      return ""; // Return empty string if error occurs
    }
  };
    // Simulated asynchronous operation to fetch selected option
    const fetchSelectedFilter = async () => {
      try {
        // Simulate fetching data asynchronously
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return ""; // Return selected option after resolving Promise
      } catch (error) {
        console.error("Error fetching selected option:", error);
        return ""; // Return empty string if error occurs
      }
    };

  // useEffect to fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSelectedOption();
      const filter = await fetchSelectedFilter();
      console.log("Fetched data:", data);
      setSelectedOption(data);
    };
    fetchData();
  }, []);

  const updateSelectedFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const updateSelectedOption = (option) => {
    console.log("Selected option:", option);
    setSelectedOption(option);
  };

  return (
    <SortProviderContext.Provider
      value={{
        selectedFilter,
        updateSelectedFilter,
        selectedOption,
        updateSelectedOption,
      }}
    >
      {children}
    </SortProviderContext.Provider>
  );
};
