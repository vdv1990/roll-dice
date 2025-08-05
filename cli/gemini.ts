#!/usr/bin/env node

import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { Command } from 'commander';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

const program = new Command();

program
  .name('gemini-cli')
  .description('CLI tool for interacting with Google Gemini AI')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate content using Gemini')
  .argument('<prompt>', 'The prompt to send to Gemini')
  .option('-m, --model <model>', 'Model to use', 'gemini-pro')
  .action(async (prompt, options) => {
    try {
      const model = genAI.getGenerativeModel({ model: options.model });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      console.log(response.text());
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
