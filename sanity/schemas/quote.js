export default {
  name: "quote",
  title: "Quote",
  type: "object",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      validation: Rule => Rule.required()
    },
    {
      name: "source",
      title: "Source",
      type: "string",
      validation: Rule => Rule.required()
    },
  ],
}