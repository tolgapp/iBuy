import links from "../data/links.json";
import FooterLinks from "./FooterLinks";
import Payments from "./Payments";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center bg-teal-600 py-16 px-12">
      <Logo variant="footer"/>
      <section className="flex flex-col flex-wrap gap-12">
        <FooterLinks links={links} />
        <Payments />
      </section>
    </footer>
  );
};

export default Footer;
