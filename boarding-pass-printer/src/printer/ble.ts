import { State } from 'react-native-ble-plx';
import { create } from 'zustand';

// Mock Device to represent Phomemo T02
export interface Device {
  id: string;
  name: string | null;
  localName: string | null;
}

export interface Connection {
  device: Device;
  writeWithoutResponse: (base64Data: string) => Promise<void>;
}

interface MockBleStore {
  devices: Device[];
  connectedDevice: Device | null;
  isScanning: boolean;
  scanForT02: (timeoutMs: number) => Promise<Device[]>;
  connect: (deviceId: string) => Promise<Connection>;
  disconnect: (connection: Connection) => Promise<void>;
  simulateScanResult: () => void;
}

const mockDevice: Device = {
  id: 'mock-t02-1234',
  name: 'T02_Mock',
  localName: 'T02',
};

// Simple mock implementation of ble manager
export const useBleStore = create<MockBleStore>((set, get) => ({
  devices: [],
  connectedDevice: null,
  isScanning: false,

  simulateScanResult: () => {
    if (get().isScanning) {
      set({ devices: [mockDevice] });
    }
  },

  scanForT02: async (timeoutMs: number) => {
    set({ isScanning: true, devices: [] });

    // Simulate finding a device after 1 second
    setTimeout(() => {
      get().simulateScanResult();
    }, 1000);

    return new Promise((resolve) => {
      setTimeout(() => {
        set({ isScanning: false });
        resolve(get().devices);
      }, timeoutMs);
    });
  },

  connect: async (deviceId: string) => {
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const device = get().devices.find(d => d.id === deviceId) || mockDevice;
    set({ connectedDevice: device });

    return {
      device,
      writeWithoutResponse: async (base64Data: string) => {
        console.log(`[MOCK BLE WRITE]: ${base64Data.length} bytes base64`);
        // Simulate write delay
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
    };
  },

  disconnect: async (connection: Connection) => {
    set({ connectedDevice: null });
  }
}));
