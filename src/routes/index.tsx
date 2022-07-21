// Solid
import { createSignal } from "solid-js";

// Styles
import "./styles/index.css";

// Types
import { Page } from "../types";

// Components
import Header from "~/components/Header";
import FillContainer from "~/components/FillContainer";
import LimitContainer from "~/components/LimitContainer";

export default function Home() {
	const [selectedPage, setSelectedPage] = createSignal(Page.Search);

	return (
		<>
			<Header />
			<main>
				<LimitContainer selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
				<FillContainer selectedPage={selectedPage} />
			</main>
		</>
	);
}
