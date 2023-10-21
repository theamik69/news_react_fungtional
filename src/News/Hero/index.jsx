import "bootstrap/dist/css/bootstrap.min.css";

const Hero = () => {
  return (
    <section id="hero" className="hero d-flex flex-column justify-content-center align-items-center mt-5" data-aos="fade" data-aos-delay="1500">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <h2>
              <span className="text-danger fw-bold">Portal</span> Berita Internasional
            </h2>
            <p>Portal Berita Internasional adalah sumber terdepan untuk berita terkini dan analisis mendalam tentang peristiwa global yang meliputi politik, ekonomi, lingkungan, dan budaya di seluruh dunia.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;