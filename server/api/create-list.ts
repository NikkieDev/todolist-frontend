import { config } from "dotenv";

config();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  try {
    const response = await fetch(`${process.env.API_URL}/list/create`, {
      method: 'POST',
      body: JSON.stringify(
        {
          name: body.name
        }
      )
    });

    const json = await response.json();

    console.log(json);

    return json;

  } catch (error) {
    console.log(error);
  }
})