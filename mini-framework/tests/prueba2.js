const miniFramework = {
    createElement,
    render,
  }

  function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
              typeof child === 'object' ? child : createTextElement(child)
            ),
        }
    }
  }

  function createTextElement(text){
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        },
    }
  }

  function createAction(type, payload) {
    return { type, payload };
  }

  let state = {
    tasks: []
  }

  function store(state, action){
    switch (action.type){
      case 'ADD_TASK':
        const newState = { ...state, tasks: [...state.tasks, action.payload] };
        console.log("Updated state:", newState); 
        return newState;
      default:
        return state;
    }
  }

  function dispatch(action){
    console.log("Disparando acción:", action);
    const newState = store(state, action)
    state = newState
    console.log("Current tasks:", state.tasks);
    renderApp()
    }

  function render(frameworkEl, container) {
    if (!container) return;
    console.log("Renderizando...");
    console.log("Virtual DOM", frameworkEl);

    if (!container._virtualDOM) {
      container._virtualDOM = null;
    }

    diff(container._virtualDOM, frameworkEl, container);
    container._virtualDOM = frameworkEl; // Store the new virtual DOM for diffing later
  }

  function createRealDOM(node) {
    console.log("Creando nodo:", node);
    if (node.type === "TEXT_ELEMENT"){
      return document.createTextNode(node.props.nodeValue);
    }

    const domElement = document.createElement(node.type);

    if (node.props) {
      Object.keys(node.props).forEach((prop) => {
        if (prop.startsWith('on')) {
          const event = prop.substring(2).toLowerCase();
          domElement.addEventListener(event, node.props[prop]);
        } else if (prop !== 'children') {
          domElement[prop] = node.props[prop];
        }
      });

      if (node.props.children) {
        node.props.children.forEach(child => {
          const childNode = createRealDOM(child);
          if (childNode) {
            domElement.appendChild(childNode);
          }
        });
      }
    }

    return domElement;
  }

  function diff(oldNode, newNode, container) {
    console.log("Comprobando cambios...");
    console.log("Nodo anterior:", oldNode);
    console.log("Nodo nuevo:", newNode);
    if (!oldNode && newNode) {
      container.appendChild(createRealDOM(newNode));
      console.log("Nodo añadido al contenedor.");
      return;
    }

    if (!newNode) {
      container.removeChild(oldNode);
      console.log("Nodo eliminado del contenedor.");
      return;
    }

    if (typeof oldNode !== typeof newNode || oldNode.type !== newNode.type) {
      container.replaceChild(createRealDOM(newNode), oldNode);
      console.log("Nodo reemplazado.");
      return;
    }

    if (typeof newNode === 'string' || typeof newNode === 'number') {
      if (oldNode.nodeValue !== newNode) {
        oldNode.nodeValue = newNode;
        console.log("Valor de nodo actualizado.");
      }
      return;
    }

    const oldChildren = oldNode.childNodes || [];
    const newChildren = newNode.props.children || [];

    newChildren.forEach((child, i) => {
      if (oldChildren[i]) {
        diff(oldChildren[i], child, oldNode);
      } else {
        container.appendChild(createRealDOM(child));
      }
    });
  }




/* @jsx miniFramework.createElement */
function renderApp() {
  console.log("Renderizando tareas:", state.tasks);

  const tasksElements = state.tasks.length > 0 ? 
  state.tasks.map((task, index) => (
    <li key={task + index}>{task}</li>  // Usar una clave única para cada tarea
  )) : (
    <li>No tasks available</li>  // Mostrar mensaje si no hay tareas
  );


  const element = (
      <div>
          <h1>Task Manager</h1>
          <input id="taskInput" placeholder="Enter a task" />
          <button
              onclick={() => {
                  const input = document.getElementById("taskInput");
                  if (input.value.trim() !== "") {
                      dispatch(createAction("ADD_TASK", input.value.trim()));
                      input.value = "";
                  }
              }}
          >
              Add Task
          </button>
              <ul> 
                {tasksElements}
              </ul>

      </div>
  );

  const container = document.getElementById("root");
  container.innerHTML = "";
  miniFramework.render(element, container);
}

const container = document.getElementById("root");
renderApp();
