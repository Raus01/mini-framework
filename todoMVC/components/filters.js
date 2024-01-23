import fw from "../fwinstance.js";
import { Li } from "./all.js";
import { Ul } from "./all.js";

const A = (attrs = {}, children = [], listeners = {}) =>
  fw.dom.createVirtualNode("a", {
    attrs: {
      ...attrs,
    },
    children,
    listeners,
  });

const routes = fw.router.routes;

const handleSelect = (e) => {
    const links = document.querySelectorAll(".filters a");
    links.forEach((link) => link.classList.remove("selected"));
    e.target.classList.add("selected");
  }

const allLink = Li({}, [
  A({ href: "#"+routes[0].path }, [routes[0].component], {
    click: (e) => handleSelect(e),
  }),
]);

const activeLink = Li({}, [
  A({ href: "#"+routes[1].path }, [routes[1].component], {
    click: (e) => handleSelect(e),
  }),
]);

const completedLink = Li({}, [
  A({ href: "#"+routes[2].path }, [routes[2].component], {
    click: (e) => handleSelect(e),
  }),
]);

export const filters = Ul({ class: "filters" }, [
  allLink,
  activeLink,
  completedLink,
]);
