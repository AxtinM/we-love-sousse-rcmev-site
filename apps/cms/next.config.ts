import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  outputFileTracingRoot: require('path').join(__dirname, '../../'),
}

export default withPayload(nextConfig)
