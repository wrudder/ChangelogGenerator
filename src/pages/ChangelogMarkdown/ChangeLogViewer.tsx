import { useEffect, useState } from 'react';

import ReactMarkdown from 'react-markdown';

import { Check, Clipboard } from 'lucide-react';

const ChangelogPage = () => {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const changeLogSummaryFromStore = localStorage.getItem('changelogSummary');
    if (!changeLogSummaryFromStore) {
      setError('No changelog summary found in localStorage.');
      return;
    }
    try {
      const parsed = JSON.parse(changeLogSummaryFromStore);
      if (typeof parsed === 'object' && parsed.markdown) {
        setMarkdown(parsed.markdown);
      } else {
        setError('Invalid changelog summary format.');
      }
    } catch {
      setError('Failed to parse changelog summary JSON.');
    }
  }, []);

  const handleCopy = async () => {
    if (!markdown) return;
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
  };

  const exportMarkdownToFile = () => {
    if (!markdown) return;
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'CHANGELOG.md';
    a.click();

    URL.revokeObjectURL(url);
  };

  if (error) {
    return <div className="p-8 text-red-700 font-semibold">{error}</div>;
  }

  if (!markdown) {
    return <div className="p-8 text-gray-500 italic">Loading changelog summary…</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="prose max-w-3xl w-full px-6 py-8 bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between mb-8 border-b pb-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-900">
            Changelog Summary
          </h1>
  
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 text-sm text-indigo-700 border border-indigo-600 font-semibold px-4 py-2 rounded-md hover:bg-indigo-50 transition"
              title={copied ? 'Copied!' : 'Copy Markdown'}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Clipboard className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
  
            <button
              type="button"
              onClick={exportMarkdownToFile}
              className="inline-flex items-center gap-2 text-sm text-green-700 border border-green-600 font-semibold px-4 py-2 rounded-md hover:bg-green-50 transition"
              title="Download Markdown"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
              </svg>
              Download
            </button>
          </div>
        </div>
  
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );  
};

export default ChangelogPage;
