document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://fakestoreapi.com/products';
    const productsList = document.querySelector('.products-list');
    const cartItems = document.querySelector('.cart-items');
    let cart = [];

    // Função para buscar produtos da API
    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayProducts(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    // Função para exibir os produtos na interface
    function displayProducts(products) {
        productsList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price.toFixed(2)} $</p>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productsList.appendChild(productElement);

            // Adicionar evento de clique para adicionar ao carrinho
            const addToCartButton = productElement.querySelector('.add-to-cart-btn');
            addToCartButton.addEventListener('click', () => addToCart(product));
        });
    }

    // Função para adicionar produto ao carrinho
    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1
            });
        }
        updateCart();
    }

    // Função para atualizar o carrinho na interface
    function updateCart() {
        cartItems.innerHTML = '';
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('li');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="${item.title}">
                <div>
                    <p>${item.title}</p>
                    <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                </div>
                <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItemElement);

            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            // Adicionar evento de clique para remover do carrinho
            const removeFromCartButton = cartItemElement.querySelector('.remove-from-cart-btn');
            removeFromCartButton.addEventListener('click', () => removeFromCart(item));
        });

        document.getElementById('total-items').textContent = totalItems;
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }

    // Função para remover produto do carrinho
    function removeFromCart(itemToRemove) {
        cart = cart.filter(item => item.id !== itemToRemove.id);
        updateCart();
    }

    // Inicialização da aplicação
    fetchProducts();

    // Evento de checkout
    const checkoutButton = document.getElementById('checkout-btn');
    checkoutButton.addEventListener('click', () => {
        alert('Checkout realizado com sucesso!');
        cart = [];
        updateCart();
    });
});
