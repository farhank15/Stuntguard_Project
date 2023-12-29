// Mylinks.jsx

// Fungsi untuk mendapatkan nilai cookie berdasarkan nama
const getCookie = (name) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

// Fungsi untuk memeriksa token di cookie
const checkTokenInCookie = () => {
  const token = getCookie("authToken"); // Ganti 'yourTokenCookieName' sesuai dengan nama cookie token Anda

  return !!token;
};

export const links = [
  {
    name: "Fiture",
    submenu: true,
    sublinks: [
      {
        sublink: [
          checkTokenInCookie() && { name: "Calcuate", link: "/calculate" },
          { name: "Artikel", link: "/article" },
          checkTokenInCookie() && { name: "Data anak", link: "/dataanak" },
          checkTokenInCookie() && { name: "Tips & Saran", link: "/tns" },
        ],
      },
    ],
  },
];
