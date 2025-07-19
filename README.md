
# Greptile Frontend

This is the React-based frontend application for the Changelog Summarizer. It allows users to input a GitHub repo and commit range to fetch and display AI-generated changelogs.

## Table of Contents

- [Features](#features)  
- [Technologies](#technologies)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Running the Frontend](#running-the-frontend)  
- [Things I Would Have Done With More Time](#things-i-would-have-done-with-more-time)


## Features

- Responsive UI for inputting GitHub repo URL and commit SHAs  
- Fetch and display commit data from the backend API  
- Show AI-generated changelog summaries  
- User-friendly loading and error states  
- Markdown rendering for changelog content  

## Technologies

- React 19.x  
- TypeScript  
- React Router DOM  
- Tailwind CSS (with Typography plugin)  
- React Markdown  
- Lucide React (icon library)  

## Prerequisites

- Node.js (v16 or higher recommended)  
- npm or yarn package manager  
- Access to the backend API (ensure backend is running and accessible)  

## Installation

1. **Clone the repo and install dependencies**:

	```bash
	git clone https://github.com/wrudder/greptile-frontend.git
	cd greptile-frontend
	yarn install
	```
2.  **Start the server**
		Ensure you are running the server on 3001
	```bash
	yarn start
	```

## Things I Would Have Done with More Time

This project was a great opportunity to rapidly prototype a tool that integrates GitHub commit data with AI-generated summaries. With more time I would love to expand and refine a few things:

- **Support for Private Repositories via Authentication**  
  Currently, the app works with public repositories only. Adding OAuth-based GitHub login would allow users to securely authenticate and access their private repos.

- **Editable Changelog Output**  
  Right now, the AI-generated changelog is final. A natural next step would be to allow users to edit or refine the generated summary directly in the UI—perhaps with a markdown editor or storing the response in the DB as an entity ( e.g. changelog with changelog_items that we display and can be edited) 

- **Deeper AI Understanding of Code Changes**  
  The AI currently summarizes commit messages. With more time, I’d explore parsing the diffs themselves and using AI to reason about the actual code changes—perhaps even clustering similar changes or tagging types of updates (e.g. refactor, bugfix, feature).

- **Use a More Lightweight Backend Framework**  
  I chose Rails because I was already familiar with it and it allowed me to move quickly, but it's heavy for such a focused API service. In hindsight, a lightweight framework like Sinatra or  Node/Express setup could have been a better fit.

---

Overall, I focused on delivering an end-to-end working demo, and it was a lot of fun to build. There's huge potential in refining this further, and I'm excited to keep pushing it forward. Can we get greptile to review this one? :)

