// Solid
import { Component, createSignal, Show, createEffect } from "solid-js";

// Styles
import "./styles/FilterPanel.css";

// Types
import { KeyType, BpmType, FilterType, IFilter } from "../types";

const FilterPanel: Component = () => {
	const [filterType, setFilterType] = createSignal(FilterType.all);
	const [bpmType, setBpmType] = createSignal(BpmType.range);
	const [bpmRange, setBpmRange] = createSignal([0, 0]);
	const [keySharp, setKeySharp] = createSignal(true);
    const [key, setKey] = createSignal(KeyType.none);
    const [isMajor, setIsMajor] = createSignal(true);

    // TODO: Plug this effect in, its ready to go
    createEffect(() => {
        const filter: IFilter = {
            type: filterType(),
            range: [bpmRange()[0], bpmRange()[1]],
            key: key(),
            scale: isMajor() ? "major" : "minor",
        }

        console.log(filter);
    }) 

    function handleBPMRangeChange() {
        const startRangeElement: any = document.getElementById('start-range');
        const endRangeElement: any = document.getElementById('end-range');

        setBpmRange([startRangeElement.value, endRangeElement.value]);
    }

    // Set both start and end range to the same exact value
    function handleBPMExactChange() {
        const exactRangeElement: any = document.getElementById('exact-range');
        setBpmRange([exactRangeElement.value, exactRangeElement.value]);
    }

    function handleKeyChange(e) {
        const keys = document.getElementById('keys');
        const keyPressed = e.target.id;

        // Remove the selected class from all the buttons
        if(keys.querySelector('.filter-btn-selected'))
            keys.querySelector('.filter-btn-selected').classList.remove('filter-btn-selected');

        // If the key pressed is the same as the current key, set the key to none
        if(keyPressed == key()) {
            setKey(KeyType.none);
            return;
        }
        
        // If all is good then set the key to the pressed key
        document.getElementById(keyPressed).classList.add('filter-btn-selected');
        setKey(keyPressed);
    }

	return (
		<div class="filter-panel">
			<p>Filter Search</p>

			{/* Begin Filter Type */}
			<div class="filter-btn-group filter-inner-surface">
				<button
					onClick={() => setFilterType(FilterType.all)}
					class={filterType() == FilterType.all ? "filter-btn-selected" : ""}
				>
					All
				</button>
				<button
					onClick={() => setFilterType(FilterType.loops)}
					class={filterType() == FilterType.loops ? "filter-btn-selected" : ""}
				>
					Loops
				</button>
				<button
					onClick={() => setFilterType(FilterType.oneshots)}
					class={filterType() == FilterType.oneshots ? "filter-btn-selected" : ""}
				>
					One-shots
				</button>
				<button
					onClick={() => setFilterType(FilterType.presets)}
					class={filterType() == FilterType.presets ? "filter-btn-selected" : ""}
				>
					Presets
				</button>
			</div>
			{/* End Filter Type */}

			{/* Begin Filter BPM */}
			<div class={`filter-inner-surface ${filterType() == FilterType.presets ? "filter-disabled" : ""}`}>
				<div class="filter-btn-group">
					<button
						onClick={() => setBpmType(BpmType.range)}
						class={bpmType() == BpmType.range ? "filter-btn-selected" : ""}
					>
						BPM Range
					</button>
					<button
						onClick={() => setBpmType(BpmType.exact)}
						class={bpmType() == BpmType.exact ? "filter-btn-selected" : ""}
					>
						Exact BPM
					</button>
				</div>
				<Show when={bpmType() == BpmType.range}>
					<div class="filter-bpm-range filter-inner-surface">
						<div class="filter-range-split">
							<p>From:</p>
							<p>To:</p>
						</div>
						<div class="filter-range-split">
							<input id="start-range" type="number" onInput={handleBPMRangeChange} placeholder="120" />
							<input id="end-range" type="number" onInput={handleBPMRangeChange} placeholder="170" />
						</div>
					</div>
				</Show>
				<Show when={bpmType() == BpmType.exact}>
					<div class="filter-bpm-exact filter-inner-surface">
						<input id="exact-range" onInput={handleBPMExactChange} type="number" placeholder="120" />
					</div>
				</Show>
			</div>
			{/* End Filter BPM */}

            {/* Begin Key Filter */}
			<div class={`filter-inner-surface ${filterType() == FilterType.presets ? "filter-disabled" : ""}`}>
				<div class="filter-btn-group">
					<button onClick={() => setKeySharp(true)} class={keySharp() ? "filter-btn-selected" : ""}>
						Sharp
					</button>
					<button onClick={() => setKeySharp(false)} class={!keySharp() ? "filter-btn-selected" : ""}>
						Flat
					</button>
				</div>

				<div id="keys" class="filter-key-selector filter-inner-surface">
					<div class="keys-upper">
						<button class="key" id="csh" onClick={handleKeyChange}>{keySharp() ? "C#" : "Db"}</button>
						<button class="key" id="dsh" onClick={handleKeyChange}>{keySharp() ? "D#" : "Eb"}</button>
						<button class="key" onClick={handleKeyChange} style="opacity: 0;">##</button>
						<button class="key" id="fsh" onClick={handleKeyChange}>{keySharp() ? "F#" : "Gb"}</button>
						<button class="key" id="gsh" onClick={handleKeyChange}>{keySharp() ? "G#" : "Ab"}</button>
						<button class="key" id="ash" onClick={handleKeyChange}>{keySharp() ? "A#" : "Bb"}</button>
					</div>
					<div class="keys-lower">
						<button class="key" id="c" onClick={handleKeyChange}>C</button>
						<button class="key" id="d" onClick={handleKeyChange}>D</button>
						<button class="key" id="e" onClick={handleKeyChange}>E</button>
						<button class="key" id="f" onClick={handleKeyChange}>F</button>
						<button class="key" id="g" onClick={handleKeyChange}>G</button>
						<button class="key" id="a" onClick={handleKeyChange}>A</button>
						<button class="key" id="b" onClick={handleKeyChange}>B</button>
					</div>
                    <div class="major-minor-key filter-btn-group">
                        <button onClick={() => setIsMajor(true)} class={isMajor() ? "key-selected" : ""} >Major</button>
                        <button onClick={() => setIsMajor(false)} class={isMajor() ? "" : "key-selected"}>Minor</button>
                    </div>
				</div>
			</div>
            {/* End Key Filter */}
		</div>
	);
};

export default FilterPanel;
