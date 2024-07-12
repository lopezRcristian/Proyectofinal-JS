
document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'https://api.jikan.moe/v4';

    
    async function searchAnime(title) {
        try {
            const response = await axios.get(${BASE_URL}/anime, {
                params: { q: title }
            });
            displayAnimes(response.data.data);
        } catch (error) {
            console.error('Error al buscar el anime:', error);
        }
    }

    function displayAnimes(animes) {
        const animeList = document.getElementById('anime-list');
        animeList.innerHTML = '';
        animes.forEach(anime => {
            const price = (Math.random() * 20 + 10).toFixed(2); 
            const animeItem = document.createElement('div');
            animeItem.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <p>${anime.synopsis}</p>
                <p><strong>Precio: $${price}</strong></p>
                <button class="add-to-cart" data-title="${anime.title}" data-price="${price}">Agregar al carrito</button>
            `;
            animeList.appendChild(animeItem);
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const title = event.target.dataset.title;
                const price = event.target.dataset.price;
                addToCart(title, price);
            });
        });
    }

    function addToCart(animeTitle, animePrice) {
        const cartItems = document.getElementById('cart-items');
        const cartItem = document.createElement('li');
        cartItem.textContent = ${animeTitle} - $${animePrice};
        cartItems.appendChild(cartItem);
    }

    document.getElementById('search-button').addEventListener('click', () => {
        const searchInput = document.getElementById('search-input').value;
        searchAnime(searchInput);
    });

    searchAnime('Naruto');
});