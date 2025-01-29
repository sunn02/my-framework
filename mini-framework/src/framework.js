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
        return { ...state, tasks: [...state.tasks, action.payload]};
      ;
      default:
        return state;
    }
  }

  function dispatch(action){
    const newState = store(state, action)
    state = newState
    console.log("Current tasks:", state.tasks);
    renderApp()
    }
  
  function render(element, container) {
    if (element.type === "TEXT_ELEMENT") {
        const textNode = document.createTextNode(element.props.nodeValue);
        container.appendChild(textNode);
        return;
    }

    const domElement = document.createElement(element.type);

    if (element.props) {
        Object.keys(element.props)
            .filter(key => key !== 'children')
            .forEach(key => {
                domElement[key] = element.props[key];
            });

        element.props.children.forEach(child =>
            render(child, domElement)
        );
    }

    container.appendChild(domElement);
}
  

/* @jsx miniFramework.createElement */
function renderApp() {
  console.log("Rendering...");

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
          <ul id="taskList">
              {state.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
              ))}
          </ul>
      </div>
  );

  const container = document.getElementById("root");
  container.innerHTML = "";
  miniFramework.render(element, container);


  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; 
  state.tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    li.key = index;
    taskList.appendChild(li);
  });
}

const container = document.getElementById("root");
renderApp(); 
