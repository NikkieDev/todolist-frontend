import { config } from "dotenv";

config();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await fetch(`${process.env.API_URL}/item/create`, {
      method: 'POST',
      body: JSON.stringify(body.data)
    });

    console.log("creating item");
    if (response.headers.get('Content-Type') !== 'application/json') {
      const text = await response.text();
      console.log(text);
      return text;
    }

    const json = await response.json();
    console.log(JSON.stringify(json));
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
});