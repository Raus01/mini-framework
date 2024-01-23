import fw from "../fwinstance.js";
import LiCheckbox from "./li_checkbox.js";
import DeleteButton from "./delete_button.js";

let { items } = fw.state.getState();

export const Ul = (attrs = {}, children = []) =>
  fw.dom.createVirtualNode("ul", {
    attrs: {
      ...attrs,
    },
    children,
  });

const LiDiv = (attrs = {}, children = []) =>
  fw.dom.createVirtualNode("div", {
    attrs: {
      ...attrs,
    },
    children,
  });

export const Li = (attrs = {}, children = []) =>
  fw.dom.createVirtualNode("li", {
    attrs: {
      ...attrs,
    },
    children,
  });

const handleDoubleClick = (e) => {
  const label = e.target;
  label.style.display = "none";

  const input = document.createElement("input");
  input.value = label.textContent;
  input.classList.add("edit");

  const liElement = label.closest("li");
  liElement.classList.add("editing");

  liElement.appendChild(input);

  input.focus();

  let inputReplaced = false;
  let originalText = label.textContent;

  const itemId = label.id;

  input.onkeydown = function (event) {
    if (event.key === "Enter" && !inputReplaced) {
      label.textContent = this.value;
      label.style.display = "";
      this.style.display = "none";
      inputReplaced = true;

      const newTitle = this.value;

      if (newTitle !== originalText) {
        items = items.map((item) => {
          if (item.id === itemId) {
            return { ...item, title: newTitle };
          }
          return item;
        });

        fw.state.setState({ items });
      }

      input.classList.remove("edit");
    }
  };

  input.onblur = function () {
    const newTitle = this.value;

    if (!inputReplaced) {
      label.textContent = newTitle;
      label.style.display = "";
      this.remove();
    }

    liElement.classList.remove("editing");
    input.classList.remove("edit");

    if (newTitle !== originalText) {
      items = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, title: newTitle };
        }
        return item;
      });

      fw.state.setState({ items });
    }
  };
};

const Label = (attrs = {}, children = [], listeners = {}) =>
  fw.dom.createVirtualNode("label", {
    attrs: {
      ...attrs,
    },
    children,
    listeners,
  });

const ListTemplate = (arr) =>
  Ul(
    { id: "items", class: "todo-list" },
    arr.map((item) => {
      return Li(
        { id: item.id, class: item.completed ? "completed" : item.class },
        [
          LiDiv({ class: "view" }, [
            LiCheckbox(item.id),
            Label({ id: item.id }, [item.title], {
              dblclick: handleDoubleClick,
            }),
            DeleteButton(item.id),
          ]),
        ]
      );
    })
  );

const DiffApply = (arr) => {
  const newList = ListTemplate(arr);

  // Calculate differences
  const patch = fw.dom.diff(All, newList);

  // Apply differences to update the actual DOM
  const actualDOMNode = document.getElementById("items");
  patch(actualDOMNode);

  // Also update the checkboxes as they will not be patched
  let domCheckboxes = document.getElementsByClassName("toggle");
  for (let checkbox of domCheckboxes) {
    let itemId = checkbox.dataset.id;
    let result = arr.filter((obj) => {
      return obj.id === itemId;
    });
    if (result.length === 0) {
      // skip if the item is not found (filtered out)
      continue;
    }
    let item = result[0];
    checkbox.checked = item.completed;
  }

  // Update the virtual node with the new values
  All.children = newList.children;
};

fw.events.subscribe("stateChange", () => {
  let { items: newItems } = fw.state.getState();

  DiffApply(filteredItems(newItems));

  items = newItems;
});

fw.events.subscribe("routeChange", () => {
  let { items } = fw.state.getState();
  
  DiffApply(filteredItems(items));
});

const filteredItems = (items) => {
  let { currentRoute } = fw.state.getState();
  switch (currentRoute.component) {
    case "Active":
      return items.filter((item) => item.completed === false);
    case "Completed":
      return items.filter((item) => item.completed === true);
    default:
      return items;
  }
}

export const All = ListTemplate(items);
