export default {
  name: "captionedImage",
  title: "Image",
  type: "image",
  fields: [
    {
      name: "alt",
      title: "Alt",
      type: "string",
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
    }
  ]
}