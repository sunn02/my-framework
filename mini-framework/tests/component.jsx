
import { dispatch, createAction, state } from '../src/framework.js'; 
/** @jsx miniFramework.createElement */
function TodoApp() {
    return (
      <div>
        <h1>To do</h1>
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
  }
  
  export default TodoApp;
  