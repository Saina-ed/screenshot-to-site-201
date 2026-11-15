import { createFileRoute } from '@tanstack/react-router';
import { Auth } from '@/features/focus/auth';
import { pageHead } from '@/features/focus/metadata';
export const Route = createFileRoute('/auth')({ head:() => pageHead('Welcome','Stay focused. Learn your way. Explore your own calm learning space.'),component:Auth });
