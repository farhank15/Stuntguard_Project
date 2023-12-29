const posts = [
  {
    id: 1,
    title: "Apa itu stunting dan apa penyebabnya?",
    href: "#",
    description:
      "Stunting adalah kondisi gagal pertumbuhan pada anak-anak yang ditandai dengan tinggi badan yang lebih pendek dari rata-rata anak seumur mereka. Penyebabnya meliputi asupan gizi yang buruk, infeksi, dan perawatan yang tidak memadai.",

    author: {
      name: "anonim",

      href: "#",
      imageUrl: "https://avatar.iran.liara.run/public",
    },
  },
  {
    id: 1,
    title: "Mengapa stunting menjadi masalah serius dalam kesehatan anak?",
    href: "#",
    description:
      "Stunting dapat berdampak buruk pada perkembangan fisik dan kognitif anak. Anak-anak yang mengalami stunting memiliki risiko lebih tinggi mengalami masalah kesehatan, penurunan produktivitas, dan masalah perkembangan mental.",

    category: { title: "Marketing", href: "#" },
    author: {
      name: "lusita ningsih",

      href: "#",
      imageUrl: "https://avatar.iran.liara.run/public/boy",
    },
  },
  {
    id: 1,
    title: "Apa peran nutrisi dalam pencegahan stunting?",
    href: "#",
    description:
      "Nutrisi yang baik sangat penting dalam pencegahan stunting. Anak-anak perlu asupan gizi yang seimbang, termasuk protein, vitamin, mineral, dan zat besi, untuk mendukung pertumbuhan yang sehat.",

    category: { title: "Marketing", href: "#" },
    author: {
      name: "mikel febri",

      href: "#",
      imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704",
    },
  },
  {
    id: 1,
    title: "Bagaimana stunting dapat diidentifikasi dan diukur?",
    href: "#",
    description:
      "Stunting dapat diidentifikasi dengan mengukur tinggi badan anak dan membandingkannya dengan standar pertumbuhan WHO. Anak yang memiliki tinggi badan di bawah persentil ke-5 pada grafik pertumbuhan dapat dianggap mengalami stunting.",
    author: {
      name: "hana Foster",

      href: "#",
      imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
  },
  {
    id: 1,
    title: "Apa dampak jangka panjang dari stunting?",
    href: "#",
    description:
      "Dampak jangka panjang stunting termasuk risiko gangguan perkembangan kognitif, penurunan produktivitas di masa dewasa, risiko penyakit kronis, dan pengaruh negatif pada generasi berikutnya jika tidak diatasi.",
    date: "Mar 16, 2020",

    author: {
      name: "Michael Foster",

      href: "#",
      imageUrl: "https://i.pravatar.cc/150?u=fake@pravatar.com",
    },
  },
  {
    id: 1,
    title: "Bagaimana cara mengatasi stunting dalam masyarakat?",
    href: "#",
    description:
      "Upaya pencegahan stunting melibatkan pendekatan multidisiplin, termasuk perbaikan akses terhadap gizi yang baik, pendidikan kesehatan, sanitasi yang bersih, dan pemberdayaan ibu hamil dan bayi baru lahir. Program-program pemerintah dan organisasi internasional berperan penting dalam mengatasi masalah stunting ini.",

    author: {
      name: "hanniva",

      href: "#",
      imageUrl: "https://i.pravatar.cc/300",
    },
  },
  // More posts...
];

export default function Ques() {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 sm:grid-cols-2">
          {posts.map((post) => (
            <div class="bg-violet-100 max-w-sm  overflow-hidden shadow-lg rounded-lg">
              <article
                key={post.id}
                className="flex flex-col items-start justify-between max-w-xl mx-6 my-6"
              >
                <div className="relative group">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="relative flex items-center mt-8 gap-x-4">
                  <img
                    src={post.author.imageUrl}
                    alt=""
                    className="w-10 h-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={post.author.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
