export const CATEGORY_MAP: Record<string, string> = {
  'system-tools': 'System & Tools',
  'files-folders': 'Files & Folders',
  'clean-up-repair': 'Clean Up & Repair',
  'optimize-improve': 'Optimize & Improve',
  'privacy-security': 'Privacy & Security'
} as const;

export function formatCategoryName(slug: string): string {
  return CATEGORY_MAP[slug] || 
    slug.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' & ');
}