

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Card = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [backButton, setBackButton] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const performSearch = () => {
    fetchData(search);
    setBackButton(true);
  };

  const handleBack = () => {
    setSearch("");
    fetchData("");
    setBackButton(false);
  };

  const fetchData = (query) => {
    
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=da38431de65b4bee99ecfb7782944dd1`)
      .then((response) => response.json())
      .then(({ articles }) => {
        const articlesWithId = articles.map((article, index) => ({
          ...article,
          id: index + 1,
        }));
        if (!articlesWithId.length) {
          setWarning(true);
        } else {
          setWarning(false);
        }
        setArticle(articlesWithId);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="container">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-8">
          <div className="searchStyle">
            <i className="searchIconStyle fa fa-search"></i>
            <input type="text" className="inputStyle form-control" placeholder="Cari berita..." value={search} onChange={handleSearchChange} />
            <button className="buttonStyle btn btn-primary" onClick={performSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div id="warning" className="mt-2 d-flex justify-content-center align-items-center">
        <p className="p-2 mb-2 bg-danger text-white" style={warning ? {} : { display: "none" }}>
          Konten tidak ditemukan
        </p>
      </div>

      <div id="back" className="mt-4" style={backButton ? {} : { display: "none" }}>
        <button className="btn btn-light btn-lg" onClick={handleBack}>
          Kembali
        </button>
        <div className="border mt-4"></div>
      </div>

      <main id="main" className="mt-5">
        <section id="gallery" className="gallery">
          <div className="container-fluid">
            <div className="row gy-4 justify-content-center">
              {loading ? (
                <p>Loading...</p>
              ) : (
                article.map((article) => (
                  <div key={article.id} className="border m-3 p-3 rounded bg-secondary col-xl-3 col-lg-4 col-md-6">
                    <div className="gallery-item h-100">
                      <img src={article.urlToImage} className="img-fluid mb-2" alt={article.title} />
                      <div className="timeandname d-flex align-items-center mt-3">
                        <time dateTime={article.publishedAt}>{article.publishedAt}</time>
                        <a href={article.url} className="aname">
                          {article.source.name}
                        </a>
                      </div>
                      <div>
                        <h3 className="title">
                          <a href={article.url}>{article.title}</a>
                        </h3>
                        <p className="description">{article.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Card;

