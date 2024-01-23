import fw from "../fwinstance.js";
import { filters } from "./filters.js";
import ClearCompleteButton from "./clear_complete_button.js";

let { items } = fw.state.getState();
let newItemsDone = items.filter((el) => !el.completed);

const MyFooter = (attrs = {}, children = []) =>
  fw.dom.createVirtualNode("footer", {
    attrs: {
      ...attrs,
    },
    children,
  });

const Span = (attrs = {}, children = [], listeners) =>
  fw.dom.createVirtualNode("span", {
    attrs: {
      ...attrs,
    },
    children,
    listeners,
  });

const itemsToDo = Span({ id: "todo-count", class: "todo-count" }, [
  `Items left: ${newItemsDone.length}`,
]);

function handleStateUpdate() {
  // Subscribe to State Change
  let newState = fw.state.getState();
  let newItems = newState.items;

  let newItemsDone = newItems.filter((el) => !el.completed);

  const newItemsToDo = Span({ id: "todo-count", class: "todo-count" }, [
    `Items left: ${newItemsDone.length}`,
  ]);

  // Calculate differences
  const patch = fw.dom.diff(itemsToDo, newItemsToDo);

  // Apply differences to update the actual DOM
  const actualDOMNode = document.getElementById("todo-count");
  patch(actualDOMNode);

  items = newItems;
  itemsToDo.children = newItemsToDo.children;
}

fw.events.subscribe("stateChange", handleStateUpdate);

export const Footer = MyFooter({ class: "footer", style: "display: block;" }, [
  itemsToDo,
  filters,
  ClearCompleteButton,
]);
