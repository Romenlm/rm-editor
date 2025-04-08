import Image from "@tiptap/extension-image";

export const ImageExtended = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.style.width,
        renderHTML: (attributes) => {
          if (!attributes["width"]) {
            return {};
          }
          return {
            style: `width: ${attributes.width}` // 直接输出带单位的值
          };
        },
      },
      dataTemp: {
        default: null,
        parseHTML: (element) => element.dataset.temp, // 从 dataset 读取
        renderHTML: (attributes) => {
          if (!attributes.dataTemp) return {}
          return {
            'data-temp': attributes.dataTemp // 渲染为 data-temp 属性
          }
        }
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImageWidth:(width:string) =>({ chain, state }:{chain:any,state:any}) => {
        if (!state.selection.node || state.selection.node.type.name !== 'image') {
          return false
        }
        const nodePos = state.selection.$anchor.pos

        return chain()
          .updateAttributes('image', { width })
          .setNodeSelection(nodePos) // 精确重置选区
          .run()
      },
      // 新增获取宽度命令
      getImageWidth: () => ({ state }:{state:any}) => {
        if (state.selection.node?.type.name !== 'image') {
          return null
        }
        return state.selection.node.attrs.width || null
      },
      unsetWidth: () => ({ chain }:{chain:any}) => {
        return chain()
          .updateAttributes('image', { width: null })
          .run();
      },
      setTempAttribute: (value: any) => ({ chain }:{chain:any}) => {
        return chain()
          .updateAttributes('image', { 
            [`data-temp`]: value 
          })
          .run()
      },
    };
  },
});
