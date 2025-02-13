export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>PhotoPage - {id}</div>;
}
