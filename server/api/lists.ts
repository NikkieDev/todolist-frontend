import { config } from 'dotenv';

config();
export default defineEventHandler(async (event) => {
  try {
    const response = await fetch(`${process.env.API_URL}/lists`, {
      method: 'GET',
    });

    console.log("Fetched lists from API");
    const json = await response.json();

    console.log(JSON.stringify(json));
    return json;
  } catch (error) {
    console.log("Error occured while fetching lists from API", error);
    return undefined;
  }
})