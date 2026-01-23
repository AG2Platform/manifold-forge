import React from 'react';

export interface AgentLogEntry {
  agent: string;
  message: string;
  step: number;
}

interface AgentLogProps {
  log: AgentLogEntry[];
}

const AgentLog: React.FC<AgentLogProps> = ({ log }) => (
  <div className="bg-white rounded-xl shadow px-4 py-3 mt-6 text-sm max-h-56 overflow-y-auto border border-gray-200">
    <div className="font-semibold mb-2 text-gray-700">Live Agent Log</div>
    <ul className="space-y-1">
      {log.map((entry, idx) => (
        <li key={idx}>
          <span className="font-medium text-blue-500">[{entry.agent}]</span> {entry.message}
        </li>
      ))}
    </ul>
  </div>
);

export default AgentLog;
