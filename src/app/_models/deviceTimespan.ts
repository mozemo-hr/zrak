export class DeviceTimespan {
  deviceId: string;
  pm: Pm[];
}

export class Pm {
  pm25: number;
  pm10: number;
  measureTime: number; // unix timestamp
}
