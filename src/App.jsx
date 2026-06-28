import { useState } from "react";
import { analyzeVideo } from "./gemini";
export default function App() {
  const [title, setTitle] = useState("");
  const [hook, setHook] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
  if (!title || !hook || !thumbnail) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    setLoading(true);

    const response = await analyzeVideo({
      title,
      hook,
      thumbnail,
    });
   console.log("STATE:", response);
   setResult(response);
  } catch (error) {
    console.error(error);
    alert(JSON.stringify(error, null, 2));
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "60px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            fontSize: "36px",
            lineHeight: "1.2",
            letterSpacing: "-1px",
            wordBreak: "break-word",
          }}
        >
          🚀 ViralAI Pre-Publish Sandbox
        </h1>

        <p style={{
          marginBottom: "35px",
          color: "#555",
          fontSize: "18px"
        }}>
          Test your video idea before you publish and improve your chances of going viral.
        </p>


        <label>Video Title</label>
        <input
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
          placeholder="Example: The Secret Jesus Teaching They Hid..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <label>Your Hook (first 3-5 seconds)</label>
        <textarea
          style={{
            width: "100%",
            height: "120px",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
          placeholder="Example: Nobody tells you this hidden truth..."
          value={hook}
          onChange={(e) => setHook(e.target.value)}
        />


        <label>Thumbnail Concept</label>
        <input
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "30px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px"
          }}
          placeholder="Example: Ancient manuscript + shocked face + mystery"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />


       <button
  onClick={handleAnalyze}
  disabled={loading}
  style={{
    width: "100%",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "#111827",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  }}
>
  {loading ? "Analyzing..." : "🔥 Analyze My Video"}
</button>
{result && (
  <div
    style={{
      marginTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    <div
      style={{
        background: "#111827",
        color: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>🚀 Viral Score: {result.viralScore}/100</h2>
      <p>👀 CTR Score: {result.ctrScore}/100</p>
      <p>⏱️ Retention Score: {result.retentionScore}/100</p>
      <p>🔥 Trend Score: {result.trendScore}/100</p>
      <p>⚔️ Competition Score: {result.competitionScore}/100</p>
      <h3>📈 Viral Probability: {result.viralProbability}</h3>
    </div>

    <div
      style={{
        background: "#f3f4f6",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h2>💪 Strengths</h2>

      <ul>
        {(result.strengths || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>⚠️ Problems</h2>

      <ul>
        {(result.problems || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>🏆 Better Titles</h2>

      <ul>
        {(result.improvedTitles || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>🎣 Better Hooks</h2>

      <ul>
        {(result.improvedHooks || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2>📝 SEO Description</h2>

      <p>{result.seoDescription}</p>

      <h2>🏷️ YouTube Tags</h2>

      <p>{(result.youtubeTags || []).join(", ")}</p>

      <h2>🖼️ Thumbnail Recommendation</h2>

      <p>{result.thumbnailRecommendation}</p>

      <h2>🎨 Thumbnail Prompt</h2>

      <p>{result.thumbnailPrompt}</p>

      <h2>🎬 First 15 Seconds Script</h2>

      <p>{result.first15SecondsScript}</p>

      <h2>📣 Call To Action</h2>

      <p>{result.callToAction}</p>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
  
