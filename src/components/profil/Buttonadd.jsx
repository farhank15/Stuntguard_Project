import React from "react";
import { Link } from "react-router-dom";

const AddDataCard = ({ onAdd }) => {
  return (
    <div className="p-5 mx-auto mb-10 overflow-hidden text-center bg-white rounded-lg shadow-lg">
      <p className="pb-5">Data tidak tersedia atau telah dihapus.</p>
      <Link
        to="/profilform"
        onClick={onAdd}
        className="px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-full hover:bg-blue-300"
      >
        ➕
      </Link>
    </div>
  );
};

export default AddDataCard;
