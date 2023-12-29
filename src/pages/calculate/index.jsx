import React from "react";
import Calculate from "../../components/calculate/Calculate";
import Banner from "../../components/calculate/Banner";
import Table from "../../components/calculate/Table";
import Clustering from "../../components/calculate/Clustering";

const index = () => {
  return (
    <div>
      <div className="p-4 bg-slate-600 text-secondary font-poppins">
        <h1 className="pb-2 text-3xl ">Stunting pada Anak</h1>
        <p className="content">
          Stunting merupakan kondisi ketika anak mengalami pertumbuhan tubuh
          yang tidak sesuai dengan standar pertumbuhan normal pada usia
          tertentu. Pertumbuhan yang terhambat ini dapat berdampak serius pada
          kesehatan dan perkembangan anak. Menurut data, pertumbuhan anak
          umumnya relatif hingga mencapai usia 17 tahun. <br /> kalkulator
          perhitungan berikut meruakan langkah pertama unutk mengetahui apakah
          anak mengalami stunting atau anak tumbuh dengan sehat dan normal,
          segera konsultasikan kepada dokter jika anak berat badan dan tinggi
          badan anak tidak ideal di usianya.
        </p>
      </div>
      <Banner />
      <Calculate />
      <Clustering />
      <div className="p-4 bg-slate-600 text-secondary font-poppins">
        <h1 className="pb-2 text-3xl text-center ">
          Tabel Tinggi badan dan Berat badan
        </h1>
      </div>

      <Table />
    </div>
  );
};

export default index;
