import React from "react";

const Square = ({ val, onClick }) => {
  return (
    <div>
      <button className='square' onClick={onClick}>
        {val ? val : ""}
      </button>
    </div>
  );
};

export default Square;
