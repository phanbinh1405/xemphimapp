import "../../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import UserLayout from "../layout/UserLayout";
import { theme } from "../theme";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<ThemeProvider theme={theme}>
				<UserLayout>
					<Component {...pageProps} />
				</UserLayout>
			</ThemeProvider>
		</>
	);
}
