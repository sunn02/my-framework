import { dispatch, createAction, state } from './src/framework.js';
/** @jsx miniFramework.createElement */
function TodoApp() {
  return miniFramework.createElement("div", null, miniFramework.createElement("h1", null, "To do"), miniFramework.createElement("input", {
    id: "taskInput",
    placeholder: "Enter a task"
  }), miniFramework.createElement("button", {
    onclick: () => {
      const input = document.getElementById("taskInput");
      if (input.value.trim() !== "") {
        dispatch(createAction("ADD_TASK", input.value.trim()));
        input.value = "";
      }
    }
  }, "Add Task"), miniFramework.createElement("ul", {
    id: "taskList"
  }, state.tasks.map((task, index) => miniFramework.createElement("li", {
    key: index
  }, task))));
}
export default TodoApp;
