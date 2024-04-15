//// Check for browser support and assign the appropriate object
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
let SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const keywords = ['first name', 'last name', 'body', 'end', 'yellow'];
const stopKey = ['stop'];

// Initialize SpeechRecognition objects
const recognition = new SpeechRecognition();

const recognitionContext = new SpeechRecognition();

if (SpeechGrammarList) {
    // Define grammars for keywords and stop word
    const grammar = '#JSGF V1.0; grammar keywords; public <keywords> = ' + keywords.join(' | ') + ' ;';
    //const grammarStop = '#JSGF V1.0; grammar stopKey; public <stopKey> = ' + stopKey.join(' | ') + ' ;';

    // Create a single SpeechGrammarList and add both grammars to it
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    //   speechRecognitionList.addFromString(grammarStop, 1);
    speechRecognitionList[0];
    
    // Assign the combined grammar to the recognition objects
    recognition.grammars = speechRecognitionList;
    //recognitionContext.grammars = speechRecognitionList;
}

////recognition
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

/*
//recognition Context
recognitionContext.continuous = true;
recognition.lang = 'es-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
//*/

//// Check for browser support and assign the appropriate object
//let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//// Create the first SpeechRecognition instance to recognize the keyword
//const keywordRecognition = new SpeechRecognition();

//// Create the second SpeechRecognition instance for dictating to the div
//const dictationRecognition = new SpeechRecognition();

// Define the keywords and div IDs
const keywords = ['first name', 'last name', 'body', 'end', 'yellow'];
const divIds = {
    'first name': 'firstname',
    'last name': 'lastname',
    'body': 'body',
    'end': 'end',
    'yellow': 'yellow'
};

//// Set up keyword recognition
//keywordRecognition.onresult = function (event) {
//    const word = event.results[0][0].transcript.toLowerCase();
//    if (keywords.includes(word)) {
//        const divId = divIds[word];
//        const div = document.getElementById(divId);
//        if (div) {
//            console.log('Keyword recognized:', word);
//            // Start the dictation recognition for the corresponding div
//            dictationRecognition.start();
//            // Set the div as the target for the dictation recognition
//            dictationRecognition.targetDiv = div;
//        } else {
//            console.error('Div not found for keyword:', word);
//        }
//    }
//};

//// Set up dictation recognition
//dictationRecognition.onresult = function (event) {
//    const transcript = event.results[event.results.length - 1][0].transcript;
//    const targetDiv = event.targetDiv;
//    if (targetDiv) {
//        targetDiv.innerText += transcript;
//    }
//};

//// Start the keyword recognition
//keywordRecognition.start();


// Map keywords to corresponding section IDs
   const sectionIds = {
   'first name': 'firstname',
    'last name': 'lastname',
    'body': 'body',
   'end': 'end',
    'yellow': 'yellow'
};

let diagnostic = document.querySelector('.output');


document.body.onclick = function () {
    recognition.start();
    console.log('Ready to receive a word command.');
}
recognition.onresult = function (event) {
    let word = event.results[0][0].transcript.toLowerCase(); // Convert to lowercase for case-insensitivity
    let sectionId = sectionIds[word];
    if (sectionId) {
        let section = document.getElementById(sectionId);
        if (section) {
            let div = document.createElement('div');
            section.appendChild(div);
           //// recognitionContext.onstart(div);
            //recognitionContext.start();
            console.log('Streaming speech to section:', sectionId);
            const transcriptToDiv = event.results[event.results.length - 1][0].transcript;
            section.innerText += transcriptToDiv;
        } else {
            console.error('Section not found:', sectionId);
        }
    } else {
        console.error('No section found for keyword:', word);
    }

//    // Set up dictation recognition
//    dictationRecognition.onresult = function (event) {
//        const transcript = event.results[event.results.length - 1][0].transcript;
//        const targetDiv = event.targetDiv;
//        if (targetDiv) {
//            targetDiv.innerText += transcript;
//        }
//    };

    // Start the keyword recognition
   // keywordRecognition.start();

//    recognitionContext.onstrart = function (event) {
//        let transcriptToDiv= event.results[0][0].transcript;
//    }

recognition.onspeechend = function () {    
    console.log('Speech ended');
}

recognition.onnomatch = function (event) {
    diagnostic.textContent = "I didn't recognise that keyword.";
}

recognition.onerror = function (event) {
    diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


