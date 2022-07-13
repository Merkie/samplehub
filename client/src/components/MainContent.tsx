import type { Accessor, Component } from 'solid-js';
import { Show, createSignal, onMount, For } from 'solid-js';

import styles from '../styles/MainContent.module.css';

import adone from '../assets/adone.png';
import adtwo from '../assets/adtwo.png';
import adthree from '../assets/adthree.png';

import { queryApi } from '../API';

import SampleListing from './SampleListing';

interface MainContentProps {
	authorized: Accessor<Boolean>;
	deauth_user: any;
}

const MainContent: Component = () => {
	let searchinputref: HTMLInputElement | undefined;

	const [timeDisplay, setTimeDisplay] = createSignal('');
	const [searchQuery, setSearchQuery] = createSignal('');
	const [searchResults, setSearchResults] = createSignal([]);

	onMount(() => {
		const date = new Date();
		const currentTime = date.getHours();

		if (currentTime >= 0 && currentTime <= 12) {
			setTimeDisplay('morning');
		} else if (currentTime > 12 && currentTime <= 18) {
			setTimeDisplay('afternoon');
		} else {
			setTimeDisplay('evening');
		}
	});

	const updateQuery = async () => {
		setSearchQuery(searchinputref!.value);
		const results = await queryApi(searchQuery());
		setSearchResults(results.data);
		console.log(searchResults());
	}

	return (
		<div class={styles.MainContent}>
			<div class={styles.leftCol}>
				<div class={styles.leftColMainPanel}>
					<div class={styles.navigator}>
						<b class={styles.navigator_active}>Browse</b>
						<b>Editor's Picks</b>
						<b>Charts</b>
						<div>
							<b>Join the Discord!</b> <i class="bi bi-box-arrow-right"></i>
						</div>
					</div>
				</div>
				<div class={styles.trendingTab}>
					<b>Trending Collections</b>
					<div class={styles.collectionItem}>
						<img src="https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia_1.jpg" alt="" />
						<p>Collection name</p>
					</div>
					<div class={styles.collectionItem}>
						<img src="https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia_1.jpg" alt="" />
						<p>Collection name</p>
					</div>
					<div class={styles.collectionItem}>
						<img src="https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia_1.jpg" alt="" />
						<p>Collection name</p>
					</div>
					<div class={styles.collectionItem}>
						<img src="https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia_1.jpg" alt="" />
						<p>Collection name</p>
					</div>
					<div class={styles.collectionItem}>
						<img src="https://products.ls.graphics/mesh-gradients/images/11.-Fuchsia_1.jpg" alt="" />
						<p>Collection name</p>
					</div>
				</div>
				<div class={styles.mobileGallery}>
					<img src={adone} alt="" />
					<img src={adtwo} alt="" />
					<img src={adthree} alt="" />
					<img src={adone} alt="" />
				</div>

				<div class={styles.leftColDecorImage}>
					<h1>Good {timeDisplay()}.</h1>
					<img src="https://products.ls.graphics/mesh-gradients/images/16.-Medium-Purple_1.jpg" alt="" />
				</div>
			</div>

			<div class={styles.rightContent}>
				<div class={styles.mobile_navigation}>
					<h1>
						<span>Browse</span> <i class="bi bi-chevron-down"></i>
					</h1>
				</div>
				<div class={styles.search_ribbon}>
					<div class={styles.search_input}>
						<i class="bi bi-search"></i>
						<input ref={searchinputref} onInput={updateQuery} type="text" placeholder="Search packs, samples, and presets" />
					</div>
					<div class={styles.dropdown_selector}>
						<p>Key</p>
						<i class="bi bi-chevron-down"></i>
					</div>
					<div class={styles.dropdown_selector}>
						<p>BPM</p>
						<i class="bi bi-chevron-down"></i>
					</div>
					<div class={styles.dropdown_selector}>
						<p>Type</p>
						<i class="bi bi-chevron-down"></i>
					</div>
					<div class={styles.mobile_search_controls}>
						<i class="bi bi-sliders"></i>
					</div>
				</div>
				<For each={searchResults()}>
					{(result: any, i: any) => (
						<SampleListing name={result.name} />
					)}
				</For>
			</div>
		</div>
	);
};

export default MainContent;
