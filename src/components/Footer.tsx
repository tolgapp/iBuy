import "../style/Footer.css";
import links from "../data/links.json";
import FooterLinks from "./FooterLinks";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer>
      <h4><Link to={"/"}>iBuy</Link></h4>
        <FooterLinks  links={links}/>

    </footer>
  );
};

export default Footer;