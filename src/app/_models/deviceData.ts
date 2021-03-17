export class DeviceData {
    'pm2.5': Data;
    pm10: Data;
}

export class Data{
    ts: number; // unix timestamp
    value: string;
}