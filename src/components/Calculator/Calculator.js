import calculatorTemplate from "./calculatorTemplate.js";

import CSS from "./calculator.css?inline"; //⚠️ WARNING ONLY VITE
const calculatorCSS = new CSSStyleSheet();
calculatorCSS.replaceSync(CSS);

/**
 * Calculator - Web Component que gerencia cálculos
 * @class Calculator
 * @extends {HTMLElement}
 */
class Calculator extends HTMLElement {
    #display = null;

    #state = {
        currentInput: "", // O que está sendo digitado agora
        previousValue: null, //Valor anterior para operações
        operation: null, //Operação pendente (+, -, *, /)
        shouldResetInput: false, //Se deve limpar no próximo dígito
    };
    constructor() {
        super();
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(calculatorCSS);
        root.appendChild(calculatorTemplate.content.cloneNode(true));
        this.#display = root.querySelector(".display_value");
    }
    /**
     * Lista de atributos que o componente deve observar
     *
     * @static
     * @returns {string[]} Array com os nomes dos atributos observados.
     */
    static get observedAttributes() {
        return ["memo"];
    }
    /**
     * Inicializa os listeners de eventos
     */
    connectedCallback() {
        this.listeners();
    }
    /**
     * Remove listeners ao desmontar
     */
    disconnectedCallback() {}

    handleValue({ detail: { data } }) {
        console.log(data.type);

        console.log("RECEBIDO NA ENGINE", data);
        this.#state.currentInput += data.value;
        this.setAttribute("memo", this.#state.currentInput);
        this.#display.innerText = this.#state.currentInput;
        //console.error(this.#display.value);
    }

    listeners() {
        this.addEventListener("keyboardValue", this.handleValue);
    }

    /**
     * Callback disparado quando um atributo observado é alterado.
     *
     * Atualmente, este componente foca na atualização via método `update()`,
     * mas o atributo `data-value` pode ser usado para inicialização externa
     * ou sincronização.
     *
     * @memberof Display
     * @param {string} name - Nome do atributo alterado.
     * @param {string|null} oldValue - Valor anterior do atributo.
     * @param {string|null} newValue - Novo valor do atributo.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}
customElements.define("wc-calculator", Calculator);
export { Calculator };

/* 
const initialState = {
    displayValue: "0",
    operator: null,
    firstOperand: null,
    waitingForSecondOperand: false,
    hasDecimalPoint: false,
    chainOperation: false
};

*/
