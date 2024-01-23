import fw from "../fwinstance.js";
import { uuidv4 } from "../utils.js";

const Input = (attrs = {}, children = [], listeners = {}) =>
    fw.dom.createVirtualNode("input", {
        attrs: {
            ...attrs,
        },
        children,
        listeners,
    });

// Export the virtual node with values from the state
export default Input(
    {
        id: "todo-input",
        class: "new-todo",
        placeholder: "what needs to be done?",
        style: "background: none",
    },
    [""],
    {
        keydown: (e) => {
            var inputValue = document.getElementById("todo-input").value;
            if ((e.code === "Enter" || e.code === "NumpadEnter") && inputValue != "") {
                let item = {
                    id: uuidv4(),
                    title: inputValue,
                    completed: false,
                };

                document.getElementById("todo-input").value = "";

                let { items } = fw.state.getState();

                items.push(item);

                fw.state.setState({ items });

                fw.events.notify("stateChange");
            }
        },
    }
);
