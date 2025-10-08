import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { GoogleGenAI } from "@google/genai";
const translateForm = document.getElementById('translate_form') as HTMLFormElement;
const renderedChat = document.getElementById('rendered_chat') as HTMLDivElement;
const textInput = document.getElementById('text_input') as HTMLInputElement;
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY
});

translateForm.addEventListener('submit', submitForm);

async function submitForm(e: Event) {
  e.preventDefault();
  const formData = new FormData(translateForm);
  let textToTranslate = formData.get('text_input') as string;
  let language = formData.get('language') as string;
  if (!textToTranslate || !language) {
    return;
  }
  renderChatItem(textToTranslate, 'human_text');
  console.log(textToTranslate, language);
  const translatedText = await callAITranslate(textToTranslate, language);
  if (!translatedText) {
    alert('Error translating text. Please try again.');
    textInput.focus();
    return;
  }
  renderChatItem(translatedText, 'ai_text');
  textInput.value = '';
}

function renderChatItem(text: string, className: string) {
  const chatItem = document.createElement('p');
  chatItem.className = className;
  chatItem.textContent = text;
  renderedChat.appendChild(chatItem);
}

async function callAITranslate(text: string, language: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Translate the following text to ${language}: "${text}". Answer with just the translated text, no additional commentary and no formatting.`,
    config: {
      systemInstruction: "You are pollyglot AI. Your aim is to assist users in translating text.",
      temperature: 1.0,
      maxOutputTokens: 1024,
    },
  });
  console.log(response.text);
  return response.text;
}
