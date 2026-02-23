import React, { useState } from "react";
import "./App.css";
import uiGen from "./assets/ui-generator.png";
import candidateImg from "./assets/candidate-system.png";
import pantechImg from "./assets/pantech-internship.png";
import cloudImg from "./assets/cloud-security.png";
import { useRef, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";


function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("normal");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const sendMessage = async () => {
  if (!message.trim()) return;

  const userMsg = { sender: "user", text: message };
  setMessages((prev) => [...prev, userMsg]);
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message,
        mode: mode
      })
    });

    const data = await res.json();

    const aiMsg = {
      sender: "ai",
      text: data.reply || "Error fetching response",
    };

    setMessages((prev) => [...prev, aiMsg]);

  } catch (error) {
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: "Backend not reachable." }
    ]);
  }

  setLoading(false);
};

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Harshitha</h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#tech">Tech Stack</a>
          <a href="#projects">Projects</a>
          <a href="#internships">Internships</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
<section className="hero-section">
  <div className="hero-container">
    
    <h1 className="hero-title">Kummari Sai Harshitha</h1>

    <p className="hero-subtitle">
      Full Stack Developer | Backend Engineer | AI Systems
    </p>

    <p className="hero-description">
      Building scalable web applications and AI-driven systems using structured
      backend architecture and modern frontend frameworks.
    </p>

    <div className="hero-buttons">
      <a href="#projects" className="btn-primary">
        View Projects
      </a>

      <a href="#contact" className="btn-outline">
        Get in Touch
      </a>
    </div>

    {/* SOCIAL ICONS */}
    <div className="hero-icons">
      <a
        href="https://github.com/Harsha238"
        target="_blank"
              rel="noopener noreferrer"
              aria-label="Github"
      >
        <span>🐙</span>

      </a>

      <a
        href="https://linkedin.com/in/sai-harshitha-kummari-9662a5262"
        target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              
      >
        <i className="linkedin">in</i>
      </a>

            <a href="mailto:harshithasai556@gmail.com"
              aria-label="Email"
            >
        <i className="mail">✉</i>
      </a>
    </div>

  </div>
</section>

      {/* ABOUT */}
<section id="about" className="about-section">
  <div className="container about-layout">

    {/* LEFT SIDE */}
    <div className="about-left">
      <h2>Building the Future of Full Stack Systems</h2>

      <p>
        I'm a <span className="highlight">Full Stack Developer</span> 
        specializing in scalable backend architecture and modern frontend systems.
      </p>

      <p>
        With hands-on experience in <span className="highlight">React, FastAPI and AI integration</span>, 
        I design structured, deterministic systems that are secure and production-ready.
      </p>

      <p>
        I'm actively seeking an <span className="highlight">entry-level Full Stack / Backend role</span> 
        where I can contribute to innovative projects and grow as a software engineer.
      </p>
    </div>

    {/* RIGHT SIDE CARDS */}
    <div className="about-right">
      <div className="about-card">
        <h3>Backend Systems</h3>
        <p>FastAPI, Flask, REST API Design</p>
      </div>

      <div className="about-card">
        <h3>AI Integration</h3>
        <p>LLM Integration & Prompt Engineering</p>
      </div>

      <div className="about-card">
        <h3>Frontend</h3>
        <p>React, TypeScript, Modern UI</p>
      </div>

      <div className="about-card">
        <h3>Database</h3>
        <p>SQLite, Structured Data Systems</p>
      </div>
    </div>

  </div>
</section>

      
      {/* TECH STACK */}
<section id="tech" className="tech-section">
  <div className="container">
    <h2 className="tech-title">Technical Expertise</h2>
    <p className="tech-subtitle">
      A comprehensive toolkit for full stack development and AI-powered systems.
    </p>

    <div className="tech-grid">

      <div className="tech-card">
        <h3>Frontend</h3>
        <div className="tech-tags">
          <span>React</span>
          <span>TypeScript</span>
                <span>Responsive UI</span>
                <span>HTML</span>
                <span>CSS</span>
        </div>
      </div>

      <div className="tech-card">
        <h3>Backend</h3>
        <div className="tech-tags">
          <span>Python</span>
          <span>FastAPI</span>
          <span>Flask</span>
          <span>REST APIs</span>
        </div>
      </div>

      <div className="tech-card">
        <h3>Database</h3>
        <div className="tech-tags">
          <span>SQLite</span>
          <span>SQL</span>
        </div>
      </div>

      <div className="tech-card">
        <h3>AI & Integration</h3>
        <div className="tech-tags">
          <span>LLM Integration</span>
          <span>Prompt Engineering</span>
          <span>Structured AI Systems</span>
        </div>
      </div>

      <div className="tech-card">
        <h3>Tools</h3>
        <div className="tech-tags">
          <span>Git</span>
          <span>Postman</span>
          <span>VS Code</span>
                
                <span>Github</span>
        </div>
      </div>

      <div className="tech-card">
        <h3>Cloud & Security</h3>
        <div className="tech-tags">
          <span>eBPF</span>
          <span>Falco</span>
                <span>Linux Monitoring</span>
                <span>Docker</span>
                <span>Kubernetes</span>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* PROJECTS */}
      {/* PROJECT 1 */}
