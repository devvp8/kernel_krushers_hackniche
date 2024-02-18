import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/dist/font/bootstrap-icons.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/clike/clike.js'; 
import 'codemirror/addon/edit/closebrackets.js';
import { Controlled as CodeMirror } from 'react-codemirror2';

function Playground() {
  const [editorContent, setEditorContent] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Cpp');
  const [isOutputEnabled, setIsOutputEnabled] = useState(false);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleRun = async () => {
    const code = {
      code: editorContent,
      input: input,
      lang: selectedLanguage
    };
    console.log(code)
    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(code)
      });

      const data = await response.json();
      setOutput(data.output);
      setIsOutputEnabled(true); // Enable output textarea for input
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 mb-3">
          <div className="d-flex justify-content-between bg-dark rounded p-2">
            <div className="w-50">
              <label className="visually-hidden" htmlFor="inlineFormSelectPref">Language</label>
              <select className="form-select" id="inlineFormSelectPref" onChange={handleLanguageChange} value={selectedLanguage}>
                <option value="Java">Java</option>
                <option value="Cpp">Cpp</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option> {/* Added JavaScript option */}
                <option value="C">C</option> {/* Added C option */}
              </select>
            </div>
            <div>
              <button type="button" className="btn btn-success me-2" onClick={handleRun}>Run <i className="bi bi-play-fill"></i></button>
            </div>
          </div>
          <CodeMirror
            value={editorContent}
            options={{
              mode: selectedLanguage === "Python" ? "text/x-python" : selectedLanguage === "Java" ? "text/x-java" : selectedLanguage === "JavaScript" ? "text/javascript" : selectedLanguage === "C" ? "text/x-csrc" : "text/x-c++src",
              theme: "dracula",
              lineNumbers: true,
              autoCloseBrackets: true
            }}
            onBeforeChange={(editor, data, value) => {
              setEditorContent(value);
            }}
          />
        </div>
        <div className="col-lg-6">
          <div className="bg-dark rounded p-4">
            <label className="text-light mb-2" htmlFor="output">Output</label>
            <textarea
              className="form-control"
              id="output"
              value={output}
              readOnly={!isOutputEnabled} // Disable output textarea if input is not requested
              placeholder={!isOutputEnabled ? 'Please enter your input here...' : ''}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
