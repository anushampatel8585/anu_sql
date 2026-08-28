import ModuleClient from '@/components/ModuleClient';

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <ModuleClient id={resolvedParams.id} />;
}
