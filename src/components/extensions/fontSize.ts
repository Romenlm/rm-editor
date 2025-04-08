import TextStyle from "@tiptap/extension-text-style";

export const TextStyleExtended = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize.replace("px", ""),
        renderHTML: (attributes) => {
          if (!attributes["fontSize"]) {
            return {};
          }
          return {
            style: `font-size: ${attributes["fontSize"]}px`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setFontSize:(fontSize:string) =>({ commands }:{commands:any}) => {
          return commands.setMark(this.name, { fontSize: fontSize });  //this.name 值为 'textStyle'
        },
      unsetFontSize:
        () =>
        ({ chain }:{chain:any}) => {
          return chain().setMark(this.name, { fontSize: null }).removeEmptyTextStyle().run(); //this.name 值为 'textStyle'
        },
    };
  },
});
