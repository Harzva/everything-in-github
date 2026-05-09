import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Achievements from './pages/Achievements'
import Profile from './pages/Profile'
import Actions from './pages/Actions'
import Community from './pages/Community'
import Visualization from './pages/Visualization'
import Search from './pages/Search'
import Tutorials from './pages/Tutorials'
import BadgeWall from './pages/BadgeWall'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/actions" element={<Actions />} />
      <Route path="/community" element={<Community />} />
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/search" element={<Search />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/badges" element={<BadgeWall />} />
    </Routes>
  )
}
