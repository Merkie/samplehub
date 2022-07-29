// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";

// For the local storage, session information
import { createStorage } from "@solid-primitives/storage";
export const [store, setStore] = createStorage({ prefix: 'samplehub' });

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
						<Routes />
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</body>
		</html>
	);
}
