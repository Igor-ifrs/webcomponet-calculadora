/**
 * @type {HTMLTemplateElement}
 */
const calculatorTemplate = document.createElement("template");
calculatorTemplate.innerHTML = /* html */ `
    <wc-display></wc-display>
    <div class="keyboard">
        <wc-button data-pressed="false" data-type="number" data-value="0"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="1"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="2"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="3"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="4"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="5"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="6"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="7"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="8"></wc-button>
        <wc-button data-pressed="false" data-type="number" data-value="9"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="+"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="-"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="x"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="÷"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="C"></wc-button>
        <wc-button data-pressed="false" data-type="operator" data-value="="></wc-button>
    </div>
`;
export default calculatorTemplate;
