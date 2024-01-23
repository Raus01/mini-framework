import fw from "../fwinstance.js";

const DeleteButton = (itemId) => {
    const handleClick = (e) => {
        itemId = e.target.dataset.id
        let {items} = fw.state.getState()

        items = items.filter(function (obj) {
            return obj.id !== itemId;
        });

        fw.state.setState({ items });
        fw.events.notify("stateChange");
    };

    return fw.dom.createVirtualNode("button", {
        attrs: { class: "destroy", "data-id": itemId },
        children: [],
        listeners: {
            click: handleClick,
        },
    });
};

export default DeleteButton;
