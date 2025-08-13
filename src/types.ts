export type AddToCartBtnProps = {
  product: {
    id: number;
    brand: string;
    description: string;
    price: number;
    images: string[];
  };
  amount: number;
};

export type AmountProps =
  | {
      productId: number;
      amount?: never;
      setItemAmount?: never;
      isCart?: true;
    }
  | {
      productId?: never;
      amount: number;
      setItemAmount: React.Dispatch<React.SetStateAction<number>>;
      isCart?: false;
    };

export type FooterLinksProps = {
  links: FooterLinkGroup[];
};

export type FooterLinkGroup = {
  icon: string;
  title: string;
  links: {
    id: number;
    link: string;
    text: string;
  }[];
};

export type Product = {
  brandName: string;
  tagline: string;
  description: string;
  url: string;
};

export type ImageTextProps = {
  product: Product;
  reverse?: boolean;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LogoProps = {
  variant?: "navbar" | "footer";
};

export type MobileMenuProps = {
  isMobile: boolean;
  closeNews: boolean;
  handleClick: () => void;
};

export type NavbarProps = {
  closeNews: boolean;
  showSearch: () => void;
};

export type NewsBarProps = {
  handleClick: () => void;
};

export type Products = {
  id: number;
  images: string[];
  brand: string;
  description: string;
  price: number;
  info?: string;
  category: string[] | string;
};

export type ProductProps = {
  product: Products;
  isFavorite?: boolean;
  onToggleFavorite: (id: number) => void;
  isLoggedIn?: boolean;
};

export type ScrollingProps = {
  text: string;
};

export type SearchProps = {
  showSearch: () => void;
  handleSearchChange: (query: string) => void;
  searchQuery: string;
};

export type SearchResultsProps = {
  searchQuery: string;
  onToggleFavorite: (productId: number) => void;
  favoriteProducts: number[];
};

export type FormData = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
};

export type SlideProps = {
  images: { url: string; text?: string; alt: string; title?: string }[];
  interval?: number;
};

export type UpdateProfileFormProps = {
  name: string;
  email: string;
  password: string;
  userId: string;
};

export type FavoriteProps = {
  favoriteProducts: number[];
  onToggleFavorite: (productId: number) => void;
};

export type ShopProps = {
  favoriteProducts: number[];
  onToggleFavorite: (productId: number) => void;
};