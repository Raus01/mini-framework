import { All } from "./all.js";
import fw from "../fwinstance.js";

let { items } = fw.state.getState();


const ToDos = (attrs = {}, children = []) =>
    fw.dom.createVirtualNode("section", {
        attrs: {
            ...attrs,
        },
        children,
    });


const Input = () => {
    const handleClick = (e) => {
        // Get current items from state
        let { items } = fw.state.getState();
        const checked = e.target.checked;

        items.map((item) => {
            item.completed = checked;
        });

        // also updating the checkboxes in the DOM
        let domCheckboxes = document.getElementsByClassName("toggle");
        for (let checkbox of domCheckboxes) {
            checkbox.checked = checked;
        }
        
        // set state and notify to update DOM
        fw.state.setState({ items });
        fw.events.notify("stateChange");
    };

    let allChecked = items.every(obj => obj.completed);

    return fw.dom.createVirtualNode("input", {
        attrs: { id: "toggle-all", class: "toggle-all", type: "checkbox",...(allChecked && { checked: "true" }),
    },
        children: [],
        listeners: {
            click: handleClick
        }
    });
}

const Label = (attrs = {}, children = []) =>
    fw.dom.createVirtualNode("label", {
        attrs: {
            ...attrs,
        },
        children,
    });


// Export the virtual node with values from the state
export const ToDo = ToDos(
    { class: "main" },
    [Input(),
    Label({ for: "toggle-all" }, ["Mark all as complete"]),
        All]
);