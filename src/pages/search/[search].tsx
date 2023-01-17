import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function SearchResultsView() {
  const router = useRouter();
  console.log(router.query);
  return (
    <Box minHeight="100vh" pt="64px">
      Search Results View
    </Box>
  );
}

export default SearchResultsView;