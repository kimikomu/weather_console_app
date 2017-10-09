// Create a Command Line Weather Application

const weather = require('./weather.js')

// Format query
let query = ``;

// Input is zip only
if (process.argv.length === 3) {
	query = `zip=${process.argv[2]},us`;

// Input has a city with 1 word and a state
} else if (process.argv.length === 4) {
	query = `q=${process.argv[2]},${process.argv[3]}`;

// Input has a city with 2 words and a state
} else if (process.argv.length === 5) {
	query = `q=${process.argv[2]} ${process.argv[3]},${process.argv[4]}`;

// Ensure proper format	
} else {
	console.log("----------------------------------------------");
	console.log("Input: zip ~ Example: 40218");
	console.log("OR");
	console.log("Input: City State code ~ Example: Louisville KY");
	console.log("----------------------------------------------");
}

weather.get(query);


