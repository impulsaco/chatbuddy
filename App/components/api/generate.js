import { Configuration, OpenAIApi } from "openai";
import 'react-native-url-polyfill/auto'

console.log("entered API")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log("ENTERING API")
  console.log("REQUEST IS ", req.body.sentence)
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.sentence),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  console.log("returned data is ", completion.data.choices[0].text);
}

function generatePrompt(sentence) { 
  return `Correct the following Spanish sentence: ${sentence}`
}
