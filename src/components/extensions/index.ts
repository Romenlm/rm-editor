import { VueNodeViewRenderer } from '@tiptap/vue-3'

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'

import { CustomHeading } from './customHeading'
import {FormatPainter} from "./FormatPainter.ts";
import {ImageExtended} from "./image.ts";
import { TextStyleExtended } from './fontSize.ts'
import Commands from "./commands.ts";
import suggestion from "./suggestion.ts";

// 代码块高亮
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { all, createLowlight } from 'lowlight'
const lowlight = createLowlight(all)
// you can also register languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

import CodeBlockComponent from "../common/component/CodeBlockComponent.vue";

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),
      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})


const extensions = (t:any,config:any)=>{
  return [
  Document,
  Paragraph,
  Text,
  Underline,
  Highlight.configure({ multicolor: true }),
  TextStyleExtended,
  Color,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CodeBlockLowlight
    .extend({
      addNodeView() {
        return VueNodeViewRenderer(CodeBlockComponent)
      },
    })
    .configure({ lowlight }),
  BulletList.configure({
    keepMarks: true,
  }),
  OrderedList.configure({
    keepMarks: true,
  }),
  ListItem,
  TaskList,
  TaskItem.configure({
    nested: true, // 允许嵌套任务列表
  }),
  Table.configure({
    resizable: true,
    // handleDrop: true, // 启用表格专用拖拽处理
    allowTableNodeSelection: true
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  ImageExtended.configure({
    inline: true, // 图片作为内联元素
    allowBase64: true, // 允许 base64 图片
  }),
  Link.configure({
    openOnClick: false,
    defaultProtocol: 'https',
  }),
  Placeholder.configure({
    placeholder: t('base.placeholder'),
  }),
  Superscript,
  Subscript,
  CustomHeading,
  FormatPainter,
  Commands.configure({
    suggestion,
    t:t,
    uploadImage: config?.uploadImage,
  })
]}

export {extensions}