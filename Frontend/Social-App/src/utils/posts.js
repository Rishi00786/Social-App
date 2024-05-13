import axios from 'axios';

// Your Unsplash access key
const accessKey = 'wodGBnUOgD-Zz6egn6xwGY80vrI9WC9sKlJFmMUv0N8';

// Fetch a random image from Unsplash along with its title
async function fetchRandomImage() {
  try {
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        client_id: accessKey,
        count: 5 // Number of random images to fetch, adjust as needed
      }
    });

    // Extract image URLs and titles from the response
    const images = response.data.map(photo => ({
      title: photo.alt_description || 'Untitled', // Use alt_description if available, otherwise use 'Untitled'
      imageUrl: photo.urls.full
    }));
    return images;
  } catch (error) {
    console.error('Error fetching random image:', error);
    return [];
  }
}

export default fetchRandomImage;
