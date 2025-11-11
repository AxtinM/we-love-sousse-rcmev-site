import type { GlobalConfig } from 'payload'

export const ProjectStatistics: GlobalConfig = {
  slug: 'project-statistics',
  admin: {
    description: 'Key project numbers and achievements',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'directBeneficiaries',
      type: 'number',
      required: true,
      defaultValue: 5481,
      admin: {
        description: 'Number of direct beneficiaries',
      },
    },
    {
      name: 'appliedResearch',
      type: 'number',
      required: true,
      defaultValue: 19,
      admin: {
        description: 'Number of applied research projects',
      },
    },
    {
      name: 'womenReached',
      type: 'number',
      required: true,
      defaultValue: 721,
      admin: {
        description: 'Number of women reached by the project',
      },
    },
    {
      name: 'activities',
      type: 'number',
      required: true,
      defaultValue: 410,
      admin: {
        description: 'Total number of activities conducted',
      },
    },
    {
      name: 'additionalStats',
      type: 'json',
      admin: {
        description: 'Additional statistics in JSON format',
      },
    },
  ],
}
