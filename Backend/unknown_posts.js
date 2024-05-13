const axios = require('axios');

// Your Unsplash access key
const accessKey = 'wodGBnUOgD-Zz6egn6xwGY80vrI9WC9sKlJFmMUv0N8';

// Fetch a random image from Unsplash
async function fetchRandomImages(count) {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: accessKey,
        count: count
      }
    });

    // Extract image URLs from the response
    const images = response.data.map(photo => photo.urls.full);
    return images;
  } catch (error) {
    console.error('Error fetching random images:', error);
    return [];
  }
}

// Example usage
fetchRandomImages().then(images => {
  console.log('Random images:', images);
});
