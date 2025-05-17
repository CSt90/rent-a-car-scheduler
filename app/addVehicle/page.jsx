// import React from "react";

// const AddCar = () => {
//   return <div>Add Car</div>;
// };

// export default AddCar;

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
export default async function addVehicle() {
  const supabase = createClient(supUrl, supK, { db: { schema: supS } });
  const { data, error } = await supabase.from("vehicle").select();
  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>;
}
