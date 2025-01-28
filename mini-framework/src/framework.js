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

function diff(oldElement, newElement) {
  // If the types are different, replace the old element entirely
  if (oldElement.type !== newElement.type) {
    return true; 
  }

  // If it's a text element, check if the content is different
  if (oldElement.type === "TEXT_ELEMENT" && oldElement.props.nodeValue !== newElement.props.nodeValue) {
    return true; 
  }

  // Check if the props are different (excluding children)
  const oldProps = oldElement.props || {};
  const newProps = newElement.props || {};

  const keys = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);
  for (let key of keys) {
    if (key !== "children" && oldProps[key] !== newProps[key]) {
      return true; 
    }
  }

  return false;
}

function render(element, container, oldElement = null) {
  // TODO create dom nodes
  const dom = 
    element.type == "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(element.type);

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
    const isProperty = key => key !== "children"
    Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
      })

    
    // We recursively do the same for each child
    element.props.children.forEach((child, index) => {
      render(child, dom, oldElement ? oldElement.props.children[index] : null);
    });

    if (!oldElement) {
      container.appendChild(dom);
    }

    element.dom = dom;
}



/* @jsx miniFramework.createElement */
const element = (
  <div id="foo">
  <a>bar</a>
  <b></b>
  </div>
)

// const element = miniFramework.createElement(
//     "div",
//     { id: "foo" },
//     miniFramework.createElement("a", null, "bar"),
//     miniFramework.createElement("b")
// )


const container = document.getElementById("root")
miniFramework.render(element, container)