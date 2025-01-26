import { AppStore, Actions, miniFramework, render } from "./index.js";

// Crea un componente de lista dinámica
const ItemList = () => {
  const state = AppStore.getState(); // Obtiene el estado actual

  return miniFramework.createElement(
    "div",
    null,
    miniFramework.createElement("h1", null, "Dynamic Item List"),
    miniFramework.createElement(
      "ul",
      null,
      ...state.items.map((item, index) =>
        miniFramework.createElement("li", { key: index }, item)
      )
    ),
    miniFramework.createElement(
      "button",
      {
        onClick: () => {
          const newItem = prompt("Enter a new item:");
          if (newItem) {
            Actions.addItem(newItem); // Agrega el nuevo ítem al estado
          }
        }
      },
      "Add Item"
    )
  );
};

// Función para renderizar la aplicación
const renderApp = () => {
  const container = document.getElementById("root");
  container.innerHTML = ""; // Limpia el contenedor antes de renderizar
  render(ItemList(), container);
};

// Suscribirse a los cambios de estado
AppStore.subscribe(renderApp);

// Render inicial
renderApp();



// // Usando JSX para crear el árbol del DOM virtual
// const element = (
//   <h1>
//     Hello, <span>MiniFramework!</span>
//   </h1>
// );

// console.log(element);  // Verás la estructura del Virtual DOM en la consola

// // Renderizar el elemento en el contenedor
// const container = document.getElementById("root");
// render(element, container);

