// components/TagGroup.tsx
import React from "react";

interface TagGroupProps {
  title: string;
  items: string[];
  colorClass?: string; // ex: bg-green-600
}

const TagGroup: React.FC<TagGroupProps> = ({ title, items, colorClass = "bg-gray-500" }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      <p className="font-semibold mb-1">{title} :</p>
      <div className="flex flex-wrap gap-1">
        {items.map((item, index) => (
          <div
            key={index}
            className={`border rounded-md py-0.5 px-2 text-sm text-white ${colorClass}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagGroup;
