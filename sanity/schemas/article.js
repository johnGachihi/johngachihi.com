export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'publishedOn',
      title: 'Published On',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'captionedImage',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'blockContent'
    }
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedOn',
      media: 'mainImage'
    }
  }
}