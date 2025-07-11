'use server'

import { ChatOpenAI } from "@langchain/openai";

const chatModel = new ChatOpenAI({
    apiKey: process.env.OPEN_AI_KEY
})