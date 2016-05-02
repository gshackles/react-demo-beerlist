const apiKey = 'your-api-key-here';
const baseUrl = 'https://api.brewerydb.com/v2/';

export default class SearchService {
  findBeer(query) {
    if (!query) {
      return Promise.resolve([]);
    }
    
    return fetch(`${baseUrl}search?q=${encodeURIComponent(query)}&type=beer&%20withBreweries=Y&key=${apiKey}&format=json`)
      .then(response => response.json())
      .then(result => result.data || [])
      .catch(() => []);
  }
}