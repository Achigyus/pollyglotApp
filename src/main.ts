import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
const translateForm = document.getElementById('translate_form') as HTMLFormElement;
const renderedChat = document.getElementById('rendered_chat') as HTMLDivElement;
const textInput = document.getElementById('text_input') as HTMLInputElement;
const resetBtn = document.getElementById('reset_btn') as HTMLButtonElement;

resetBtn.addEventListener('click', () => {
  renderedChat.innerHTML = `<p class="ai_text">Select the language you me to translate into, type your text and hit send!</p>`;
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
  console.log('Translated Text:', translatedText);
  return translatedText;
}
