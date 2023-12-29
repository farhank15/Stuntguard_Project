// ChildCard.jsx
import React from "react";

const ChildCard = ({ child }) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-md shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{child.name}</h2>
      <p>
        <strong>Gender:</strong> {child.gender}
      </p>
      <p>
        <strong>Age:</strong> {child.age}
      </p>
      <p>
        <strong>Height:</strong> {child.height} cm
      </p>
      <p>
        <strong>Weight:</strong> {child.weight} kg
      </p>
    </div>
  );
};

export default ChildCard;
