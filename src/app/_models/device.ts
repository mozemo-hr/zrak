export class Device {
  deviceId: string;
  name: string;
  city: string;
  source: string;
  x?: number; // WGS84
  y?: number; // WGS84
  pm10: number;
  pm25: number;
  label: string;
  lastMeasureTime: number;
}
