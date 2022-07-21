// Solid
import { Component, createSignal, Show } from "solid-js";

// Styles
import "./styles/FillContainer.css";

// Components
import FilterPanel from "./FilterPanel";

// Types
import { IFillContainerProps, Page } from "../types";

// Icons
import { Icon } from "solid-heroicons";
import { search, adjustments } from "solid-heroicons/solid";
import {chevronRight, chevronLeft} from "solid-heroicons/outline";

const FillContainer: Component<IFillContainerProps> = (props) => {
	const [controlsVisible, setControlsVisible] = createSignal(false);

	return (
		<div class="fill-container surface">
			<div class="page-title-mobile">
				<h2>{props.selectedPage()}</h2>
			</div>
			{/* Search Page */}
			
			<Show when={props.selectedPage() == Page.Search}>
				<div class="container-header">
					<div class="search">
						<Icon width="16px" path={search} />
						<input type="text" placeholder="Search for samples, packs, and presets" />
					</div>
					<button class="controls-btn" onClick={() => setControlsVisible(!controlsVisible())}><Icon width="20px" path={adjustments} /></button>
					<div style="flex-grow: 1"></div>
					<div class="navigation-btns">
						<button><Icon path={chevronLeft} /></button>
						<button><Icon path={chevronRight} /></button>
					</div>
				</div>

				<div class={controlsVisible() ? "" : "filter-wrapper"}>
					<FilterPanel />
			</div>
			</Show>
			{/* End Search Page */}
		</div>
	);
};

export default FillContainer;
