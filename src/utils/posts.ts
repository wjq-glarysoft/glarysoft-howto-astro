import { getCollection } from 'astro:content';

export async function getAllPosts() {
  try {
    const posts = await getCollection('posts');
    return posts
      .map(post => ({ ...post }))
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return [];
  }
}

export function getPaginatedPosts(posts: any[], page: number, perPage: number) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return {
    posts: posts.slice(startIndex, endIndex),
    totalPages: Math.ceil(posts.length / perPage),
    totalPosts: posts.length
  };
}