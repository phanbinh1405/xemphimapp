import { createTheme } from "@mui/material";
const theme = createTheme({
	typography: {
		fontFamily: ["Source Sans Pro", "serif"].join(","),
	},
	palette: {
		primary: {
			main: "#032541",
		},
	},
});

export { theme };
