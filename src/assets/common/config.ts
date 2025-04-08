export const getToolbar = (t:any) => {
  const toolbar = [
    {
      name: t('tools.undo'),
      key: 'undo',
      fun: 'undo',
      icon: 'icon-undo',
      type: 'button',
      showActive: false
    },
    {
      name: t('tools.redo'),
      key: 'redo',
      fun: 'redo',
      icon: 'icon-redo',
      type: 'button',
      showActive: false
    },
    {
      name: t('tools.bold'),
      key: 'bold',
      fun: 'toggleBold',
      icon: 'icon-bold',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.italic'),
      key: 'italic',
      fun: 'toggleItalic',
      icon: 'icon-italic',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.underline'),
      key: 'underline',
      fun: 'toggleUnderline',
      icon: 'icon-underline',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.strike'),
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
      name: t('tools.fontColor'),
      key: 'fontColor',
      type: 'fontColor',
      icon: 'icon-font-color'
    },
    {
      name: t('tools.highlight'),
      key: 'highlight',
      type: 'highlight',
      icon: 'icon-font-higlight'
    },
    {
      name: t('tools.fontAlign'),
      key: 'fontAlign',
      type: 'align',
    },
    {
      key: 'line1',
      type: 'line',
    },
    {
      name: t('tools.code'),
      key: 'code',
      fun: 'toggleCode',
      icon: 'icon-code',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.codeBlock'),
      key: 'codeBlock',
      fun: 'toggleCodeBlock',
      icon: 'icon-code-block',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.bulletList'),
      key: 'bulletList',
      fun: 'toggleBulletList',
      icon: 'icon-bullet-list',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.orderedList'),
      key: 'orderedList',
      fun: 'toggleOrderedList',
      icon: 'icon-ordered-list',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.taskList'),
      key: 'taskList',
      fun: 'toggleTaskList',
      icon: 'icon-task-list',
      type: 'button',
      showActive: true
    },
    {
      name:t('tools.table'),
      key: 'table',
      type: 'table'
    },
    {
      name:t('tools.image'),
      key: 'image',
      type: 'image',
      icon:'icon-image'
    },
    {
      name: t('tools.link'),
      key: 'link',
      fun: 'setLink',
      icon: 'icon-link',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.blockquote'),
      key: 'blockquote',
      fun: 'toggleBlockquote',
      icon: 'icon-blockquote',
      type: 'button',
      showActive: true
    },
    {
      name: t('tools.horizontalRule'),
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
    {
      name: t('tools.importWord'),
      key: 'importWord',
      fun: '',
      icon: 'icon-word',
      type: 'button',
      showActive: false
    },
  ]
  return toolbar
}

type BubbleList = {
  name: string,
  key: string,
  fun: string,
  icon: string,
  type: string,
  showActive: boolean,
  noShowNode: string[]
}

export const getBubbleList = (t:any) => {
  const bubbleList:BubbleList[] = [
    {
      name: t('tools.menu'),
      key: 'setMenu',
      fun: '',
      icon: '',
      type: 'setMenu',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.bold'),
      key: 'bold',
      fun: 'toggleBold',
      icon: 'icon-bold',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.italic'),
      key: 'italic',
      fun: 'toggleItalic',
      icon: 'icon-italic',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.underline'),
      key: 'underline',
      fun: 'toggleUnderline',
      icon: 'icon-underline',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.strike'),
      key: 'strike',
      fun: 'toggleStrike',
      icon: 'icon-strike',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.line'),
      key: 'line1',
      fun: '',
      icon: '',
      type: 'line',
      showActive: false,
      noShowNode: ['image']
    },
    {
      name: t('tools.fontColor'),
      key: 'fontColor',
      fun:'',
      type: 'fontColor',
      icon: 'icon-font-color',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.highlight'),
      key: 'highlight',
      fun:'',
      type: 'highlight',
      icon: 'icon-font-higlight',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.fontAlign'),
      key: 'fontAlign',
      fun:'',
      type: 'align',
      icon:'',
      showActive:true,
      noShowNode: []
    },
    {
      name: t('tools.fontSize'),
      key: 'fontSize',
      fun:'',
      type: 'fontSize',
      icon:'',
      showActive:true,
      noShowNode: ['image']
    },
    {
      name: t('tools.line'),
      key: 'line2',
      fun: '',
      icon: '',
      type: 'line',
      showActive: false,
      noShowNode: ['image']
    },
    {
      name: t('tools.code'),
      key: 'code',
      fun: 'toggleCode',
      icon: 'icon-code',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.codeBlock'),
      key: 'codeBlock',
      fun: 'toggleCodeBlock',
      icon: 'icon-code-block',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.link'),
      key: 'link',
      fun: 'setLink',
      icon: 'icon-link',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.blockquote'),
      key: 'blockquote',
      fun: 'toggleBlockquote',
      icon: 'icon-blockquote',
      type: 'button',
      showActive: true,
      noShowNode:[]
    },
    {
      name: t('tools.line'),
      key: 'line3',
      fun: '',
      icon: '',
      type: 'line',
      showActive: false,
      noShowNode: ['image']
    },
    {
      name: t('tools.formatBrush'),
      key: 'format',
      fun: '',
      icon: 'icon-format-brush',
      type: 'format',
      showActive: true,
      noShowNode: ['image']
    },
    {
      name: t('tools.formatClear'),
      key: 'clear',
      fun: '',
      icon: 'icon-clear',
      type: 'button',
      showActive: true,
      noShowNode: ['image']
    }
  ]
  return bubbleList
}
