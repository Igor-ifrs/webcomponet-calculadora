/**
 * @type {HTMLTemplateElement}
 */
const calculatorTemplate = document.createElement("template");
calculatorTemplate.innerHTML = /* html */ `
    <div class="display_container">
        <span class="display_value">DISPLAY</span>
        <span class="umbra"></span>
    </div>
    <wc-keyboard></wc-keyboard>
`;
export default calculatorTemplate;
