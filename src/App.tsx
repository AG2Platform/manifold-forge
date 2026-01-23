import React, { useState } from 'react';
import AgentCard from './components/AgentCard';
import AgentFlowArrow from './components/AgentFlowArrow';
import AgentLog, { AgentLogEntry } from './components/AgentLog';

const AGENT_DELAY = 800; // ms

type AgentStep = 0 | 1 | 2 | 3; // 0: idle, 1: intake, 2: analysis, 3: response

interface AgentState {
  input?: string;
  output?: string;
  done: boolean;
}

const initialAgentStates: [AgentState, AgentState, AgentState] = [
  { input: '', output: '', done: false },
  { input: '', output: '', done: false },
  { input: '', output: '', done: false },
];

function classifyQuestion(q: string): 'Billing' | 'Technical' | 'General' {
  const lower = q.toLowerCase();
  if (lower.includes('bill')) return 'Billing';
  if (lower.includes('tech') || lower.includes('error')) return 'Technical';
  return 'General';
}

function generateResponse(classification: string): string {
  switch (classification) {
    case 'Billing':
      return 'Please contact our billing department.';
    case 'Technical':
      return 'Let me help you with that technical issue.';
    default:
      return 'Thank you for reaching out!';
  }
}

const agentDescriptions = [
  'Receives the customer question and displays it.',
  'Classifies the question type (Billing, Technical, General).',
  'Generates a reply based on classification.'
];

const agentNames = ['Intake Agent', 'Analysis Agent', 'Response Agent'];

const App: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [agentStates, setAgentStates] = useState(initialAgentStates);
  const [step, setStep] = useState<AgentStep>(0);
  const [log, setLog] = useState<AgentLogEntry[]>([]);
  const [processing, setProcessing] = useState(false);

  const reset = () => {
    setAgentStates(initialAgentStates);
    setStep(0);
    setLog([]);
    setProcessing(false);
  };

  const runAgents = async (q: string) => {
    setProcessing(true);
    setStep(1);
    setLog([{ agent: agentNames[0], message: `Received question: "${q}"`, step: 1 }]);
    setAgentStates([
      { input: q, output: q, done: true },
      { input: '', output: '', done: false },
      { input: '', output: '', done: false },
    ]);
    await new Promise((res) => setTimeout(res, AGENT_DELAY));

    // Analysis Agent
    setStep(2);
    const classification = classifyQuestion(q);
    setLog((prev) => [
      ...prev,
      { agent: agentNames[1], message: `Classified as: ${classification}`, step: 2 },
    ]);
    setAgentStates([
      { input: q, output: q, done: true },
      { input: q, output: classification, done: true },
      { input: '', output: '', done: false },
    ]);
    await new Promise((res) => setTimeout(res, AGENT_DELAY));

    // Response Agent
    setStep(3);
    const response = generateResponse(classification);
    setLog((prev) => [
      ...prev,
      { agent: agentNames[2], message: `Generated reply: "${response}"`, step: 3 },
    ]);
    setAgentStates([
      { input: q, output: q, done: true },
      { input: q, output: classification, done: true },
      { input: classification, output: response, done: true },
    ]);
    setProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || processing) return;
    reset();
    setTimeout(() => runAgents(question.trim()), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Multiagent Orchestration Demo</h1>
        <p className="text-gray-600 mb-4">Simulate how multiple agents collaborate to answer a customer support question.</p>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm"
            placeholder="Enter a customer question..."
            value={question}
            disabled={processing}
            onChange={(e) => setQuestion(e.target.value)}
            maxLength={200}
            required
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition disabled:opacity-60"
            disabled={processing || !question.trim()}
          >
            {processing ? 'Processing...' : 'Run Demo'}
          </button>
        </form>
      </div>
      <div className="flex flex-row items-start gap-4 mb-2">
        <AgentCard
          name={agentNames[0]}
          description={agentDescriptions[0]}
          input={agentStates[0].input}
          output={agentStates[0].output}
          active={step === 1}
          done={agentStates[0].done}
        />
        <AgentFlowArrow active={step === 2} />
        <AgentCard
          name={agentNames[1]}
          description={agentDescriptions[1]}
          input={agentStates[1].input}
          output={agentStates[1].output}
          active={step === 2}
          done={agentStates[1].done}
        />
        <AgentFlowArrow active={step === 3} />
        <AgentCard
          name={agentNames[2]}
          description={agentDescriptions[2]}
          input={agentStates[2].input}
          output={agentStates[2].output}
          active={step === 3}
          done={agentStates[2].done}
        />
      </div>
      <div className="w-full max-w-2xl">
        <AgentLog log={log} />
      </div>
      <footer className="mt-10 text-gray-400 text-xs">Demo by Forge &middot; All logic is simulated for demonstration purposes.</footer>
    </div>
  );
};

export default App;
