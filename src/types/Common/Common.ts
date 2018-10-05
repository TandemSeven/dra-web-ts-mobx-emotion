import { ForecastHourly, LocationDetails } from '../';

export interface CurrentLocationAndWeather
  extends ForecastHourly,
    LocationDetails {}
