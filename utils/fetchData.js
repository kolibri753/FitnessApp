import Constants from 'expo-constants';

export const youtubeOptions = {
	method: "GET",
	headers: {
		"X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
		"X-RapidAPI-Key": "0be085387amsh87b872a285391a5p17e622jsnccf1f049c483",
	},
};

const rapidApiKeys = [
	Constants.expoConfig.extra.RAPID_API_EXERCISEDB_KEY_1,
	Constants.expoConfig.extra.RAPID_API_EXERCISEDB_KEY_2,
	Constants.expoConfig.extra.RAPID_API_EXERCISEDB_KEY_3,
  Constants.expoConfig.extra.RAPID_API_EXERCISEDB_KEY_4,
  Constants.expoConfig.extra.RAPID_API_EXERCISEDB_KEY_5,
];

let currentKeyIndex = 0; // starting index

export const fetchData = async (url, options, limit = 10) => {
  let allData = [];
  let res;
  let data;
  // let currentKeyIndex = 0;

  try {
    do {
      options.headers["X-RapidAPI-Key"] = getCurrentApiKey();
      res = await fetch(url, options);
      data = await res.json();
      currentKeyIndex++;

      if (res.status === 429) {
        console.log(`API limit exceeded with key: ${rapidApiKeys[currentKeyIndex - 1]}`);
      }
      if (data && Symbol.iterator in Object(data)) { // check if data is iterable
        allData.push(...data);
      }
    } while (data && allData.length < limit && currentKeyIndex < rapidApiKeys.length);

    if (res.status === 429) {
      const error = new Error("Exceeded maximum number of API requests");
      error.key = rapidApiKeys[currentKeyIndex - 1];
      throw error;
    }

    console.log(allData)

    return allData.slice(0, limit);
  } catch (error) {
    console.log(error);
  }
};

//fetchData Without limit
// export const fetchData = async (url, options) => {
// 	let res;
// 	let data;
// 	let i = 0;

// 	try {
// 		do {
// 			options.headers["X-RapidAPI-Key"] = rapidApiKeys[i];
// 			res = await fetch(url, options);
// 			data = await res.json();
// 			i++;
// 			if (res.status === 429) {
// 				console.log(`API limit exceeded with key: ${rapidApiKeys[i - 1]}`);
// 			}
// 		} while (res.status === 429 && i < rapidApiKeys.length);

// 		if (res.status === 429) {
// 			const error = new Error("Exceeded maximum number of API requests");
// 			error.key = rapidApiKeys[i - 1];
// 			throw error;
// 		}

//     console.log(data);

// 		return data;
// 	} catch (error) {
// 		console.log("error");
// 	}
// };

export const exerciseOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    "X-RapidAPI-Key": getCurrentApiKey(),
  },
};

function getCurrentApiKey() {
  return rapidApiKeys[currentKeyIndex];
}
