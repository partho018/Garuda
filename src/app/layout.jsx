import '../index.css';
import '../App.css';

import { queryRow } from '../lib/db';

export async function generateMetadata() {
  try {
    const setting = await queryRow(
      "SELECT value FROM site_settings WHERE key = 'general'"
    );
    
    let settingsData = {
      seoTitle: 'Garuda',
      seoDescription: 'Garuda Portfolio'
    };
    
    if (setting && setting.value) {
      try {
        settingsData = JSON.parse(setting.value);
      } catch (e) {
        console.error('Failed to parse settings JSON in layout:', e);
      }
    }
    
    return {
      title: settingsData.seoTitle || 'Garuda',
      description: settingsData.seoDescription || 'Garuda Portfolio',
      icons: {
        icon: '/favicon.svg',
      },
    };
  } catch (error) {
    console.error('Failed to fetch settings for layout metadata:', error);
    return {
      title: 'Garuda',
      description: 'Garuda Portfolio',
      icons: {
        icon: '/favicon.svg',
      },
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,700&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Dancing+Script:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
