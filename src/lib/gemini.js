import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;

function getModel() {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') return null;
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }
  return model;
}

export const isAIEnabled = () => {
  return !!(API_KEY && API_KEY !== 'your_gemini_api_key_here');
};

/**
 * Generate a specialized 90-day roadmap from user intake data
 */
export async function generateRoadmap(userData) {
  const m = getModel();
  if (!m) return null;

  const prompt = `You are PathForward's lead career architect. Generate a rigorous, highly actionable 90-day learning roadmap (6 two-week sprints) for someone with this profile:
- Status: ${userData.status || 'Self-directed learner'}
- Goal: ${userData.goal || 'Land job'}
- Field of Interest: ${userData.interest || 'webdev'}
- Hours available per week: ${userData.hours || '20'}
- Budget: ${userData.budget || 'free'}

Return ONLY a JSON array of exactly 6 blocks (2 weeks each), following this exact schema:
[
  {
    "id": 1,
    "label": "Wk 1–2",
    "title": "Clear sprint title",
    "milestone": "Concrete verifiable milestone outcome (e.g. publish live URL, deploy backend, ship Figma system)",
    "tasks": [
      {"id": "s1_a", "text": "Specific actionable task", "done": false},
      {"id": "s1_b", "text": "Another actionable task", "done": false},
      {"id": "s1_c", "text": "Another actionable task", "done": false}
    ],
    "resource": {"name": "Reputable free resource name", "url": "https://valid-url.com"},
    "active": false
  }
]
Set "active": true ONLY on block 1. Return ONLY valid JSON array with NO markdown fences and NO commentary.`;

  try {
    const result = await m.generateContent(prompt);
    const text = result.response.text().trim();
    const clean = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed) && parsed.length === 6) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.error('Gemini roadmap generation error:', e);
    return null;
  }
}

/**
 * Send a chat message to the specialized AI mentor persona with full roadmap context
 */
export async function sendMentorMessage(userMessage, roadmapBlocks = [], chatHistory = [], persona = 'alex', userContext = null) {
  const m = getModel();
  if (!m) return null;

  const activeBlock = roadmapBlocks.find(b => b.active) || roadmapBlocks[0];
  const roadmapSummary = roadmapBlocks.map(b => {
    const doneTasks = b.tasks.filter(t => t.done).length;
    return `Block ${b.id} (${b.label} — ${b.title}): ${doneTasks}/${b.tasks.length} tasks done. Milestone: ${b.milestone}`;
  }).join('\n');

  const personaInstruction = persona === 'elena'
    ? `You are Elena Rostova, Executive Career Strategist at PathForward. You specialize in non-traditional career navigation (dropouts, fresh graduates without offers, gap year career switchers). You help learners overcome the "no degree" credential barrier by translating completed sprint milestones into proof-of-work, crafting cold outreach messages to startup founders, and maintaining high confidence.`
    : `You are Alex Chen, Principal Technical Architect at PathForward. You specialize in software engineering architecture, clean code, Git practices, debugging, and building production-grade projects. You provide practical, technical, and concrete engineering guidance tied to the user's active sprint.`;

  const systemContext = `${personaInstruction}

User Profile:
- Status: ${userContext?.status || 'Self-directed learner'}
- Primary Objective: ${userContext?.goal || 'Get a job'}
- Field of Interest: ${userContext?.interest || 'Web Development'}
- Active Sprint: ${activeBlock ? `${activeBlock.label}: ${activeBlock.title}` : 'Sprint 1'}
- Current Milestone: ${activeBlock?.milestone || 'In progress'}

Full 90-Day Roadmap Trajectory:
${roadmapSummary}

Guidelines:
- Give concise, punchy, tactical guidance (under 120 words).
- Speak directly in your distinct persona voice.
- Always tie advice back to the user's active sprint milestone and actionable next steps.
- If the user feels stuck, provide a concrete 3-step action plan.`;

  try {
    const chat = m.startChat({
      history: [
        { role: 'user', parts: [{ text: systemContext }] },
        { role: 'model', parts: [{ text: `I am ${persona === 'elena' ? 'Elena' : 'Alex'}, fully synced with your 90-day roadmap and active sprint milestone. Let's make progress.` }] },
        ...chatHistory.slice(-6).filter(h => h.role !== 'system').map(h => ({
          role: h.role === 'ai' ? 'model' : 'user',
          parts: [{ text: h.text }]
        }))
      ]
    });
    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (e) {
    console.error('Gemini chat error:', e);
    return null;
  }
}
