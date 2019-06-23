// TODO Step 6 import "./score.component.html"
import { Component } from "../../utils/component";
import { parseUrl } from "../../utils/utils";
import template from "./score.component.html";
import "./score.component.css";

    // TODO Step 3.1 create a class
    /* class ScoreComponent constructor */
    export class ScoreComponent extends Component{
        constructor() {
            super("Score");
            const params = parseUrl();
            this.name = params.name;
            this.size = parseInt(params.size);
            this.time = parseInt(params.time);
        }

        init() {
            document.getElementById('name').innerText = this.name;
            document.getElementById('size').innerText = this.size;
            document.getElementById('time').innerText = this.time;
        }

        getTemplate() {
            return template;
        }
    }

    /* method ScoreComponent.init */

    // TODO Step 6 implement getTemplate() {}

    // put component in global scope, tu be runnable right from the HTML.
