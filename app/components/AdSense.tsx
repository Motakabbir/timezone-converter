'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  style?: React.CSSProperties;
}

const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-YOUR_PUBLISHER_ID';

export default function AdSense({ adSlot, adFormat = 'auto', style }: AdSenseProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <div className="ad-container my-4" style={style}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            ...style,
          }}
          data-ad-client={PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}