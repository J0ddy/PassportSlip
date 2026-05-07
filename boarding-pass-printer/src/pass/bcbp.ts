import { decode } from 'bcbp';
import { BoardingPass } from './types';

// Simple mock for parsing BCBP format to standard BoardingPass shape
export function parseBarcode(rawBarcode: string): BoardingPass {
  try {
    const parsed = decode(rawBarcode) as any;

    // In a real implementation we would safely map the BCBP fields.
    // bcbp npm returns an array of legs if multiple, we take the first.
    const leg = parsed.legs?.[0] || parsed;

    return {
      passengerName: parsed.passengerName || 'UNKNOWN',
      pnr: parsed.pnr || 'UNKNOWN',
      from: leg.origin || 'XXX',
      to: leg.destination || 'XXX',
      flightNumber: leg.flightNumber || '0000',
      carrierIATA: leg.carrier || 'XX',
      departureDate: leg.dateOfFlight || new Date().toISOString().split('T')[0],
      seat: leg.seatNumber || 'UNASSIGNED',
      cabin: leg.compartmentCode || 'Y',
      sequenceNumber: leg.sequenceNumber || '000',
      rawBarcode,
    };
  } catch (error) {
    console.error("Failed to parse BCBP:", error);
    // Fallback stub for development
    return {
      passengerName: 'ELARA VANCE',
      pnr: 'QWERTY',
      from: 'SFO',
      to: 'HND',
      flightNumber: '9042',
      carrierIATA: 'TX',
      departureDate: '2026-10-24',
      seat: '12F',
      cabin: 'Y',
      gate: '54-A',
      boardingTime: '06:45 AM',
      sequenceNumber: '042',
      rawBarcode
    };
  }
}
