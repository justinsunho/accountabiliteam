module.exports = {
	images: {
		domains: [
			'storage.googleapis.com',
			'lh1.googleusercontent.com',
			'lh2.googleusercontent.com',
			'lh3.googleusercontent.com',
			'lh4.googleusercontent.com',
			'lh5.googleusercontent.com',
			'lh6.googleusercontent.com',
		],
	},
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		}
		return config
	},
}
