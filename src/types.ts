// src/types.ts
export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    date: string;
    description?: string;
    tags?: string[];
    // 根据你在frontmatter中定义的字段添加
  };
}