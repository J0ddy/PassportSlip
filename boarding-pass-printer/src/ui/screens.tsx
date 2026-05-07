import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { usePassStore } from '../pass/store';
import { useBleStore } from '../printer/ble';
import { PassRenderer } from '../pass/render';

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
    const devices = await scanForT02(2000);
    if (devices.length > 0) {
      setPrintingStatus('Connecting...');
      await connect(devices[0]!.id);
      setPrintingStatus('Connected!');
    } else {
      setPrintingStatus('No printer found.');
    }
  };

  const handlePrintMock = async (base64Png: string) => {
    if (!connectedDevice) {
      setPrintingStatus('Error: Printer not connected');
      return;
    }

    void base64Png;
    setPrintingStatus('Dithering image...');
    // In real implementation:
    // 1. Decode base64 to RGBA Uint8Array
    // 2. packed = floydSteinberg(rgba, 384, height)
    // 3. frames = buildRasterFrames(packed, 384, height)
    // 4. await writeFrames(connection, [init, ...frames, footer], setProgress)

    setTimeout(() => {
      setPrintingStatus('Printing complete!');
    }, 2000);
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
            <Button title="Print Document" onPress={() => handlePrintMock('mock')} disabled={!connectedDevice} />
          </View>

          <PassRenderer pass={currentPass} />
        </View>
      )}
    </ScrollView>
  );
}
