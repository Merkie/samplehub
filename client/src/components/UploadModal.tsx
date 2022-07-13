import type { Component } from 'solid-js';
import { createSignal, For, Show } from 'solid-js';

import styles from '../styles/UploadModal.module.css';

import { uploadFile } from '../API';

export const UploadModal: Component = (props) => {

    const [uploadedFiles, setUploadedFiles]: any = createSignal([]);

	let fileInput: HTMLInputElement | undefined;

	const bytesToSize = (bytes: number) => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return 'n/a';
		const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
		if (i === 0) return `${bytes} ${sizes[i]})`;
		return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
	};

	const fileUpload = () => {
		const file: any = fileInput!.files![0];

        if(file.type.startsWith('audio')) {
            file.icon = 'bi-file-earmark-music';
        } else if(file.type.includes('zip')) {
            file.icon = 'bi-file-zip';
        } else {
            // If the file isnt an audio or zip, dont upload it
            return;
        }

        setUploadedFiles([...uploadedFiles(), file]);
	};

    const uploadFiles = () => {
        uploadFile(uploadedFiles()).then(() => {
            console.log('done!');
            setUploadedFiles([]);
        })
    }

    const removeFile = (index: number) => {
        console.log(index);
        if(uploadedFiles().length == 1) {
            setUploadedFiles([]);
        } else {
            const newFiles = [...uploadedFiles()];
            newFiles.splice(index, 1)
            setUploadedFiles(newFiles);
        }
    }

	return (
		<div class={styles.UploadModal}>
			<input ref={fileInput} onChange={fileUpload} type="file" />
            <div class={styles.uploadInstruction}><b>Drag or click here to upload</b><p>.zip, .mp3, .wav</p></div>
            <For each={uploadedFiles()}>
                {(file: any, i: any) => (
                    <div class={styles.fileToUpload}>
                        <i class={`bi ${file.icon!}`}></i>
                        <p>{file.name}</p>
                        <i onClick={() => removeFile(i())} class={`bi bi-x-lg ${styles.fileCloseBtn}`}></i>
                    </div>
                )}
            </For>
            <Show when={uploadedFiles().length > 0}>
                <div class={styles.actions}>
                    <button onClick={uploadFiles}>Upload</button>
                </div>
            </Show>
		</div>
	);
};
