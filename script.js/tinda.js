document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let usuario = localStorage.getItem('usuario') || null;

    const carritoContainer = document.querySelector('.header-cart-items');
    const userModal = document.getElementById('user-modal');
    const userNameInput = document.getElementById('user-name');
    const saveUserButton = document.getElementById('save-user');

    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function renderCarrito() {
        carritoContainer.innerHTML = '';
        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.innerHTML = `<p>${producto.name} - $${producto.price}</p>`;
            carritoContainer.appendChild(item);
        });
    }

    function checkUsuario() {
        if (!usuario) {
            userModal.style.display = 'block';
        }
    }

    function closeUserModal() {
        userModal.style.display = 'none';
    }

    document.querySelectorAll('.producto-img').forEach(img => {
        img.addEventListener('click', () => {
            checkUsuario();
        });
    });

    document.querySelectorAll('.carrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const producto = e.target.closest('.productos-tiendas');
            const id = producto.getAttribute('data-id');
            const name = producto.getAttribute('data-name');
            const price = producto.getAttribute('data-price');
            carrito.push({ id, name, price });
            saveToLocalStorage('carrito', carrito);
            renderCarrito();
        });
    });

    saveUserButton.addEventListener('click', () => {
        usuario = userNameInput.value.trim();
        if (usuario) {
            localStorage.setItem('usuario', usuario);
            closeUserModal();
        }
    });

    renderCarrito();
    checkUsuario();
});
