import { Extension } from '@tiptap/core'
// import { PluginKey } from 'prosemirror-state'

// const FormatPainterPluginKey = new PluginKey('formatPainter')
/**
 * 判断选中内容是否在列表中
 * @param {*} blockNode 块
 * @param {*} nodes 节点列表
 * @param {*} form 选中起始位置
 * @param {*} to 选中结束位置
 */
function isFormatList(blockNode:any, nodes:any[], form:any, to:any) {
  let flag = true
  if (blockNode && ['bulletList', 'orderedList', 'taskList'].includes(blockNode.node.type.name)) {
    let listItem = nodes.filter((item:any) => {
      return ['listItem', 'taskItem'].includes(item.node.type.name)
    })
    for (let val of listItem) {
      let size = val.node.nodeSize
      // 判断选中内容是否在列表中
      if ((form > val.pos + 2 && form < (val.pos + size - 2) && to < (val.pos + size - 2)) || (form === val.pos + 2 && to < val.pos + size - 2) || (form > val.pos + 2 && to === val.pos + size - 2)) {
        flag = false
        break
      }
    }
  }
  return flag
}
export const FormatPainter = Extension.create({
  name: 'formatPainter',

  addOptions() {
    return {
      buttonIcon: '🖌',
      buttonTitle: 'Format Painter',
      supportedBlocks: ['heading', 'paragraph', 'bulletList', 'orderedList', 'taskList'], // 支持的块级格式
      supportedMarks: ['textStyle', 'highlight', 'bold', 'italic', 'underline', 'strike'], // 支持的标记样式
    }
  },

  addStorage() {
    return {
      formats: null,
      isPainting: false
    }
  },

  addCommands():any {
    return {
      copyFormat: () => ({ tr, editor }:{tr:any,editor:any}) => {
        const { selection } = tr
        const formats:any = {
          block: {
            type: '',
            attrs: {},
          },
          marks: []
        }


        // 收集块级格式
        editor.state.doc.nodesBetween(selection.from, selection.to, (node:any) => {
          if (formats.block) return false; // 只取第一个块的格式
          if (this.options.supportedBlocks.includes(node.type.name)) {
            formats.block = {
              type: node.type.name,
              attrs: { ...node.attrs }, // 块级属性（如标题级别）
            };
          }
          return true;
        });

        // 收集标记样式
        const marks = editor.state.storedMarks || selection.$from.marks()
        marks.forEach((mark:any) => {
          if (this.options.supportedMarks.includes(mark.type.name)) {
            formats.marks.push({
              type: mark?.type?.name,
              attrs: { ...mark?.attrs }
            })
          }
        })
        editor.storage.formatPainter.formats = formats
        return true
      },

      applyFormat: () => ({ tr, editor, chain }:{tr:any,editor:any,chain:any}) => {
        const formats = editor.storage.formatPainter.formats
        if (!formats) return false

        const { selection } = tr
        const { $from, $to } = selection

        // 应用块级格式
        if (formats.block) {
          let nodes:any[] = []
          let form = 0, to = 0
          editor.state.doc.nodesBetween($from.pos, $to.pos, (node:any, pos:number) => { // 添加parent参数
            form = $from.pos
            to = $to.pos
            // const nodeType = editor.schema.nodes[formats.block.type]
            let obj = {
              pos: pos,
              node: node
            }
            nodes.push(obj)
          })
          // 代码块不能被格式刷
          if (nodes.length && nodes[0].node.type.name === 'codeBlock') {
            return true
          }
          let blockNode = nodes.length && nodes[0] || null
          // 复制样式为标题
          if (formats.block.type === 'heading') {
            let params = {
              level: formats.block.attrs.level
            }
            let flag = isFormatList(blockNode, nodes, form, to)
            if(flag){
              chain().focus().toggleHeading(params).run()
            }
          }
          // 复制样式为文本
          if (formats.block.type === "paragraph") {
            
            let flag = isFormatList(blockNode, nodes, form, to)
            if (flag) {
              chain().focus().unsetAllMarks().run()
              chain().focus().clearNodes().run()
            }
            
          }
          // 复制样式为列表
          if (['bulletList', 'orderedList', 'taskList'].includes(formats.block.type)) {
            chain().focus().unsetAllMarks().run()
            chain().focus().clearNodes().run()
            let str = formats.block.type
            let funName = 'toggle'+str.charAt(0).toUpperCase() + str.slice(1)
            chain().focus()[funName]().run()
          }
          if (formats.block.attrs.textAlign) {
            chain().focus().setTextAlign(formats.block.attrs.textAlign).run()
          }
        }
        // 应用标记样式
        formats.marks.forEach((mark:any) => {
          chain()
            .setMark(mark.type, mark.attrs)
            .run()
        })

        return true
      },

      toggleFormatPainter: () => ({ editor }:{editor:any}) => {
        editor.storage.formatPainter.isPainting = !editor.storage.formatPainter.isPainting
        return true
      }
    }
  },

  addButtons() {
    return [
      {
        icon: this.options.buttonIcon,
        title: this.options.buttonTitle,
        action: () => {
          if (this.editor.storage.formatPainter.isPainting) {
            this.editor.commands.applyFormat()
          } else {
            this.editor.commands.copyFormat()
          }
          this.editor.commands.toggleFormatPainter()
        },
        isActive: () => this.editor.storage.formatPainter.isPainting
      }
    ]
  }
})

