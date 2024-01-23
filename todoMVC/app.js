import { Footer } from "./components/footer.js";
import { Header } from "./components/header.js";
import { ToDo } from "./components/todos.js";
import fw from "./fwinstance.js";

const App = (attrs = {}, children = []) =>
    fw.dom.createVirtualNode("section", {
        attrs: {
            ...attrs,
        },
        children,
    });

// Set up the application with imported components
const myApp = App({ id: "app", class: "todoapp" }, [Header, ToDo, Footer]);

// Mount the application to the DOM
fw.dom.mount(document.getElementById("app"), myApp);
