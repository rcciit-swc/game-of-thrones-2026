import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert HTML-ish content into plain text lines.
 * - replaces <br> and </p> with line breaks
 * - strips remaining tags
 * - decodes HTML entities in browser environments
 */
export function htmlToLines(html?: string): string[] {
  if (!html) return [];
  let text = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
  // strip remaining tags
  text = text.replace(/<[^>]+>/g, '');

  // decode entities in browser
  if (typeof document !== 'undefined') {
    const el = document.createElement('div');
    el.innerHTML = text;
    text = el.textContent || el.innerText || '';
  }

  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}
