import Heading from '@tiptap/extension-heading'

export const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(), // 继承父类的属性
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('id'),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {}
          }
          return { id: attributes.id }
        },
      },
    }
  },

  addCommands() {
    return {
      ...this.parent?.(), // 继承父类的命令
      setHeadingId: (id:string) => ({ chain }:{chain:any}) => {
        return chain()
          .setNode('heading', { id })
          .run()
      },
    }
  },
})