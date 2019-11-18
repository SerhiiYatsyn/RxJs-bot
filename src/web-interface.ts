import {newMessage$, Message, send} from './chat';
import {fromEvent, pipe} from 'rxjs';
import {registry, Bot} from './bot';
import {currentWeather, WeatherConditions} from "./bots/weather.service";
import {debounceTime, distinctUntilChanged, map, mergeMap, switchMap} from "rxjs/operators";

const botListEl = document.querySelector('dl');

registry.explore({
  header(text: string) {
    document.querySelector('h2').innerText = text;
  },
  describe(b: Bot) {
    botListEl.innerHTML += `<dt>@${b.name}</dt><dd>${b.description}</dd>`;
  }
});

const messageListEl: Element = document.querySelector('#messages');
const formEl: HTMLFormElement = document.querySelector('#message-entry') as HTMLFormElement;
const messageInputEl = document.querySelector('input[name="message"]') as HTMLInputElement;
const dataList = document.querySelector('#huge_list') as HTMLInputElement;

messageInputEl.addEventListener("keyup", () => {
  let enteredCommand: string = messageInputEl.value.split(" ")[0];
  let enteredCity: string = messageInputEl.value.split(" ")[1];

  if (enteredCommand == '@weather' && enteredCity.length > 2) {
    // getCities(enteredCity);
    // autocomplete();
  }

});

function getCities(enteredCity: string) {
  dataList.innerHTML = "";
  return fetch(`http://localhost:5000/cities/`)
    .then(r => r.json())
    .then(extractCities)
    .then(r => {
      // console.log(r);
      r.forEach(e => {
        if (e.startsWith(enteredCity)) {
          // console.log(e);
          dataList.innerHTML += `<option value="@weather ${e}"></option>`;
        }
      })
    })
}

fromEvent(messageListEl, 'keyup').pipe(
  map(e => console.log(e)))
// debounceTime(200),
// distinctUntilChanged,
// switchMap(getData)
// ).subscribe((d:string) => dataList.innerHTML += `<option value="@weather ${d}"></option>`)

function getData() {
  return fetch(`http://localhost:5000/cities/`)
    .then(r => r.json())
    .then(extractCities)
}

function extractCities(res: string[]) {
  return res;
}


function appendMessage(m: Message) {
  let li = document.createElement('li');
  li.innerText = m.print();
  messageListEl.appendChild(li);
}

newMessage$
  .subscribe(appendMessage);

fromEvent<Event>(formEl, 'submit')
  .subscribe(e => {
    e.preventDefault();
    send(messageInputEl.value)
    formEl.reset();
  });
