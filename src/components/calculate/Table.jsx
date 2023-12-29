import React from "react";

const ChildTable = () => {
  const datamale = [
    { age: 1, height: "70 - 90", weight: "8 - 12" },
    { age: 2, height: "80 - 110", weight: "12 - 15" },
    { age: 3, height: "90 - 115", weight: "15 - 16" },
    { age: 4, height: "95 - 120", weight: "16 - 18" },
    { age: 5, height: "100 - 125", weight: "18 - 20" },
    { age: 6, height: "105 - 128", weight: "20 - 25" },
    { age: 7, height: "110 - 130", weight: "25 - 28" },
    { age: 8, height: "115 - 133", weight: "28 - 30" },
    { age: 9, height: "120 - 135", weight: "30 - 33" },
    { age: 10, height: "125 - 140", weight: "35 - 38" },
    { age: 11, height: "130 - 145", weight: "38 - 40" },
    { age: 12, height: "135 - 150", weight: "33 - 45" },
    { age: 13, height: "140 - 155", weight: "35 - 48" },
    { age: 14, height: "145 - 158", weight: "35 - 50" },
    { age: 15, height: "150 - 160", weight: "38 - 55" },
    { age: 16, height: "155 - 165", weight: "40 - 58" },
    { age: 17, height: "160 - 169", weight: "45 - 60" },
  ];

  const datafemale = [
    { age: 1, height: "70 - 90", weight: "8 - 12" },
    { age: 2, height: "80 - 110", weight: "12 - 15" },
    { age: 3, height: "90 - 115", weight: "15 - 16" },
    { age: 4, height: "95 - 120", weight: "16 - 18" },
    { age: 5, height: "100 - 125", weight: "18 - 20" },
    { age: 6, height: "105 - 128", weight: "20 - 25" },
    { age: 7, height: "110 - 130", weight: "25 - 28" },
    { age: 8, height: "115 - 133", weight: "28 - 30" },
    { age: 9, height: "120 - 135", weight: "30 - 33" },
    { age: 10, height: "125 - 140", weight: "35 - 38" },
    { age: 11, height: "130 - 145", weight: "38 - 40" },
    { age: 12, height: "135 - 150", weight: "40 - 43" },
    { age: 13, height: "140 - 153", weight: "43 - 45" },
    { age: 14, height: "145 - 158", weight: "45 - 47" },
    { age: 15, height: "150 - 160", weight: "47 - 49" },
    { age: 16, height: "155 - 163", weight: "59 - 51" },
    { age: 17, height: "160 - 168", weight: "51 - 53" },
  ];

  return (
    <div className="grid bg-secondary">
      <div className="container gap-5 m-auto my-8 font-poppins lg:grid lg:grid-cols-2">
        <div className="md:pb-10">
          <h2 className="mb-4 text-2xl font-bold">Laki-Laki</h2>
          <table className="min-w-full overflow-hidden bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-center">Age (years)</th>
                <th className="px-4 py-2 text-center">Height (cm)</th>
                <th className="px-4 py-2 text-center">Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {datamale.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2 text-center">{item.age}</td>
                  <td className="px-4 py-2 text-center">{item.height}</td>
                  <td className="px-4 py-2 text-center">{item.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Perempuan</h2>
          <table className="min-w-full overflow-hidden bg-white border border-gray-300 rounded-lg">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-center">Age (years)</th>
                <th className="px-4 py-2 text-center">Height (cm)</th>
                <th className="px-4 py-2 text-center">Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {datafemale.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="px-4 py-2 text-center">{item.age}</td>
                  <td className="px-4 py-2 text-center">{item.height}</td>
                  <td className="px-4 py-2 text-center">{item.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChildTable;
