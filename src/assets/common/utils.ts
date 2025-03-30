/**
 * 防抖函数，用于限制函数的执行频率。
 * 在指定的等待时间内，如果函数被多次调用，则只执行最后一次调用。
 * 如果 `immediate` 为 `true`，则在第一次调用时立即执行函数。
 *
 * @param func - 需要防抖的函数。
 * @param wait - 等待时间，单位为毫秒。
 * @param immediate - 是否立即执行函数。如果为 `true`，则在第一次调用时立即执行函数。
 * @returns 返回一个新的函数，该函数在调用时会应用防抖逻辑。
 */
export const debounce = (func: any, wait: number, immediate: boolean) => {
  let timeout: any = null;

  return (...args: any[]) => {
    const context = this;

    // 清除之前的计时器
    clearTimeout(timeout);

    if (immediate && !timeout) {
      // 立即执行
      func.apply(context, args);
    }

    // 设置新的计时器
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
  };
};
/**
 * 节流
 * @param func 函数
 * @param wait 时间
 * @param immediate 是否首次执行
 * @returns {(function(...[*]): void)|*}
 */
export const throttle = (func:any, wait:number, immediate:boolean) =>{
  let lastTime = 0
  let timeout:any = null

  return  (...args:any[])=> {
    const context = this
    const now = Date.now()

    if (immediate && !timeout) {
      // 立即执行
      func.apply(context, args)
      immediate = false
    }

    // 如果距离上次执行的时间超过了 wait，则执行函数
    if (now - lastTime >= wait) {
      clearTimeout(timeout)
      timeout = null
      func.apply(context, args)
      lastTime = now
    } else if (!timeout) {
      // 设置计时器，确保最后一次触发也能执行
      timeout = setTimeout(() => {
        func.apply(context, args)
        lastTime = Date.now()
        timeout = null
      }, wait - (now - lastTime))
    }
  }
}

/**
 * 获取dom类型
 */
export const getType = (dom:any)=>{
  let type:string = 'paragraph'
  if(dom){
    let tagName:string = dom.tagName
    /*标题*/
    if(/^H[1-6]/.test(tagName)){
      type=tagName.toLowerCase()
      return type
    }
    if(tagName==='UL'){
      let dataType = dom.getAttribute('data-type')
      type = dataType&&dataType==='taskList'?'taskList':'bulletList'
      return type
    }
    if(tagName==='OL'){
      type = 'orderedList'
    }
    /*代码块*/
    if(tagName==='DIV'){
      let className = dom.className
      /*代码块*/
      if(className&&className.indexOf('code-block')>-1){
        type = 'codeBlock'
      }
      /*表格*/
      if(className&&className.indexOf('tableWrapper')>-1){
        type = 'table'
      }
    }
    /*引用*/
    if(tagName==='BLOCKQUOTE'){
      type = 'blockquote'
    }
    /*图片*/
    if(tagName==='P'){
      if(dom?.firstChild?.tagName === 'IMG'){
        type = 'image'
      }
    }
    return type
  }
}

/**
 * 设置标题id
 */
export const setHeadingId = (value:string)=>{
  // 修复h1-h6标签没有id的问题
  let createEl = document.createElement('div')
  createEl.innerHTML = value
  let headingArr = createEl.querySelectorAll('h1,h2,h3,h4,h5,h6')
  headingArr.forEach((item,index) => {
    if(!item.id){
      let date = new Date().getTime()
      item.setAttribute('id', `${item.tagName.toLowerCase()}-${date}-${index}`)
    }
  })
  let editorContent = createEl.innerHTML
  createEl.remove()

  return editorContent
}