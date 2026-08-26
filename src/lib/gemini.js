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
 * Generate a 90-day roadmap from user intake data
 */
export async function generateRoadmap(userData) {
  const m = getModel();
  if (!m) return null;

  const prompt = `You are an expert career coach. Generate a 90-day learning roadmap for someone with the following profile:
- Status: ${userData.status}
- Goal: ${userData.goal}
- Field of Interest: ${userData.interest || 'not specified'}
- Hours available per week: ${userData.hours}
- Budget: ${userData.budget}

Return ONLY a JSON array of exactly 6 blocks (2 weeks each), following this exact format:
[
  {
    "id": 1,
    "label": "Wk 1–2",
    "title": "Block title here",
    "milestone": "One sentence describing the key outcome",
    "tasks": [
      {"id": "a", "text": "Specific actionable task", "done": false},
      {"id": "b", "text": "Another task", "done": false},
      {"id": "c", "text": "Optional 3rd task", "done": false}
    ],
    "resource": {"name": "Free resource name", "url": "https://actual-url.com"},
    "active": false
  }
]
Set "active": true only on block 1. Return ONLY the JSON array, no markdown, no explanation.`;

  try {
    const result = await m.generateContent(prompt);
    const text = result.response.text().trim();
    // Strip markdown code fences if present
    const clean = text.replace(/^```json?\n?/, '').replace(/\n?```$/, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error('Gemini roadmap error:', e);
    return null;
  }
}

/**
 * Send a chat message to the AI mentor with full roadmap context
 */
export async function sendMentorMessage(userMessage, roadmapBlocks, chatHistory) {
  const m = getModel();
  if (!m) return null;

  const roadmapSummary = roadmapBlocks.map(b => {
    const doneTasks = b.tasks.filter(t => t.done).length;
    return `Block ${b.id} (${b.label} — ${b.title}): ${doneTasks}/${b.tasks.length} tasks done. Milestone: ${b.milestone}`;
  }).join('\n');

  const systemContext = `You are PathForward, an expert AI career mentor. You are helping a user follow their personalized 90-day learning roadmap. Always give concise, practical, encouraging advice that is SPECIFICALLY tied to their roadmap. Never give generic advice.

Current Roadmap:
${roadmapSummary}

Keep responses under 100 words. Be warm, direct, and specific.`;

  try {
    const chat = m.startChat({
      history: [
        { role: 'user', parts: [{ text: systemContext }] },
        { role: 'model', parts: [{ text: "I'm your PathForward mentor, fully aware of your 90-day roadmap. How can I help?" }] },
        ...chatHistory.slice(-6).filter(h => h.role !== 'system').map(h => ({
          role: h.role === 'mentor' ? 'model' : 'user',
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
