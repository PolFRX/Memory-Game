// TODO Step 6 import "./welcome.component.html"
import { Component } from "../../utils/component"
import template from "./welcome.component.html";
import "./welcome.component.scss";


    // TODO Step 3.1 create a class
    /* class WelcomeComponent constructor  */
    export class WelcomeComponent extends Component {
        constructor() {
            super("Welcome");
        }

        init() {
            const form = document.querySelector('form.form-signin');

            form.addEventListener('submit', function(event) {     // TODO Step 3.2: use arrow function

                event.preventDefault();
                if (form.checkValidity() === false) {
                    event.stopPropagation();
                    form.classList.add('was-validated');
                } else {
                    let name = event.srcElement.querySelector('#nickname').value;
                    let size = parseInt(event.srcElement.querySelector('#size').value);

                    _startGame(name, size);
                }
            }, false);

            return this;
        }

        getTemplate() {
            return template;
        }

    }

    // TODO Step 6 implement getTemplate() {}

    function _startGame(name, size) {
        // TODO Step 3.2: use template literals
        // TODO Step 6: change path to: `game?name=${name}=name&size=${size}`
        window.location.hash = `game?name=${name}&size=${size}`;
    }

    // put component in global scope, tu be runnable right from the HTML.