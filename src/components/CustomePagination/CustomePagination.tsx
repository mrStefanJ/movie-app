import { Pagination, Stack } from "@mui/material";
import React from "react";

interface CustomePaginationProps {
  setPage: (page: number) => void;
  numberOfPages: number;
  currentPage: number;
}

const CustomePagination: React.FC<CustomePaginationProps> = ({
  setPage,
  numberOfPages = 10,
  currentPage,
}) => {
  const maxPage = 30;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.min(numberOfPages, maxPage)}
        onChange={handlePageChange}
        hideNextButton={numberOfPages <= maxPage}
        hidePrevButton={numberOfPages <= maxPage}
        color="primary"
        page={currentPage}
      />
    </Stack>
  );
};

export default CustomePagination;
