import fw from "../fwinstance.js";
import Input from "./input.js";

const H1 = (attrs = {}, children = []) =>
    fw.dom.createVirtualNode("h1", {
        attrs: {
            ...attrs,
        },
        children,
    });

const MyHeader = (attrs = {}, children = []) =>
    fw.dom.createVirtualNode("header", {
        attrs: {
            ...attrs,
        },
        children,
    });

// Export the virtual node with values from the state
export const Header = MyHeader({ class: "header" }, [H1({}, ["todos"]), Input]);
