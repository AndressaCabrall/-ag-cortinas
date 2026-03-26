// src/hooks/useSEO.js
// Hook para gerenciar meta tags de SEO por página
// Uso: useSEO({ title, description, image, url })

import { useEffect } from 'react'

const SITE_NAME = 'Cortinas sob Media em Joinville|AG Cortinas e Persianas'
const SITE_URL = 'https://www.agcortinas.andressacabraltech.com.br' 
const DEFAULT_IMAGE = '/og-image.jpg'          

export function useSEO({ title, description, image, url, type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    // ----- <title> -----
    document.title = fullTitle

    // ----- Helper -----
    function setMeta(selector, attr, value) {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [attrName, attrVal] = selector
          .replace('meta[', '')
          .replace(']', '')
          .split('="')
        el.setAttribute(attrName, attrVal.replace('"', ''))
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    const ogImage = image || DEFAULT_IMAGE
    const ogUrl   = url   ? `${SITE_URL}${url}` : SITE_URL

    // ----- Meta básicas -----
    setMeta('meta[name="description"]',        'content', description)

    // ----- Open Graph -----
    setMeta('meta[property="og:title"]',       'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:image"]',       'content', ogImage)
    setMeta('meta[property="og:url"]',         'content', ogUrl)
    setMeta('meta[property="og:type"]',        'content', type)
    setMeta('meta[property="og:site_name"]',   'content', SITE_NAME)

    // ----- Twitter Card -----
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image')
    setMeta('meta[name="twitter:title"]',       'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]',       'content', ogImage)

    // ----- Canonical -----
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', ogUrl)

  }, [title, description, image, url, type])
}
