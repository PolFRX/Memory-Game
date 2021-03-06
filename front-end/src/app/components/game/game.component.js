// TODO Step 6 import "./game.component.html"
import { parseUrl} from "../../utils/utils";
import { Component } from "../../utils/component";
import template from "./game.component.html";
import { CardComponent } from "./card/card.component";

const environment = {
    api: {
        host: 'http://localhost:8081'
    }
};

    // TODO Step 3.1 create a class
    /* class GameComponent constructor */
    export class GameComponent extends Component {
        constructor() {
            super("Game");
            // gather parameters from URL
            const params = parseUrl();

            // save player name & game ize
            this._name = params.name;
            this._size = parseInt(params.size) || 9;
            this._flippedCard = null;
            this._matchedPairs = 0;
        }

        async init() {
            // fetch the cards configuration from the server
            const config = await this.fetchConfig();

            this._config = config;

            // create a card out of the config
            this._cards = this._config.ids.map(item => new CardComponent(item));

            this._boardElement = document.querySelector('.cards');

            this._cards.forEach((item) => {
                this._boardElement.appendChild(item.getElement());
                item.getElement().addEventListener('click', () => {
                    this._flipCard(item)
                });
            });

            this.start();
        }

        start() {
            this._startTime = Date.now();
            let seconds = 0;
            // TODO Step 3.2: use template literals
            document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;

            this._timer = setInterval(() => { // TODO Step 3.2: use arrow function
                // TODO Step 3.2: use template literals
                document.querySelector('nav .navbar-title').textContent = `Player: ${this._name}. Elapsed time: ${seconds++}`;
            }, 1000);
        }

        gotoScore() {
            const timeElapsedInSeconds = Math.floor((Date.now() - this._startTime) / 1000);
            clearInterval(this._timer);

            setTimeout(() => {  // TODO Step 3.2: use arrow function.
                // TODO Step 1: replace with score.component location
                // TODO Step 3.2: use template literals
                // TODO Step 6: change path to: `score?name=${this._name}&size=${this._size}'&time=${timeElapsedInSeconds}`;
                window.location.hash = `score?name=${this._name}&size=${this._size}&time=${timeElapsedInSeconds}`;
            }, 750);    // TODO Step 3.2: Why bind(this)?
        }

        async fetchConfig(cb) {
            /*const xhr = typeof XMLHttpRequest != 'undefined'
                ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');

            // TODO Step 3.2 use template literals
            xhr.open('get', environment.api.host + '/board?size=' + this._size, true);

            // TODO Step 3.2 use arrow function
            xhr.onreadystatechange = () => {
                let status;
                let data;
                // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
                if (xhr.readyState == 4) { // `DONE`
                    status = xhr.status;
                    if (status == 200) {
                        data = JSON.parse(xhr.responseText);
                        cb(data);
                    } else {
                        throw new Error(status)
                    }
                }
            };
            xhr.send();*/

            return fetch(`${environment.api.host}/board?size=${this._size}`, {method: 'GET'})
                .then(response => response.json())
                .catch(error => console.log('Fetch config error', error));

        }

        _flipCard(card) {
            if (this._busy) {
                return;
            }

            if (card.flipped) {
                return;
            }


            // flip the card
            card.flip();

            // if flipped first card of the pair
            if (!this._flippedCard) {
                // keep this card flipped, and wait for the second card of the pair
                this._flippedCard = card;
            } else {
                // second card of the pair flipped...

                // if cards are the same
                if (card.equals(this._flippedCard)) {
                    this._flippedCard.matched = true;
                    card.matched = true;
                    this._matchedPairs += 1;

                    // reset flipped card for the next turn.
                    this._flippedCard = null;

                    if (this._matchedPairs === this._size) {
                        this.gotoScore();
                    }
                } else {
                    this._busy = true;

                    // cards did not match
                    // wait a short amount of time before hiding both cards
                    // TODO Step 3.2 use arrow function
                    setTimeout(() => {
                        // hide the cards
                        this._flippedCard.flip();
                        card.flip();
                        this._busy = false;

                        // reset flipped card for the next turn.
                        this._flippedCard = null;
                    }, 500);
                }
            }
        }

        getTemplate() {
            return template;
        }
    }

    // TODO Step 6 implement getTemplate() {}