<section id="projects" className="section full-section project-page">
  <div className="container project-layout">
    <div className="project-image">
      <img src={uiGen} alt="AI UI Generator" />
    </div>

    <div className="project-info">
      <h2>AI Deterministic UI Generator</h2>
      <p>
        Converts natural language prompts into structured React UI
        using a deterministic component system.
      </p>

      <ul>
        <li>Structured UI generation</li>
        <li>Safe predictable architecture</li>
        <li>Live preview updates</li>
      </ul>

      <div className="skills-grid">
        <span>React</span>
        <span>Nextjs</span>
        <span>AI</span>
        <span>Fullstack</span>
        <span>Ui-generator</span>
        <span>Ai-agent</span>
      </div>

      <a 
  href="https://github.com/Harsha238/ai-deterministic-ui-generator"
  target="_blank"
  rel="noopener noreferrer"
  className="source-btn"
>
            <span className="icon">🐙</span>
  Source Code
</a>
    </div>
  </div>
</section>


{/* PROJECT 2 */}
<section className="section full-section project-page">
  <div className="container project-layout reverse">
    <div className="project-image">
      <img src={candidateImg} alt="Candidate Management System" />
    </div>

    <div className="project-info">
      <h2>Candidate Management System</h2>
      <p>
        Full stack web application for managing candidate records
        with REST APIs and SQLite database.
      </p>

      <ul>
        <li>CRUD Operations</li>
        <li>Flask Backend APIs</li>
        <li>React Responsive UI</li>
        <li>Persistent SQLite Storage</li>
      </ul>

      <div className="skills-grid">
              <span>Javascript</span>
              <span>Html5</span>
              <span>CSS3</span>
              <span>Reactjs</span>
              <span>Python</span>
              <span>Flask</span>
              <span>Sqlite</span>
              
      </div>

      <a 
  href="https://github.com/Harsha238/candidate-management-frontend"
  target="_blank"
  rel="noopener noreferrer"
  className="source-btn"
>
              <span className="icon">🐙</span>
  Source Code
</a>
    </div>
  </div>
</section>

          

      {/* INTERNSHIPS */}
      {/* INTERNSHIP 1 */}
<section id="internships" className="section full-section internship-page">
  <div className="container project-layout">
    <div className="project-image">
      <img src={pantechImg} alt="Pantech Internship" />
    </div>

    <div className="project-info">
      <h2>Pantech – Full Stack Developer Intern</h2>
      <p>
        Developed REST APIs and implemented structured frontend-backend systems.
      </p>

      <ul>
        <li>API Development</li>
        <li>Workflow Design</li>
        <li>Database Integration</li>
      </ul>

      <div className="skills-grid">
        <span>React</span>
        <span>Flask</span>
        <span>SQLite</span>
              <span>Mangodb</span>
              <span>Nextjs</span>
              <span>Nodejs</span>
              <span>Express</span>
            </div>
            
    </div>
  </div>
</section>


{/* INTERNSHIP 2 */}
<section className="section full-section internship-page">
  <div className="container project-layout reverse">
    <div className="project-image">
      <img src={cloudImg} alt="Cloud Security Internship" />
    </div>

    <div className="project-info">
      <h2>Megaminds Intern-Cloud Security using eBPF & Falco</h2>
      <p>
        Implemented runtime security monitoring using Linux system tracing.
      </p>

      <ul>
        <li>eBPF System Call Tracing</li>
        <li>Falco Rule Detection</li>
        <li>Cloud-native Security Monitoring</li>
      </ul>

            <div className="skills-grid">
              <span>Minikube</span>
              <span>Kubernetes</span>
              <span>Docker</span>
        <span>Linux</span>
        <span>eBPF</span>
        <span>Falco</span>
      </div>
    </div>
  </div>
</section>

      {/* CONTACT */}
      <section id="contact" className="section full-section contact-section">
  <div className="container center">
    <h2>Let's Connect</h2>
    <p>
      I am currently looking for entry-level Full Stack / Backend opportunities.
    </p>

    <div className="contact-box">
      <p>Email: harshithasai556@gmail.com</p>
      <p>Phone: +91 94938 41647</p>
      <a
  href="/Harshitha_Resume.pdf"
  download="Kummari_Sai_Harshitha_Resume.pdf"
  className="btn-primary"
>
  Download Resume
</a>
    </div>
  </div>
</section>

      <footer className="footer">
        <p>&lt; Designed & Built by Harshitha /&gt;</p>
        <p>© 2026 All rights reserved.</p>
      </footer>

      {/* AI CHAT BUTTON */}
      <button className="chat-toggle" onClick={() => setOpen(!open)}>
        AI
      </button>

      
      {open && (
        <div className="chat-box">

          {/* Header */}
          <div className="chat-header">
  <div className="chat-title">
    AI Assistant
    <span className={`mode-badge ${mode}`}>
      {mode === "recruiter" ? "Recruiter Mode" : "Normal Mode"}
    </span>
  </div>

  <span className="close-btn" onClick={() => setOpen(false)}>✕</span>
</div>

<div className="mode-switch">
  <button
    className={mode === "normal" ? "active" : ""}
    onClick={() => setMode("normal")}
  >
    Normal
  </button>
  <button
    className={mode === "recruiter" ? "active recruiter-btn" : ""}
    onClick={() => setMode("recruiter")}
  >
    Recruiter
  </button>
</div>

          {/* Messages */}
          <div className="chat-messages">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`chat-message ${msg.sender} ${
        mode === "recruiter" ? "recruiter-msg" : ""
      }`}
    >
      {msg.text}
    </div>
  ))}

  {loading && (
    <div className="chat-message ai typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )}

  <div ref={messagesEndRef} />   {/* 👈 IMPORTANT */}
</div>

          {/* Input Section */}
          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about my resume..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>

        </div>
      )}
        </div>
  
  )
}

export default App;