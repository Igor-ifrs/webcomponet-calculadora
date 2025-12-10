/**
 * @type {HTMLTemplateElement}
 */
const keyboardTemplate = document.createElement("template");
keyboardTemplate.innerHTML = /* html */ `
<div class="keyboard_container">
    <button class="base_button" style="--area:zero" data-type="number" value="0">0</button>
    <button class="base_button" style="--area:um" data-type="number" value="1">1</button>
    <button class="base_button" style="--area:dois" data-type="number" value="2">2</button>
    <button class="base_button" style="--area:tres" data-type="number" value="3">3</button>
    <button class="base_button" style="--area:quatro" data-type="number" value="4">4</button>
    <button class="base_button" style="--area:cinco" data-type="number" value="5">5</button>
    <button class="base_button" style="--area:seis" data-type="number" value="6">6</button>
    <button class="base_button" style="--area:sete" data-type="number" value="7">7</button>
    <button class="base_button" style="--area:oito" data-type="number" value="8">8</button>
    <button class="base_button" style="--area:nove" data-type="number" value="9">9</button>
    <button class="base_button" style="--area:plus" data-type="operator" value="+">+</button>
    <button class="base_button" style="--area:menos" data-type="operator" value="-">-</button>
    <button class="base_button" style="--area:mult" data-type="operator" value="*">x</button>
    <button class="base_button" style="--area:divs" data-type="operator" value="/">÷</button>
    <button class="base_button" style="--area:clear" data-type="operator" value="Delete">AC</button>
    <button class="base_button" style="--area:igual" data-type="operator" value="=">=</button>
    <button class="base_button" style="--area:ponto" data-type="operator" value=".">.</button>
    <button class="base_button" style="--area:percent" data-type="operator" value="!">||</button>
    <button class="base_button" style="--area:double" data-type="operator" value="#">##</button>
</div>
`;
export default keyboardTemplate;
/* <button class="base_button" style="--area:double" value=**>##</button> */
