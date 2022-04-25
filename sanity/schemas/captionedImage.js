export default {
  name: "captionedImage",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      title: "Alt",
      type: "string",
      options: { isHighlighted: true },
    },
    {
      name: "caption",
      title: "Caption",
      type: "array",
      of: [
        {
          type: "block",
          styles: [],
          lists: [],
          marks: {
            decorators: [],
          },
        },
      ],
      options: { isHighlighted: true },
    }
  ]
}