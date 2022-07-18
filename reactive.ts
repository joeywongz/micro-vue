const bucket = new Set<() => any>()

const data = { text: 'hello vue' }

//原始数据代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    bucket.add(effect)
    return target[key]
  },
  set(target, key, newVal) {
    target[key] = newVal
    bucket.forEach((fn) => fn())
    return true
  },
})

const effect = () => {
  document.body.innerHTML = data.text
}
effect()
setTimeout(() => {
  data.text = 'this is micro vue'
}, 1000)
