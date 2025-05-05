/**
 * Type definitions for Next.js 15 pages
 */

// Generic type for dynamic route parameters
export type DynamicParams<T extends Record<string, string>> = {
  params: Promise<T>;
  searchParams?: Record<string, string | string[] | undefined>;
};

// Common specific parameter types
export type IdParams = DynamicParams<{ id: string }>;
export type SlugParams = DynamicParams<{ slug: string }>;

// Usage examples:
// For [id] routes: export default async function Page({ params }: IdParams)
// For [slug] routes: export default async function Page({ params }: SlugParams)
// For custom routes: export default async function Page({ params }: DynamicParams<{ userId: string, postId: string }>)

/**
 * Helper functions for Next.js 15 pages
 */

// Since we're using JavaScript, we'll provide helper functions instead of types

/**
 * Helper function to resolve params safely, whether they're a Promise or not
 * @param {Promise|Object} params - The params object that might be a Promise
 * @returns {Promise<Object>} - The resolved params
 */
export async function resolveParams(params) {
  return params instanceof Promise ? await params : params;
}

// Example usage:
// import { resolveParams } from '@/lib/types';
//
// export default async function Page({ params }) {
//   const resolvedParams = await resolveParams(params);
//   return <YourComponent id={resolvedParams.id} />;
// }
