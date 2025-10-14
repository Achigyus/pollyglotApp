import './style.css'
// import { GoogleGenAI } from "@google/genai";
const translateForm = document.getElementById('translate_form') as HTMLFormElement;
const renderedChat = document.getElementById('rendered_chat') as HTMLDivElement;
const textInput = document.getElementById('text_input') as HTMLInputElement;
// const ai = new GoogleGenAI({
//   apiKey: import.meta.env.VITE_GEMINI_API_KEY
// });
const resetBtn = document.getElementById('reset_btn') as HTMLButtonElement;

resetBtn.addEventListener('click', () => {
  renderedChat.innerHTML = `<p class="ai_text bg-[#035A9D] rounded-t-[10px] rounded-b-[10px] rounded-tl-[2px] px-3.5 py-2.5 pb-5 text-white text-xl leading-[1.5] font-bold">Select the language you me to translate into, type your text and hit send!</p>`;
  textInput.value = '';
  textInput.focus();
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
  renderChatItem(textToTranslate, 'human_text bg-[#65DA65] rounded-t-[10px] rounded-b-[10px] rounded-tr-[2px] px-3.5 py-2.5 pb-5 text-[#333] text-xl leading-[1.5] font-bold');
  console.log(textToTranslate, language);
  const translatedText = await callAITranslate(textToTranslate, language);
  if (!translatedText) {
    alert('Error translating text. Please try again.');
    textInput.focus();
    return;
  }
  renderChatItem(translatedText, 'ai_text bg-[#035A9D] rounded-t-[10px] rounded-b-[10px] rounded-tl-[2px] px-3.5 py-2.5 pb-5 text-white text-xl leading-[1.5] font-bold');
  textInput.value = '';
}

function renderChatItem(text: string, className: string) {
  const chatItem = document.createElement('p');
  chatItem.className = className;
  chatItem.textContent = text;
  renderedChat.appendChild(chatItem);
}

async function callAITranslate(text: string, language: string) {
  // const response = await ai.models.generateContent({
  //   model: "gemini-2.5-flash",
  //   contents: `Translate the following text to ${language}: "${text}". Answer with just the translated text, no additional commentary and no formatting.`,
  //   config: {
  //     systemInstruction: "You are pollyglot AI. Your aim is to assist users in translating text.",
  //     temperature: 1.0,
  //     maxOutputTokens: 1024,
  //   },
  // });
  // console.log(response.text);
  // return response.text;
    const response = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, language })
  });
  if (!response.ok) {
    console.error('Error from AI service:', response.statusText);
    return null;
  }
  const translatedText = await response.text();
  console.log('Translated text:', translatedText);
  return translatedText;

}
