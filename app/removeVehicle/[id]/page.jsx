import React from "react";

export default async function Page({ params }) {
  const { id } = await params;
  return <div>Διαγραφή οχήματος {id}</div>;
}
