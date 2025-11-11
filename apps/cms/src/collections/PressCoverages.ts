import type { CollectionConfig } from 'payload'

export const PressCoverages: CollectionConfig = {
  slug: 'press-coverages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'source', 'displayType', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Name of the media outlet (e.g., La Presse, Mosaique FM)',
      },
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'URL to the article or press coverage',
      },
    },
    {
      name: 'displayType',
      type: 'radio',
      required: true,
      options: [
        { label: 'Embed', value: 'embed' },
        { label: 'Link', value: 'link' },
      ],
      defaultValue: 'link',
      admin: {
        description: 'How to display this coverage (embedded or as a link)',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short excerpt or description',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        description: 'Date the article was published',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Thumbnail image for the coverage',
      },
    },
  ],
}
