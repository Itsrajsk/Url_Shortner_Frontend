import React from "react";

const Card = ({ title, desc }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl p-8 bg-gray-50 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.03]">
      <div className="relative">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

export default Card;
