document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.innerHTML = '<img src="Spinner@1x-1.0s-200px-200px.gif" alt="Loading...">';
    document.body.appendChild(loading);

    const API_KEY = 'yUttXs4HuUKQclSe2FKmGu_482vzt6HLtfrDE1H1wqY';
    let page = 1;
    let query = '';
    let isLoading = false;

    async function fetchPhotos() {
        if (isLoading) return;
        isLoading = true;
        loading.style.display = 'block';

        let url = `https://api.unsplash.com/photos?client_id=${API_KEY}&page=${page}&per_page=30`;
        if (query) {
            url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}&page=${page}&per_page=30`;
        }
        const response = await fetch(url);
        const data = await response.json();
        displayPhotos(query ? data.results : data);

        isLoading = false;
        loading.style.display = 'none';
    }

    function displayPhotos(photos) {
        photos.forEach(photo => {
            const link = document.createElement('a');
            link.href = photo.urls.regular;
            link.classList.add('gallery-item');

            const img = document.createElement('img');
            img.src = photo.urls.small;
            img.alt = photo.alt_description;

            link.appendChild(img);
            gallery.appendChild(link);
        });

        // Initialize Magnific Popup
        $('.gallery-item').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        query = searchInput.value;
        page = 1;
        gallery.innerHTML = '';
        fetchPhotos();
    });

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            page++;
            fetchPhotos();
        }
    });

   
    fetchPhotos();
});
