// TODO Step 6 import "./card.component.html"
import { Component } from "../../../utils/component";
import "./card.component.scss";
import template from "./card.component.html";


// TODO Step 3.1 create a class
    /* class CardComponent constructor */
    export class CardComponent extends Component {
        constructor(id) {
            super("Card");
            // is this card flipped ?
            this._flipped = false;

            // has the matching card has been discovered already ?
            this.matched = false;

            this._id = id;

            const elt = super.getElement();
            this._imageElt = elt.querySelector('.card-wrapper');
            this._imageElt.querySelector('img.front-face').src = `src/app/components/game/card/assets/card-${this._id}.png`;
            this._imageElt.querySelector('img.back-face').src = 'src/app/components/game/card/assets/back.png';

        }

        getElement() {
            return this._elt;
        }

        flip() {
            this._imageElt.classList.toggle('flip');
            this._flipped = !this._flipped;
        }

        equals(card) {
            return card._id === this._id;
        }

        get flipped() {
            return this._flipped
        }

        getTemplate() {
            return template;
        }
    }

    // TODO Step 6 implement getTemplate() {}


    // put component in global scope, tu be runnable right from the HTML.
