type FooterLinksProps = {
    links: FooterLinkGroup[];
};

type FooterLinkGroup = {
    icon: string;
    title: string;
    links: {
        id: number;
        link: string;
        text: string
    }[];
};

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
  return (
    <div className="flex flex-wrap gap-10 md:gap-20">
      {links.map((group, index) => (
        <div key={index} className="group w-full sm:w-1/2 md:w-auto">
          <div className="image-and-title flex items-center gap-4 mb-4 text-white">
            <img src={group.icon} alt={group.title} className="w-8" />
            <h3 className="text-xl">{group.title}</h3>
          </div>
          <ul className="list-none space-y-2">
            {group.links.map((linkItem) => (
              <li key={linkItem.id}>
                <a
                  href={linkItem.link}
                  className="text-sm text-white hover:underline"
                >
                  {linkItem.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FooterLinks;
