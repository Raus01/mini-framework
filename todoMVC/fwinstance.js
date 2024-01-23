import MiniFramework from "../framework/mini-framework.js";

// Define the configuration for the application
let items = [];
let currentRoute = {};

let storedItems = JSON.parse(localStorage.getItem("items"));

if (storedItems != null && storedItems instanceof Array) {
  items = storedItems;
}

const config = {
  initialState: {
    // Initial state for the application
    items,
    currentRoute,
  },
  routes: [
    // Routing information
    {
      path: "/",
      component: "All",
    },
    {
      path: "/active",
      component: "Active",
    },
    {
      path: "/completed",
      component: "Completed",
    },
  ],
};

const fw = new MiniFramework(config);

export default fw;
