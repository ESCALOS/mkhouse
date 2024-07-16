// src/utils/optimizeImages.ts
import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function optimizeImages(imagePaths: ImageMetadata[], width: number, height: number, format: string = 'webp'): Promise<string[]> {
  const optimizedImages = await Promise.all(
    imagePaths.map(async (path) => {
      const image = await getImage({
        src: path,
        width,
        height,
        format,
      });
      return image.src;
    })
  );
  return optimizedImages;
}
