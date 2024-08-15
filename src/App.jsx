import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Card from './Card';

const API_KEY = "45447926-e79c236074a6abe226fa6fbb3";

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
    
        const imageUrls = data.hits.map(image => ({
          url: image.webformatURL,
          id: image.id,
          user: image.user,
          page: image.pageURL
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
      console.log('test');
      setPoints(points + 1);
      setSelectedImages([...selectedImages, id]);
      points + 1 > highScore ? setHighScore(points + 1) : null;
    }
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
          <p>Earn points by clicking on images that you have not already clicked on.</p>
          <p>After each image you click, the images will be shuffled.</p>
          <p>You lose your score after clicking on an image you have previously clicked on and the game is reset.</p>
        </div> : null}

        <div>
          <h3>Points: {points}</h3>
          <h3>High Score: {highScore}</h3>
        </div>

        <div className="cards">
          {loading ? <p>Loading...</p> : images.map(image => 
            <Card key={image.id} image={image.url} user={image.user} pageUrl={image.page} onClick={() => handleClick(image.id)} />
          )}
        </div>
      </div>
    </>
  )
}

export default App
