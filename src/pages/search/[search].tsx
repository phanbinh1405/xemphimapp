import { Box, Container, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { Search } from "@mui/icons-material";

function SearchResultsView() {
  const router = useRouter();
  const { search } = router.query;
  const { data } = useSWR(`search/multi?query=${search}`);

  return (
    <Box pt="64px" sx={{ flexGrow: 1 }}>
      <Box borderBottom={1} borderColor={"rgb(227,227,227)"} mb={4}>
        <Container>
          <TextField
            size="medium"
            variant="standard"
            placeholder="Search for a movie, tv show,..."
            fullWidth
            style={{
              background: "#fff",
              borderRadius: "50px",
              border: "none",
              outline: 0,
            }}
            InputProps={{
              sx: {
                color: "rgba(0,0,0,0.5)",
                "& ::placeholder": {
                  color: "rgba(0,0,0,0.5)",
                },
                "& .MuiInput-input": {
                  paddingLeft: "8px",
                },
                paddingY: "10px",
              },
              spellCheck: false,
              disableUnderline: true,
              startAdornment: <Search />,
            }}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid xs={3}>
            <Box bgcolor="darkcyan" height="90vh"></Box>
          </Grid>
          <Grid xs={9}>
            <Box bgcolor="blue" height="90vh"></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SearchResultsView;