import React from 'react';

interface AgentCardProps {
  name: string;
  description: string;
  input?: string;
  output?: string;
  active: boolean;
  done: boolean;
}

const AgentCard: React.FC<AgentCardProps> = ({ name, description, input, output, active, done }) => {
  return (
    <div
      className={`transition-shadow duration-300 relative bg-white rounded-xl shadow-md px-6 py-4 w-72 min-h-[170px] flex flex-col border-2 ${
        active
          ? 'border-blue-500 shadow-blue-100'
          : done
          ? 'border-green-400 shadow-green-100'
          : 'border-gray-200'
      }`}
    >
      <div className="font-semibold text-lg mb-1 flex items-center gap-2">
        {name}
        {active && <span className="animate-pulse text-blue-500">●</span>}
        {done && !active && <span className="text-green-400">✔</span>}
      </div>
      <div className="text-gray-500 text-sm mb-2">{description}</div>
      <div className="flex-1">
        {input !== undefined && (
          <div className="mb-1">
            <span className="font-medium">Input:</span> <span className="text-gray-700">{input}</span>
          </div>
        )}
        {output !== undefined && (
          <div>
            <span className="font-medium">Output:</span> <span className="text-gray-700">{output}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCard;
