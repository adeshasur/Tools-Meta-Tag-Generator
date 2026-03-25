import React, { useEffect, useMemo, useState } from 'react'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap');

  :root {
    --primary: #111111;
    --panel-border: rgba(17, 17, 17, 0.14);
    --panel-bg: rgba(255, 255, 255, 0.58);
    --panel-muted: rgba(255, 255, 255, 0.42);
    --text-main: #111827;
    --text-muted: #6B7280;
    --border: #E5E7EB;
    --bg-surface: #FFFFFF;
  }

  body {
    font-family: 'Inter', sans-serif;
    color: var(--text-main);
  }

  .font-brand { font-family: 'Outfit', sans-serif; }

  .clean-card {
    background: transparent;
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .clean-input {
    background: var(--bg-surface);
    border: 1.5px solid var(--panel-border);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .clean-input:focus {
    border-color: rgba(17, 17, 17, 0.36);
    background: rgba(255,255,255,0.94);
    box-shadow: 0 0 0 4px rgba(17, 17, 17, 0.08);
    outline: none;
    transform: translateY(-1px);
  }

  .clean-button {
    background: #111111;
    color: #FFFFFF;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .clean-button::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .clean-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px -10px rgba(17, 17, 17, 0.38);
  }

  .clean-button:hover:not(:disabled)::after {
    opacity: 1;
  }

  .clean-button:disabled {
    background: rgba(229, 231, 235, 0.82);
    color: #9CA3AF;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .muted-button {
    background: rgba(255, 255, 255, 0.82);
    color: #111111;
    border: 1px solid rgba(17, 17, 17, 0.12);
    transition: all 0.25s ease;
  }

  .muted-button:hover {
    transform: translateY(-1px);
    background: rgba(17, 17, 17, 0.04);
  }

  .toggle-pill {
    border: 1px solid rgba(229, 231, 235, 0.9);
    background: rgba(255, 255, 255, 0.82);
    transition: all 0.25s ease;
  }

  .toggle-pill.active {
    background: rgba(17, 17, 17, 0.04);
    border-color: rgba(17, 17, 17, 0.32);
    color: #111111;
  }

  .animate-float {
    animation: float 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 8s ease-in-out infinite;
    animation-delay: -4s;
  }

  @keyframes float {
    0% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-20px) scale(1.05); }
    100% { transform: translateY(0px) scale(1); }
  }

  .data-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border-radius: 12px;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  }

  .data-row:last-child {
    border-bottom: none;
  }

  .data-row:hover {
    background: rgba(17, 17, 17, 0.04);
    transform: translateX(4px);
  }
