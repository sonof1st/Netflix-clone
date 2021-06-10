import React from "react";
import useContent from "../hooks/useContent";
import SelectionFilter from "../utilities/selection-filter";
import { BrowseContainer } from "../containers/browseContainer";

export default function Browse() {
  // Get film and series data from firebase
  const { series } = useContent("series");
  const { films } = useContent("films");

  const slides = SelectionFilter({ series, films });

  return (
    <>
      <BrowseContainer slides={slides} />
    </>
  );
}
