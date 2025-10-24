import { useEffect } from 'react';

interface UsePageTitleOptions {
  title: string;
  description?: string;
}

export const usePageTitle = ({ title, description }: UsePageTitleOptions) => {
  useEffect(() => {
    document.title = `${title} - Teddy System`;
    
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
};