`

const MAX_TITLE = 60
const MAX_DESCRIPTION = 160

const defaultState = {
  title: 'Meta Tag Generator',
  description: 'Generate clean SEO meta tags, Open Graph tags, and Twitter card tags for your HTML head section in seconds.',
  keywords: 'meta tags, seo, open graph, twitter cards, html head',
  author: 'Adheesha Sooriyaarachchi',
  canonicalUrl: 'https://example.com',
  ogImage: 'https://example.com/preview.jpg',
  twitterHandle: '@yourhandle',
  robotsIndex: 'index',
  robotsFollow: 'follow',
  twitterCard: 'summary_large_image',
}

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const buildTag = (tag, value, isProperty = false) => {
  if (!value.trim()) {
    return null
  }

  const attribute = isProperty ? 'property' : 'name'
  return `<meta ${attribute}="${tag}" content="${escapeHtml(value.trim())}">`
}

const MetaTagGenerator = ({ embedded = false }) => {
  const [form, setForm] = useState(defaultState)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [copied])

  const robots = `${form.robotsIndex}, ${form.robotsFollow}`

  const metaTags = useMemo(() => {
    const lines = [
      `<title>${escapeHtml(form.title.trim())}</title>`,
      buildTag('title', form.title),
      buildTag('description', form.description),
      buildTag('keywords', form.keywords),
      buildTag('author', form.author),
      buildTag('robots', robots),
      form.canonicalUrl.trim() ? `<link rel="canonical" href="${escapeHtml(form.canonicalUrl.trim())}">` : null,
      buildTag('og:title', form.title, true),
      buildTag('og:description', form.description, true),
      buildTag('og:type', 'website', true),
      buildTag('og:url', form.canonicalUrl, true),
      buildTag('og:image', form.ogImage, true),
      buildTag('twitter:card', form.twitterCard),
      buildTag('twitter:title', form.title),
      buildTag('twitter:description', form.description),
      buildTag('twitter:image', form.ogImage),
      buildTag('twitter:site', form.twitterHandle),
    ].filter(Boolean)

    return lines.join('\n')
  }, [form, robots])

  const counts = {
    title: form.title.length,
    description: form.description.length,
  }

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(metaTags)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  const resetForm = () => {
    setForm(defaultState)
    setCopied(false)
  }

  const wrapperClasses = embedded
    ? 'w-full max-w-6xl mx-auto flex flex-col justify-center px-2 sm:px-4 py-2 relative overflow-hidden'
    : 'w-full max-w-6xl mx-auto flex flex-col justify-center px-4 sm:px-6 pt-24 pb-20 relative overflow-hidden'

  return (
    <div className={wrapperClasses}>
      <style>{styles}</style>

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-black/6 blur-[120px] -z-10 pointer-events-none animate-float"></div>
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-black/4 blur-[100px] -z-10 pointer-events-none animate-float-delayed"></div>

      <div className="clean-card grid grid-cols-1 gap-8 p-6 sm:p-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="grid gap-5">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-gray-700">Site Title</label>
                <span className={`text-xs ${counts.title > MAX_TITLE ? 'text-red-500' : 'text-gray-400'}`}>
                  {counts.title}/{MAX_TITLE}
                </span>
              </div>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="Enter page title"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <span className={`text-xs ${counts.description > MAX_DESCRIPTION ? 'text-red-500' : 'text-gray-400'}`}>
                  {counts.description}/{MAX_DESCRIPTION}
                </span>
              </div>
              <textarea
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
                className="clean-input min-h-[120px] w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400 resize-none"
                placeholder="Write a short SEO description"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Keywords</label>
              <input
                type="text"
                value={form.keywords}
                onChange={(event) => updateField('keywords', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="seo, tags, metadata"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Author Name</label>
              <input
                type="text"
                value={form.author}
                onChange={(event) => updateField('author', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="Optional author"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Canonical URL</label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(event) => updateField('canonicalUrl', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Open Graph Image</label>
              <input
                type="url"
                value={form.ogImage}
                onChange={(event) => updateField('ogImage', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="https://example.com/og-image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Twitter Handle</label>
              <input
                type="text"
                value={form.twitterHandle}
                onChange={(event) => updateField('twitterHandle', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900 placeholder:text-gray-400"
                placeholder="@yourhandle"
              />
            </div>
          </div>

          <div className="grid gap-4 rounded-[24px] border border-[rgba(17,17,17,0.08)] bg-[rgba(255,255,255,0.45)] p-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Index Setting</label>
              <div className="grid grid-cols-2 gap-2">
                {['index', 'noindex'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField('robotsIndex', value)}
                    className={`toggle-pill rounded-xl px-3 py-3 text-sm font-medium ${form.robotsIndex === value ? 'active' : 'text-gray-600'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Follow Setting</label>
              <div className="grid grid-cols-2 gap-2">
                {['follow', 'nofollow'].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateField('robotsFollow', value)}
                    className={`toggle-pill rounded-xl px-3 py-3 text-sm font-medium ${form.robotsFollow === value ? 'active' : 'text-gray-600'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Twitter Card</label>
              <select
                value={form.twitterCard}
                onChange={(event) => updateField('twitterCard', event.target.value)}
                className="clean-input w-full rounded-xl p-4 text-base text-gray-900"
              >
                <option value="summary">summary</option>
                <option value="summary_large_image">summary_large_image</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={copyAll} className="clean-button rounded-xl px-5 py-3 text-sm font-semibold">
              {copied ? 'Copied Meta Tags' : 'Copy to Clipboard'}
            </button>
            <button type="button" onClick={resetForm} className="muted-button rounded-xl px-5 py-3 text-sm font-semibold">
              Reset Fields
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-[24px] border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.58)] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-brand text-[1.35rem] font-semibold tracking-[-0.05em] text-slate-950">Live Meta Preview</h2>
                <p className="mt-1 text-sm text-gray-500">Copy-ready HTML for your &lt;head&gt; section.</p>
              </div>
              <span className="rounded-full bg-[rgba(17,17,17,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-600">
                Live
              </span>
            </div>

            <pre className="mt-4 overflow-x-auto rounded-[20px] bg-[#111111] p-5 text-sm leading-7 text-white">
              <code>{metaTags}</code>
            </pre>
          </div>

          <div className="rounded-[24px] border border-[rgba(17,17,17,0.12)] bg-[rgba(255,255,255,0.58)] p-5">
            <div className="space-y-1">
              <div className="data-row">
                <span className="text-sm text-gray-500">Title Length</span>
                <span className={`text-sm font-semibold ${counts.title > MAX_TITLE ? 'text-red-500' : 'text-gray-900'}`}>
                  {counts.title} chars
                </span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">Description Length</span>
                <span className={`text-sm font-semibold ${counts.description > MAX_DESCRIPTION ? 'text-red-500' : 'text-gray-900'}`}>
                  {counts.description} chars
                </span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">Robots Rule</span>
                <span className="text-sm font-semibold text-gray-900">{robots}</span>
              </div>
              <div className="data-row">
                <span className="text-sm text-gray-500">OG + Twitter</span>
                <span className="text-sm font-semibold text-gray-900">Included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MetaTagGenerator
