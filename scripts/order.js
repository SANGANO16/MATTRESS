// scripts/order.js - MTR Trading Ltd
// Styled to match your brand colors (#2E318E, #1a1d6e, #28a745)

const CONFIG = {
    whatsappNumber: "250790702734",
    companyEmail: "sanganojeancluade16@gmail.com",
    companyName: "MTR Trading Ltd",
    depositAmount: 5000,
    mobileMoneyNumber: "250790702734"
};

// Add custom styles that match your CSS
const orderStyles = document.createElement('style');
orderStyles.textContent = `
    .mtr-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
    }
    
    .mtr-modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        max-height: 85%;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: mtrSlideIn 0.3s ease;
    }
    
    @keyframes mtrSlideIn {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mtr-close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 28px;
        background: none;
        border: none;
        cursor: pointer;
        color: #999;
        transition: color 0.3s;
    }
    
    .mtr-close:hover {
        color: #2E318E;
    }
    
    .mtr-title {
        color: #2E318E;
        margin-bottom: 5px;
        font-size: 1.5rem;
    }
    
    .mtr-price {
        color: #e67e22;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    .mtr-form-group {
        margin-bottom: 15px;
    }
    
    .mtr-label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: #333;
    }
    
    .mtr-input, .mtr-textarea, .mtr-select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s ease;
        box-sizing: border-box;
    }
    
    .mtr-input:focus, .mtr-textarea:focus, .mtr-select:focus {
        border-color: #2E318E;
        outline: none;
        box-shadow: 0 0 0 2px rgba(46, 49, 142, 0.1);
    }
    
    .mtr-small {
        color: #666;
        font-size: 12px;
        display: block;
        margin-top: 5px;
    }
    
    .mtr-deposit-box {
        background: #e8f5e9;
        padding: 20px;
        border-radius: 10px;
        border-left: 4px solid #28a745;
        margin-bottom: 20px;
    }
    
    .mtr-deposit-title {
        margin: 0 0 10px 0;
        color: #2e7d32;
        font-size: 1rem;
    }
    
    .mtr-deposit-list {
        margin: 5px 0 10px 20px;
        font-size: 13px;
        color: #555;
    }
    
    .mtr-deposit-list li {
        margin: 3px 0;
    }
    
    .mtr-btn-primary {
        width: 100%;
        padding: 14px;
        background: #2E318E;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
    }
    
    .mtr-btn-primary:hover {
        background: #1a1d6e;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(26, 29, 110, 0.3);
    }
    
    .mtr-btn-success {
        width: 100%;
        padding: 14px;
        background: #28a745;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-bottom: 10px;
    }
    
    .mtr-btn-success:hover {
        background: #218838;
        transform: translateY(-2px);
    }
    
    .mtr-btn-danger {
        width: 100%;
        padding: 12px;
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .mtr-btn-danger:hover {
        background: #c82333;
    }
    
    .mtr-info-box {
        background: #f0f8ff;
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
    }
    
    .mtr-success-box {
        background: #e8f5e9;
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
    }
    
    .mtr-warning-box {
        background: #fff3cd;
        padding: 12px;
        border-radius: 8px;
        margin-top: 15px;
    }
    
    .mtr-table {
        width: 100%;
        font-size: 14px;
    }
    
    .mtr-table td {
        padding: 5px 0;
    }
    
    .mtr-text-center {
        text-align: center;
    }
    
    .mtr-checkmark {
        font-size: 50px;
        text-align: center;
        margin-bottom: 10px;
    }
    
    hr {
        margin: 15px 0;
        border: none;
        border-top: 1px solid #eee;
    }
`;

document.head.appendChild(orderStyles);

