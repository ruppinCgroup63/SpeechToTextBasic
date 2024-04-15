// Check for browser support and assign the appropriate object
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;


const words = [ 'first name','last name','body','end','yellow'];

const recognition = new SpeechRecognition();
if (SpeechGrammarList) {
  // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
  
  const speechRecognitionList = new SpeechGrammarList();
  let grammar = '#JSGF V1.0; grammar words; public <word> = ' + words.join(' | ') + ' ;'
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
}
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let diagnostic = document.querySelector('.output');

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a word command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The first [0] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The second [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object
    let word = event.results[0][0].transcript;
    let divByKeyWord = document.querySelector(`#${word.replace(/\s/g, '')}`);
    divByKeyWord.textContent += word + ' '; // Append the word to the existing content
    diagnostic.textContent = 'Result received: ' + word + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}
