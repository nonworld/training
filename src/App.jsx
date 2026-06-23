import { Routes, Route } from 'react-router-dom'

import AppShell from './components/AppShell.jsx'
import RoleSelect from './pages/RoleSelect.jsx'
import Home from './pages/Home.jsx'
import Module from './pages/Module.jsx'
import Segment from './pages/Segment.jsx'
import Quiz from './pages/Quiz.jsx'
import Flashcards from './pages/Flashcards.jsx'
import Reference from './pages/Reference.jsx'
import Certification from './pages/Certification.jsx'
import Team from './pages/Team.jsx'
import Admin from './pages/Admin.jsx'
import Celebrate from './pages/Celebrate.jsx'

// RoleSelect (onboarding) and Celebrate are full-screen. Everything else lives
// inside the shell (appbar + persistent top bar + language switcher).
const withShell = (el) => <AppShell>{el}</AppShell>

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/celebrate" element={<Celebrate />} />
      <Route path="/home" element={withShell(<Home />)} />
      <Route path="/learn/:moduleId" element={withShell(<Module />)} />
      <Route path="/learn/:moduleId/:segmentId" element={withShell(<Segment />)} />
      <Route path="/quiz/:moduleId" element={withShell(<Quiz />)} />
      <Route path="/flashcards" element={withShell(<Flashcards />)} />
      <Route path="/reference" element={withShell(<Reference />)} />
      <Route path="/certification" element={withShell(<Certification />)} />
      <Route path="/team" element={withShell(<Team />)} />
      <Route path="*" element={withShell(<Home />)} />
    </Routes>
  )
}
