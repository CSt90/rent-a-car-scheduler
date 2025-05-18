import supabase from "@/app/utils/db";

export async function GET() {
  try {
    const res = await supabase.from("vehicle").select();
    // console.log(res);
    if (res.error) {
      throw res.error;
    }
    return Response.json(res.data, { status: 200 });

    // return Response.json(res)
  } catch (error) {
    return Response.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
