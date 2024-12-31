import z from "zod";
function isValidImageURL(url: string) {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif"]; // Add more extensions if needed
  return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
}

export const imageRefinement = z.string().refine((url) => isValidImageURL(url), {
  message:
    "Invalid image format. Only JPG, JPEG, PNG, and GIF formats are supported.",
});