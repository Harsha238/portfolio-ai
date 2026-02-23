from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from datetime import datetime
import sqlite3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
OPENROUTER_API_KEY =os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class ChatRequest(BaseModel):
    message: str
    mode: str = "normal"   # default mode

# ---------- DATABASE SETUP ----------

def init_db():
    conn = sqlite3.connect("portfolio.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_message TEXT,
            ai_response TEXT,
            timestamp TEXT
        )
    """)
    conn.commit()
    conn.close()

init_db()

# ---------- RESUME CONTEXT ----------

RESUME_CONTEXT = """
Name: Kummari Sai Harshitha
Role: Full Stack Developer | Backend Engineer | AI Systems
Location: Telangana, India
Number: 9493841647

About:
I am an AI-focused Full Stack Developer passionate about building scalable backend systems and modern frontend applications.
I specialize in deterministic AI systems, structured UI generation, REST APIs, and database-driven applications.
I am currently seeking entry-level Full Stack or Backend Developer roles.

Skills:
Frontend: React, TypeScript, HTML, CSS, Responsive UI
Backend: Python, FastAPI, Flask, REST APIs
Database: SQLite, SQL
AI: Deterministic Prompt Engineering, LLM Integration, Structured AI Systems
Cloud & Security: Linux, eBPF, Falco, Docker, Kubernetes
Tools: Git, GitHub, Postman, VS Code

Projects:
1. AI Deterministic UI Generator
2. Candidate Management System
  

Internship Experience:
1. Full Stack Developer Intern – Pantech Solutions
2. Cloud Security Intern – Megaminds

------------------------------------------------------------
About project in detail:

1) AI Deterministic UI Generator

Problem:
Traditional AI UI generators produce inconsistent and hallucinated layouts.

Solution:
Built a deterministic AI system that converts user requirements into structured, validated UI components.

Tech Stack:
- Python
- FastAPI
- OpenAI API (LLM integration)
- JSON Schema validation

Architecture:
- User Input → Structured Prompt Engine
- LLM Output → Schema Validation Layer
- Validated JSON → UI Renderer

My Role:
- Designed prompt constraints
- Implemented schema validation
- Built backend APIs
- Handled error correction logic

Outcome:
Reduced hallucination and ensured consistent UI structure generation.

------------------------------------------------------------

2) Candidate Management System

Problem:
Manual candidate tracking is inefficient and error-prone.

Solution:
Developed a full-stack web application to manage candidate records and hiring stages.

Tech Stack:
- React (Frontend)
- FastAPI (Backend)
- SQLite (Database)
- REST APIs

Architecture:
Frontend (React UI)
→ FastAPI backend
→ SQLite database

Features:
- Add, update, delete candidates
- Track hiring status
- Search and filter candidates

My Role:
- Designed database schema
- Built CRUD APIs
- Connected frontend with backend
- Implemented form validation

Outcome:
Improved hiring workflow efficiency with structured data tracking.

------------------------------------------------------------
About internship in detail:

1) Full Stack Developer Intern – Pantech Solutions

Responsibilities:
- Built frontend components using React
- Developed REST APIs using Python
- Implemented CRUD operations
- Integrated frontend with backend APIs
- Performed testing using Postman

Technologies Used:
React, Python, Flask/FastAPI, SQLite, Git

Impact:
Improved understanding of production-level API integration and full-stack workflow.

------------------------------------------------------------

2) Cloud Security Intern – Megaminds

Responsibilities:
- Worked on Linux system security
- Learned eBPF monitoring concepts
- Implemented runtime security detection using Falco
- Analyzed container behavior
- Basic exposure to Docker & Kubernetes security concepts

Technologies Used:
Linux, eBPF, Falco, Docker

Impact:
Gained understanding of system-level monitoring and container security.

------------------------------------------------------------

Contact:
GitHub: https://github.com/Harsha238
LinkedIn: https://linkedin.com/in/sai-harshitha-kummari-9662a5262
Email: harshithasai556@gmail.com
Phone: +91 9493841647

Instructions:
- If user asks about skills, respond from Skills section.
- If user asks about projects, explain clearly with details.
- If user asks how to connect, provide GitHub, LinkedIn, and Email.
- If user asks about internship, respond from Internship section.
- If user asks about specific project, give structured technical explanation.
- If user asks about specific internship, explain responsibilities, tech used, and learning.
- About hiring decision → emphasize backend system design, structured thinking, and AI architecture skills.
- Keep responses professional and concise.
"""

@app.get("/")
def home():
    return {"message": "Portfolio AI Backend Running (OpenRouter)"}

@app.post("/chat")
async def chat(request: ChatRequest):

    if not OPENROUTER_API_KEY:
        return {"error": "Missing OpenRouter API Key"}

    if request.mode == "recruiter":
        system_prompt = f"""
You are a senior technical recruiter evaluating Sai Harshitha Kummari.

Answer professionally and strategically.
Highlight strengths, impact, readiness for entry-level roles,
technical depth, and problem-solving ability.

Use the resume context below:

{RESUME_CONTEXT}
"""
    else:
        system_prompt = f"""
You are Harshitha's professional AI portfolio assistant.

Answer only using the resume context below.
Be clear, concise, and confident.
If information is not available, say:
"I don't have that information in the resume."

Resume:
{RESUME_CONTEXT}
"""

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role":"user","content":request.message}
                ],
                
            }
        )

        result = response.json()

        # Safe response handling
        if "choices" not in result:
            return {"error": "AI service error", "details": result}

        answer = result["choices"][0]["message"]["content"]

    except Exception as e:
        return {"error": str(e)}

    # Save to database
    conn = sqlite3.connect("portfolio.db")
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO chats (user_message, ai_response, timestamp) VALUES (?, ?, ?)",
        (request.message, answer, datetime.now().isoformat())
    )
    conn.commit()
    conn.close()

    return {"reply": answer}