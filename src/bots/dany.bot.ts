import {registry, Bot} from '../bot';
import {delay, map, scan, switchAll, switchMap} from 'rxjs/operators';
import {interval, pipe} from "rxjs";
import {messages$} from "../chat";

export const ADD_BOT: Bot = {
  name: 'dany',
  description: 'Repeats phrase.'
};

registry.addBot(ADD_BOT, pipe(
  pipe(
    switchMap(m =>
      interval(1000).pipe(
        map(i => "I am the Queen 🔥 I need your love 💙")
      ))
  )
));
