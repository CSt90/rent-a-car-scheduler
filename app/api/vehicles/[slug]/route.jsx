import supabase from "@/app/utils/db";

export async function GET(request, props) {
  const params = await props.params;

  const slug = params.slug; // carId
  try {
    const res = await supabase.from("vehicle").select().eq("carId", slug);

    if (res.error) {
      throw res.error;
    }

    return Response.json(res.data[0], { status: 200 }); // This auto sets Content-Type to application/json
  } catch (error) {
    return Response.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
