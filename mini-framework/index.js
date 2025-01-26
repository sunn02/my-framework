// --- Store ---
export const AppStore = {
    state: {
      items: []
    },
    listeners: [],
    getState() {
      return this.state;
    },
    subscribe(listener) {
      this.listeners.push(listener);
    },
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.listeners.forEach(listener => listener());
    }
  };
  
  // --- Actions ---
  export const Actions = {
    addItem(item) {
      const currentState = AppStore.getState();
      AppStore.setState({ items: [...currentState.items, item] });
    }
  };

  export const dispatch = (action) => {
    const currentState = AppStore.getState();
    switch (action.type) {
      case "ADD_ITEM":
        AppStore.setState({ items: [...currentState.items, action.payload] });
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };
  
  

export const miniFramework = {
    createElement(type, props, ...children) {
      return {
        type,
        props: {
          ...props,
          children: children.length ? children : []
        }
      };
    }
  };
  

export const render = (frameworkEl, container) => {
    if (["string", "number"].includes(typeof frameworkEl)) {
      container?.appendChild(document.createTextNode(frameworkEl?.toString()));
      return;
    }
  
    const actualDOMElement = document.createElement(frameworkEl.type);
  
    // Apply Props to actual DOM Element
    Object.keys(frameworkEl?.props)
      .filter((key) => key !== "children")
      .forEach((property) => {
        if (property.startsWith("on")) {
            const event = property.toLowerCase().substring(2);
            actualDOMElement.addEventListener(event, frameworkEl.props[property]);
          } else {
            actualDOMElement[property] = frameworkEl.props[property];
          }
      });
  
    // Render children inside this element
    frameworkEl?.props?.children.forEach((child) => {
      render(child, actualDOMElement);
    });
  
    container?.appendChild(actualDOMElement); // Happens once, unless the DOM already exists and we just need to replace something on the child element.
  };
  


