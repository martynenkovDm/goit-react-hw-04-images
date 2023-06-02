const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35973313-29bfc7fe9de9991c0ff9642d4';
const getImages = (value, page = 1) => {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Oops... there are no ${value} images matching your search... `)
    );
  });
};

const api = {
  getImages,
};

export default api;
