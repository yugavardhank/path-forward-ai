export const DEFAULT_ROADMAP = [
  {
    id: 1, label: 'Wk 1–2', active: true,
    title: 'Foundations & Alignment',
    milestone: 'Master HTML/CSS core and publish your first live page.',
    tasks: [
      { id: 'a', text: 'Complete the HTML & CSS Crash Course', done: false },
      { id: 'b', text: 'Build a static personal portfolio page', done: false },
      { id: 'c', text: 'Set up GitHub — push your first repo', done: false },
    ],
    resource: { name: 'FreeCodeCamp: Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' },
  },
  {
    id: 2, label: 'Wk 3–4', active: false,
    title: 'JavaScript Fundamentals',
    milestone: 'Write scripts that react to user interactions in real-time.',
    tasks: [
      { id: 'a', text: 'Variables, loops, functions — JS.info Part 1', done: false },
      { id: 'b', text: 'Build a DOM-based To-Do list from scratch', done: false },
    ],
    resource: { name: 'JavaScript.info — Part 1', url: 'https://javascript.info/' },
  },
  {
    id: 3, label: 'Wk 5–6', active: false,
    title: 'Async JS & Public APIs',
    milestone: 'Fetch live data from APIs and handle async operations gracefully.',
    tasks: [
      { id: 'a', text: 'Master Promises and async/await patterns', done: false },
      { id: 'b', text: 'Build a Weather App with a free public API', done: false },
    ],
    resource: { name: 'MDN: Asynchronous JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' },
  },
  {
    id: 4, label: 'Wk 7–8', active: false,
    title: 'React Essentials',
    milestone: 'Rebuild your projects using components, state and hooks.',
    tasks: [
      { id: 'a', text: 'State, Props, useEffect — complete React Docs tutorial', done: false },
      { id: 'b', text: 'Refactor the Weather App into a React project', done: false },
    ],
    resource: { name: 'React Official Tutorial', url: 'https://react.dev/learn' },
  },
  {
    id: 5, label: 'Wk 9–10', active: false,
    title: 'Polish & Deploy',
    milestone: 'Ship production-ready, accessible work publicly.',
    tasks: [
      { id: 'a', text: 'Add accessibility (a11y) to all projects', done: false },
      { id: 'b', text: 'Deploy portfolio + apps to Vercel or Netlify', done: false },
    ],
    resource: { name: 'web.dev: Accessibility', url: 'https://web.dev/accessibility/' },
  },
  {
    id: 6, label: 'Wk 11–12', active: false,
    title: 'Job Hunt Sprint',
    milestone: 'Submit 10 quality applications with a polished portfolio.',
    tasks: [
      { id: 'a', text: 'Update resume with all portfolio projects', done: false },
      { id: 'b', text: 'Complete 5 LeetCode easy-tier challenges', done: false },
      { id: 'c', text: 'Apply to 10 entry-level roles', done: false },
    ],
    resource: { name: 'NeetCode Roadmap', url: 'https://neetcode.io/' },
  },
];
