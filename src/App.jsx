import { useState, useEffect } from 'react';
import './App.css'
import Card from './components/Card';

const API_KEY = "45447926-e79c236074a6abe226fa6fbb3";

// this function shuffles the cards after each click
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) { 
  
    // Generate random number 
    var j = Math.floor(Math.random() * (i + 1));
               
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
   
  return array;
}

// this function returns a random fact from a json file of facts
function randomFact(facts) {
  const randomNum = Math.floor(Math.random() * 333);

  return facts.data[randomNum].fact;
}

function App() {
  const [rulesOpen, setRulesOpen] = useState(false);
  const [numImages, setNumImages] = useState(12);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [points, setPoints] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const rulesText = rulesOpen ? "Hide " : "";

  // call the pixabay api each time a game is started
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=cat&image_type=photo&per_page=${numImages}`);
        const data = await response.json();

        const factsResponse = await fetch('https://catfact.ninja/facts?limit=332');
        const factsData = await factsResponse.json();
    
        const imageUrls = data.hits.map(image => ({
          url: image.webformatURL,
          id: image.id,
          user: image.user,
          page: image.pageURL,
          fact: randomFact(factsData)
        }));
    
        setImages(imageUrls);
        setLoading(false);
      }
      catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [numImages]);

  // this function handles the click of a card by updating points, selected images, and shuffling them
  function handleClick(id) {
    if (selectedImages.includes(id)) {
      setPoints(0);
      setSelectedImages([]);
    }
    else {
      setPoints(points + 1);
      setSelectedImages([...selectedImages, id]);
      points + 1 > highScore ? setHighScore(points + 1) : null;
    }

    setImages(shuffle(images));
  }

  return (
    <>
      <div>
        <div>
          <h1>Memory Game</h1>
          <button onClick={() => setRulesOpen(!rulesOpen)}>{rulesText}How To Play</button>
        </div>
        {rulesOpen ? 
        <div className="rules">
          <h2>HOW TO PLAY</h2>
          <p>Earn points by clicking on cards that you have not already clicked on.</p>
          <p>After each card you click, the cards will be shuffled.</p>
          <p>You lose your score after clicking on a card you have previously clicked on and the game is reset.</p>
        </div> : null}

        <div>
          <h3>Points: {points}</h3>
          <h3>High Score: {highScore}</h3>
        </div>

        <div className="num-cards-buttons">
          <button className={`num-cards-button ${numImages === 6 ? "active" : "inactive" }`} onClick={() => setNumImages(8)}>8 Cards</button>
          <button className={`num-cards-button ${numImages === 12 ? "active" : "inactive" }`} onClick={() => setNumImages(12)}>12 cards</button>
          <button className={`num-cards-button ${numImages === 20 ? "active" : "inactive" }`} onClick={() => setNumImages(20)}>20 cards</button>
          <button className={`num-cards-button ${numImages === 36 ? "active" : "inactive" }`} onClick={() => setNumImages(36)}>36 cards</button>
        </div>

        <div className="cards">
          {loading ? <p>Loading...</p> : images.map(image => 
            <Card key={image.id} image={image.url} user={image.user} pageUrl={image.page} fact={image.fact} onClick={() => handleClick(image.id)} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
