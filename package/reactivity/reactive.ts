const bucket = new Set<() => any>()

const data = { text: 'hello vue' }

let activeEffect: any
//原始数据代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    if(activeEffect){
      bucket.add(activeEffect)
    }
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach((fn) => fn())
    return true
  },
})

const effect = (fn) => {
  // document.body.innerHTML = data.text
  // 将传入的副作用函数注册到activeEffect上
  activeEffect = fn
  fn()
}
effect(() => {
  document.body.innerHTML = data.text
})
setTimeout(() => {
  data.text = 'this is micro vue'
}, 1000)
