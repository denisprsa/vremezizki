export default class WeatherError extends Error {
    data: Error;
    statusCode: number | undefined;
  
    constructor(message = 'Oops, something went wrong (undocumented error).', data: Error, statusCode?: number) {
        super(message);
        this.data = data;
        this.statusCode = statusCode;
    }
}
