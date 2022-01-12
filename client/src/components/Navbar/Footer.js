import React from "react";

const Footer = () => {
  return (
    <div>
      <footer
        id="sticky-footer"
        className="flex-shrink-0 py-3 bg-dark text-white-50"
        style={{ bottom: 0, width: "100%" }}
      >
        <div className="container text-center">
          <small>Copyright &copy; Dunder Mifflin</small>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
