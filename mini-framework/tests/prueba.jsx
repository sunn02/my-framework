import { miniFramework } from "./src/framework copy"

const element1 = <h1 title="foo">Hello</h1> // defines a React element w JSX, internamente se transforma con Babel a React.createElement
const container = document.getElementById("root") // gets a node from the DOM
ReactDOM.render(element1, container) // renders the React element into the container


const element2 = React.createElement( // defines an element w React
    "h1",
    { title: "foo" },
    "Hello"
)
// an element with two properties: types and props, type is a string that specifies the type of the element, 
// props is an object that contains the attributes of the element, an special property is: children
// which is an array of elements
const container2 = document.getElementById("root")
ReactDOM.render(element2, container) // render is where React changes the DOM 

//------------------------------------------------------------------------------------------------------

const element = {
    type: "h1",
    props: {
        title: "foo",
        children: "Hello",
    }
}

const node = document.createElement(element.type)
node["title"] = element.props.title

const text = document.createTextNode("") //text node
text["nodeValue"] = element.props.children

node.appendChild(text)
container.appendChild(node)


//------------------------------------------------------------------------------------------------------

// writing our own createElement
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children,
        }
    }
}
//we use the spread operator for the props and the rest for the children, this way the children prop will always 
// be an array

//the children array could also contain primitive values lie string and numbrer
function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        },
    }
}

const element4 = miniFramework.createElement(
    "div",
    { id: "foo" },
    miniFramework.createElement("a", null, "bar"),
    miniFramework.createElement("b")
)

