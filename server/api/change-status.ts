import { config } from "dotenv";

config();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("Status change to ", JSON.stringify(body));

  try {
    const response = await fetch(`${process.env.API_URL}/item/status/${body.item}`, {
      method: 'PUT',
      body: JSON.stringify({
        new_status: body.newStatus
      }),
    });

    if (response.headers.get('Content-Type') !== 'application/json') {
      const text = await response.text();
      console.log(text);
      return text;
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
    return undefined;
  }
});