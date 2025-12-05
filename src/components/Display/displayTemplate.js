/**
 * @type {HTMLTemplateElement}
 */
const displayTemplate = document.createElement("template");
displayTemplate.innerHTML = /* html */ `
    <div>
        <h1>DISPLAY</h1>
        <slot></slot>
    </div>
`;
export default displayTemplate;
