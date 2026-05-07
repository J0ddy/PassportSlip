import { Connection } from './ble';
import { base64Encode } from './protocol';

/**
 * Takes a connected device + array of frames, writes each in BLE-MTU-sized chunks.
 */
export async function writeFrames(connection: Connection, frames: Uint8Array[], onProgress?: (percent: number) => void) {
  const mtu = 180; // Safe MTU size for writing without response
  const totalBytes = frames.reduce((sum, f) => sum + f.length, 0);
  let bytesWritten = 0;

  for (const frame of frames) {
    for (let offset = 0; offset < frame.length; offset += mtu) {
      const chunk = frame.slice(offset, offset + mtu);
      const base64Chunk = base64Encode(chunk);

      await connection.writeWithoutResponse(base64Chunk);

      bytesWritten += chunk.length;
      if (onProgress) {
        onProgress((bytesWritten / totalBytes) * 100);
      }

      // Small inter-chunk delay to avoid overwhelming the printer
      await new Promise(r => setTimeout(r, 10));
    }
  }
}
