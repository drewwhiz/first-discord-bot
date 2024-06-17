export interface IWeather {
    location: {
        name: string;
        region: string;
    };
    current: {
        temp_c: number;
        temp_f: number;
        humidity: number;
    };
}