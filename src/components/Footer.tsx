import "../style/Footer.css";
import links from "../data/links.json";
import FooterLinks from "./FooterLinks";
import { Link } from "react-router-dom";
import Payments from "./Payments";

const Footer = () => {
  return (
    <footer>
      <h4>
        <Link to={"/"}>iBuy</Link>
      </h4>
      <section className="links-and-payments">
        <FooterLinks links={links} />
        <Payments />
      </section>
    </footer>
  );
};

export default Footer;