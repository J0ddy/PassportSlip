import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BoardingPass } from './types';

// Native skia mock for browser/simulator environments where Skia native might break.
// In a real device environment, you would use:
// import { Skia, Canvas, Rect, Text as SkText, useFont } from '@shopify/react-native-skia';

interface PassRendererProps {
  pass: BoardingPass;
  onRenderComplete?: (base64Png: string) => void;
}

export function PassRenderer({ pass, onRenderComplete }: PassRendererProps) {
  // A robust Skia implementation would utilize an offscreen Surface
  // Skia.Surface.Make(384, height) and encode it to PNG.
  // For the simulator UI, we'll build a React Native view that resembles the design.

  useEffect(() => {
    // Simulate generation of Skia surface to base64 PNG
    if (onRenderComplete) {
      setTimeout(() => {
        onRenderComplete("mock_base64_png_data");
      }, 500);
    }
  }, [pass, onRenderComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.cutLine} />

      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.label}>FLIGHT</Text>
            <Text style={styles.h3}>{pass.carrierIATA}{pass.flightNumber}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>TERMINAL</Text>
            <Text style={styles.h3}>-</Text>
          </View>
        </View>

        <View style={styles.heroRow}>
          <View>
            <Text style={styles.h1}>{pass.from}</Text>
          </View>
          <Text style={styles.icon}>✈</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.h1}>{pass.to}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View>
            <Text style={styles.label}>PASSENGER</Text>
            <Text style={styles.bodyBold}>{pass.passengerName}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>GATE</Text>
            <Text style={styles.bodyBold}>{pass.gate || 'TBD'}</Text>
          </View>
          <View>
            <Text style={styles.label}>SEAT</Text>
            <Text style={styles.bodyBold}>{pass.seat || 'UNASSIGNED'}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.label}>BOARDING</Text>
            <Text style={styles.bodyBold}>{pass.boardingTime || 'TBD'}</Text>
          </View>
        </View>

        <View style={styles.barcodeContainer}>
          {/* Real implementation would use pdf417-generator here to draw the barcode */}
          <View style={styles.mockBarcode} />
          <Text style={styles.codeText}>{pass.rawBarcode.substring(0, 20)}...</Text>
        </View>
      </View>

      <View style={styles.cutLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 384,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  cutLine: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    marginVertical: 8,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: '#AAAAAA',
    textTransform: 'uppercase',
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 28,
  },
  h1: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#000',
  },
  icon: {
    fontSize: 24,
    color: '#AAAAAA',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 28,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  barcodeContainer: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 12,
  },
  mockBarcode: {
    width: '100%',
    height: 96,
    backgroundColor: '#333',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    color: '#AAAAAA',
  }
});
