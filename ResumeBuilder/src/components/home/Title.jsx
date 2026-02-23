import React from "react";

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-8 max-w-3xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

export default Title;