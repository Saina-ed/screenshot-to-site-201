import { createFileRoute } from '@tanstack/react-router';
import { Library } from '@/features/focus/library';
import { pageHead } from '@/features/focus/metadata';
export const Route = createFileRoute('/revision')({ head:() => pageHead('Revision','Practice active recall and revise your lesson cards at your own pace.'),component:() => <Library revision/> });
