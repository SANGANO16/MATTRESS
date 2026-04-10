// MTR Trading - Universal Search Functionality
// Works on all pages: homepage, product pages, catalog pages

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    
    if (!searchInput) {
        console.log('Search input not found on this page');
        return;
    }
    
    console.log('Search functionality initialized');
    
    // Remove any existing event listeners
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);
    
    newSearchInput.addEventListener('keyup', function(e) {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Determine which page we're on and search accordingly
        const currentPage = window.location.pathname;
        
        if (currentPage.includes('products.html')) {
            searchProductsPage(searchTerm);
        } else if (currentPage.includes('pillows.html')) {
            searchPillowsPage(searchTerm);
        } else if (currentPage.includes('imyenda.html')) {
            searchCoversPage(searchTerm);
        } else if (currentPage.includes('Plain.html') || 
                   currentPage.includes('lalasalama.html') || 
                   currentPage.includes('sweetdream.html') || 
                   currentPage.includes('prestige.html') || 
                   currentPage.includes('fivestar.html') || 
                   currentPage.includes('orthomedic.html')) {
            searchProductSizesPage(searchTerm);
        } else {
            searchHomepage(searchTerm);
        }
    });
}

// Search on homepage (index.html)
function searchHomepage(searchTerm) {
    const productCards = document.querySelectorAll('.featured1');
    let hasResults = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4')?.innerText.toLowerCase() || '';
        const productPrice = card.querySelector('.price')?.innerText.toLowerCase() || '';
        const productFeatures = Array.from(card.querySelectorAll('ul li')).map(li => li.innerText.toLowerCase()).join(' ');
        
        if (searchTerm === '') {
            card.style.display = '';
            hasResults = true;
        } else if (productName.includes(searchTerm) || 
                   productPrice.includes(searchTerm) || 
                   productFeatures.includes(searchTerm)) {
            card.style.display = '';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoResultsMessage(hasResults, searchTerm, '.featured');
}

// Search on product size pages (Plain.html, lalasalama.html, etc.)
function searchProductSizesPage(searchTerm) {
    const productCards = document.querySelectorAll('.featured1');
    let hasResults = false;
    
    productCards.forEach(card => {
        const sizeName = card.querySelector('h4')?.innerText.toLowerCase() || '';
        const sizeDetails = Array.from(card.querySelectorAll('ul li')).map(li => li.innerText.toLowerCase()).join(' ');
        const price = card.querySelector('.price')?.innerText.toLowerCase() || '';
        
        if (searchTerm === '') {
            card.style.display = '';
            hasResults = true;
        } else if (sizeName.includes(searchTerm) || 
                   sizeDetails.includes(searchTerm) || 
                   price.includes(searchTerm)) {
            card.style.display = '';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoResultsMessage(hasResults, searchTerm, '.featured');
}

// Search on pillows page
function searchPillowsPage(searchTerm) {
    const productCards = document.querySelectorAll('.featured1');
    let hasResults = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4')?.innerText.toLowerCase() || '';
        const productFeatures = Array.from(card.querySelectorAll('.pillow-features li')).map(li => li.innerText.toLowerCase()).join(' ');
        const price = card.querySelector('.price')?.innerText.toLowerCase() || '';
        
        if (searchTerm === '') {
            card.style.display = '';
            hasResults = true;
        } else if (productName.includes(searchTerm) || 
                   productFeatures.includes(searchTerm) || 
                   price.includes(searchTerm)) {
            card.style.display = '';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoResultsMessage(hasResults, searchTerm, '.featured');
}

// Search on covers page (imyenda.html)
function searchCoversPage(searchTerm) {
    const productCards = document.querySelectorAll('.featured1');
    let hasResults = false;
    
    productCards.forEach(card => {
        const productName = card.querySelector('h4')?.innerText.toLowerCase() || '';
        const sizeDetails = Array.from(card.querySelectorAll('ul li')).map(li => li.innerText.toLowerCase()).join(' ');
        const price = card.querySelector('.price')?.innerText.toLowerCase() || '';
        
        if (searchTerm === '') {
            card.style.display = '';
            hasResults = true;
        } else if (productName.includes(searchTerm) || 
                   sizeDetails.includes(searchTerm) || 
                   price.includes(searchTerm)) {
            card.style.display = '';
            hasResults = true;
        } else {
            card.style.display = 'none';
        }
    });
    
    showNoResultsMessage(hasResults, searchTerm, '.featured');
}

// Search on products.html (already has its own search, but we enhance it)
function searchProductsPage(searchTerm) {
    // Trigger the existing filter function if it exists
    if (typeof filterProducts === 'function') {
        // Trigger the existing filter
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
        }
    } else {
        // Fallback search for products page
        const productCards = document.querySelectorAll('.product-card');
        let hasResults = false;
        
        productCards.forEach(card => {
            const productName = card.dataset.name?.toLowerCase() || '';
            const productPrice = card.dataset.price || '';
            
            if (searchTerm === '') {
                card.style.display = '';
                hasResults = true;
            } else if (productName.includes(searchTerm) || 
                       productPrice.includes(searchTerm)) {
                card.style.display = '';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        showNoResultsMessage(hasResults, searchTerm, '.products-grid');
    }
}

// Helper function to show "no results" message
function showNoResultsMessage(hasResults, searchTerm, containerSelector) {
    let noResultsMsg = document.querySelector('.no-search-results');
    const container = document.querySelector(containerSelector);
    
    if (!hasResults && searchTerm !== '') {
        if (!noResultsMsg && container) {
            const msg = document.createElement('div');
            msg.className = 'no-search-results';
            msg.style.cssText = 'text-align: center; padding: 40px; color: #666; width: 100%; grid-column: 1 / -1;';
            msg.innerHTML = `
                <i class="fa-solid fa-search" style="font-size: 50px; color: #ccc; margin-bottom: 15px; display: block;"></i>
                <h3 style="color: #2E318E; margin-bottom: 10px;">No products found</h3>
                <p>No results matching "<strong>${escapeHtml(searchTerm)}</strong>"</p>
                <p style="margin-top: 10px;">Try searching for different keywords or browse our categories.</p>
            `;
            container.appendChild(msg);
        } else if (noResultsMsg) {
            noResultsMsg.style.display = 'block';
            const strongTag = noResultsMsg.querySelector('strong');
            if (strongTag) {
                strongTag.innerHTML = escapeHtml(searchTerm);
            }
        }
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Helper function to escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
});

// Also watch for dynamically loaded content
if (window.MutationObserver) {
    const observer = new MutationObserver(function() {
        if (!document.querySelector('.search-input')) {
            return;
        }
        initSearch();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}