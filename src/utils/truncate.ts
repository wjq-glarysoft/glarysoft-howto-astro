// src/utils/truncate.ts

/**
 * 截取文本，保留指定数量的单词或汉字
 * @param text 原始文本
 * @param length 数量（单词数或字符数）
 * @param type 'words' 按单词截取，'chars' 按字符截取
 */
export function truncateText(
  text: string, 
  length: number = 55, 
  type: 'words' | 'chars' = 'words'
): string {
  if (!text) return '';
  
  // 移除 HTML 标签
  const plainText = text.replace(/<[^>]*>/g, '');
  
  if (type === 'words') {
    // 按单词截取（英文空格分隔，中文按字符处理）
    const words = plainText.split(/\s+/);
    if (words.length <= length) return plainText;
    return words.slice(0, length).join(' ') + '...';
  } else {
    // 按字符截取（适用于中文）
    if (plainText.length <= length) return plainText;
    return plainText.slice(0, length) + '...';
  }
}

/**
 * 智能截取：混合中英文场景
 * 中文按字符，英文按单词
 */
export function smartTruncate(text: string, length: number = 50): string {
  const plainText = text.replace(/<[^>]*>/g, '');
  
  // 检测是否包含中文
  const hasChinese = /[\u4e00-\u9fa5]/.test(plainText);
  
  if (hasChinese) {
    // 包含中文，按字符截取
    if (plainText.length <= length) return plainText;
    return plainText.slice(0, length) + '...';
  } else {
    // 纯英文，按单词截取
    const words = plainText.split(/\s+/);
    if (words.length <= length) return plainText;
    return words.slice(0, length).join(' ') + '...';
  }
}

export function getExcerpt(content: string, maxLength: number = 55): string {
  if (!content) return '';
  

  let text = content.replace(/<[^>]*>/g, '');
  
  // 2. 移除 Markdown 语法（可选）
  text = text.replace(/[#*_~`>]/g, '');
  
  // 3. 清理空白字符
  text = text.replace(/\s+/g, ' ').trim();
  
  // 4. 智能截取
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  const isChinese = chineseChars && chineseChars.length > text.length * 0.3;
  
  if (isChinese) {
    // 中文场景按字符
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  } else {
    const words = text.split(' ');
    return words.length > maxLength 
      ? words.slice(0, maxLength).join(' ') + '...' 
      : text;
  }
}

