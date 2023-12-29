import React from "react";

const Clustering = () => {
  return (
    <div className="py-5">
      <div className="text-center">
        <h1 className="mb-8 text-4xl font-poppins">
          Penggolongan Kondisi Anak
        </h1>
      </div>
      <div className="flex px-10 overflow-x-scroll">
        <Golongan1 />
        <Golongan2 />
        <Golongan3 />
        <Golongan4 />
      </div>
    </div>
  );
};

export default Clustering;

const Golongan1 = () => {
  return (
    <div className="flex p-10">
      <div className="flex">
        <div>
          <div className="flex items-center justify-center w-32 h-12 border-2 border-gray-600 rounded-full cursor-pointer">
            <h2 className="font-poppins">Golongan 1</h2>
          </div>
          <div className="pt-3">
            <p className="p-3 font-medium text-justify border-2 w-[450px] text-slate-500 h-[350px]">
              Golongan pertama menandakan kondisi pertumbuhan anak yang dapat
              dianggap sebagai kategori normal, baik dari segi tinggi maupun
              berat badan. Anak yang termasuk dalam golongan ini mengalami
              pertumbuhan yang sesuai dengan standar perkembangan umum pada
              usianya. Tinggi dan berat badan anak pada golongan pertama
              mencerminkan kesehatan yang optimal, menunjukkan bahwa proses
              tumbuh kembangnya berlangsung secara seimbang. Sebagai hasilnya,
              anak pada golongan pertama memiliki potensi untuk menjalani
              kehidupan sehat dan aktif dengan dukungan yang tepat dari
              lingkungan dan perawatan yang baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Golongan2 = () => {
  return (
    <div className="flex p-10">
      <div className="flex">
        <div>
          <div className="flex items-center justify-center w-32 h-12 border-2 border-gray-600 rounded-full cursor-pointer">
            <h2 className="font-poppins">Golongan 2</h2>
          </div>
          <div className="pt-3">
            <p className="p-3 font-medium text-justify border-2 w-[450px] text-slate-500 h-[350px]">
              Golongan kedua pertama, mencakup anak-anak yang menunjukkan
              pertumbuhan tinggi di atas rata-rata usia sebaya, namun dengan
              berat badan yang sedikit berlebihan. Meskipun tinggi badan yang
              melampaui standar dapat menunjukkan potensi fisik yang baik, berat
              badan yang berlebihan memerlukan perhatian khusus terkait pola
              makan dan gaya hidup sehat. Kedua, tinggi badan anak ideal tetapi
              berat badan kurang, Penting bagi orang tua dan perawat untuk
              memastikan bahwa anak pada golongan kedua tetap menjalani
              kehidupan yang seimbang, dengan perhatian khusus pada nutrisi dan
              aktivitas fisik, guna mendukung kesehatan dan perkembangan mereka
              secara optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Golongan3 = () => {
  return (
    <div className="flex p-10">
      <div className="flex">
        <div>
          <div className="flex items-center justify-center w-32 h-12 border-2 border-gray-600 rounded-full cursor-pointer">
            <h2 className="font-poppins">Golongan 3</h2>
          </div>
          <div className="pt-3">
            <p className="p-3 font-medium text-justify border-2 w-[450px] text-slate-500 h-[350px]">
              Golongan ketiga melibatkan anak-anak yang mungkin mengalami
              stunting, dengan dua kondisi yang berbeda. Pertama, berat badan
              anak ideal tetapi tinggi badan kurang, memerlukan perhatian
              terhadap nutrisi dan pertumbuhan linier. menandakan perlunya
              dukungan nutrisi dan perawatan kesehatan yang intensif. Dalam
              kedua kasus ini, tindakan preventif dan intervensi diperlukan
              untuk memastikan pertumbuhan dan perkembangan anak mencapai
              potensinya secara optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Golongan4 = () => {
  return (
    <div className="flex p-10">
      <div className="flex">
        <div>
          <div className="flex items-center justify-center w-32 h-12 border-2 border-gray-600 rounded-full cursor-pointer">
            <h2 className="font-poppins">Golongan 4</h2>
          </div>
          <div className="pt-3">
            <p className="p-3 font-medium text-justify border-2 w-[450px] text-slate-500 h-[350px]">
              Golongan keempat melibatkan anak-anak yang mengalami stunting, di
              mana tinggi badan mereka kurang dari standar perkembangan usia
              sebaya, sementara berat badan mereka berlebih. Kondisi ini
              menandakan ketidakseimbangan antara tinggi dan berat badan, yang
              dapat disebabkan oleh pola makan yang tidak sehat atau kurangnya
              nutrisi yang tepat. Penting untuk memberikan perhatian khusus
              terhadap aspek gizi dan memastikan bahwa anak-anak dalam golongan
              keempat ini mendapatkan pola makan yang seimbang guna mengatasi
              stunting dan mencegah masalah kesehatan yang dapat timbul akibat
              ketidakseimbangan pertumbuhan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
