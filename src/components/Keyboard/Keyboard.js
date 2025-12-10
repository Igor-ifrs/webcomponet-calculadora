/**
 * @fileoverview Custom element for a virtual keyboard that handles both
 * click events on its buttons and keyboard keydown events.
 *
 * @author Igor Correa
 * @version 0.0.1
 */

/** @type {HTMLTemplateElement} The HTML template for the keyboard layout. */
import keyboardTemplate from "./keyboardTemplate.js";
/** @type {KeyValidator} Instance responsible for validating and normalizing key presses. */
import KeyValidator from "./KeyValidator.js";
const keyValidator = new KeyValidator();

// ⚠️ WARNING ONLY VITE: CSS import for constructing a new CSSStyleSheet
import CSS from "./keyboard.css?inline";
const keyboardstyle = new CSSStyleSheet();
keyboardstyle.replaceSync(CSS);

/**
 * @class
 * @augments HTMLElement
 * @description Represents a web component keyboard that listens for both physical key presses and button clicks.
 */
class Keyboard extends HTMLElement {
    /** @type {HTMLElement} The HTML container that holds the keyboard buttons and receives event delegation. */
    #keyboardContainer = null;

    /**
     * @constructor
     * Creates the shadow DOM, adopts the stylesheet, renders the template,
     * and gets the reference to the keyboard container.
     */
    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(keyboardstyle);
        root.appendChild(keyboardTemplate.content.cloneNode(true));
        this.#keyboardContainer = root.querySelector(".keyboard_container");
    }

    /**
     * Called when the element is inserted into the DOM.
     * Sets up all event listeners.
     */
    connectedCallback() {
        this.listeners();
    }

    /**
     * Called when the element is removed from the DOM.
     * Cleans up all event listeners to prevent memory leaks.
     */
    disconnectedCallback() {
        this.#keyboardContainer.removeEventListener("click", this.#processKey);
        document.removeEventListener("keydown", this.#processKey);
    }

    /**
     * Dispatches a custom event with the validated key data.
     * The event name is "keyboardValue".
     *
     * @param {string} data - The validated key value (e.g., "A", "Enter", "Backspace").
     */
    dispatchKeyboardEvent(data) {
        const event = new CustomEvent("keyboardValue", {
            detail: {
                data,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /**
     * Processes the key event (click or keydown), validates it using
     * KeyValidator, and dispatches the custom event if valid.
     *
     * @private
     * @param {MouseEvent | KeyboardEvent} event - The click event from the container or the keydown event from the document.
     */
    #processKey = (event) => {
        // console.error(event); // Removed console.error for clean code

        const key = keyValidator.validate(event);
        if (!key) return;

        // Prevent the default browser action (e.g., form submission) when Enter is pressed
        if (key === "Enter") event.preventDefault();

        this.dispatchKeyboardEvent(key);
    };

    /**
     * Attaches the necessary event listeners to the document (keydown)
     * and the keyboard container (click).
     */
    listeners() {
        document.addEventListener("keydown", this.#processKey);
        this.#keyboardContainer.addEventListener("click", this.#processKey);
    }
}

customElements.define("wc-keyboard", Keyboard);
export { Keyboard };
