import React from 'react';

const StepSection = ({ title, items }) => (
  <div className="flex flex-col gap-2 my-5">
    <h3 className="font-semibold text-xl text-gray-700">{title}</h3>
    <ul className="list-disc list-inside font-medium text-gray-600 flex flex-col gap-2">
      {items.map((item, idx) => (
        <li key={idx}>
          <span className="text-lg text-gray-700">{item.label}</span>
          <ul className="list-disc list-inside ml-4">
            {item.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

export default StepSection;