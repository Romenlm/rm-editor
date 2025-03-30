import { Extension } from '@tiptap/core'
import { NodeSelection, Plugin } from '@tiptap/pm/state'
import * as pmView from '@tiptap/pm/view';
import {throttle} from "../../assets/common/utils.ts"
import { getType } from '../../assets/common/utils.ts';
function getPmView() {
  try {
      return pmView;
  }
  catch (error) {
      return null;
  }
}
function serializeForClipboard(view, slice) {
  // Newer Tiptap/ProseMirror
  // @ts-ignore
  if (view && typeof view.serializeForClipboard === 'function') {
      return view.serializeForClipboard(slice);
  }
  // Older version fallback
  const proseMirrorView = getPmView();
  // @ts-ignore
  if (proseMirrorView && typeof proseMirrorView?.__serializeForClipboard === 'function') {
      // @ts-ignore
      return proseMirrorView.__serializeForClipboard(view, slice);
  }
  throw new Error('No supported clipboard serialization method found.');
}
function removeNode(node:any) {
  node.parentNode.removeChild(node)
}

function absoluteRect(node:any) {
  const data = node.getBoundingClientRect()

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  }
}

export default Extension.create({
  addOptions() {
    return {
      onAddClick: () => {}, // 新增配置项
      onMousemoveEvent:()=>{},
      dragStart:()=>{},
      dragEnd:()=>{}
    }
  },
  addProseMirrorPlugins() {
    const extension = this
    function blockPosAtCoords(coords:any, view:any) {
      const pos = view.posAtCoords(coords)
      let node = view.domAtPos(pos.pos)

      node = node.node

      while (node && node.parentNode) {
        if (node.parentNode?.classList?.contains('ProseMirror')) {
          // todo
          break
        }

        node = node.parentNode
      }

      if (node && node.nodeType === 1) {
        const desc = view.docView.nearestDesc(node, true)

        if (!(!desc || desc === view.docView)) {
          return desc.posBefore
        }
      }
      return null
    }


    function dragStart(e:any, view:any) {
      // Must delete this line, Otherwise: Uncaught TypeError: Cannot set property composing of #<EditorView> which has only a getter
      // view.composing = true
    
      if (!e.dataTransfer) {
        return
      }else{
        e.dataTransfer.effectAllowed = 'move'
      }

      const coords = { left: e.clientX + 50, top: e.clientY }
      const pos = blockPosAtCoords(coords, view)

      if (pos != null) {
        
      
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))

        const slice = view.state.selection.content()
        // let targetNode = view.nodeDOM(pos)
        const node = view.state.doc.nodeAt(pos);
        
        const { dom, text } = serializeForClipboard(view,slice);
        // const dom = view.domSerializer.serializeFragment(slice.content);
        // const text = slice.content.textContent;
        e.dataTransfer.clearData()
        e.dataTransfer.setData('text/html', dom.innerHTML)
        e.dataTransfer.setData('text/plain', text)
        const el = document.querySelector('.ProseMirror-selectednode') // || view.nodeDOM(pos)
        e.dataTransfer?.setDragImage(el, 0, 0)
        view.dragging = { slice, move: true,source: view.state.selection.from  }
        extension.options.dragStart({
          pos:pos,
          nodeName: node.type.name
        })
      }
    }

    function dragEnd(e:any, view:any) {
      extension.options.dragEnd({
        dragEnd: true
      })
      // reset the dragging, otherwise wrong content after dragging across multi editors repeatedly
      view.dragging = null
    }

    // 添加按钮
    function addBtn(e:any, view:any) {
      const coords = { left: e.clientX + 50, top: e.clientY }
      const pos = blockPosAtCoords(coords, view)

      if (pos != null) {
        view.dispatch(view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos)))
        const slice = view.state.selection.content()
        // let targetNode = view.nodeDOM(pos)
        // const node = view.state.doc.nodeAt(pos);
        const { dom } = serializeForClipboard(view,slice);
        extension.options.onAddClick({
          editor: extension.editor,
          position: pos,
          originalEvent: e,
          view: view,
          dom: dom,
          x:e.clientX,
          y:e.clientY
        })
      }
    }

    let dropElement:any
    const WIDTH = 28
    let addElement:any

    return [
      new Plugin({
        view(editorView) {
          const handleBox = document.createElement('div')
          handleBox.classList.add('global-drag-handle-box')
          const addEl = document.createElement('div')
          addEl.classList.add('global-drag-handle-add')
          addEl.addEventListener('click', e => addBtn(e, editorView))
          
          const element = document.createElement('div')

          element.draggable = 'true'
          element.classList.add('global-drag-handle')
          element.addEventListener('dragstart', e => dragStart(e, editorView))
          element.addEventListener('dragend', e => dragEnd(e, editorView))
          handleBox.appendChild(addEl)
          handleBox.appendChild(element)
          addElement = addEl
          dropElement = handleBox
          // append to editor's parentNode (not document.body), to match the logic of dragging across multi editors in pasteRule.ts
          editorView.dom.parentNode.appendChild(dropElement)
          return {
            destroy() {
              removeNode(dropElement)
              dropElement = null
            },
          }
        },
        props: {
          handleDrop(view, event, slice, moved) {
            if (moved && view.dragging?.source) {
              // const $pos = view.state.doc.resolve(view.dragging.source)
              // // 确保删除的是原始节点
              // if ($pos.parent.type.name === 'table') {
              //   view.dispatch(
              //     view.state.tr
              //       .delete($pos.before(), $pos.after())
              //       .scrollIntoView()
              //   )
              // }
            }
          },
          handleDOMEvents: {
            // drop(view, event) {
            //   setTimeout(() => {
            //     const node = document.querySelector('.ProseMirror-hideselection')
            //     if (node) {
            //       node.classList.remove('ProseMirror-hideselection')
            //     }
            //   }, 50)
            // },
            mousemove:throttle(function(view:any, event:any) {
              const coords = {
                left: event.clientX + WIDTH + 50,
                top: event.clientY,
              }
              const pos = view.posAtCoords(coords)

              if (pos) {
                let node = view.domAtPos(pos?.pos)

                if (node) {
                  node = node.node
                  while (node && node.parentNode) {
                    if (node.parentNode?.classList?.contains('ProseMirror')) {
                      // todo
                      break
                    }
                    node = node.parentNode
                  }

                  if (node instanceof Element) {
                    // const cstyle = window.getComputedStyle(node)
                    // const lineHeight = parseInt(cstyle.lineHeight, 10)
                    // const top = parseInt(cstyle.marginTop, 10) + parseInt(cstyle.paddingTop, 10)
                    // const top = 0
                    const rect = absoluteRect(node)
                    const win = node.ownerDocument.defaultView
                    // rect.top += win.pageYOffset + (lineHeight - 24) / 2 + top
                    rect.left += win.pageXOffset
                    rect.top = node.offsetTop
                    rect.width = 0
                    let type = getType(node)
                    addElement.className = `global-drag-handle-add add-${type}`
                    dropElement.style.display = 'flex'
                    dropElement.style.left = `${2}px`
                    dropElement.style.top = `${rect.top}px`
                    extension.options.onMousemoveEvent({
                      editor: extension.editor,
                      type: type,
                      dom: node
                    })
                  }
                }
              }
            },100),
          },
        },
      }),
    ]
  },
})
