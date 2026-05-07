import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { usePassStore } from '../pass/store';
import { useBleStore } from '../printer/ble';
import { PassRenderer } from '../pass/render';
import { buildInitFrame, buildRasterFrames, buildFooterFrame, packPixelsTo1Bit } from '../printer/protocol';
import { writeFrames } from '../printer/transport';
import { floydSteinberg } from '../pass/dither';

export function Home() {
  const { currentPass, setPassFromBarcode, clearPass } = usePassStore();
  const { connectedDevice, scanForT02, connect, isScanning } = useBleStore();
  const [printingStatus, setPrintingStatus] = useState<string>('');

  const handleScanMock = () => {
    // A mock raw barcode for a Format M BCBP
    const mockBarcode = "M1DESMARAIS/LUC       E1AAAAA GVAJFKBA 0123 117Y012A0001 349>2180 W2345B 29      ";
    setPassFromBarcode(mockBarcode);
  };

  const handleConnectMock = async () => {
    setPrintingStatus('Scanning for T02...');
    try {
      const devices = await scanForT02(2000);
      if (devices.length > 0) {
        setPrintingStatus('Connecting...');
        await connect(devices[0]!.id);
        setPrintingStatus('Connected!');
      } else {
        setPrintingStatus('No printer found.');
      }
    } catch (e) {
      setPrintingStatus('Connection failed.');
    }
  };

  const handlePrintMock = async (base64Png: string) => {
    if (!connectedDevice) {
      setPrintingStatus('Error: Printer not connected');
      return;
    }

    setPrintingStatus('Dithering image...');

    try {
        // Mock processing steps using actual algorithm functions

        // 1. Simulate mock RGBA image bytes (384 x 100 pixels = 153,600 bytes)
        const mockWidth = 384;
        const mockHeight = 100;
        const mockRgbaBytes = new Uint8Array(mockWidth * mockHeight * 4);
        // Fill it with a simulated image pattern
        mockRgbaBytes.fill(255);
        for(let i=0; i<mockRgbaBytes.length; i+=4) {
            if (Math.random() > 0.5) {
                mockRgbaBytes[i] = 0;
                mockRgbaBytes[i+1] = 0;
                mockRgbaBytes[i+2] = 0;
                mockRgbaBytes[i+3] = 255;
            }
        }

        // 2. Dither and pack image
        const packed = floydSteinberg(mockRgbaBytes, mockWidth, mockHeight);

        // 3. Build protocol frames
        setPrintingStatus('Building printer frames...');
        const initFrame = buildInitFrame();
        const rasterFrames = buildRasterFrames(packed, mockWidth, mockHeight);
        const footerFrame = buildFooterFrame();

        // 4. Transport execution over BLE
        setPrintingStatus('Sending to printer...');
        // Mock connection mock write stream
        const connection = await connect(connectedDevice.id);

        await writeFrames(connection, [initFrame, ...rasterFrames, footerFrame], (progress) => {
             setPrintingStatus(`Printing... ${Math.round(progress * 100)}%`);
        });

        setPrintingStatus('Printing complete!');
    } catch (error) {
        console.error(error);
        setPrintingStatus('Printing failed: ' + error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF', padding: 24 }}>
      <View style={{ marginBottom: 24, padding: 12, backgroundColor: '#F8F8F8', borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>Printer Status</Text>
        <Text>{connectedDevice ? `Connected to ${connectedDevice.name}` : 'Not connected'}</Text>
        {printingStatus ? <Text style={{ color: 'blue', marginTop: 8 }}>{printingStatus}</Text> : null}

        {!connectedDevice && (
          <Button title={isScanning ? "Scanning..." : "Connect T02"} onPress={handleConnectMock} disabled={isScanning} />
        )}
      </View>

      {!currentPass ? (
        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Scan Boarding Pass</Text>
          <Button title="Mock Camera Scan" onPress={handleScanMock} />
        </View>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            <Button title="Clear" onPress={clearPass} color="gray" />
            <Button title="Print Document" onPress={() => handlePrintMock('mock_base64_png')} disabled={!connectedDevice} />
          </View>

          <PassRenderer pass={currentPass} />
        </View>
      )}
    </ScrollView>
  );
}
