import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  const payload = await getPayload({ config })
  
  return Response.json({ message: 'Payload CMS API' })
}
