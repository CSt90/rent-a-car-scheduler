import { createClient } from "@supabase/supabase-js";
const env = process.env.NODE_ENV;
let supUrl, supK, supS;

if (env == "development") {
  supUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  supK = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  supS = process.env.NEXT_PUBLIC_SUPABASE_SCHN;
} else {
  supUrl = process.env.SUP_SUPABASE_URL;
  supK = process.env.SUP_SUPABASE_ANON_KEY;
  supS = process.env.SUP_SUPABASE_SCHN;
}
// status:200 -- successful data fetch
// status:201 -- successful data send
// status:500 -- error
//

const supabase = createClient(supUrl, supK, { db: { schema: supS } });

export default supabase;
