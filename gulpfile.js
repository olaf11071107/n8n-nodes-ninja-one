const { src, dest } = require('gulp');

// Copies credentials and nodes source files to the dist directory
function copyFiles() {
	const filesToCopy = [
		['./nodes/**/*.{png,svg}', './dist/nodes'],
		['./credentials/**/*.{png,svg}', './dist/credentials'],
	];

	return Promise.all(
		filesToCopy.map(([source, destination]) => {
			return src(source).pipe(dest(destination));
		}),
	);
}

exports.build = copyFiles;
exports['build:icons'] = copyFiles;
