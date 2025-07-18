import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ChangeLogViewer from './pages/ChangelogMarkdown/ChangeLogViewer';
import DevTool from './pages/Devtool/DevTool';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/changeLog" element={<ChangeLogViewer />} />
        <Route path="/tool" element={<DevTool />} />
      </Routes>
    </Router>
  );
}

export default App;
