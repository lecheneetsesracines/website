import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ cacheDir: '/Users/laurent/website/tina/__generated__/.cache/1760286691837', url: 'http://localhost:4001/graphql', token: 'local', queries,  });
export default client;
  