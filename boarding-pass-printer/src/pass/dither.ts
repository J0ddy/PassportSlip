/**
 * Applies Floyd-Steinberg dithering to an RGBA image buffer and returns
 * a 1-bit-per-pixel packed Uint8Array.
 *
 * @param rgba The raw pixel data (4 bytes per pixel: R, G, B, A)
 * @param width Image width in pixels
 * @param height Image height in pixels
 * @returns Packed 1-bit per pixel array (MSB first)
 */
export function floydSteinberg(rgba: Uint8Array, width: number, height: number): Uint8Array {
  // Convert RGBA to Grayscale first for easier manipulation
  // We allocate a Float32Array so we can distribute errors without overflow
  const gray = new Float32Array(width * height);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j++) {
    // Standard luminosity weights
    const r = rgba[i];
    const g = rgba[i + 1];
    const b = rgba[i + 2];
    const a = rgba[i + 3];

    // If transparent, treat as white
    if (a === 0) {
      gray[j] = 255;
    } else {
      gray[j] = (r! * 0.299) + (g! * 0.587) + (b! * 0.114);
    }
  }

  const bytesPerRow = Math.ceil(width / 8);
  const packed = new Uint8Array(bytesPerRow * height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const oldPixel = gray[idx]!;

      // We skip dithering logic on absolute black or white if we want
      // to preserve barcode exactness.
      const newPixel = oldPixel < 128 ? 0 : 255;

      // Pack into bit array (1 = print black, 0 = white)
      if (newPixel === 0) {
        const byteIndex = y * bytesPerRow + Math.floor(x / 8);
        const bitIndex = 7 - (x % 8);
        packed[byteIndex]! |= (1 << bitIndex);
      }

      // Quantization error
      const err = oldPixel - newPixel;

      // Distribute error to neighboring pixels (Floyd-Steinberg pattern)
      if (x + 1 < width) {
        gray[idx + 1]! += err * (7 / 16);
      }
      if (y + 1 < height) {
        if (x - 1 >= 0) {
          gray[(y + 1) * width + (x - 1)]! += err * (3 / 16);
        }
        gray[(y + 1) * width + x]! += err * (5 / 16);
        if (x + 1 < width) {
          gray[(y + 1) * width + (x + 1)]! += err * (1 / 16);
        }
      }
    }
  }

  return packed;
}
