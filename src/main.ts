import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
const translateForm = document.getElementById('translate_form') as HTMLFormElement;
const renderedChat = document.getElementById('rendered_chat') as HTMLDivElement;

translateForm.addEventListener('submit', submitForm);

async function submitForm(e: Event) {
  e.preventDefault();
  const formData = new FormData(translateForm);
  let textToTranslate = formData.get('text_input') as string;
  let language = formData.get('language') as string;
  if (!textToTranslate || !language) {
    return;
  }
  let newtextToAdd = document.createElement("p");
  newtextToAdd.classList.add('human_text');
  newtextToAdd.textContent = `${textToTranslate}`;
  renderedChat.appendChild(newtextToAdd);
  console.log(textToTranslate, language);
  // const response = await fetch('http://localhost:3000/translate', {
  //   method: 'POST',
  //   body: formData
  // });
  // const result = await response.json();
  // const translatedText = result.translatedText;
  // const outputDiv = document.getElementById('output') as HTMLDivElement;
  // outputDiv.innerText = translatedText;
}