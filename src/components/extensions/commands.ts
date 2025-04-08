import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'

export default Extension.create({
  name: 'commands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }:{editor:any, range:any, props:any}) => {
          props.command({ editor, range })
        }
      },
      t:()=>{},
      uploadImage:null
    }
  },

  addProseMirrorPlugins() {
    let items = ({query}: { query: string }) => {
        return [
          {
            title: this.options.t('tools.heading1'),
            icon:'icon-h1',
            type:'heading',
            command: ({editor, range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).setNode('heading', {level: 1}).run()
            },
          },
          {
            title: this.options.t('tools.heading2'),
            icon:'icon-h2',
            type:'heading',
            command: ({editor, range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).setNode('heading', {level: 2}).run()
            },
          },
          {
            title: this.options.t('tools.heading3'),
            icon:'icon-h3',
            type:'heading',
            command: ({editor, range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).setNode('heading', {level: 3}).run()
            },
          },
          {
            title: this.options.t('tools.heading4'),
            icon:'icon-h4',
            type:'heading',
            command: ({editor, range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).setNode('heading', {level: 4}).run()
            },
          },
          {
            title: this.options.t('tools.bulletList'),
            icon:'icon-bullet-list',
            type:'bulletList',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).toggleBulletList().run()
            },
          },
          {
            title: this.options.t('tools.orderedList'),
            icon:'icon-ordered-list',
            type:'orderedList',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).toggleOrderedList().run()
            },
          },
          {
            title: this.options.t('tools.taskList'),
            icon:'icon-task-list',
            type:'taskList',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).toggleTaskList().run()
            },
          },
          {
            title: this.options.t('tools.table'),
            icon:'icon-table',
            type:'table',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            },
          },
          {
            title: this.options.t('tools.codeBlock'),
            icon:'icon-code-block',
            type:'codeBlock',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
            },
          },
          {
            title: this.options.t('tools.blockquote'),
            icon:'icon-blockquote',
            type:'blockquote',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).toggleBlockquote().run()
            },
          },
          {
            title: this.options.t('tools.horizontalRule'),
            icon:'icon-horizontal-rule',
            type:'horizontalRule',
            command: ({editor,range}: { editor: any, range: any }) => {
              editor.chain().focus().deleteRange(range).setHorizontalRule().run()
            },
          },
          {
            title: this.options.t('tools.image'),
            icon:'icon-image',
            type:'image',
            command: (editor:any,range:any,file:any) => {
              if(this.options.uploadImage){
                this.options.uploadImage(file,(url:any)=>{
                  editor.chain().focus().deleteRange(range).setImage({ src: url, alt: file.name }).run()
                })
              }else {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                  const base64 = e.target.result;
                  // 在指定位置插入图片base64
                  editor.chain().focus().deleteRange(range).setImage({ src: base64, alt: file.name }).run()
                };
                reader.readAsDataURL(file);
              }
            },
          }
        ].filter(item => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 20)
      }
    return [
      Suggestion({
        editor: this.editor,
        t: this.options.t,
        items,
        ...this.options.suggestion,
      }),
    ]
  },
})
