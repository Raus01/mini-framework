import fw from "../fwinstance.js";
// Create a functional component for the button
const LiCheckbox = (itemId) => {
    // Click event handler for the button
    const handleClick = (e) => {
        const clickedId = e.target.dataset.id;
        const checked = e.target.checked;

        // Not needed, because we are using the state to update the DOM
       /*  if (checked) {
            e.target.parentElement.parentElement.classList.add("completed");
        } else {
            e.target.parentElement.parentElement.classList.remove("completed");
        } */

        let { items } = fw.state.getState();

        items.map((item) => {
            if (item.id == clickedId) {
                item.completed = checked;
            }
        });

        fw.state.setState({ items });
        fw.events.notify("stateChange");
    };

    let { items } = fw.state.getState();

    let result = items.filter((obj) => {
        return obj.id === itemId;
    });

    let item = result[0];

    // Define the button as a virtual node
    const liCheckbox = fw.dom.createVirtualNode("input", {
        attrs: {
            class: "toggle",
            "data-id": itemId,
            type: "checkbox",
            ...(item.completed && { checked: "true" }),
        },
        children: [""],
        listeners: {
            click: handleClick,
        },
    });

    return liCheckbox;
};

export default LiCheckbox;
