import { useState, useEffect } from 'react'
import PetalCanvas from './components/PetalCanvas'
import InvitationCard from './components/InvitationCard'
import DarkToggle from './components/DarkToggle'
import BackgroundDecoration from './components/BackgroundDecoration'

import LoadingScreen from './components/LoadingScreen'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem('wedding-dark') === '1'
  )

  useEffect(() => {
    document.body.classList.toggle('dark', dark)
    localStorage.setItem('wedding-dark', dark ? '1' : '0')
  }, [dark])

  return (
    <>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}
      <PetalCanvas />
      <BackgroundDecoration />
      <DarkToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <InvitationCard />
    </>
  )
}
