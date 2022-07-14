// File System
import fs from 'fs-extra';
const read = require('fs-readdir-recursive');
const unzipper = require('unzipper'); // For gzip compression

// UUID
const { v4: uuidv4 } = require('uuid');

// Database
import { Resource, createResource } from './database';

// S3

// Configs
const acceptedExtensions = ['wav', 'mp3'];
const thumbnailExtensions = ['png', 'jpg', 'jpeg'];
const outputDir = './public';

/*
    processDownload(filename: String)

    This function gets called every time a new file is added to the './downloads' folder.
    It checks to see if the downloaded item is a file or directory, then it processess all
    the files uploaded. If the file is of a valid type, it will be moved to the './uploads'
    and given a unique ID.
*/
export const processDownload = async (filename: String) => {
	const fullPath = `./downloads/process/${filename}`; // Full path to the file
	const isDirectory = fs.lstatSync(fullPath).isDirectory();

	if (isDirectory) {
		// If downloaded file is a dirctory, then process all files in it.
		const allFiles = read(fullPath); // All files in the directory
		var packThumbnail = '';

		allFiles.forEach(async (file: string) => {
			const subFileName = file.split('/').pop()!;
			const subFileExtension = subFileName.split('.').pop()!.toLowerCase();

			// Get the first image in the directory, thumbnail
			if (thumbnailExtensions.includes(subFileExtension) && packThumbnail.length == 0) {
				const oldPath = `${fullPath}/${file}`;
				const newPath = `${outputDir}/${uuidv4()}.${subFileExtension}`;

				// Move thumbnail into public folder
				fs.rename(oldPath, newPath, (err) => {
					if (err) throw err;
				});

				// Set packThumbnail to the thumbnail path
				packThumbnail = newPath.split('/').pop()!;
			}

			// Check if file's extension is in the acceptedExtensions array
			if (acceptedExtensions.includes(subFileExtension)) {
				// Rename the file to a unique ID and place it in the output directory
				const oldPath = `${fullPath}/${file}`;
				const newPath = `${outputDir}/${uuidv4()}.${subFileExtension}`;

				fs.rename(oldPath, newPath, (err) => {
					if (err) throw err;
				});

				// Build sample object then insert it into the database
				let newSample: Resource = {
					src: newPath.split('/').pop()!,
					name: subFileName.replace(/_+/g, ' ').replace(/-+/g, ' '),
					filename: oldPath,
					content_type: 'sample',
					thumbnail: packThumbnail
				};

				createResource(newSample);
			}
		});

		// Delete the directory using recursive option
		fs.rmSync(fullPath, { recursive: true, force: true });
	} else {
		const fileExtension = filename.split('.').pop()!.toLowerCase();

		// Unzip the file if it is a gzip file
		if (fileExtension == 'zip') {
			const oldUnzippedDirectoryPath = `./downloads/unzip/${filename.split('.')[0]}`;
			const newUnzippedDirectoryPath = `./downloads/process/${filename.split('.')[0]}`;

			fs.createReadStream(fullPath)
				.pipe(unzipper.Extract({ path: oldUnzippedDirectoryPath }))
				.promise()
				.then(() => {
					// Move the unzipped directory to ./downloads/process, this will trigger the watch function again
					fs.move(oldUnzippedDirectoryPath, newUnzippedDirectoryPath, (err) => {
						if (err) throw err;
					});
				});
		}

		// If downloaded file is just one sample, then process it.
		if (acceptedExtensions.includes(fileExtension)) {
			// New path in /public/ with a unique ID
			const newPath = `${outputDir}/${uuidv4()}.${filename.split('.').pop()}`;

			// Move the file
			console.log(await uploadFile({ originalname: filename, path: fullPath}));
			// fs.rename(fullPath, newPath, (err) => {
			// 	if (err) throw err;
			// });

			// Add resource to database
			let newSample: Resource = {
				src: newPath.split('/').pop()!,
				name: filename.replace(/_+/g, ' ').replace(/-+/g, ' '),
				filename: fullPath,
				content_type: 'sample',
				thumbnail: '#'
			};

			createResource(newSample);
		}

		// Remove the file from the downloads folder
		// fs.rmSync(fullPath, { force: true });
	}
};
