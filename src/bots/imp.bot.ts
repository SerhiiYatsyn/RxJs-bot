import {registry, Bot} from '../bot';
import {delay, map, scan, switchAll, switchMap, throttleTime} from 'rxjs/operators';
import {interval, pipe} from "rxjs";
import {messages$} from "../chat";

export const IMP_BOT: Bot = {
  name: 'imp',
  description: 'stays drunk for 5 seconds, he is don’t mind to drink, when he is fresh. each 3 drinks he says a random not said joke and then repeats \n.'
};

let jokes: string[] = [
  "Программисты на работе общаются двумя фразами: «непонятно» и «вроде работает».\n",
  "Работа программиста и шамана имеет много общего — оба бормочут непонятные слова, совершают непонятные действия и не могут объяснить, как оно работает. \n",
  "Из форума программистов: — Помогитенеработаетпробел!!! — Настоящие_программисты_пробелами_не_пользуются.\n"
];

let jokesState: number = 0;

registry.addBot(IMP_BOT,
  pipe(
    throttleTime(5000),
    map((command, index) => {
      if (jokesState == jokes.length) jokesState = 0;
      if ((index + 1) % 3 == 0) {
        return jokes[jokesState++];
      } else return ("drink " + (index + 1) % 3 + " times");
    })
  ));
