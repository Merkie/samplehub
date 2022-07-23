// Styles
import "./styles/LimitContainer.css";

// Types
import { ILimitContainerProps } from "../types/props";
import { Page } from "../types/specifc";

// Icons
import { Icon } from "solid-heroicons";
import { bookmarkAlt, sparkles, fire, search } from "solid-heroicons/solid";
import { createSignal, Component } from "solid-js";

const LimitContainer: Component<ILimitContainerProps> = (props) => {
	return (
		<div class="limit-container surface">
			<button
				onClick={() => props.setSelectedPage(Page.Search)}
				class={props.selectedPage() == Page.Search ? "lc-selected" : ""}
			>
				<Icon width="24px" path={search} /> <span>Search</span>
			</button>
			<button
				onClick={() => props.setSelectedPage(Page.StaffPicks)}
				class={props.selectedPage() == Page.StaffPicks ? "lc-selected" : ""}
			>
				<Icon width="24px" path={sparkles} /> <span>Staff Picks</span>
			</button>
			<button
				onClick={() => props.setSelectedPage(Page.Trending)}
				class={props.selectedPage() == Page.Trending ? "lc-selected" : ""}
			>
				<Icon width="24px" path={fire} /> <span>Trending</span>
			</button>

			<button
				onClick={() => props.setSelectedPage(Page.Library)}
				class={props.selectedPage() == Page.Library ? "lc-selected" : ""}
			>
				<Icon width="24px" path={bookmarkAlt} /> <span>Your Library</span>
			</button>
		</div>
	);
};

export default LimitContainer;
