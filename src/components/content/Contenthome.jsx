import React from "react";
import Child1 from "../../assets/child1.jpg";
import image2 from "../../assets/artikel/artikel7.png";

const Contenthome = () => {
  return (
    <div className="pt-10 pb-10 mx-auto">
      <section className="container flex flex-col items-center justify-center gap-16 px-10 py-32 mx-auto lg:flex-row">
        <div className="flex flex-col flex-1 gap-6">
          <h1 className="pb-3 text-4xl font-black text-gray-900 lg:text-6xl">
            Stunting Is ?
          </h1>
          <div className="flex flex-col gap-5 text-base text-gray-500 lg:text-xl">
            <p className="indent-8 lg:indent-8">
              Stunting adalah kondisi gagal pertumbuhan pada anak-anak yang
              disebabkan oleh kekurangan gizi, khususnya pada masa pertumbuhan
              awal, yaitu sejak bayi hingga usia dua tahun. Hal ini dapat
              mengakibatkan anak memiliki tinggi badan lebih pendek dari tinggi
              badan normal yang seharusnya seiring bertambahnya usia. Faktor
              penyebab stunting meliputi kurangnya asupan nutrisi esensial,
              infeksi berulang, perawatan kesehatan yang tidak memadai, dan
              lingkungan yang tidak bersih. Stunting bukan hanya masalah tinggi
              badan, tetapi juga dapat berdampak pada perkembangan kognitif dan
              kesehatan anak. Pencegahan stunting memerlukan pendekatan
              menyeluruh, melibatkan peningkatan akses terhadap nutrisi,
              perawatan kesehatan yang baik, edukasi gizi, dan perbaikan
              sanitasi. Upaya ini memerlukan kerjasama antara pemerintah,
              lembaga internasional, masyarakat, dan keluarga untuk menciptakan
              lingkungan yang mendukung pertumbuhan dan perkembangan optimal
              anak-anak.
            </p>
          </div>
        </div>
        <div className="sm:h-[300px] sm:w-[500px] md:w-[500px] md:h-[300px] w-[300px] h-[222px] rounded-xl overflow-hidden">
          <img
            src={image2}
            alt="icon-stunting"
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section className="container flex flex-col items-center justify-center gap-16 px-10 py-32 mx-auto lg:flex-row">
        <div className="sm:h-[300px] sm:w-[500px] md:w-[500px] md:h-[300px] w-[300px] h-[222px] rounded-xl overflow-hidden">
          <img
            src={Child1}
            alt="icon-stunting"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 gap-6">
          <h1 className="pb-3 text-4xl font-black text-gray-900 lg:text-6xl">
            Prevention !
          </h1>
          <div className="flex flex-col gap-5 text-base text-gray-500 lg:text-xl">
            <p className="indent-8 lg:indent-8">
              Pencegahan stunting melibatkan upaya untuk meningkatkan asupan
              gizi, perawatan kesehatan yang baik, dan edukasi tentang gizi dan
              kebersihan. Langkah-langkah konkret termasuk memastikan akses
              makanan bergizi, perawatan kesehatan selama kehamilan dan masa
              anak-anak, serta pemberian informasi kepada masyarakat. Perbaikan
              sanitasi dan infrastruktur juga penting, sementara fokus pada
              1.000 hari pertama kehidupan anak menjadi strategi utama.
              Kerjasama antara pemerintah, lembaga internasional, dan masyarakat
              adalah kunci untuk menciptakan lingkungan yang mendukung
              pertumbuhan dan perkembangan optimal anak-anak, dengan harapan
              mengurangi risiko stunting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contenthome;
