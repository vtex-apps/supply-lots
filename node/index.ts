import { Service } from '@vtex/api'

import { clients } from './clients'
import { resolvers } from './resolvers'

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  graphql: { resolvers },
})
