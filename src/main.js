import "./components/index.js";
import "./styles/global.css";

const button = document.querySelector("wc-button");
button.addEventListener("button-click", (e) => {
    console.log(e.detail); // { value: "0", type: "number" }
});
