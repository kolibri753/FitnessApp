import Constants from 'expo-constants';

export async function query(data) {
  try {
    const response = await fetch(
      "https://dvr34km07bh4cl1w.us-east-1.aws.endpoints.huggingface.cloud",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Constants.expoConfig.extra.FIREBASE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error in API call: ${error.message}`);
  }
}