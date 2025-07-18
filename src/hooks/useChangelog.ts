import { useState } from 'react';

interface Options {
  fromCommit: string
  githubUrl: string
  toCommit: string,
}

export const useChangelog = (options: Options) => {
  const [loadingChangelog, setLoadingChangelog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fromCommit, toCommit, githubUrl } = options
  const generateAISummary = async () => {
    if (!fromCommit || !toCommit || !githubUrl) { 
      setError('Please provide a GitHub repo URL and commit hashes.');
      return;
    }

    setLoadingChangelog(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/generate_changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_sha: fromCommit,
          to_sha: toCommit,
          repo: githubUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate AI summary');

      const data = await res.json();
      const markdown = data.summary || data.data || JSON.stringify(data);
      localStorage.setItem('changelogSummary', markdown);
      window.location.href = '/changelog';
    } catch (err: any) {
      setError(err.message || 'Unknown error during summary generation.');
    } finally {
      setLoadingChangelog(false);
    }
  };

  return { callbacks: { generateAISummary, setError }, loadingChangelog, error };
};
