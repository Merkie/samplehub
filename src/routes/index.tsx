// Solid
import { createSignal } from "solid-js";

// Styles
import "./styles/index.css";

// Types
import { Page } from "../types/specifc";

// Components
import Header from "~/components/Header";
import FillContainer from "~/components/FillContainer";
import LimitContainer from "~/components/LimitContainer";
import { IUser } from "~/types/api";

export const [selectedPage, setSelectedPage] = createSignal(Page.Search);
export const [isAuthorized, setAuthorized] = createSignal(false);
export const [currentUser, setCurrentUser] = createSignal<IUser | null>(null);

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<LimitContainer />
				<FillContainer />
			</main>
		</>
	);
}
