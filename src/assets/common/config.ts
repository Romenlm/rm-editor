export const toolbar = [
  {
    name: '撤销',
    key: 'undo',
    fun: 'undo',
    icon: 'icon-undo',
    type: 'button',
    showActive: false
  },
  {
    name: '重做',
    key: 'redo',
    fun: 'redo',
    icon: 'icon-redo',
    type: 'button',
    showActive: false
  },
  {
    name: '加粗',
    key: 'bold',
    fun: 'toggleBold',
    icon: 'icon-bold',
    type: 'button',
    showActive: true
  },
  {
    name: '斜体',
    key: 'italic',
    fun: 'toggleItalic',
    icon: 'icon-italic',
    type: 'button',
    showActive: true
  },
  {
    name: '下划线',
    key: 'underline',
    fun: 'toggleUnderline',
    icon: 'icon-underline',
    type: 'button',
    showActive: true
  },
  {
    name: '删除线',
    key: 'strike',
    fun: 'toggleStrike',
    icon: 'icon-strike',
    type: 'button',
    showActive: true
  },
  {
    key: 'line1',
    type: 'line',
  },
  {
    name: '字体颜色',
    key: 'fontColor',
    type: 'fontColor',
    icon: 'icon-font-color'
  },
  {
    name: '高亮',
    key: 'highlight',
    type: 'highlight',
    icon: 'icon-font-higlight'
  },
  {
    name: '对齐方式',
    key: 'fontAlign',
    type: 'align',
  },
  {
    key: 'line1',
    type: 'line',
  },
  {
    name: '行内代码块',
    key: 'code',
    fun: 'toggleCode',
    icon: 'icon-code',
    type: 'button',
    showActive: true
  },
  {
    name: '代码块',
    key: 'codeBlock',
    fun: 'toggleCodeBlock',
    icon: 'icon-code-block',
    type: 'button',
    showActive: true
  },
  {
    name: '无序列表',
    key: 'bulletList',
    fun: 'toggleBulletList',
    icon: 'icon-bullet-list',
    type: 'button',
    showActive: true
  },
  {
    name: '有序列表',
    key: 'orderedList',
    fun: 'toggleOrderedList',
    icon: 'icon-ordered-list',
    type: 'button',
    showActive: true
  },
  {
    name: '任务列表',
    key: 'taskList',
    fun: 'toggleTaskList',
    icon: 'icon-task-list',
    type: 'button',
    showActive: true
  },
  {
    name:'插入表格',
    key: 'table',
    type: 'table'
  },
  {
    name:'插入图片',
    key: 'image',
    type: 'image',
    icon:'icon-image'
  },
  {
    name: '链接',
    key: 'link',
    fun: 'setLink',
    icon: 'icon-link',
    type: 'link',
    showActive: true
  },
  {
    name: '引用',
    key: 'blockquote',
    fun: 'toggleBlockquote',
    icon: 'icon-blockquote',
    type: 'button',
    showActive: true
  },
  {
    name: '水平线',
    key: 'horizontalRule',
    fun: 'setHorizontalRule',
    icon: 'icon-horizontal-rule',
    type: 'button',
    showActive: false
  },
  {
    key: 'line1',
    type: 'line',
  },
]

export const bubbleList = [
  {
    name: '菜单',
    key: 'setMenu',
    fun: '',
    icon: '',
    type: 'setMenu',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '加粗',
    key: 'bold',
    fun: 'toggleBold',
    icon: 'icon-bold',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '斜体',
    key: 'italic',
    fun: 'toggleItalic',
    icon: 'icon-italic',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '下划线',
    key: 'underline',
    fun: 'toggleUnderline',
    icon: 'icon-underline',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '删除线',
    key: 'strike',
    fun: 'toggleStrike',
    icon: 'icon-strike',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    key: 'line1',
    type: 'line',
    noShowNode: ['image']
  },
  {
    name: '字体颜色',
    key: 'fontColor',
    type: 'fontColor',
    icon: 'icon-font-color',
    noShowNode: ['image']
  },
  {
    name: '高亮',
    key: 'highlight',
    type: 'highlight',
    icon: 'icon-font-higlight',
    noShowNode: ['image']
  },
  {
    name: '对齐方式',
    key: 'fontAlign',
    type: 'align',
    noShowNode: []
  },
  {
    key: 'line2',
    type: 'line',
    noShowNode: ['image']
  },
  {
    name: '行内代码块',
    key: 'code',
    fun: 'toggleCode',
    icon: 'icon-code',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '代码块',
    key: 'codeBlock',
    fun: 'toggleCodeBlock',
    icon: 'icon-code-block',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '链接',
    key: 'link',
    fun: 'setLink',
    icon: 'icon-link',
    type: 'link',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '引用',
    key: 'blockquote',
    fun: 'toggleBlockquote',
    icon: 'icon-blockquote',
    type: 'button',
    showActive: true,
  },
  {
    key: 'line3',
    type: 'line',
    noShowNode: ['image']
  },
  {
    name: '格式刷',
    key: 'format',
    fun: '',
    icon: 'icon-format-brush',
    type: 'format',
    showActive: true,
    noShowNode: ['image']
  },
  {
    name: '清除格式',
    key: 'clear',
    fun: '',
    icon: 'icon-clear',
    type: 'button',
    showActive: true,
    noShowNode: ['image']
  }
]