// Show order form
function showOrderForm(product) {
    const modalHTML = `
        <div id="orderModal" class="mtr-modal">
            <div class="mtr-modal-content">
                <button onclick="closeModal()" class="mtr-close">&times;</button>
                
                <h2 class="mtr-title">🛏️ Complete Your Order</h2>
                <p class="mtr-price">${product.name} - ${product.price} Rwf</p>
                
                <form id="orderForm">
                    <div class="mtr-form-group">
                        <label class="mtr-label">Full Name *</label>
                        <input type="text" id="customerName" required class="mtr-input">
                    </div>
                    
                    <div class="mtr-form-group">
                        <label class="mtr-label">Email Address *</label>
                        <input type="email" id="customerEmail" required placeholder="your@email.com" class="mtr-input">
                        <small class="mtr-small">We'll send your order confirmation here</small>
                    </div>
                    
                    <div class="mtr-form-group">
                        <label class="mtr-label">Phone Number *</label>
                        <input type="tel" id="customerPhone" required placeholder="078XXXXXXX" class="mtr-input">
                        <small class="mtr-small">We'll call to confirm delivery</small>
                    </div>
                    
                    <div class="mtr-form-group">
                        <label class="mtr-label">Delivery Location *</label>
                        <input type="text" id="customerLocation" required placeholder="e.g., Kigali - Kimironko" class="mtr-input">
                    </div>
                    
                    <div class="mtr-form-group">
                        <label class="mtr-label">Full Address</label>
                        <textarea id="customerAddress" rows="2" placeholder="Street, building, landmark..." class="mtr-textarea"></textarea>
                    </div>
                    
                    <div class="mtr-deposit-box">
                        <h3 class="mtr-deposit-title">💰 Deposit: ${CONFIG.depositAmount.toLocaleString()} Rwf</h3>
                        <p style="margin:5px 0;font-size:14px;"><strong>What is this for?</strong></p>
                        <ul class="mtr-deposit-list">
                            <li>✓ Confirms your serious intent to buy</li>
                            <li>✓ Reserves your mattress (limited stock)</li>
                            <li>✓ Covers delivery preparation costs</li>
                            <li>✓ Deducted from total price</li>
                        </ul>
                        <p style="margin:10px 0 0 0;font-size:13px;color:#2e7d32;font-weight:bold;">✅ This amount will be subtracted from your final payment!</p>
                    </div>
                    
                    <button type="submit" class="mtr-btn-primary">💳 Continue to Payment</button>
                </form>
                
                <p class="mtr-small" style="text-align:center;margin-top:15px;">By continuing, you agree to our terms and conditions</p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const form = document.getElementById('orderForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerInfo = {
            name: document.getElementById('customerName').value.trim(),
            email: document.getElementById('customerEmail').value.trim(),
            phone: document.getElementById('customerPhone').value.trim(),
            location: document.getElementById('customerLocation').value.trim(),
            address: document.getElementById('customerAddress').value.trim()
        };
        
        if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.location) {
            alert('❌ Please fill in all required fields (*)');
            return;
        }
        
        if (!customerInfo.phone.match(/^[0-9]{9,12}$/)) {
            alert('❌ Please enter a valid phone number (9-12 digits, no spaces)\nExample: 0788123456');
            return;
        }
        
        if (!customerInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            alert('❌ Please enter a valid email address');
            return;
        }
        
        showPaymentInstructions(product, customerInfo);
    });
}

// Show payment modal
function showPaymentInstructions(product, customer) {
    const orderId = 'MTR' + Date.now() + Math.floor(Math.random() * 1000);
    const totalPrice = parseInt(product.price.replace(/[^0-9]/g, ''));
    const remainingAmount = totalPrice - CONFIG.depositAmount;
    
    const paymentModal = `
        <div id="paymentModal" class="mtr-modal">
            <div class="mtr-modal-content">
                <button onclick="closePaymentModal()" class="mtr-close">&times;</button>
                
                <h2 class="mtr-title">💳 Send Payment</h2>
                <p style="color:#666;margin-bottom:20px;">Send ${CONFIG.depositAmount.toLocaleString()} Rwf deposit to confirm</p>
                
                <div class="mtr-info-box">
                    <p style="margin:0 0 5px 0;font-weight:bold;color:#2E318E;">✨ What you get:</p>
                    <ul style="margin:0;padding-left:20px;font-size:13px;">
                        <li>✓ Mattress reserved immediately</li>
                        <li>✓ Priority delivery (1-3 days)</li>
                        <li>✓ Free delivery within Kigali</li>
                        <li>✓ 1-year warranty included</li>
                        <li>✓ Money-back guarantee</li>
                    </ul>
                </div>
                
                <div class="mtr-success-box">
                    <h3 style="margin:0 0 15px 0;color:#2e7d32;">📱 Send to:</h3>
                    <p style="margin:5px 0;"><strong>MTN MoMo:</strong> ${CONFIG.mobileMoneyNumber}</p>
                    <p style="margin:5px 0;"><strong>Airtel Money:</strong> ${CONFIG.mobileMoneyNumber}</p>
                    <hr>
                    <p style="margin:5px 0;"><strong>🔑 Reference:</strong> <code style="background:#f0f0f0;padding:3px 8px;border-radius:5px;">${orderId}</code></p>
                    <p style="margin:5px 0;"><strong>👤 Name:</strong> ${customer.name}</p>
                </div>
                
                <button onclick="processOrderConfirmation('${orderId}', '${product.name.replace(/'/g, "\\'")}', '${totalPrice}', '${CONFIG.depositAmount}', '${remainingAmount}', '${customer.name.replace(/'/g, "\\'")}', '${customer.email}', '${customer.phone}', '${customer.location.replace(/'/g, "\\'")}', '${customer.address.replace(/'/g, "\\'")}')" class="mtr-btn-success">
                    ✅ I Have Sent the Payment
                </button>
                <button onclick="closePaymentModal()" class="mtr-btn-danger">
                    ❌ Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', paymentModal);
}

