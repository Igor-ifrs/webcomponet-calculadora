import CSS from "./keyboard.css?inline";
import keyboardTemplate from "./keyboardTemplate.js";

const keyboardStyle = new CSSStyleSheet();
keyboardStyle.replaceSync(CSS);

class Keyboard extends HTMLElement {
    #keyboardContainer = null;
    #buttons = null;
    #boundHandleClick = null;
    #boundOnKeyDown = null;
    #isConnected = false;

    constructor() {
        super();

        // Inicializa o Shadow DOM
        const root = this.attachShadow({ mode: "open" });
        root.adoptedStyleSheets.push(keyboardStyle);
        root.appendChild(keyboardTemplate.content.cloneNode(true));

        // Valida elementos críticos
        this.#keyboardContainer = root.querySelector(".keyboard-container");
        if (!this.#keyboardContainer) {
            console.error("Keyboard: Container não encontrado no template");
            return;
        }

        this.#buttons = [...root.querySelectorAll("button")];

        // Cria versões bound dos métodos para poder remover depois
        this.#boundHandleClick = this.handleClick.bind(this);
        this.#boundOnKeyDown = this.onKeyDown.bind(this);
    }

    connectedCallback() {
        if (!this.#keyboardContainer) return;
        this.addListeners();
    }

    disconnectedCallback() {
        this.removeListeners();
    }

    // Remove ou simplifica este método - raramente necessário
    adoptedCallback() {
        // Na maioria dos casos, não precisa fazer nada aqui
    }

    /**
     * Converte valor baseado no tipo especificado
     * @param {Object} values - Objeto com os valores do dataset
     * @returns {Object} - Objeto com valor convertido
     */
    convertValue(values) {
        if (values.type !== "number") {
            return { ...values };
        }

        const numericValue = Number(values.value);

        if (isNaN(numericValue)) {
            console.warn(`Keyboard: Valor não numérico encontrado: "${values.value}"`);
            return { ...values }; // Retorna sem conversão em caso de erro
        }

        return { ...values, value: numericValue };
    }

    /**
     * Despacha evento customizado com os dados do botão
     * @param {Object} data - Dados a serem enviados no evento
     */
    dispatchKeyboardEvent(data) {
        const event = new CustomEvent("sendValue", {
            detail: { typeValue: data },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }

    /**
     * Processa o clique ou pressionamento de tecla
     * @param {HTMLElement} element - Elemento do botão
     */
    processButtonAction(element) {
        this.applyClickEffect(element);

        const values = { ...element.dataset };
        const convertedValue = this.convertValue(values);

        this.dispatchKeyboardEvent(convertedValue);
    }

    /**
     * Handler para eventos de click
     * @param {Event} event - Evento de click
     */
    handleClick(event) {
        if (event.target.tagName !== "BUTTON") return;
        this.processButtonAction(event.target);
    }

    /**
     * Handler para eventos de teclado
     * @param {KeyboardEvent} event - Evento de teclado
     */
    onKeyDown(event) {
        // Previne comportamento padrão do Enter em formulários
        if (event.key === "Enter") {
            event.preventDefault();
        }

        // Procura botão correspondente à tecla pressionada
        const matchingButton = this.#buttons.find(({ dataset }) => {
            const allowedKeys = dataset.value.split("|");
            return allowedKeys.includes(event.key);
        });

        if (matchingButton) {
            this.processButtonAction(matchingButton);
        }
    }

    /**
     * Adiciona event listeners
     */
    addListeners() {
        if (this.#isConnected) return; // Previne listeners duplicados
        document.addEventListener("keydown", this.#boundOnKeyDown);
        this.#keyboardContainer.addEventListener("click", this.#boundHandleClick);
        this.#isConnected = true;
    }

    /**
     * Remove event listeners
     */
    removeListeners() {
        if (!this.#isConnected) return;

        document.removeEventListener("keydown", this.#boundOnKeyDown);
        this.#keyboardContainer.removeEventListener("click", this.#boundHandleClick);
        this.#isConnected = false;
    }
}

customElements.define("wc-keyboard", Keyboard);
