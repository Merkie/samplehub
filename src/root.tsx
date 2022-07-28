// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import Header from "./components/Header";
import SessionProvider from "./routes/providers/SessionProvider";

export default function Root() {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
				<Meta />
				<Links />
			</head>
			<body>
				<ErrorBoundary>
					<Suspense>
						<SessionProvider>
							<Routes />
						</SessionProvider>
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</body>
		</html>
	);
}
