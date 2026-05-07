import { create } from 'zustand';
import { BoardingPass } from './types';
import { parseBarcode } from './bcbp';

interface PassStore {
  currentPass: BoardingPass | null;
  setPassFromBarcode: (barcode: string) => void;
  clearPass: () => void;
}

export const usePassStore = create<PassStore>((set) => ({
  currentPass: null,
  setPassFromBarcode: (barcode: string) => {
    const pass = parseBarcode(barcode);
    set({ currentPass: pass });
  },
  clearPass: () => set({ currentPass: null })
}));
