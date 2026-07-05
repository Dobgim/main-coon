/**
 * Dynamically adjusts Unsplash query parameters (width and quality)
 * to serve optimized image sizes, improving site speed and SEO scores.
 */
export function getOptimizedImageUrl(url: string, width: number, quality = 70): string {
  if (!url) return '';
  if (url.includes('images.unsplash.com')) {
    // Replace the width (w=...) parameter
    let optimized = url.replace(/w=\d+/, `w=${width}`);
    // Replace the quality (q=...) parameter
    optimized = optimized.replace(/q=\d+/, `q=${quality}`);
    return optimized;
  }
  return url;
}
