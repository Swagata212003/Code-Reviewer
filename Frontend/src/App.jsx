import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import "./App.css";

function App() {
  const [code, setCode] = useState(`function sum() { return 2 + 2; }`);
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  // Function to handle review generation
  async function reviewCode() {
    setLoading(true); // Set loading to true while fetching review
    try {
      const response = await axios.post('https://code-reviewer-backend-hdje.onrender.com/', { code });
      setReview(response.data.review); // Set review when response is received
    } catch (error) {
      setReview("Error fetching review."); // Handle error if any
    } finally {
      setLoading(false); // Set loading to false when response is received
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 12,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        {/* Review Button */}
        <div 
          onClick={reviewCode}
          className={`review ${loading ? 'loading' : ''}`}
        >
          {loading ? "Generating Review..." : "Review"}
        </div>
      </div>
      <div className="right">
        <Markdown>
          {review}
        </Markdown>
      </div>
    </main>
  );
}

export default App;
