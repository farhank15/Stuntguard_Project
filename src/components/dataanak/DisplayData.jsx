import React from "react";

const DisplayData = ({ groupedData, handleViewData }) => {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-semibold text-center">Data Anak</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Nama Anak</th>
            <th className="px-4 py-2 pl-8 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((name, index) => (
            <React.Fragment key={name}>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 text-lg font-medium">{name}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleViewData(name)}
                    className="px-3 py-2 text-white bg-blue-500 rounded font-poppins hover:bg-blue-600"
                  >
                    Lihat
                  </button>
                </td>
              </tr>
              {index < Object.keys(groupedData).length - 1 && (
                <tr className="border-b border-gray-300"></tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
