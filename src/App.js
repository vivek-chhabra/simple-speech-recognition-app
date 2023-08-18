import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import "./App.scss";

function App() {
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    const { transcript, resetTranscript } = useSpeechRecognition();

    // state
    const [isListening, setIsListening] = useState(false);

    // copy clipboard hook
    const [isCopied, setCopied] = useClipboard(transcript);

    if (!SpeechRecognition.browserSupportsSpeechRecognition) {
        return null;
    }

    // start listening
    const handleStart = () => {
        setIsListening(true);
        startListening();
    };

    // stop listening
    const handleStop = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    return (
        <div className="App">
            <h1>Speech to Text Converter</h1>
            <p>A React Hook that converts speech from the microphone to text and makes it available to your React Component</p>
            <div className="text-area">
                <textarea name="" id="" value={transcript}></textarea>
                <div className="btns">
                    <div className="copy" onClick={setCopied}>
                        {isCopied ? "copied" : "Copy to Clipboard"}
                    </div>
                    <div className="start" onClick={handleStart}>
                        {isListening ? "Listening..." : "Start Listening"}
                    </div>
                    <div className="stop" onClick={handleStop}>
                        Stop Listening
                    </div>
                    <div className="stop" onClick={resetTranscript}>
                        Reset the Clipboard
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
