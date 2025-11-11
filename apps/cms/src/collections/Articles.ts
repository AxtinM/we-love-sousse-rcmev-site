import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publicationType', 'publishedAt', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'publicationType',
      type: 'select',
      required: true,
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Scientifique', value: 'scientifique' },
        { label: 'Rapport', value: 'rapport' },
        { label: 'Compte-rendu', value: 'compte-rendu' },
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Cartographie', value: 'cartographie' },
        { label: 'Document', value: 'document' },
        { label: 'Actualité', value: 'actualite' },
      ],
      defaultValue: 'article',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short description or summary',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Main article content',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main article cover image',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Custom page title for SEO',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Custom meta description for SEO',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Open Graph image for social sharing',
          },
        },
      ],
    },
  ],
}
