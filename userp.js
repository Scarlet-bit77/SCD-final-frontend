// ===== PROFILE PAGE FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (!checkUserLoggedIn()) {
        alert('Please login first to view your profile!');
        window.location.href = 'login.html';
        return;
    }

    // Get user data
    const userEmail = localStorage.getItem('userEmail');
    const storedUsers = JSON.parse(localStorage.getItem('tarkaUsers') || '{}');
    const userData = storedUsers[userEmail];
    
    // Get order history from localStorage
    let orders = JSON.parse(localStorage.getItem('tarkaOrders') || '[]');
    
    // Filter orders for current user
    const userOrders = orders.filter(order => order.email === userEmail);

    // ===== POPULATE PROFILE DATA =====
    
    // Set email
    document.getElementById('email').value = userEmail || '';
    
    // Set username
    const username = userData ? (userData.username || userEmail.split('@')[0]) : (userEmail.split('@')[0]);
    document.getElementById('username').value = username;
    
    // Set phone and address from localStorage if available
    const savedProfile = JSON.parse(localStorage.getItem('tarkaProfile') || '{}');
    if (savedProfile[userEmail]) {
        document.getElementById('phone').value = savedProfile[userEmail].phone || '';
        document.getElementById('address').value = savedProfile[userEmail].address || '';
    }

    // ===== CALCULATE STATISTICS =====
    // Total Orders
    document.getElementById('total-orders').textContent = userOrders.length;
    document.getElementById('orders-count').textContent = `${userOrders.length} orders`;
    
    // Total Spent
    const totalSpent = userOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('total-spent').textContent = `Rs${totalSpent.toFixed(2)}`;
    
    // Member Since
    if (userData && userData.created_at) {
        const joinDate = new Date(userData.created_at);
        document.getElementById('member-since').textContent = joinDate.toLocaleDateString('en-US', { 
            month: 'short', 
            year: 'numeric' 
        });
    } else {
        document.getElementById('member-since').textContent = 'Today';
    }
    
    // Last Order
    if (userOrders.length > 0) {
        const lastOrder = userOrders[userOrders.length - 1];
        const lastOrderDate = new Date(lastOrder.timestamp || lastOrder.date || Date.now());
        document.getElementById('last-order').textContent = lastOrderDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    } else {
        document.getElementById('last-order').textContent = 'None';
    }

    // ===== POPULATE ORDER HISTORY =====
    const ordersList = document.getElementById('orders-list');
    const noOrdersMessage = document.getElementById('no-orders-message');
    
    if (userOrders.length > 0) {
        noOrdersMessage.style.display = 'none';
        
        // Sort orders by date (newest first)
        userOrders.sort((a, b) => {
            const dateA = new Date(a.timestamp || a.date || 0);
            const dateB = new Date(b.timestamp || b.date || 0);
            return dateB - dateA;
        });
        
        // Display orders (show latest 5 orders)
        const displayOrders = userOrders.slice(0, 5);
        
        displayOrders.forEach((order, index) => {
            const orderDate = new Date(order.timestamp || order.date || Date.now());
            const formattedDate = orderDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
            
            const orderTime = orderDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            orderCard.onclick = function() {
                window.location.href = `tracking.html?orderId=${order.orderId}`;
            };
            
            orderCard.innerHTML = `
                <div class="order-info">
                    <h3>Order #${order.orderId || `ORD${1000 + index}`}</h3>
                    <p>${formattedDate} at ${orderTime}</p>
                    <p>${order.items ? order.items.length : 0} items • ${order.deliveryTime || 'ASAP'}</p>
                </div>
                <div class="order-amount">Rs${order.total ? order.total.toFixed(2) : '0.00'}</div>
            `;
            
            ordersList.appendChild(orderCard);
        });
        
        // Show "View All" button if there are more than 5 orders
        if (userOrders.length > 5) {
            const viewAllBtn = document.createElement('div');
            viewAllBtn.style.textAlign = 'center';
            viewAllBtn.style.marginTop = '1rem';
            viewAllBtn.innerHTML = `
                <a href="#" class="btn btn-primary" id="view-all-orders">
                    <i class="fas fa-list"></i> View All ${userOrders.length} Orders
                </a>
            `;
            ordersList.appendChild(viewAllBtn);
            
            document.getElementById('view-all-orders').onclick = function(e) {
                e.preventDefault();
                // Show all orders (you can implement pagination or modal here)
                alert(`Showing all ${userOrders.length} orders. This could open a modal or new page.`);
            };
        }
    }

    // ===== EDIT USERNAME FUNCTIONALITY =====
    const editUsernameBtn = document.getElementById('edit-username-btn');
    const usernameInput = document.getElementById('username');
    let isEditingUsername = false;

    editUsernameBtn.addEventListener('click', function() {
        if (isEditingUsername) {
            // Save username
            usernameInput.readOnly = true;
            editUsernameBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
            
            // Update in localStorage
            if (userEmail && storedUsers[userEmail]) {
                storedUsers[userEmail].username = usernameInput.value.trim();
                localStorage.setItem('tarkaUsers', JSON.stringify(storedUsers));
                
                // Update welcome message
                document.getElementById('welcome-message').textContent = 
                    `Welcome back, ${usernameInput.value.trim()}!`;
            }
            
            isEditingUsername = false;
        } else {
            // Edit username
            usernameInput.readOnly = false;
            usernameInput.focus();
            editUsernameBtn.innerHTML = '<i class="fas fa-save"></i> Save';
            isEditingUsername = true;
        }
    });

    // ===== PROFILE PICTURE UPLOAD =====
    const editPictureBtn = document.getElementById('edit-picture-btn');
    const pictureInput = document.getElementById('picture-input');
    const profileImage = document.getElementById('profile-image');
    const profilePlaceholder = document.getElementById('profile-placeholder');

    editPictureBtn.addEventListener('click', function() {
        pictureInput.click();
    });

    pictureInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file.');
                return;
            }
            
            // Validate file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Image size should be less than 2MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                profileImage.style.display = 'block';
                profilePlaceholder.style.display = 'none';
                
                // Save to localStorage
                if (!savedProfile[userEmail]) {
                    savedProfile[userEmail] = {};
                }
                savedProfile[userEmail].profilePicture = event.target.result;
                savedProfile[userEmail].lastUpdated = new Date().toISOString();
                localStorage.setItem('tarkaProfile', JSON.stringify(savedProfile));
                
                // Show success message
                showToast('Profile picture updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile picture
    if (savedProfile[userEmail] && savedProfile[userEmail].profilePicture) {
        profileImage.src = savedProfile[userEmail].profilePicture;
        profileImage.style.display = 'block';
        profilePlaceholder.style.display = 'none';
    }

    // ===== SAVE PROFILE FUNCTIONALITY =====
    const saveBtn = document.getElementById('save-btn');
    saveBtn.addEventListener('click', function() {
        // Get form values
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        
        // Validate phone number (basic validation)
        if (phone && !/^\d{11}$/.test(phone)) {
            alert('Please enter a valid 11-digit phone number.');
            return;
        }
        
        // Save to localStorage
        if (!savedProfile[userEmail]) {
            savedProfile[userEmail] = {};
        }
        
        savedProfile[userEmail].phone = phone;
        savedProfile[userEmail].address = address;
        savedProfile[userEmail].lastUpdated = new Date().toISOString();
        
        localStorage.setItem('tarkaProfile', JSON.stringify(savedProfile));
        
        // Show success message
        showToast('Profile saved successfully!');
        
        // Update save button state
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        saveBtn.disabled = true;
        
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.style.background = '';
            saveBtn.disabled = false;
        }, 2000);
    });

    // ===== UPDATE NAVIGATION =====
    updateNavigation();
    updateCartCount();
});

// ===== HELPER FUNCTIONS =====
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-orange);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// ===== NAVIGATION AUTH FUNCTIONS =====
function checkUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function setUserLoggedIn(status) {
    localStorage.setItem('isLoggedIn', status);
    if (!status) {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('loginCount');
    }
}

function updateNavigation() {
    const authButton = document.getElementById('auth-button');
    if (!authButton) return;
    
    if (checkUserLoggedIn()) {
        authButton.textContent = 'Logout';
        authButton.href = '#';
        authButton.onclick = function(e) {
            e.preventDefault();
            setUserLoggedIn(false);
            localStorage.removeItem('tarkaCart');
            localStorage.removeItem('tarkaCurrentOrder');
            window.location.href = 'welcome.html';
        };
    } else {
        authButton.textContent = 'Login';
        authButton.href = 'login.html';
        authButton.onclick = null;
    }
}

// Update cart count
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('tarkaCart') || '[]');
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update all cart count elements
    document.querySelectorAll('#cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}