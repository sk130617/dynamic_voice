//inint speeechsynth api
const synth = window.speechSynthesis;

//dom elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    
    //loop hrought voices and creat option for each one
    voices.forEach(voice => {
        //CREATE OPTION ELEMNT
        const option = document.createElement('option');
        //fill option with voice and lang
        option.textContent = voice.name + '('+ voice.lang +')';

        //set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


//speak
const speak = () => {
    
    
    //check if speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return
    }
    if(textInput.value !== '') {
        //add backgroud anim
        body.style.background = '#000000 url(../img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e => {
            console.log('Done speaking ...');
            body.style.background = '#FFFFFF';
        }

        //speak error
        speakText.onerror = e => {
            console.error('Something went wrong..');
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);
    }
};

//event listeners

// text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur(); 
});

// rate value change
rate.addEventListener('change',  e => rateValue.textContent = rate.value);

//pich value change
pitch.addEventListener('change',  e => pitchValue.textContent = pitch.value);

//voice select change
voiceSelect.addEventListener('change', e => speak());