const vdom1 = {
  tag: 'div',
  children: [{
    tag: 'span',
    children: 'this span need to be rendered!!'
  }]
}

// 递归渲染
// const render = (vdom, root: HTMLElement) => {
  const render = (vdom, root) => {
  const el = document.createElement(vdom.tag)
  if (typeof vdom.children == 'string') {
    const textNode = document.createTextNode(vdom.children)
    el.appendChild(textNode)
  }else if(vdom.children){
    for (const i of vdom.children) {
      render(i, el)
    }
  }
  root.appendChild(el)
}

const root = document.getElementById('app')
render(vdom1, root)