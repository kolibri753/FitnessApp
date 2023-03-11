export const youtubeOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
		"X-RapidAPI-Key": "0be085387amsh87b872a285391a5p17e622jsnccf1f049c483",
	},
};

//------------------with one stable KEY------------------

// export const exerciseOptions = {
// 	method: "GET",
// 	headers: {
// 		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
// 		"X-RapidAPI-Key": "77c3baa5a3mshd0799b8845cc7d4p1a1a8djsn4f2b8320c132",
// 	},
// };

// 0be085387amsh87b872a285391a5p17e622jsnccf1f049c483 -- Clexa
// 9f680cfbecmsh7658a3175193317p19059cjsncf1436544988 -- Kolibri
// 77c3baa5a3mshd0799b8845cc7d4p1a1a8djsn4f2b8320c132 -- Vira

// export const fetchData = async (url, options) => {
// 	const res = await fetch(url, options);
// 	const data = await res.json();
// 	// console.log(res);
// 	// console.log(data);
// 	// const data = "helpMeINeedMoney";

// 	return data;
// };

// Try this
const rapidApiKeys = [
	"77c3baa5a3mshd0799b8845cc7d4p1a1a8djsn4f2b8320c132",
	"0be085387amsh87b872a285391a5p17e622jsnccf1f049c483",
	"9f680cfbecmsh7658a3175193317p19059cjsncf1436544988",
];

let currentKeyIndex = 0; // starting index

export const exerciseOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
		"X-RapidAPI-Key": rapidApiKeys[currentKeyIndex],
	},
};

export const fetchData = async (url, options) => {
	let res;
	let data;
	let i = 0;

	try {
		do {
			options.headers["X-RapidAPI-Key"] = rapidApiKeys[i];
			res = await fetch(url, options);
			data = await res.json();
			i++;
			if (res.status === 429) {
				console.log(`API limit exceeded with key: ${rapidApiKeys[i - 1]}`);
			}
		} while (res.status === 429 && i < rapidApiKeys.length);

		if (res.status === 429) {
			const error = new Error("Exceeded maximum number of API requests");
			error.key = rapidApiKeys[i - 1];
			throw error;
		}

		return data;
	} catch (error) {
		console.log("error");
	}
};