// Process order and show confirmation
function processOrderConfirmation(orderId, productName, totalPrice, depositAmount, remainingAmount, customerName, customerEmail, customerPhone, customerLocation, customerAddress) {
    closePaymentModal();
    
    const totalPriceFormatted = parseInt(totalPrice).toLocaleString();
    const depositFormatted = parseInt(depositAmount).toLocaleString();
    const remainingFormatted = parseInt(remainingAmount).toLocaleString();
    
    const confirmationHTML = `
        <div id="confirmationModal" class="mtr-modal">
            <div class="mtr-modal-content">
                <div class="mtr-checkmark">✅</div>
                <h2 class="mtr-title" style="color:#28a745;text-align:center;">Order Received!</h2>
                <p class="mtr-text-center" style="color:#666;">Your deposit has been recorded</p>
                
                <div class="mtr-info-box">
                    <h3 style="margin:0 0 15px 0;color:#2E318E;">📋 Order Details</h3>
                    <table class="mtr-table">
                        <tr><td style="padding:5px 0;"><strong>Order ID:</strong></td><td>${orderId}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Date:</strong></td><td>${new Date().toLocaleString('en-RW')}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Product:</strong></td><td>${productName}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Total Price:</strong></td><td>${totalPriceFormatted} Rwf</td></tr>
                        <tr style="color:#28a745;"><td style="padding:5px 0;"><strong>Deposit Paid:</strong></td><td><strong>${depositFormatted} Rwf</strong></td></tr>
                        <tr style="color:#e67e22;"><td style="padding:5px 0;"><strong>Remaining:</strong></td><td><strong>${remainingFormatted} Rwf</strong></td></tr>
                    </table>
                </div>
                
                <div class="mtr-success-box">
                    <h3 style="margin:0 0 10px 0;color:#2e7d32;">👤 Customer Information</h3>
                    <table class="mtr-table">
                        <tr><td style="padding:5px 0;"><strong>Name:</strong></td><td>${customerName}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Email:</strong></td><td>${customerEmail}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Phone:</strong></td><td>${customerPhone}</td></tr>
                        <tr><td style="padding:5px 0;"><strong>Location:</strong></td><td>${customerLocation}</td></tr>
                        ${customerAddress ? `<tr><td style="padding:5px 0;"><strong>Address:</strong></td><td>${customerAddress}</td></tr>` : ''}
                    </table>
                </div>
                
                <div class="mtr-warning-box">
                    <p style="margin:0;font-size:13px;"><strong>📧 Email Sent!</strong> A confirmation email has been sent to ${customerEmail}</p>
                    <p style="margin:10px 0 0 0;font-size:13px;"><strong>📞 Next Steps:</strong></p>
                    <ul style="margin:5px 0 0 20px;font-size:13px;">
                        <li>We will verify your payment within 30 minutes</li>
                        <li>You will receive a call to confirm delivery</li>
                        <li>Your mattress will be delivered in 1-3 days</li>
                        <li>Pay remaining ${remainingFormatted} Rwf on delivery</li>
                    </ul>
                </div>
                
                <button onclick="closeConfirmationModal()" class="mtr-btn-primary">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmationHTML);
    
    sendEmailToCustomer(orderId, productName, totalPriceFormatted, depositFormatted, remainingFormatted, customerName, customerEmail, customerPhone, customerLocation, customerAddress);
    sendWhatsAppToSeller(orderId, productName, totalPriceFormatted, depositFormatted, remainingFormatted, customerName, customerPhone, customerLocation, customerAddress);
    
    closeModal();
}

// Send email to customer
function sendEmailToCustomer(orderId, productName, totalPrice, depositAmount, remainingAmount, customerName, customerEmail, customerPhone, customerLocation, customerAddress) {
    const emailSubject = `✅ Order Confirmation - ${orderId} - MTR Trading`;
    const emailBody = `
Dear ${customerName},

✅ ORDER CONFIRMATION - DEPOSIT RECEIVED

Thank you for choosing MTR Trading! Your order has been confirmed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ORDER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: ${orderId}
Date: ${new Date().toLocaleString('en-RW')}
Product: ${productName}
Total Price: ${totalPrice} Rwf
Deposit Paid: ${depositAmount} Rwf
Remaining Balance: ${remainingAmount} Rwf (pay on delivery)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 DELIVERY INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Location: ${customerLocation}
Address: ${customerAddress || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 WHAT HAPPENS NEXT?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ We will verify your payment within 30 minutes
2️⃣ You will receive a call to confirm delivery date
3️⃣ Your mattress will be delivered in 1-3 days
4️⃣ Pay remaining ${remainingAmount} Rwf upon delivery

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ YOUR DEPOSIT INCLUDES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Mattress reserved exclusively for you
✓ Priority delivery (1-3 days)
✓ Free delivery within Kigali
✓ 1-year manufacturer warranty
✓ 7-day money-back guarantee

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 CONTACT US
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Phone: ${CONFIG.mobileMoneyNumber}
Email: ${CONFIG.companyEmail}

Need help? Call us anytime!

Thank you for your business!
MTR Trading Ltd - Quality Mattresses for Better Sleep
    `.trim();
    
    const mailtoLink = `mailto:${customerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink, '_blank');
}

// Send WhatsApp to seller
function sendWhatsAppToSeller(orderId, productName, totalPrice, depositAmount, remainingAmount, customerName, customerPhone, customerLocation, customerAddress) {
    const message = `✅💰 *PAYMENT CONFIRMATION - MTR TRADING* 💰✅\n\n` +
        `═══════════════════════════════\n\n` +
        `🔑 *ORDER ID:* ${orderId}\n` +
        `⏰ *Time:* ${new Date().toLocaleString('en-RW')}\n\n` +
        `👤 *CUSTOMER DETAILS*\n` +
        `────────────────────────\n` +
        `📛 Name: ${customerName}\n` +
        `📞 Phone: ${customerPhone}\n` +
        `📍 Location: ${customerLocation}\n` +
        `🏠 Address: ${customerAddress || 'Not provided'}\n\n` +
        `🛏️ *PRODUCT DETAILS*\n` +
        `────────────────────────\n` +
        `🏷️ Product: ${productName}\n` +
        `💰 Total Price: ${totalPrice} Rwf\n\n` +
        `💵 *PAYMENT SUMMARY*\n` +
        `────────────────────────\n` +
        `💸 Deposit Paid: ${depositAmount} Rwf\n` +
        `💶 Remaining: ${remainingAmount} Rwf\n` +
        `✅ Status: Pending verification\n\n` +
        `═══════════════════════════════\n` +
        `📌 *ACTION REQUIRED:*\n` +
        `────────────────────────\n` +
        `1️⃣ Check ${CONFIG.mobileMoneyNumber} for ${depositAmount} Rwf\n` +
        `2️⃣ Call ${customerPhone} to confirm\n` +
        `3️⃣ Schedule delivery date\n\n` +
        `⭐ *PRIORITY ORDER - Customer paid deposit* ⭐`;
    
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Close functions
function closeModal() { const modal = document.getElementById('orderModal'); if (modal) modal.remove(); }
function closePaymentModal() { const modal = document.getElementById('paymentModal'); if (modal) modal.remove(); }
function closeConfirmationModal() { const modal = document.getElementById('confirmationModal'); if (modal) modal.remove(); }

// Initialize buttons
function initOrderButtons() {
    const buttons = document.querySelectorAll('.buy-btn');
    console.log(`✅ MTR Order system ready: ${buttons.length} buttons found`);
    
    buttons.forEach((button) => {
        button.removeEventListener('click', handleOrderClick);
        button.addEventListener('click', handleOrderClick);
    });
}

function handleOrderClick(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const productCard = button.closest('.featured1');
    
    if (productCard) {
        const nameElement = productCard.querySelector('h4');
        const priceElement = productCard.querySelector('.price');
        
        if (nameElement && priceElement) {
            const product = {
                name: nameElement.innerText.trim(),
                price: priceElement.innerText.replace('Rwf', '').replace('₣', '').trim()
            };
            showOrderForm(product);
        } else {
            alert('Product information not found. Please try again.');
        }
    } else {
        alert('Please select a product first.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initOrderButtons();
    if (window.MutationObserver) {
        const observer = new MutationObserver(() => initOrderButtons());
        observer.observe(document.body, { childList: true, subtree: true });
    }
});