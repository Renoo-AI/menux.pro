import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

export function Seo({
  title = "MenuxPro — Carte digitale premium pour cafés et restaurants",
  description = "MenuxPro transforme votre menu en carte digitale QR avec commandes à table et tableau de bord caissier pour cafés et restaurants.",
  ogImage = "/og-image.png"
}: SeoProps) {
  useEffect(() => {
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) {
      ogImg.setAttribute('content', ogImage);
    }
  }, [title, description, ogImage]);

  return null;
}
