import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogGallery = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('bulldog');
  const [dogImages, setDogImages] = useState([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/list/all');
        setBreeds(Object.keys(response.data.message));
      } catch (error) {
        console.error('Error fetching breeds:', error);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
        const response = await axios.get(`https://dog.ceo/api/breed/${selectedBreed}/images/random/9`);
        setDogImages(response.data.message);
      } catch (error) {
        console.error('Error fetching dog images:', error);
      }
    };

    fetchDogImages();
  }, [selectedBreed]);

  return (
    <div>
      <h2>Dog Gallery</h2>
      <div className="mb-4">
        <label htmlFor="breedSelect">Select a breed:</label>
        <select
          id="breedSelect"
          className="ml-2 p-2"
          onChange={(e) => setSelectedBreed(e.target.value)}
          value={selectedBreed}
        >
          {breeds.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {dogImages.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Dog ${index + 1}`} className="rounded" />
        ))}
      </div>
    </div>
  );
};

export default DogGallery;
