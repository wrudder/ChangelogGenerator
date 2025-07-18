interface CommitFormProps {
    callbacks: {
      handleSubmit: (e: React.FormEvent) => void;
      setFromCommit: (arg: string) => void;
      setToCommit: (arg: string) => void;
      setGithubUrl: (arg: string) => void;
    };
    fromCommit?: string;
    githubUrl?: string;
    loadingCommits: boolean;
    toCommit?: string;
  }
  
  const CommitForm = ({
    callbacks: { handleSubmit, setFromCommit, setToCommit, setGithubUrl },
    fromCommit,
    githubUrl,
    loadingCommits,
    toCommit,
  }: CommitFormProps) => {
    const hasAnEmptyInput = !fromCommit || !toCommit || !githubUrl;
  
    return (
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-end"
        aria-label="Commit range form"
      >
        <div className="sm:col-span-4">
          <label
            htmlFor="githubUrl"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            *Public GitHub URL:
          </label>
          <input
            id="githubUrl"
            type="text"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="e.g. https://github.com/facebook/react"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            aria-describedby="githubUrlHelp"
          />
        </div>
  
        <div className="sm:col-span-4">
          <label
            htmlFor="from"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            *Git Commit (SHA) From:
          </label>
          <input
            id="from"
            type="text"
            value={fromCommit}
            onChange={(e) => setFromCommit(e.target.value)}
            placeholder="e.g. 8ba3501cd9c982676fab35f1c8092302060d728c"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            aria-describedby="fromHelp"
          />
        </div>
  
        <div className="sm:col-span-4">
          <label
            htmlFor="to"
            className="block mb-1 text-sm font-semibold text-gray-700"
          >
            *Git Commit (SHA) To:
          </label>
          <input
            id="to"
            type="text"
            value={toCommit}
            onChange={(e) => setToCommit(e.target.value)}
            placeholder="e.g. 56d0ddae18993eb696ab41d0fc5041948b88024a"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            aria-describedby="toHelp"
          />
        </div>
  
        <div className="sm:col-span-12 flex justify-center">
          <button
            type="submit"
            disabled={loadingCommits || hasAnEmptyInput}
            className="w-full max-w-xs px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed my-auto max-h-[42px]"
            aria-busy={loadingCommits}
            aria-label="Fetch Commits"
          >
            {loadingCommits ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              "Fetch Commits"
            )}
          </button>
        </div>
      </form>
    );
  };
  
  export default CommitForm;
  