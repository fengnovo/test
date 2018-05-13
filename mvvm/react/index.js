const CREATE = 'CREATE'   //新增一个节点
const REMOVE = 'REMOVE'   //删除原节点
const REPLACE = 'REPLACE'  //替换原节点
const UPDATE = 'UPDATE'    //检查属性或子节点是否有变化
const SET_PROP = 'SET_PROP'  //新增或替换属性
const REMOVE_PROP = 'REMOVE PROP'  //删除属性
// function view() {
//     return <ul id="filmList" className="list">
//         <li className="main">Detective Chinatown Vol 2</li>
//         <li>Ferdinand</li>
//         <li>Paddington 2</li>
//     </ul>
// }
function view(count) { 
    const r = [...Array(count).keys()];
    return <ul id="filmList" className={`list-${count % 3}`}>
      { r.map(n => <li>item {(count * n).toString()}</li>) }
    </ul>
}
/**
function view(count) {
  const r = [...Array(count).keys()];
  return h(
    'ul',
    { id: 'filmList', className: `list-${count % 3}` },
    r.map(n => h(
      'li',
      null,
      'item ',
      (count * n).toString()
    ))
  );
}
 */


function flatten(arr) {
    return [].concat(...arr)
}

function h(type, props, ...children) {
    return {
        type,
        props: props || {},
        children: flatten(children)
    }
}
/**
 {
	"type": "ul",
	"props": {
		"id": "filmList",
		"className": "list"
	},
	"children": [{
		"type": "li",
		"props": {
			"className": "main"
		},
		"children": ["Detective Chinatown Vol 2"]
	}, {
		"type": "li",
		"props": {},
		"children": ["Ferdinand"]
	}, {
		"type": "li",
		"props": {},
		"children": ["Paddington 2"]
	}]
}
 */
function createElement(node) {
    if (typeof(node) === 'string') {
      return document.createTextNode(node)
    }
  
    let { type, props, children } = node
    const el = document.createElement(type)
    setProps(el, props)
    let childrenNode = children.map(child => {
        return createElement(child);
    });
    // childrenNode.forEach(childNode => {
    //     /* console.log(this); // this指向 window
    //     如果也想向上面一样也直接使用appendChild作为回调函数的话，
    //     普通使用el.appendChild的时候，函数里的this是el，但是直接作为回调后this就变成了window,所以需要重新指向一下this
    //     有两种方法,除了答案的这种就是将this写在forEach的批二个参数

    //     childrenMap.forEach(el.appendChild, el)
    //     **/
    //     el.appendChild.call(el, childNode);
    // });
    childrenNode.forEach(childNode => {
        // console.log(this);
        el.appendChild(childNode);
    }, el);
    // console.log(el);
    
    return el
}
  
function setProp(target, name, value) {
    if (name === 'className') {
        return target.setAttribute('class', value)
    }

    target.setAttribute(name, value)
}
  
function setProps(target, props) {
    Object.keys(props).forEach(key => {
        setProp(target, key, props[key])
    })
}

// function render(el) {
//     console.log(JSON.stringify(view()));
//     el.appendChild(createElement(view()))
// }
function render(el) {
    const initialCount = 0
  
    el.appendChild(createElement(view(initialCount)))
    setTimeout(() => tick(el, initialCount), 1000)
}
  
function tick(el, count) {
    let newN = view(count + 1);
    let oldN = view(count);
    console.log(newN, oldN);
    const patches = diff(newN, oldN)
    patch(el, patches)
  
    if(count > 0) { return }
    setTimeout(() => tick(el, count + 1), 1000)
}

function diff(newNode, oldNode) {
    if (!oldNode) {
      return { type: CREATE, newNode }
    }
 
    if (!newNode) {
      return { type: REMOVE }
    }
 
    if (changed(newNode, oldNode)) {
      return { type: REPLACE, newNode }
    }
 
    if (newNode.type) {
        let obj ={
            type: UPDATE,
            props: diffProps(newNode, oldNode),
            children: diffChildren(newNode, oldNode)
          };
          console.log(obj);
          
      return obj
    }
}

function changed(node1, node2) {
    return typeof(node1) !== typeof(node2) ||
           typeof(node1) === 'string' && node1 !== node2 ||
           node1.type !== node2.type
}

function diffProps(newNode, oldNode) {
    let patches = []
  
    let props = Object.assign({}, newNode.props, oldNode.props)
    Object.keys(props).forEach(key => {
      const newVal = newNode.props[key]
      const oldVal = oldNode.props[key]
      if (!newVal) {
        patches.push({type: REMOVE_PROP, key, value: oldVal})
      }
  
      if (!oldVal || newVal !== oldVal) {
        patches.push({ type: SET_PROP, key, value: newVal})
      }
    })
  
    return patches
}
function diffChildren(newNode, oldNode) {
    let patches = []
  
    const maximumLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    )
    for(let i = 0; i < maximumLength; i++) {
      patches[i] = diff(
        newNode.children[i],
        oldNode.children[i]
      )
    }
  
    return patches
}

function patch(parent, patches, index = 0) {
    if (!patches) {
      return
    }
  
    const el = parent.childNodes[index]
    switch (patches.type) {
      case CREATE: {
        const { newNode } = patches
        const newEl = createElement(newNode)
        parent.appendChild(newEl)
        break
      }
      case REMOVE: {
        parent.removeChild(el)
        break
      }
      case REPLACE: {
        const {newNode} = patches
        const newEl = createElement(newNode)
        return parent.replaceChild(newEl, el)
        break
      }
      case UPDATE: {
        const {props, children} = patches
        patchProps(el, props)
        for(let i = 0; i < children.length; i++) {
          patch(el, children[i], i)
        }
      }
    }
}

function patchProps(parent, patches) {
    patches.forEach(patch => {
      const { type, key, value } = patch
      if (type === 'SET_PROP') {
        setProp(parent, key, value)
      }
      if (type === 'REMOVE_PROP') {
        removeProp(parent, key, value)
      }
    })
  }
  
function removeProp(target, name, value) { //@
    if (name === 'className') {
      return target.removeAttribute('class')
    }
  
    target.removeAttribute(name)
}

//npm run compile