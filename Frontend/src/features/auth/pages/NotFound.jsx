import { Link } from "react-router-dom";
import "../notfoundpage.css";

const NotFound = () => {
  return (
    <main className="notfound-page">
      {/* Top decorative header */}
      <header className="top-header"></header>

      {/* Animated stars */}
      <div className="stars-container">
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      {/* Hanging lamp */}
      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>

      {/* Error content */}
      <section className="error">
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title">Page Not Found</h1>
            <p className="message__text">
              We're sorry, the page you were looking for isn't found here.
              The link you followed may be broken or no longer exists.
            </p>
          </div>

          <div className="error__nav e-nav">
            <Link to="/" className="e-nav__link">
  <span>← Back to Home</span>
</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;