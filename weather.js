// Require the http module for status codes
const http = require('http');
const api = require('./api.json');

// Print error messages
function printError(error) {
	console.error(error.message);
}

// Print the weather to the console
function printMessage(weather) {
	const message = `Current temperature in ${weather.name} is ${weather.main.temp}F.`;
	console.log(message);
}

// Get the weather
function get(query) {
	try {
		const request = 
		http.get(`http://wwwapi.openweathermap.org/data/2.5/weather?${query}&APPID=${api.key}&units=imperial`, (res) => {
			res.setEncoding('utf8');
			if (res.statusCode === 200) {
				let rawData = '';
				res.on('data', (chunk) => { rawData += chunk; });

				res.on('end', () => {
					try {
						// Parse data
						const weather = JSON.parse(rawData);

						// Print data
						printMessage(weather);
					} catch (error) {
						printError(error);
					}
				});
			} else {
				const message = `There was an error getting the weather: (${http.STATUS_CODES[res.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});
		//request.on('error', printError)
	} catch (error) {
		printError(error);
	}
}

module.exports.get = get;