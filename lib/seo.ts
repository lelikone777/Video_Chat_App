import type { Metadata } from "next";

const SITE_NAME = "WaveMeet";
const DEFAULT_BASE_URL = "http://localhost:3000";

const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL;
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");

export const metadataBase = new URL(normalizedBaseUrl);

type CreatePageMetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  noIndex = false,
}: CreatePageMetadataInput): Metadata => {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: canonicalPath,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
};
