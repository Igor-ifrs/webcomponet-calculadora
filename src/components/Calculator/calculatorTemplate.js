/**
 * @type {HTMLTemplateElement}
 */
const calculatorTemplate = document.createElement("template");
calculatorTemplate.innerHTML = /* html */ `
    <div>
        <h1>MY COMPONENT</h1>
        <slot></slot>
    </div>
`;
export default calculatorTemplate;
