import { Buffer } from 'buffer';

/**
 * T02 Protocol Implementation
 *
 * ESC/POS variant protocol to send 1-bit bitmap to a printer.
 */

// Command bytes
const CMD_INIT = [0x1B, 0x40]; // ESC @
const CMD_DENSITY = [0x1D, 0x45, 0x01]; // Set density/quality

// Raster command: GS v 0 m xL xH yL yH
// m = 0 (normal), x = (width / 8) bytes, y = height
const CMD_RASTER = [0x1D, 0x76, 0x30, 0x00];

export function buildInitFrame(): Uint8Array {
  // Wake up / Reset, then set density
  return new Uint8Array([...CMD_INIT, ...CMD_DENSITY]);
}

export function buildRasterFrames(bitmap1bpp: Uint8Array, widthPx: number, heightPx: number, rowsPerChunk: number = 256): Uint8Array[] {
  const bytesPerRow = Math.ceil(widthPx / 8);
  const frames: Uint8Array[] = [];

  for (let startRow = 0; startRow < heightPx; startRow += rowsPerChunk) {
    const endRow = Math.min(startRow + rowsPerChunk, heightPx);
    const chunkHeight = endRow - startRow;

    // Command header
    const xL = bytesPerRow & 0xFF;
    const xH = (bytesPerRow >> 8) & 0xFF;
    const yL = chunkHeight & 0xFF;
    const yH = (chunkHeight >> 8) & 0xFF;

    const header = new Uint8Array([...CMD_RASTER, xL, xH, yL, yH]);

    // Extract chunk data
    const startByte = startRow * bytesPerRow;
    const endByte = endRow * bytesPerRow;
    const chunkData = bitmap1bpp.slice(startByte, endByte);

    // Combine header and data
    const frame = new Uint8Array(header.length + chunkData.length);
    frame.set(header);
    frame.set(chunkData, header.length);

    frames.push(frame);
  }

  return frames;
}

export function buildFooterFrame(): Uint8Array {
  // Line feeds to eject the paper past the print head
  return new Uint8Array([0x1B, 0x64, 0x02, 0x1B, 0x64, 0x02, 0x1B, 0x64, 0x02]);
}

export function base64Encode(bytes: Uint8Array): string {
  // In a real environment, we might use a robust Base64 library.
  // For React Native without Node buffers, we can use a small utility or Buffer.
  return Buffer.from(bytes).toString('base64');
}

export function packPixelsTo1Bit(grayscalePixels: Uint8Array, width: number, height: number): Uint8Array {
    const bytesPerRow = Math.ceil(width / 8);
    const packed = new Uint8Array(bytesPerRow * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Assume pixels are 1 byte per pixel (grayscale: 0 = black, 255 = white)
        const i = y * width + x;
        const pixel = grayscalePixels[i];

        // Print black if < 128 (darker). In T02, 1 = print black, 0 = white
        if (pixel !== undefined && pixel < 128) {
          const byteIndex = y * bytesPerRow + Math.floor(x / 8);
          const bitIndex = 7 - (x % 8); // MSB first
          packed[byteIndex]! |= (1 << bitIndex);
        }
      }
    }

    return packed;
}
