import { useState } from 'react';

import CommitForm from './components/CommitForm';
import CommitFooter from './components/CommitFooter';
import CommitTable from './components/CommitTable';
import ErrorMessage from './components/ErrorMessage';
import { useCommits } from '../../hooks/useCommits';
import { useChangelog } from '../../hooks/useChangelog';

const DevTool = () => {
  const [hasAtttemptedToFetch, setHasAtttemptedToFetch] = useState(false)
  const [fromCommit, setFromCommit] = useState('');
  const [toCommit, setToCommit] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('')

  const {
    callbacks: { fetchCommits, setCommits },
    commits,
    hasCommits,
    loadingCommits,
    commitError,
  } = useCommits();

  const {
    callbacks: { generateAISummary },
    loadingChangelog,
    error: changelogError,
  } = useChangelog({ fromCommit, toCommit, githubUrl });
  

  const handleSubmit = (e: React.FormEvent) => {
    setCommits([])
    setValidationError(null)
    e.preventDefault();

    if (
      (!fromCommit.trim() && !toCommit.trim()) ||
      (fromCommit.trim().length < 5 && fromCommit.trim() !== '') ||
      (toCommit.trim().length < 5 && toCommit.trim() !== '')
    ) {
      setValidationError('Please enter valid commit hashes (at least 5 characters).');
      return;
    }
    fetchCommits(fromCommit.trim(), toCommit.trim(), githubUrl.trim());

    setHasAtttemptedToFetch(true)
  };

  const error = validationError || changelogError || commitError

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 border-b pb-3 text-center">
        Generate a Changelog Summary
      </h1>

      <div className="mb-8 max-w-md mx-auto bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md px-6 py-4 text-center text-sm italic font-medium shadow-sm">
    🔍  Enter the <span className="font-bold text-indigo-800">from</span> and <span className="font-bold text-indigo-800">to</span> commit hashes below to fetch commits and generate your changelog summary.
      </div>

      <CommitForm callbacks={{handleSubmit, setFromCommit, setToCommit, setGithubUrl}} fromCommit={fromCommit} toCommit={toCommit} loadingCommits={loadingCommits} githubUrl={githubUrl} />

      {error && (
        <ErrorMessage error={error} />
      )}

      {!hasCommits && !loadingCommits && hasAtttemptedToFetch ? (
        <p className="text-gray-500 italic text-center">No changelogs available.</p>
      ) : (
        <CommitTable commits={commits} />
      )}

      {hasCommits && (
        <CommitFooter callbacks={{ generateAISummary }} commits={commits} loadingChangelog={loadingChangelog} />
      )}
    </section>
  );
};

export default DevTool;
