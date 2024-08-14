import { useState } from 'react'
import './App.css'

function App() {
  const [rulesOpen, setRulesOpen] = useState(false);

  const rulesText = rulesOpen ? "Hide " : "";

  return (
    <>
      <div>
        <h1>Memory Game</h1>
        <button onClick={() => setRulesOpen(!rulesOpen)}>{rulesText}How To Play</button>
        {rulesOpen ? 
        <div className="rules">
          <h2>HOW TO PLAY</h2>
          <p>Earn points by clicking on images that you have not already clicked on.</p>
          <p>After each image you click, the images will be shuffled.</p>
          <p>You lose your score after clicking on an image you have previously clicked on and the game is reset.</p>
        </div> : null}
      </div>
    </>
  )
}

export default App
