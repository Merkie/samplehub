import type { Accessor, Component } from 'solid-js';
import { Show, createSignal } from 'solid-js';

import styles from '../styles/SampleListing.module.css';

interface SampleListingProps {
	name: string;
}

const SampleListing: Component<SampleListingProps> = (props) => {
	return (
        <div class={styles.Sample}>
            <p>{props.name}</p>
        </div>
	);
};

export default SampleListing;
