import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import articlesData from "../../api/dataartikel.json";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleById = () => {
      //  waktu jeda 2 detik sebelum mengambil data
      setTimeout(() => {
        const foundArticle = articlesData.artikel_stunting.find(
          (item) => item.id === parseInt(id)
        );

        if (foundArticle) {
          setArticle(foundArticle);
          generateRandomRelatedArticles(foundArticle.id);
          setLoading(false);
        }
      }, 1500);
    };

    const generateRandomRelatedArticles = (currentArticleId) => {
      const shuffledArticles = articlesData.artikel_stunting
        .filter((item) => item.id !== currentArticleId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      setRelatedArticles(shuffledArticles);
    };

    fetchArticleById();
  }, [id]);

  const handleRelatedArticleClick = (relatedArticleId) => {
    // Atur state loading menjadi true ketika artikel terkait diklik
    setLoading(true);

    setTimeout(() => {
      const foundArticle = articlesData.artikel_stunting.find(
        (item) => item.id === parseInt(relatedArticleId)
      );

      if (foundArticle) {
        setArticle(foundArticle);
        generateRandomRelatedArticles(foundArticle.id);
      }

      // mengatur state loading menjadi false setelah data artikel terkait berhasil diambil
      setLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="col-span-8 lg:w-[110%] w-[100%] px-3">
        <div className="flex items-center justify-center h-full">
          <RingLoader
            color="#4F46E5"
            loading={loading}
            css={override}
            size={150}
          />
        </div>
      </div>
    );
  }

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container grid grid-cols-12 gap-8 px-3 mx-auto mt-8 md:px-3">
      <div className="col-span-8 lg:w-[100%] w-[160%]  px-3">
        <h2 className="mb-2 text-4xl font-poppins">{article.judul}</h2>
        <p className="mb-2 text-gray-600">Penulis: {article.penulis}</p>
        <p className="mb-4 text-gray-600">
          Tanggal Terbit: {article.tanggal_terbit}
        </p>
        <img
          src={article.foto}
          alt={article.judul}
          className="mb-4 w-full h-[400px] rounded-md object-cover"
        />
        <p
          className="text-lg text-justify text-gray-600"
          dangerouslySetInnerHTML={{
            __html: article.isi_artikel.replace(/\n/g, "<br />"),
          }}
        ></p>
      </div>
      {/* Tambahkan kelas md:flex pada div berikut */}
      <div className="justify-end hidden col-span-4 lg:flex">
        <div className="p-3 border-2 rounded-lg shadow-xl border-slate-300 h-[700px] w-80">
          <h3 className="mb-4 text-2xl font-semibold">Artikel Terkait</h3>
          <ul className="cursor-pointer">
            {relatedArticles.map((relatedArticle) => (
              <li key={relatedArticle.id} className="mb-4">
                {/* Gunakan Link untuk membuat tautan ke halaman detail artikel */}
                <Link to={`/article/${relatedArticle.id}`}>
                  <p
                    className="text-lg font-medium"
                    onClick={() => handleRelatedArticleClick(relatedArticle.id)}
                  >
                    {relatedArticle.judul}
                  </p>
                </Link>
                <p className="text-gray-500">
                  Penulis: {relatedArticle.penulis}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
