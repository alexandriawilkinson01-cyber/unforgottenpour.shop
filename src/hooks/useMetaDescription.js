import { useEffect } from 'react';

/**
 * Sets the document's <meta name="description"> tag and optionally the
 * <title> for the current page. Cleans up on unmount so navigating between
 * pages always reflects the active route.
 */
export function useMetaDescription(description, title) {
  useEffect(() => {
    // Set or update meta description
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', description);

    // Optionally update the page title
    if (title) {
      document.title = title;
    }
  }, [description, title]);
}