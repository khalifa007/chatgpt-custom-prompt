// ./app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": `
        قم باعطاء عنوان مناسب لهذا النص

        الشروط : 
        0- اللغة العربية فقط
        1- يجب ان يكون العنوان مناسب للنص
        ٢- يجب ان يكون العنوان مختصر ومفيد
        النص :
        ${messages}
        `
      }
    ],
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return NextResponse.json(response);
}