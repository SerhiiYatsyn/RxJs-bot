import { registry, Bot } from '../bot';
import { currentWeather, WeatherConditions } from './weather.service';
import { pipe } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

export const WEATHER_BOT: Bot = {
  name: 'weather',
  description: 'Responds with current weather in entered city.'
};

registry.addBot(WEATHER_BOT, pipe(
  map(r => r.split(" ")[1]),
  mergeMap(currentWeather),
  map<WeatherConditions, string>(w => `${w.temp}C, ${w.humidity}%, ${w.description}`)
));
