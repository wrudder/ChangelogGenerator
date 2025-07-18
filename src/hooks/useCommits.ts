import { useState } from 'react';

export type Commit = {
  content: string;
  github_commit_url: string,
  id: number;
  short_sha: string,
  title: string;
};

export const useCommits = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loadingCommits, setLoadingCommits] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommits = async (from?: string, to?: string, githubUrl?: string) => {
    setLoadingCommits(true);
    setError(null);
    try {
      const url = new URL('http://localhost:3000/integrations/github/fetch_github_commits');
      if (from) url.searchParams.append('from_sha', from);
      if (to) url.searchParams.append('to_sha', to);
      if (githubUrl) url.searchParams.append('repo', githubUrl);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error('Failed to fetch changelogs');
      const data = await res.json();
      setCommits(data);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      setCommits([]);
    } finally {
      setLoadingCommits(false);
    }
  };

  const hasCommits = !!commits.length

  return { callbacks: { fetchCommits, setCommits }, commits, hasCommits, loadingCommits, commitError: error };
};
