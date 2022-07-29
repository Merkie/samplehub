// Styles
import "./styles/LimitContainer.css";

// Types
import { Page } from "../types/specifc";

// Icons
import { Icon } from "solid-heroicons";
import { bookmarkAlt, sparkles, fire, search } from "solid-heroicons/solid";
import { Component } from "solid-js";

import { setSelectedPage, selectedPage } from "~/routes/index";

const LimitContainer: Component = () => {
	return (
		<div class="limit-container surface">
			<button
				onClick={() => setSelectedPage(Page.Search)}
				class={selectedPage() == Page.Search ? "lc-selected" : ""}
			>
				<Icon width="24px" path={search} /> <span>Search</span>
			</button>
			<button
				onClick={() => setSelectedPage(Page.StaffPicks)}
				class={selectedPage() == Page.StaffPicks ? "lc-selected" : ""}
			>
				<Icon width="24px" path={sparkles} /> <span>Staff Picks</span>
			</button>
			<button
				onClick={() => setSelectedPage(Page.Trending)}
				class={selectedPage() == Page.Trending ? "lc-selected" : ""}
			>
				<Icon width="24px" path={fire} /> <span>Trending</span>
			</button>

			<button
				onClick={() => setSelectedPage(Page.Library)}
				class={selectedPage() == Page.Library ? "lc-selected" : ""}
			>
				<Icon width="24px" path={bookmarkAlt} /> <span>Your Library</span>
			</button>
		</div>
	);
};

export default LimitContainer;
