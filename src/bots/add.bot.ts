import {registry, Bot} from '../bot';
import {delay, map, scan} from 'rxjs/operators';
import {pipe} from "rxjs";

export const ADD_BOT: Bot = {
  name: 'add',
  description: 'Sums your numbers.'
};
let findNumber = (message: string): number => +message.split(' ')[1];
let append = (list: number[], elem: number) => [...list, elem];
let joinExpression = (list: number[]): string => {
  let sum = list.reduce((sum, current) => sum + current);
  let result = list.join(' + ');
  result = 0 + " + " + result + " = " + sum;
  return result;
};
registry.addBot(ADD_BOT, pipe(
  map(findNumber),
  scan(append, []),
  map(joinExpression)
));
