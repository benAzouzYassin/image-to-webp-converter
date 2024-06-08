import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { apiUrl } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function convertImage(img: File) {
  try {
    const formData = new FormData();
    formData.append("file", img);

    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) return null

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    return url
  } catch (error) {
    console.error(error);
    return null
  }
}
export function getBaseFileName(name: string) {
  return name.substring(0, name.lastIndexOf(".")) +
    ".webp";
}
export function downloadFromUrl(url: string, fileName: string) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
}