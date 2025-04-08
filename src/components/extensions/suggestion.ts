import {VueRenderer} from '@tiptap/vue-3'
import tippy from 'tippy.js'

import CommandsList from '../common/component/CommandsList.vue'

export default {

  render: () => {
    let component: any
    let popup: any

    return {
      onStart: (props: any) => {
        console.log('=========')
        console.log(props)
        component = new VueRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }
        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }
        if (component.ref && component.ref.onKeyDown) {
          return component.ref.onKeyDown(props);
        }
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
