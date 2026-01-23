import React from 'react';

interface AgentFlowArrowProps {
  active: boolean;
}

const AgentFlowArrow: React.FC<AgentFlowArrowProps> = ({ active }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <svg
      className={`w-8 h-8 transition-colors duration-300 ${active ? 'text-blue-400' : 'text-gray-300'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
    </svg>
  </div>
);

export default AgentFlowArrow;
