import type { Accessor, Component } from 'solid-js';
import { Show, createSignal, onMount } from 'solid-js';

import styles from '../styles/SampleListing.module.css';
import { api_uri } from '../secret';

interface SampleListingProps {
	name: string;
	src: string;
}

const SampleListing: Component<SampleListingProps> = (props) => {
	let wavesurferref: HTMLDivElement | undefined;
    let audiodurationref: HTMLParagraphElement | undefined;
    let sampleref: HTMLDivElement | undefined;

    const [isAudioPlaying, setIsAudioPlaying] = createSignal(false);

	onMount(() => {
		// @ts-ignore
		var wavesurfer = WaveSurfer.create({
			container: wavesurferref,
			waveColor: '#5F6B7C',
			progressColor: 'white',
			fillParent: true,
			height: 50,
			barWidth: 2,
			barHeight: 1, // the height of the wave
			barGap: null,
		});

		// Load the audio into wavedurfer
		wavesurfer.load(api_uri +'/'+ props.src);
        
        wavesurfer.on('ready', function () {
            const duration = Math.floor(wavesurfer.getDuration());
            audiodurationref!.innerHTML = `${Math.floor(duration / 60)}:${duration % 60 > 0 ? duration % 60 : '00'}`;
        });

        wavesurfer.on('pause', function () {
            setIsAudioPlaying(false);
        });
        wavesurfer.on('play', function () {
            setIsAudioPlaying(true);
        });

        sampleref!.addEventListener('click', () => {
            wavesurfer.playPause();
        })
	});

	return (
		<div ref={sampleref} class={`${styles.Sample} ${isAudioPlaying() ? styles.sample_active : ''}`}>
			<img src="https://products.ls.graphics/mesh-gradients/images/14.-Prim.jpg" alt="" />
            <div class={styles.duration_action}>
            <p class={styles.audioduration} ref={audiodurationref}>0:00</p>
            <i class={`bi bi-${isAudioPlaying() ? 'pause-fill' : 'play-fill'} ${styles.audioaction}`}></i>
            </div>            
			<div ref={wavesurferref} class={styles.waveSurfer}></div>
            <div class={styles.info}>
                <b>{props.name.split('.')[0]}</b>
                <p><span><i class="bi bi-arrow-repeat"></i>Loop</span><span>Piano</span><span>chill</span></p>
            </div>
            <div class={styles.spacer}>
                
            </div>
            <div class={styles.download_btn}>
            
            <a class={styles.dl_anchor} href={api_uri +'/'+ props.src.replace("#", "%23")}><i class="bi bi-download"></i></a>
            </div>
		</div>
	);
};

export default SampleListing;
