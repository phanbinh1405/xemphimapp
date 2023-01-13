import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
	render() {
		return (
			<Html lang='en'>
				<Head>
					<meta charSet='utf-8' />
					<link
						href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<body>
					<Main />
				</body>
				<NextScript />
			</Html>
		);
	}
}
