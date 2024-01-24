import Constants from "expo-constants";

const API_ENDPOINT =
	"https://dvr34km07bh4cl1w.us-east-1.aws.endpoints.huggingface.cloud";

export async function query(data) {
	try {
		const response = await fetch(`${API_ENDPOINT}`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${Constants.expoConfig.extra.FIREBASE_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		throw new Error(`Error in API call: ${error.message}`);
	}
}

export async function generateWorkout(prompt) {
	try {
		const generatedWorkoutResponse = await query({
			inputs: prompt,
			parameters: {
				max_new_tokens: 500,
			},
		});

		console.log("Generated AI Workout:", generatedWorkoutResponse);

		const generatedText = generatedWorkoutResponse[0]?.generated_text || "";

		const nameMatch = generatedText.match(/\{name:"([^"]+)"/);
		const descriptionMatch = generatedText.match(/\,description:"([^"]+)/);

		const name = nameMatch ? nameMatch[1] : null;
		const description = descriptionMatch ? descriptionMatch[1] : generatedText;

		console.log("name", name);
		console.log("desc", description);

		return { name, description };
	} catch (error) {
		console.error("Error generating AI workout:", error);
		throw error;
	}
}
