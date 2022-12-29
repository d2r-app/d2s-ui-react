import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from './lib/components/Hero';

function App() {

	const [hero, setHero] = useState({});

	useEffect(() => {
    loadHero();
  }, []);

	async function loadHero() {
    try {
      const res = await axios.get('http://localhost:8080/api/hero');
      setHero({ ...res.data });
		}
    catch (e) {
			console.log('Error loading hero', e);
		}
	}

  return (
    <div>
      <React.StrictMode>
			   <Hero hero={hero} api="http://localhost:8080/api/d2s/img" />
      </React.StrictMode>
    </div>
  );
}

export default App;
