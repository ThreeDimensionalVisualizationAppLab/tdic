import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// idで検索できるように埋め込むscript用の名前を定義
const SCRIPT1_NAME = 'gtag';
const SCRIPT2_NAME = 'gtagScript';

/** gtag.js読み込み用関数 */
export const initializeGA = (googleAnalyticsId: string): void => {
  // scriptが既にある場合は一度削除
  document.getElementById(SCRIPT2_NAME)?.remove();
  document.getElementById(SCRIPT1_NAME)?.remove();

  // トラッキングID or 測定IDが空の場合は終了
  if (googleAnalyticsId === '') return;

  // gtag.jsをheadタグに埋め込み
  const script1 = document.createElement('script');
  script1.id = SCRIPT1_NAME;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`;
  script1.async = true;
  document.head.appendChild(script1);

  // 実行用scriptをheadタグに埋め込み
  const script2 = document.createElement('script');
  script2.id = SCRIPT2_NAME;
  script2.text = `window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${googleAnalyticsId}');`;
  document.head.appendChild(script2);
};

declare global {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      // eslint-disable-next-line camelcase
      config: { page_path: string }
    ) => void;
  }
}

/** トラッキング用関数 */
export const useTracking = (googleAnalyticsId: string): void => {
  const { listen } = useHistory();
  useEffect(() => {
    const unlisten = listen((location) => {
      if (!window.gtag) return;
      if (googleAnalyticsId === '') return;
      window.gtag('config', googleAnalyticsId, { page_path: location.pathname });
    });

    return unlisten;
  }, [googleAnalyticsId, listen]);
};