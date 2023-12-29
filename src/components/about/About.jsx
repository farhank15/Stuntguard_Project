import Logo from "../../assets/stuntguard f.png";
import Farhan from "../../assets/Team/Farhan.jpg";
import Hesti from "../../assets/Team/hesti.jpg";
import Renaldy from "../../assets/Team/Renaldy.jpg";
import Hanifah from "../../assets/Team/Hanifah.jpg";
import Dapa from "../../assets/Team/Dapa.jpg";

const About = () => {
  const team = [
    {
      nama: "Ahmad Farhan K",
      role: "(Universitas Proklamasi 45 Yogyakarta)",
      image: Farhan,
    },
    {
      nama: "Hanifah Eka Cahyani",
      role: " (Universitas Muhammadiyah Surakarta)",
      image: Hanifah,
    },
    {
      nama: "Hesti Lusiati",
      role: "(STMIK Widya Utama)",
      image: Hesti,
    },
    {
      nama: "Moch Dapa Adhari",
      role: "(Universitas Muhammadiyah Prof Dr Hamka)",
      image: Dapa,
    },
    {
      nama: "Renaldy Baleano Y",
      role: "(Universitas Suryakancana)",
      image: Renaldy,
    },
  ];

  const aboutDesc = [
    "StuntGuard memungkinkan pengguna untuk mendaftar secara manual dan memasukkan data perkembangan anak mereka, atau menggunakan fitur    dukungan digital yang kami sediakan. Setelah registrasi dan entri data berhasil, setiap pengguna akan memiliki akses ke riwayat    kesehatan anak mereka di platform.",
    "Platform ini bertujuan untuk memungkinkan organisasi layanan kesehatan mengakses dan menganalisis data kesehatan anak secara    komprehensif dengan mudah. Para profesional layanan kesehatan dapat dengan cepat meninjau riwayat kesehatan anak, memperoleh    informasi yang relevan, dan membuat keputusan yang lebih baik mengenai perawatan dan perkembangan anak.",
    "Tujuan StuntGuard adalah untuk meningkatkan kesadaran tentang kesehatan anak-anak, memberikan alat yang dapat diandalkan kepada    orang tua, dan membantu penyedia layanan kesehatan memberikan pelayanan yang lebih baik kepada mereka.Dan memastikan bahwa    setiap anak menerima layanan kesehatan yang optimal untuk pertumbuhan dan perkembangan yang sehat",
  ];

  return (
    <div>
      <section className="flex flex-col items-center justify-center h-screen gap-10 py-32 ">
        <div className="flex flex-col items-center gap-3">
          <h1
            className="flex m-auto -mt-20 text-6xl font-black leading-relaxed text-center text-gray-900 lg:text-9xl sm:text-8xl"
            style={{
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            About Us
          </h1>
          <p className="text-[#6B7280] text-xl w-8/12 text-center">
            Selamat datang di halaman About Us! Kami adalah tim yang berkomitmen
            untuk memerangi stunting melalui upaya pencegahan yang holistik.
            Bersama-sama, kami bekerja untuk meningkatkan akses gizi, perawatan
            kesehatan, dan edukasi agar setiap anak dapat tumbuh dan berkembang
            secara optimal. Bergabunglah dengan kami dalam misi menciptakan masa
            depan yang sehat bagi generasi mendatang.
          </p>
        </div>
      </section>

      <section className="container flex flex-col items-center justify-center gap-16 px-10 py-32 mx-auto lg:flex-row">
        <div className="flex flex-col flex-1 gap-6">
          <h1 className="pb-5 text-4xl font-black text-gray-900 lg:text-6xl">
            StuntGuard Is ?
          </h1>
          <div className="flex flex-col gap-5 text-base text-gray-500 lg:text-xl">
            {aboutDesc.map((item, index) => (
              <p key={index} className="indent-0 lg:indent-8">
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="md:w-[375px] w-[280px] md:h-[375px] h-[280px]">
          <img
            src={Logo}
            alt="icon-stunting"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      <section className="pt-16 pb-20 ">
        <h1 className="text-3xl font-black leading-relaxed text-center text-gray-900 lg:text-xl">
          Our Team
        </h1>
        <h1 className="pb-24 text-3xl font-black leading-relaxed text-center text-gray-900 lg:text-5xl">
          Our Professinal Team
        </h1>
        <div className="container px-10 mx-auto">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-y-20">
            {team.map((item, index) => (
              <div key={index} className="relative">
                <div className="w-auto h-[375px]">
                  <img
                    src={item.image}
                    alt={item.nama}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="absolute w-[180px] h-[80px] px-2 py-5 text-center -translate-x-1/2 bg-white border-2 rounded-lg border-slate-600 -bottom-10 left-1/2">
                  <h1 className="font-bold text-[#333]">{item.nama}</h1>
                  <p className="text-xs text-[#333]">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
