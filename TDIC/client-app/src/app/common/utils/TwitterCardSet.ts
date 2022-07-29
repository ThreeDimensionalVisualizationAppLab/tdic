import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Setup ID
const ID_TWITTERCARD_CARD = 'id_twittercard_card';
const ID_TWITTERCARD_SITE = 'id_twittercard_site';
const ID_TWITTERCARD_TITLE = 'id_twittercard_title';
const ID_TWITTERCARD_DESCRIPTION = 'id_twittercard_description';
const ID_TWITTERCARD_IMAGE = 'id_twittercard_image';

// Function for Twitter Card
export const TwitterCardSet = (card_type: string, sitename: string, title: string, description: string, url_image: string): void => {
  // If twitter card tag already exists, delete it
  document.getElementById(ID_TWITTERCARD_CARD)?.remove();

  // トラッキングID or 測定IDが空の場合は終了
  if (card_type === '') return;

  // Embed twitter card tag in head tag

  // 1: Card
  const meta_card_card = document.createElement('meta');
  meta_card_card.id = ID_TWITTERCARD_CARD;
  meta_card_card.name = "twitter:card";
  meta_card_card.content = "summary_large_image";
  document.head.appendChild(meta_card_card);
//  console.log("called card");
  

  // 2: Card
  const meta_card_site = document.createElement('meta');
  meta_card_site.id = ID_TWITTERCARD_SITE;
  meta_card_site.name = "twitter:site";
  meta_card_site.content = sitename;
  document.head.appendChild(meta_card_site);
  

  // 3: Title
  const meta_card_title = document.createElement('meta');
  meta_card_title.id = ID_TWITTERCARD_TITLE;
  meta_card_title.name = "twitter:title";
  meta_card_title.content = title;
  document.head.appendChild(meta_card_title);
  

  // 4: Description
  const meta_card_description = document.createElement('meta');
  meta_card_description.id = ID_TWITTERCARD_DESCRIPTION;
  meta_card_description.name = "twitter:description";
  meta_card_description.content = description;
  document.head.appendChild(meta_card_description);
  

  // 5: Description
  const meta_card_image = document.createElement('meta');
  meta_card_image.id = ID_TWITTERCARD_IMAGE;
  meta_card_image.name = "twitter:image";
  meta_card_image.content = url_image;
  document.head.appendChild(meta_card_image);

};
