import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from '@/assets/lottie-json'

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const getColor = (colorCode) => {
  const colorMap = {
    1: "bg-red-100",    // Light Red
    2: "bg-orange-100", // Light Orange
    3: "bg-yellow-100", // Light Yellow
    4: "bg-green-100",  // Light Green
    5: "bg-teal-100",   // Light Teal
    6: "bg-blue-100",   // Light Blue
    7: "bg-indigo-100", // Light Indigo
    8: "bg-purple-100", // Light Purple
    9: "bg-pink-100",   // Light Pink
  };

  // Return the color class based on the numeric value, defaulting to gray
  return colorMap[colorCode] || "bg-gray-500"; // default to gray if the number is not valid
};

export const animationDefualtOptions =  {
   loop:true,
   autoplay:true,
   animationData,
}