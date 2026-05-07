export type BoardingPass = {
  passengerName: string;
  pnr: string;            // booking reference
  from: string;           // IATA code
  to: string;
  flightNumber: string;
  carrierIATA: string;
  departureDate: string;  // ISO
  departureTime?: string; // HH:mm if known
  seat?: string;
  cabin?: string;
  gate?: string;
  boardingTime?: string;
  sequenceNumber?: string;
  rawBarcode: string;     // original BCBP string — must be preserved verbatim for the reprinted barcode
};
