import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'price', 'inStock', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'name',
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
        description: 'URL-friendly version of the name',
      },
    },
    {
      name: 'description',
      type: 'richText',
      admin: {
        description: 'Product description',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        step: 0.01,
        description: 'Price in TND',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tissage', value: 'tissage' },
        { label: 'Huile Essentielle', value: 'huile-essentielle' },
        { label: 'Pâtisserie', value: 'patisserie' },
        { label: 'Produit du Terroir', value: 'produit-du-terroir' },
        { label: 'Autre', value: 'autre' },
      ],
      defaultValue: 'autre',
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      required: true,
      hasMany: true,
      admin: {
        description: 'Product images (multiple)',
      },
    },
    {
      name: 'productionCenter',
      type: 'text',
      admin: {
        description: 'Name of the production center',
      },
    },
    {
      name: 'region',
      type: 'text',
      admin: {
        description: 'Geographic region',
      },
    },
    {
      name: 'inStock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Is this product currently available?',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this product on the homepage',
      },
    },
  ],
}
