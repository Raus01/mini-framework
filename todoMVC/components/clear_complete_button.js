import fw from "../fwinstance.js";

const handleClick = () => {
  let { items } = fw.state.getState();

  items = items.filter((item) => !item.completed);

  fw.state.setState({ items });
  fw.events.notify("stateChange");
};

const ClearCompleteButton = fw.dom.createVirtualNode("button", {
  attrs: { class: "clear-completed" },
  children: ["Clear completed"],
  listeners: {
    click: handleClick,
  },
});

export default ClearCompleteButton;
