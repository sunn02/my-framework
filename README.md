# Mini Framework: Guía y Documentación Técnica

Este proyecto es un framework simple que implementa los principios de arquitectura **FLUX** y un **Virtual DOM** para renderizar aplicaciones web de manera eficiente. Aquí encontrarás una guía para usar este framework y una explicación detallada de cómo funciona cada parte.

También puedes ver el código fuente de la aplicación de ejemplo en el siguiente repositorio: [todo-app](https://github.com/sunn02/todo-app).


## **Guía Rápida: Cómo Hacerlo**

### **1. Crear un Store**

Un **Store** es un contenedor que mantiene el estado de la aplicación y permite gestionar la lógica de actualización a través de un **reducer**. Aquí es donde se define el estado y cómo se modifica a partir de las acciones enviadas por el `Dispatcher`.

#### Ejemplo:

```js
const initialState = {
  items: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

const todoStore = new Store(initialState, todoReducer);
```

### **2. Registrar el Store en el Dispatcher**

El **Dispatcher** se encarga de distribuir las acciones a todos los Stores registrados. Debes registrar tu Store para que pueda recibir las acciones.

```js
Dispatcher.register(todoStore);
```

### **3. Crear Componentes con `miniFramework`**

Para crear los componentes, utilizamos el `miniFramework.createElement`, que es similar a JSX, pero en lugar de escribir etiquetas HTML, creas objetos que describen los elementos de la interfaz.

#### Ejemplo de Componente:

```js
const SimpleComponent = () => {
  return miniFramework.createElement(
    "h1", 
    null, 
    "¡Hola Mundo!"
  );
};

```

### **4. Renderizar el Componente**

Una vez que el Store y los componentes estén configurados, puedes renderizar la aplicación utilizando la función `render`.

```js
const renderApp = () => {
  const container = document.getElementById("root");
  container.innerHTML = "";
  render(SimpleComponent(), container);
};

todoStore.subscribe(renderApp);
renderApp();
```



## **Documentación Técnica**

### **1. Store**

La clase `Store` es responsable de manejar el estado de la aplicación.

#### Métodos:
- **`constructor(initialState, reducer)`**: Inicializa el estado y el reducer del Store.
- **`getState()`**: Devuelve el estado actual del Store.
- **`subscribe(listener)`**: Agrega un listener que se ejecutará cada vez que el estado cambie.
- **`dispatch(action)`**: Envia una acción al reducer para actualizar el estado.

```js
export class Store {
  constructor(initialState, reducer) {
    this.state = initialState;
    this.reducer = reducer;
    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  dispatch(action) {
    this.state = this.reducer(this.state, action);
    this.listeners.forEach(listener => listener());
  }
}
```

### **2. Dispatcher**

El `Dispatcher` es responsable de recibir acciones y enviarlas a los Stores registrados.

#### Métodos:
- **`register(store)`**: Registra un Store.
- **`dispatch(action)`**: Envia una acción a todos los Stores registrados.

```js
export const Dispatcher = {
  stores: [],
  
  register(store) {
    this.stores.push(store);
  },

  dispatch(action) {
    this.stores.forEach(store => store.dispatch(action));
  }
};
```

### **3. miniFramework (UI Rendering)**

El `miniFramework` permite crear y manipular la interfaz de usuario utilizando un sistema similar a JSX.

#### Métodos:
- **`createElement(type, props, ...children)`**: Crea un objeto de nodo que describe un elemento DOM.
- **`render(frameworkEl, container)`**: Renderiza el árbol de elementos creado en un contenedor del DOM.

```js
export const miniFramework = {
  createElement(type, props, ...children) {
    return {
      type,
      props: { ...props, children }
    };
  }
};
```

### **4. Virtual DOM (Reconciliación)**

El sistema de Virtual DOM compara el estado actual de los elementos con el nuevo estado y realiza cambios en el DOM real solo cuando es necesario, lo que mejora el rendimiento.

#### Funciones:
- **`createRealDOM(node)`**: Convierte un objeto de nodo en un nodo DOM real.
- **`diff(oldNode, newNode, container)`**: Compara el nodo antiguo con el nuevo y actualiza el DOM de manera eficiente.

```js
function diff(oldNode, newNode, container) {
  if (!oldNode && newNode) {
    container.appendChild(createRealDOM(newNode));
    return;
  }

  if (!newNode) {
    container.removeChild(oldNode);
    return;
  }

  if (typeof oldNode !== typeof newNode || oldNode.type !== newNode.type) {
    container.replaceChild(createRealDOM(newNode), oldNode);
    return;
  }

  if (typeof newNode === 'string' || typeof newNode === 'number') {
    if (oldNode.nodeValue !== newNode) {
      oldNode.nodeValue = newNode;
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
```


### **Próximos Pasos**
- Añadir soporte para JSX y Babel para facilitar la creación de componentes.
- Mejorar el sistema de Virtual DOM para hacer actualizaciones más eficientes.



