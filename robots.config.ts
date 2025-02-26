export default {
  UserAgent: '*',
  Allow: '/',
  Sitemap: (req: any) => `https://${req.headers.host}/sitemap.xml`,
  CleanParam: [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content'
  ]
}