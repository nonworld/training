import { Routes, Route } from 'react-router-dom'

import AppShell from './components/AppShell.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import Home from './pages/Home.jsx'
import Module from './pages/Module.jsx'
import Segment from './pages/Segment.jsx'
import Quiz from './pages/Quiz.jsx'
import Reference from './pages/Reference.jsx'
import Certification from './pages/Certification.jsx'

// RoleSelect is the full-screen entry. Everything else lives inside the shell
// (appbar + persistent language switcher).
const withShell = (el) => <AppShell>{el}</AppShell>

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path="/home" element={withShell(<Home />)} />
      <Route path="/learn/:moduleId" element={withShell(<Module />)} />
      <Route path="/learn/:moduleId/:segmentId" element={withShell(<Segment />)} />
      <Route path="/quiz/:moduleId" element={withShell(<Quiz />)} />
      <Route path="/reference" element={withShell(<Reference />)} />
      <Route path="/certification" element={withShell(<Certification />)} />
      <Route path="*" element={withShell(<Home />)} />
    </Routes>
  )
}
