import { baseURL } from "../services/products";

export const inputClass =
  "bg-white sm:min-w-[25rem] w-full text-black p-3 mb-4";

export const labelClass = "text-left text-white text-xl mt-2 mb-2";

export const formButton =
  "text-white p-4 text-xl font-bold bg-[#007bff] mt-2 mb-2 min-w-full cursor-pointer hover:bg-[#0056b3] transition-colors duration-300 mx-auto";

export const classicButton =
  "text-white p-4 text-lg font-semibold bg-black mt-2 mb-2  cursor-pointer hover:bg-gray-600 transition-colors duration-300";

export const buttonStyle =
  "text-black border-[.1rem] bg-white text-lg px-6 py-4 cursor-pointer hover:bg-black hover:text-white";

export const cartButton =
  "text-black border-[.1rem] bg-white text-lg px-2 cursor-pointer hover:bg-black hover:text-white";

export const navLinkStyle =
  "text-lg font-medium text-black hover:underline hover:underline-offset-12";

export const signUpAndLoginContainerClass =
  "flex items-center justify-center min-h-screen";

export const resolveImagePath = (imagePath: string) => {
  return imagePath.startsWith("http://") || imagePath.startsWith("https://")
    ? imagePath
    : `${baseURL}${imagePath}`;
};
