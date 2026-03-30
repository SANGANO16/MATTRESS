// Quantity Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity buttons
    const minusBtns = document.querySelectorAll('.minus');
    const plusBtns = document.querySelectorAll('.plus');
    const qtyInputs = document.querySelectorAll('.qty-input');

    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(qtyInputs[index].value);
            if (value > 1) {
                qtyInputs[index].value = value - 1;
            }
        });
    });

    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(qtyInputs[index].value);
            if (value < 10) {
                qtyInputs[index].value = value + 1;
            }
        });
    });

    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    });

    // Search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }

    // Filter functionality
    const sizeFilter = document.getElementById('sizeFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (sizeFilter) sizeFilter.addEventListener('change', filterProducts);
    if (priceFilter) priceFilter.addEventListener('change', filterProducts);

    // Order buttons
    const orderBtns = document.querySelectorAll('.btn-order');
    orderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const quantity = productCard.querySelector('.qty-input').value;
            const price = productCard.querySelector('.current-price').textContent;
            
            alert(`Urakoze! Mwasabye ${quantity} ya ${productName} (${price}) . Tuzabahamagara vuba!`);
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + parseInt(quantity);
        });
    });

    // Rating stars
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('ratingValue');

    stars.forEach(star => {
        star.addEventListener('mouseenter', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
        });

        star.addEventListener('mouseleave', function() {
            const currentRating = ratingInput.value;
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            highlightStars(rating);
        });
    });

    // Feedback form
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            const feedback = document.getElementById('productFeedback').value;
            const message = document.getElementById('feedbackMessage').value;
            const rating = document.getElementById('ratingValue').value;

            if (!name || !phone || !message || rating === '0') {
                alert('Nyamuneka uzuzisha ibisabwa byose!');
                return;
            }

            alert(`Urakoze cyane ${name}!
            
Icyo watekereje: ${message}
Igipimo: ${rating}/5
Tuzasubiza vuba!`);

            this.reset();
            ratingInput.value = '0';
            highlightStars('0');
        });
    }
});

// Filter products function
function filterProducts() {
    const searchTerm = document.getElementById('productSearch')?.value.toLowerCase() || '';
    const sizeFilter = document.getElementById('sizeFilter')?.value || 'all';
    const priceFilter = document.getElementById('priceFilter')?.value || 'all';
    
    const products = document.querySelectorAll('.product-card');
    let productsArray = Array.from(products);

    // Search filter
    productsArray.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const sizes = Array.from(product.querySelectorAll('.size-tag')).map(tag => tag.textContent);
        const matchesSearch = title.includes(searchTerm) || sizes.some(size => size.includes(searchTerm));
        
        if (!matchesSearch && searchTerm !== '') {
            product.style.display = 'none';
        } else {
            product.style.display = 'block';
        }
    });

    // Size filter
    if (sizeFilter !== 'all') {
        productsArray.forEach(product => {
            const category = product.dataset.category;
            if (category !== sizeFilter) {
                product.style.display = 'none';
            }
        });
    }

    // Price filter
    if (priceFilter !== 'all') {
        // Get visible products
        const visibleProducts = productsArray.filter(p => p.style.display !== 'none');
        
        // Sort by price
        if (priceFilter === 'lowToHigh') {
            visibleProducts.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (priceFilter === 'highToLow') {
            visibleProducts.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        }

        // Reorder in DOM
        const grid = document.getElementById('productsGrid');
        visibleProducts.forEach(product => grid.appendChild(product));
    }
}

// Show/hide product description
function showProductDescription(btn) {
    const description = btn.nextElementSibling;
    description.classList.toggle('hidden');
    
    if (description.classList.contains('hidden')) {
        btn.innerHTML = '<i class="fas fa-info-circle"></i> Ibisobanuro';
    } else {
        btn.innerHTML = '<i class="fas fa-times-circle"></i> Gufunga';
    }
}

// Highlight stars function
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating-stars i');
    rating = parseInt(rating);
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

// Add to cart animation
function animateAddToCart(btn) {
    btn.innerHTML = '<i class="fas fa-check"></i> Yongewe!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Tumiza nonaha';
        btn.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
    }, 2000);
}

// WhatsApp order function
function orderViaWhatsApp(productName, quantity, size) {
    const phoneNumber = '250789123456'; // Replace with your actual number
    const message = `Ndashaka gutumiza ${quantity} ya ${productName} (${size}). Ni angahe?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}