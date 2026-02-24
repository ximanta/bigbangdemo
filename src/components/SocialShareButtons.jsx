import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

function SocialShareButtons({ articleTitle, articleUrl }) {
  const encodedTitle = encodeURIComponent(articleTitle);
  const encodedUrl = encodeURIComponent(articleUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
  };

  return (
    <div className="social-share-buttons">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="button--icon social-share-buttons__icon"
        aria-label="Share on Facebook"
      >
        <Facebook size={20} />
      </a>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="button--icon social-share-buttons__icon"
        aria-label="Share on Twitter"
      >
        <Twitter size={20} />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="button--icon social-share-buttons__icon"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href={shareLinks.email}
        className="button--icon social-share-buttons__icon"
        aria-label="Share via Email"
      >
        <Mail size={20} />
      </a>
    </div>
  );
}

export default SocialShareButtons;
