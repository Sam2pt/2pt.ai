import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://2pttech.com'
  const lastModified = new Date()

  return [
    { url: `${base}/`, lastModified, priority: 1.0 },
    { url: `${base}/approach`, lastModified, priority: 0.9 },
    { url: `${base}/manifesto`, lastModified, priority: 0.9 },
    { url: `${base}/products`, lastModified, priority: 0.8 },
    { url: `${base}/work`, lastModified, priority: 0.8 },
    { url: `${base}/work/barker-beds`, lastModified, priority: 0.7 },
    { url: `${base}/work/harken`, lastModified, priority: 0.7 },
    { url: `${base}/work/yamaha`, lastModified, priority: 0.7 },
    { url: `${base}/work/dreamies`, lastModified, priority: 0.7 },
    { url: `${base}/team`, lastModified, priority: 0.6 },
    { url: `${base}/contact`, lastModified, priority: 0.6 },
  ]
}
