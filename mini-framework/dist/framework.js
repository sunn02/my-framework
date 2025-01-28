const miniFramework = {
  createElement,
  render
};
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  };
}
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: []
    }
  };
}
function diff(oldElement, newElement) {
  return oldElement.type !== newElement.type || oldElement.props.nodeValue !== newElement.props.nodeValue;
}
function render(element, container, oldElement = null) {
  const children = element.props.children || [];
  // TODO create dom nodes
  const dom = element.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(element.type);
  if (oldElement) {
    if (diff(oldElement, element)) {
      // If diff returns true, we need to replace or update the DOM node
      container.replaceChild(dom, oldElement.dom);
    } else {
      // Otherwise, just update the props (if any)
      Object.keys(element.props).forEach(name => {
        if (name !== "children" && element.props[name] !== oldElement.props[name]) {
          dom[name] = element.props[name];
        }
      });
    }
  }

  //Assign the element props to the node
  const isProperty = key => key !== "children";
  Object.keys(element.props).filter(isProperty).forEach(name => {
    dom[name] = element.props[name];
  });

  // We recursively do the same for each child
  children.forEach((child, index) => {
    const oldChild = oldElement && oldElement.props.children && oldElement.props.children[index];
    render(child, dom, oldChild || null);
  });
  if (!oldElement) {
    container.appendChild(dom);
  }
  element.dom = dom;
}

// Gestion de estado implementando arquitectura flux
// Action Creator --> Dispatcher --> Store --> View 

function createAction(type, payload) {
  return {
    type,
    payload
  };
}
let state = {
  tasks: []
};
function store(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      ;
    default:
      return state;
  }
}
function dispatch(action) {
  const newState = store(state, action);
  state = newState;
  renderApp();
}

//Component
const taskItems = state.tasks.map(task => miniFramework.createElement("li", null, task));
/* @jsx miniFramework.createElement */
const element = miniFramework.createElement("div", {
  id: "foo"
}, miniFramework.createElement("h1", null, "Hello miniFramework!"), miniFramework.createElement("div", {
  id: "add"
}, miniFramework.createElement("input", {
  type: "text",
  id: "taskInput",
  placeholder: "Add a new Task"
}), miniFramework.createElement("button", {
  onClick: handleAddTask
}, "Agregar Tarea")), miniFramework.createElement("ul", null, taskItems));
function handleAddTask() {
  const input = document.getElementById('taskInput');
  console.log(input);
  const task = input.value.trim();
  if (task) {
    dispatch(createAction('ADD_TASK', task));
    input.value = ''; // Limpiar el campo de texto después de agregar la tarea
  }
}

// const element = miniFramework.createElement(
//     "div",
//     { id: "foo" },
//     miniFramework.createElement("a", null, "bar"),
//     miniFramework.createElement("b")
// )

const container = document.getElementById("root");
miniFramework.render(element, container);