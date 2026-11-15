import { createFileRoute } from '@tanstack/react-router';
import { Canvas } from '@/features/focus/canvas';
import { pageHead } from '@/features/focus/metadata';
type Search = { doc?:string; mode?:string };
export const Route = createFileRoute('/canvas')({ validateSearch:(s:Record<string,unknown>):Search => ({ doc:typeof s.doc === 'string' ? s.doc : undefined,mode:typeof s.mode === 'string' ? s.mode : undefined }),head:() => pageHead('Learning Canvas','Explore structured notes, adaptive focus, and thoughtful revision quizzes.'),component:CanvasPage });
function CanvasPage() { const search=Route.useSearch();return <Canvas key={`${search.doc}-${search.mode}`} documentId={search.doc} initialMode={search.mode}/>; }
