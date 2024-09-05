type FooterLinkGroup = {
    icon: string;
    title: string;
    links: {
        id: number;
        link: string;
    }[];
};

type FooterLinksProps = {
    links: FooterLinkGroup[];
};


const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => {
    return (
        <div className="footer-links">
            {links.map((group, index) => (
                <div key={index} className="group">
                    <div className="image-and-title">
                    <img src={group.icon} alt={group.title} />
                    <h3>{group.title}</h3>
                    </div>
                    <ul>
                        {group.links.map((linkItem) => (
                            <li key={linkItem.id}>
                                <a href={linkItem.link}>{linkItem.link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default FooterLinks;
