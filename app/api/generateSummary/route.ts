import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request:Request){
   const {todos} = await request.json();
   
   const res = await openai.createChatCompletion({
    model:"gpt-3.5-turbo", //change to 'gpt-4' if you have acess to it
    temperature:0.8,
    n:1,
    stream:false,
    messages:[{
        role:"system",
        content:`When responding, welcome the user always as SHIKHAR and say welcome to the IN Todo app! Limit the response to 200 characters`
    },{
        role:'user',
        content:`Hi there, provide a summary of the following todos. Count how many todos are in each category such as To Do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`
    }]
   });
   const {data} = res;
   return NextResponse.json(data.choices[0].message);
};