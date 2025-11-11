import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Articles } from './collections/Articles'
import { Products } from './collections/Products'
import { Contacts } from './collections/Contacts'
import { PressCoverages } from './collections/PressCoverages'
import { Partners } from './collections/Partners'
import { Media } from './collections/Media'

// Globals
import { ProjectStatistics } from './globals/ProjectStatistics'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Articles,
    Products,
    Contacts,
    PressCoverages,
    Partners,
    Media,
  ],
  globals: [
    ProjectStatistics,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [],
})
