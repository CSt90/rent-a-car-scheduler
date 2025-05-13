// import React from "react";

// const AddCar = () => {
//   return <div>Add Car</div>;
// };

// export default AddCar;

import { createClient } from "@supabase/supabase-js";
export default async function Instruments() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { db: { schema: "racsch" } }
  );
  const vehicles = await supabase.from("vehicle").select();
  return <pre>{JSON.stringify(vehicles, null, 2)}</pre>;
}
