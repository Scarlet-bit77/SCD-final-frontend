// ===== APPLICATION STATE =====
let cart = [];
let favorites = [];
let currentOrder = null;
let appliedPromo = null;
let userLoggedIn = false;

// ===== MENU DATA =====
const menuItems = [
    // Pizza Category
    { id: 1, name: "Chicken Tikka Pizza", price: 1900, category: "pizza", image: "chicken tikka pizza 1.jpg", rating: 4.8, description: "Delicious pizza topped with marinated chicken tikka, onions, bell peppers, and our special sauce. Baked to perfection with mozzarella cheese." },
    { id: 2, name: "Fajita Pizza", price: 1700, category: "pizza", image: "Fatija Pizza.jpg", rating: 4.6, description: "Mexican-style pizza with seasoned chicken, colorful bell peppers, onions, and jalapeños. Topped with cheese and our signature fajita sauce." },
    { id: 3, name: "Margherita Pizza", price: 1550, category: "pizza", image: "Margherita pizza.jpeg", rating: 4.5, description: "Classic Italian pizza with fresh tomato sauce, mozzarella cheese, and fresh basil leaves. Simple yet incredibly flavorful." },
    { id: 4, name: "Pepperoni Pizza", price: 2100, category: "pizza", image: "Pepperoni pizza.jpeg", rating: 4.7, description: "Traditional pepperoni pizza with spicy pepperoni slices, mozzarella cheese, and our homemade tomato sauce." },
    
    // Burger Category
    { id: 5, name: "Zinger Burger", price: 650, category: "burger", image: "zinger burger.jpeg", rating: 4.9, description: "Crispy fried chicken breast with spicy coating, fresh lettuce, tomatoes, and our special zinger sauce in a soft bun." },
    { id: 6, name: "Beef Burger", price: 870, category: "burger", image: "beef burger.jpg", rating: 4.7, description: "Juicy beef patty grilled to perfection, served with lettuce, tomatoes, onions, pickles, and our signature burger sauce." },
    { id: 7, name: "Chicken Burger", price: 600, category: "burger", image: "chicken burger.jpeg", rating: 4.4, description: "Tender grilled chicken breast with fresh vegetables and creamy mayo sauce in a toasted bun." },
    { id: 8, name: "Fish Burger", price: 800, category: "burger", image: "fish burger.jpg", rating: 4.3, description: "Crispy fish fillet with tartar sauce, lettuce, and tomatoes in a soft burger bun." },
    
    // Biryani & Rice Category
    { id: 9, name: "Chicken Biryani", price: 600, category: "biryani", image: "biryani.png", rating: 4.9, description: "Aromatic basmati rice cooked with tender chicken pieces, traditional spices, and saffron. Served with raita and shorba." },
    { id: 10, name: "Mutton Biryani", price: 900, category: "biryani", image: "mutton biryani.jpg", rating: 4.8, description: "Premium mutton pieces cooked with fragrant basmati rice, exotic spices, and garnished with fried onions and fresh herbs." },
    { id: 11, name: "Beef Biryani", price: 820, category: "biryani", image: "beef biryani.jpg", rating: 4.6, description: "Succulent beef chunks layered with spiced basmati rice, cooked in traditional dum style for authentic flavors." },
    { id: 12, name: "Vegetable Biryani", price: 580, category: "biryani", image: "vegetable birayni.jpg", rating: 4.2, description: "Mixed vegetables and paneer cooked with aromatic basmati rice and traditional biryani spices." },
    { id: 13, name: "Plain Rice", price: 250, category: "biryani", image: "plain rice.jpg", rating: 4.0, description: "Steamed basmati rice, perfect as a side dish with curries and gravies." },
    { id: 14, name: "Pulao", price: 500, category: "biryani", image: "pulao.jpg", rating: 4.3, description: "Fragrant rice cooked with whole spices, creating a mildly flavored and aromatic dish." },
    
    // Karahi Category
    { id: 15, name: "Chicken Karahi", price: 1300, category: "karahi", image: "Chicken-Karahi.jpg", rating: 4.8, description: "Traditional Pakistani dish with chicken cooked in a wok with tomatoes, ginger, garlic, and aromatic spices." },
    { id: 16, name: "Mutton Karahi", price: 1900, category: "karahi", image: "mutton karahi2.jpg", rating: 4.9, description: "Tender mutton pieces cooked in traditional karahi style with fresh tomatoes, green chilies, and ginger." },
    { id: 17, name: "Fish Karahi", price: 1550, category: "karahi", image: "fish-kherhai.jpg", rating: 4.5, description: "Fresh fish cooked in karahi with onions, tomatoes, and special coastal spices for a unique flavor." },
    { id: 18, name: "Seekh Kabab Karahi", price: 1400, category: "karahi", image: "seekh kabab karahi.jpg", rating: 4.7, description: "Delicious seekh kababs cooked in spicy karahi masala with rich tomato and ginger flavors." },

    // Nehari Category
    { id: 19, name: "Beef Nehari", price: 1000, category: "nehari", image: "beef nehari1.jpeg", rating: 4.7, description: "Slow-cooked beef in rich, spicy gravy with traditional nehari spices. Garnished with ginger and green chilies." },
    { id: 20, name: "Mutton Nehari", price: 1450, category: "nehari", image: "mutton nehari.jpg", rating: 4.8, description: "Tender mutton simmered overnight in aromatic spices, creating a rich and flavorful traditional dish." },
    { id: 21, name: "Chicken Nehari", price: 880, category: "nehari", image: "chicken nehari.jpeg", rating: 4.6, description: "Chicken cooked in traditional nehari style with a blend of aromatic spices and rich gravy." },
    { id: 22, name: "Special Nalli Nehari", price: 1700, category: "nehari", image: "nalli nahari.jpg", rating: 4.9, description: "Rich and flavorful bone marrow cooked slowly in traditional nehari gravy for a melt-in-mouth experience." },

    // Veg & Paneer Category
    { id: 23, name: "Palak Paneer", price: 850, category: "veg-paneer", image: "palak paneer.jpeg", rating: 4.4, description: "Fresh cottage cheese cubes cooked in creamy spinach gravy with aromatic spices." },
    { id: 24, name: "Paneer Tikka", price: 950, category: "veg-paneer", image: "paneer tikka.jpg", rating: 4.6, description: "Marinated paneer cubes grilled to perfection with bell peppers and onions." },
    { id: 25, name: "Dal Makhani", price: 700, category: "veg-paneer", image: "Daal makhani.jpg", rating: 4.5, description: "Creamy black lentils slow-cooked with butter, cream, and aromatic spices." },
    { id: 26, name: "Mixed Vegetables", price: 580, category: "veg-paneer", image: "Mix-Vegetables.jpg", rating: 4.1, description: "Seasonal vegetables cooked with onions, tomatoes, and traditional spices." },
    
    // Curry & Gravies Category
    { id: 27, name: "Butter Chicken", price: 1050, category: "curry", image: "Butter Chicken.jpg", rating: 4.9, description: "Tender chicken pieces in rich, creamy tomato-based sauce with butter and aromatic spices." },
    { id: 28, name: "Chicken Curry", price: 900, category: "curry", image: "chicken curry.jpg", rating: 4.6, description: "Traditional chicken curry cooked with onions, tomatoes, and a blend of Pakistani spices." },
    { id: 29, name: "Mutton Curry", price: 1450, category: "curry", image: "mutton curry.jpg", rating: 4.7, description: "Succulent mutton pieces in spicy curry gravy with traditional herbs and spices." },
    { id: 30, name: "Fish Curry", price: 1200, category: "curry", image: "fish curry.jpg", rating: 4.4, description: "Fresh fish cooked in coconut-based curry with coastal spices and herbs." },
    
    // Naan & Bread Category
    { id: 31, name: "Garlic Naan", price: 180, category: "naan", image: "naan.png", rating: 4.7, description: "Soft, fluffy naan bread topped with fresh garlic and herbs, baked in tandoor." },
    { id: 32, name: "Butter Naan", price: 145, category: "naan", image: "butter naan.jpg", rating: 4.5, description: "Classic naan bread brushed with butter, soft and perfect for curries." },
    { id: 33, name: "Tandoori Roti", price: 50, category: "naan", image: "Tandoori-Roti.png", rating: 4.2, description: "Whole wheat bread cooked in tandoor, healthy and delicious." },
    { id: 34, name: "Cheese Naan", price: 250, category: "naan", image: "cheese naan2.jpeg", rating: 4.8, description: "Naan stuffed with cheese and baked until golden, crispy outside and gooey inside." },
    
    // BBQ & Grills
    { id: 35, name: "Chicken Tikka", price: 700, category: "bbq", image: "chicken tikka.jpg", rating: 4.8, description: "Marinated chicken pieces grilled to perfection with traditional spices and yogurt." },
    { id: 36, name: "Seekh Kebab", price: 880, category: "bbq", image: "seekh kabab.jpg", rating: 4.7, description: "Minced meat seasoned with spices, shaped on skewers and grilled over charcoal." },
    { id: 37, name: "Malai Boti", price: 950, category: "bbq", image: "malai-boti.jpg", rating: 4.9, description: "Tender chicken pieces marinated in cream and mild spices, grilled to perfection." },
    { id: 38, name: "Beef Boti", price: 1000, category: "bbq", image: "beef boti.jpg", rating: 4.6, description: "Succulent beef cubes marinated in spices and grilled over open flame." },
    
    // Lassi & Drinks Category
    { id: 39, name: "Sweet Lassi", price: 250, category: "drinks", image: "sweet lassi1.jpg", rating: 4.3, description: "Traditional yogurt-based drink sweetened with sugar, refreshing and creamy." },
    { id: 40, name: "Mango Lassi", price: 380, category: "drinks", image: "mango lassi.jpg", rating: 4.8, description: "Creamy yogurt drink blended with fresh mango pulp, sweet and tropical." },
    { id: 41, name: "Mint Mojito", price: 430, category: "drinks", image: "mint mojito].jpg", rating: 4.4, description: "Refreshing mint and lime cooler served with soda, the ultimate summer refresher" },
    { id: 42, name: "Cold Drink", price: 120, category: "drinks", image: "cold drink1.png", rating: 4.2, description: "Chilled fizzy soft drink (Pepsi, 7Up, Marinda) served in bottles, perfect with any meal!" },
    
    // Desserts & Sweets
    { id: 43, name: "Gulab Jamun", price: 250, category: "dessert", image: "gulab jamun.jpeg", rating: 4.9, description: "Soft, spongy milk balls soaked in rose-flavored sugar syrup, served warm." },
    { id: 44, name: "Kheer", price: 400, category: "dessert", image: "Kheer-2.jpg", rating: 4.6, description: "Creamy rice pudding cooked with milk, sugar, and garnished with nuts and cardamom." },
    { id: 45, name: "Ras Malai", price: 550, category: "dessert", image: "ras malai.png", rating: 4.8, description: "Soft cottage cheese dumplings in sweetened, thickened milk flavored with cardamom." },
    { id: 46, name: "Kulfi", price: 190, category: "dessert", image: "kulfi-1.jpg", rating: 4.5, description: "Traditional frozen dessert made with thickened milk, nuts, and cardamom." },
    { id: 47, name: "Shahi Tukra", price: 600, category: "dessert", image: "shahi tukda1.jpeg", rating: 4.7, description: "Rich Mughlai dessert made with fried bread soaked in sweet milk and garnished with nuts." },
    { id: 48, name: "Jalebi", price: 200, category: "dessert", image: "jalebi.jpg", rating: 4.4, description: "Crispy, spiral-shaped sweet soaked in sugar syrup, served hot and crunchy." },
   
    // Desi Specials Category
    { id: 49, name: "Haleem", price: 400, category: "desi-specials", image: "haleem.jpg", rating: 4.7, description: "Slow-cooked lentils and meat blend, rich in protein and traditional flavors." },
    { id: 50, name: "Paye", price: 600, category: "desi-specials", image: "paye.jpg", rating: 4.5, description: "Traditional trotters curry cooked overnight with aromatic spices, very nutritious." },
    { id: 51, name: "Chicken Qorma", price: 550, category: "desi-specials", image: "chicken-Qorma.jpg", rating: 4.8, description: "Rich and flavorful chicken curry slow-cooked with aromatic spices, yogurt, and ghee for a royal taste." },
    { id: 52, name: "Sajji", price: 1200, category: "desi-specials", image: "sajji.jpg", rating: 4.9, description: "Whole chicken marinated with spices and roasted to perfection, served with rice and salad." }
];

const categoryNames = {
    "pizza": "Pizza",
    "burger": "Burgers", 
    "biryani": "Biryani & Rice",
    "karahi": "Karahi",
    "nehari": "Nehari",
    "veg-paneer": "Veg & Paneer",
    "curry": "Curry & Gravies",
    "naan": "Naan & Bread",
    "bbq": "BBQ & Grills",
    "drinks": "Lassi & Drinks",
    "dessert": "Desserts & Sweets",
    "desi-specials": "Desi Specials"
};

// ===== LOGIN CHECK FOR ALL PAGES =====
const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

// ===== LOGOUT FUNCTIONALITY =====
function updateNavigation() {
    const authButton = document.getElementById('auth-button');
    if (!authButton) return;
    
    if (isLoggedIn()) {
        authButton.textContent = 'Logout';
        authButton.href = '#';
        authButton.onclick = function(e) {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('tarkaCart');
            localStorage.removeItem('tarkaCurrentOrder');
            localStorage.removeItem('tarkaFavorites');
            window.location.href = 'welcome.html';
        };
    } else {
        authButton.textContent = 'Login';
        authButton.href = 'login.html';
        authButton.onclick = null;
    }
}

// ===== FAVORITES FUNCTIONS =====
function loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('tarkaFavorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

function saveFavoritesToStorage() {
    localStorage.setItem('tarkaFavorites', JSON.stringify(favorites));
}

// ===== FAVORITES DISPLAY =====
function displayFavorites() {
    loadFavoritesFromStorage();
    
    const favoritesContainer = document.getElementById('favorites-container');
    const emptyState = document.getElementById('empty-favorites');
    
    if (!favoritesContainer || !emptyState) return;
    
    if (favorites.length === 0) {
        favoritesContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    favoritesContainer.style.display = 'grid';
    emptyState.style.display = 'none';
    
    favoritesContainer.innerHTML = favorites.map(item => {
        return `
            <div class="fav-card" onclick="openItemDetailFromFavorites(${item.id})">
                <div class="fav-image-container">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="fav-heart-btn" onclick="event.stopPropagation(); removeFavoriteItem(${item.id})">
                        ❤️
                    </button>
                </div>
                <div class="fav-card-content">
                    <div class="fav-name-rating">
                        <h3>${item.name}</h3>
                        <div class="fav-rating">
                         ${createStarRating(item.rating)} <span>${item.rating}</span>
                        </div>
                    </div>
                    <p class="price">Rs ${item.price}</p>
                </div>
            </div>
        `;
    }).join('');
}

function removeFavoriteItem(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    const existingIndex = favorites.findIndex(fav => fav.id === itemId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification(`${item.name} removed from favorites`);
        saveFavoritesToStorage();
        displayFavorites();
    }
}

function openItemDetailFromFavorites(itemId) {
    window.location.href = `menu.html?itemId=${itemId}`;
}

function toggleFavorite(itemId, event) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    
    const item = menuItems.find(i => i.id === itemId);
    const existingIndex = favorites.findIndex(fav => fav.id === itemId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification(`${item.name} removed from favorites`);
    } else {
        favorites.push(item);
        showNotification(`${item.name} added to favorites! ❤️`);
    }
    
    saveFavoritesToStorage();
    loadMenu();
}

function toggleFavoriteDetail(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingIndex = favorites.findIndex(fav => fav.id === itemId);
    
    if (existingIndex > -1) {
        favorites.splice(existingIndex, 1);
        showNotification(`${item.name} removed from favorites`);
    } else {
        favorites.push(item);
        showNotification(`${item.name} added to favorites! ❤️`);
    }
    
    saveFavoritesToStorage();
    
    const heartBtn = document.getElementById(`detail-heart-btn-${itemId}`);
    if (heartBtn) {
        const isFavorite = favorites.some(fav => fav.id === itemId);
        heartBtn.innerHTML = isFavorite ? '❤️' : '🤍';
    }
}

// ===== MENU FUNCTIONS =====
function loadMenu(filter = null) {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;
    
    if (filter) {
        const filteredItems = menuItems.filter(item => item.category === filter);
        const categoryName = categoryNames[filter] || filter;
        
        menuContainer.innerHTML = `
            <div class="menu-category">
                <h2 class="category-heading">${categoryName}</h2>
                <div class="menu-items-row">
                    ${filteredItems.map(item => createFoodItemHTML(item)).join('')}
                </div>
            </div>
        `;
    } else {
        const categories = [...new Set(menuItems.map(item => item.category))];
        
        menuContainer.innerHTML = categories.map(category => {
            const categoryItems = menuItems.filter(item => item.category === category);
            const categoryName = categoryNames[category] || category;
            
            return `
                <div class="menu-category">
                    <h2 class="category-heading">${categoryName}</h2>
                    <div class="menu-items-row">
                        ${categoryItems.map(item => createFoodItemHTML(item)).join('')}
                    </div>
                </div>
            `;
        }).join('');
    }
}

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '<div style="display: inline-flex; align-items: center;">';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span style="color: #FFD700; font-size: 1rem;">★</span>';
    }
    
    if (hasHalfStar) {
        starsHTML += `
            <span style="position: relative; display: inline-block; font-size: 1rem;">
                <span style="color: #E5E5E5;">★</span>
                <span style="position: absolute; left: 0; top: 0; width: 50%; overflow: hidden; color: #FFD700;">★</span>
            </span>
        `;
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span style="color: #E5E5E5; font-size: 1rem;">★</span>';
    }
    
    starsHTML += '</div>';
    return starsHTML;
}

function createFoodItemHTML(item) {
    loadFavoritesFromStorage();
    const isFavorite = favorites.some(fav => fav.id === item.id);
    const favoriteColor = isFavorite ? '#F55B23' : '#ccc';
    const favoriteIcon = isFavorite ? '❤️' : '🤍';
    
    return `
        <div class="food-item" onclick="openItemDetail(${item.id})">
            <div class="food-image">
                <img src="${item.image}" alt="${item.name}" style="width: 120px; height: 85px; object-fit: cover; border-radius: 10px;">
            </div>  
            <div class="food-info">
                <div class="food-details">
                    <div class="food-name-row">
                        <div class="food-name">${item.name}</div>
                        <button onclick="event.stopPropagation(); toggleFavorite(${item.id}, event); return false;" 
                            class="heart-btn"
                            style="color: ${favoriteColor}; background: none; border: none; cursor: pointer; font-size: 1.2rem;">
                            ${favoriteIcon}
                        </button>
                    </div>
                    
                    <div class="food-bottom-row">
                        <div class="food-rating" style="color: var(--primary-orange); font-weight: 600; font-size: 0.9rem; display: flex; align-items: center; gap: 0.3rem;">
                            ${createStarRating(item.rating)} <span>${item.rating}</span>
                        </div>
                        <div class="food-price">Rs ${item.price}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function openItemDetail(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    window.scrollTo(0, 0);
    
    loadFavoritesFromStorage();
    const isFavorite = favorites.some(fav => fav.id === itemId);
    const heartIcon = isFavorite ? '❤️' : '🤍';

    const detailContent = document.getElementById('item-detail-content');
    detailContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem; position: relative;">
            <button id="detail-heart-btn-${itemId}" onclick="toggleFavoriteDetail(${itemId})" style="position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 50px; height: 50px; cursor: pointer; font-size: 1.5rem; box-shadow: 0 2px 10px rgba(0,0,0,0.2); transition: transform 0.2s ease;">
                ${heartIcon}
            </button>
            <img src="${item.image}" alt="${item.name}" style="width: 460px; height: 350px; border-radius: 15px; object-fit: cover; margin-bottom: 1rem;">
            <h1 style="font-size: 2.5rem; color: var(--text-dark); margin-bottom: 0.5rem;">${item.name}</h1>
            <p style="font-size: 2rem; color: var(--primary-orange); font-weight: bold;">Rs ${item.price}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--text-dark); margin-bottom: 1rem; font-size: 1.5rem;">Description</h3>
            <p style="color: var(--text-light); line-height: 1.6; font-size: 1.1rem;">${item.description}</p>
        </div>
        
        <div style="text-align: center;">
            <button onclick="addToCart(${item.id})" style="background: linear-gradient(45deg, var(--primary-orange), var(--primary-yellow)); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1.2rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                Add to Cart
            </button>
        </div>
    `;

    document.getElementById('menu-page').style.display = 'none';
    document.getElementById('detail-page').style.display = 'block';
}

function goBackToMenu() {
    document.getElementById('detail-page').style.display = 'none';
    document.getElementById('menu-page').style.display = 'block';
    
    loadFavoritesFromStorage();
    loadMenu();
}

// ===== CART FUNCTIONS =====
async function loadCartFromStorage() {
    try {
        const userId = localStorage.getItem('userId');
        if (userId) {
            // Try to load cart from backend
            const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
            if (response.ok) {
                const result = await response.json();
                if (result.success && result.cart && result.cart.items) {
                    cart = result.cart.items.map(cartItem => ({
                        id: parseInt(cartItem.product_id),
                        name: cartItem.name,
                        price: cartItem.price,
                        quantity: cartItem.quantity,
                        image: cartItem.image,
                        category: menuItems.find(m => m.id === parseInt(cartItem.product_id))?.category || 'unknown'
                    }));
                    console.log('✅ Cart loaded from backend');
                    updateCartCount();
                    return;
                }
            }
        }
    } catch (error) {
        console.log('⚠️ Using localStorage cart:', error);
    }
    
    // Fallback to localStorage
    const savedCart = localStorage.getItem('tarkaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

function saveCartToStorage() {
    localStorage.setItem('tarkaCart', JSON.stringify(cart));
}

// ===== UPDATED: addToCart with backend integration =====
async function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return alert("Item not found!");

    const userId = localStorage.getItem('userId'); 
    if (!userId) {
        alert("Please log in to add items to your cart.");
        window.location.href = 'login.html';
        return;
    }

    const payload = {
        user_id: userId,
        item: {
            product_id: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            total: item.price
        }
    };
    
    try {
        const response = await fetch("http://localhost:3000/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            // Update local cart from response
            if (result.cart && result.cart.items) {
                cart = result.cart.items.map(cartItem => ({
                    id: parseInt(cartItem.product_id),
                    name: cartItem.name,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                    image: cartItem.image,
                    category: menuItems.find(m => m.id === parseInt(cartItem.product_id))?.category || 'unknown'
                }));
                saveCartToStorage();
            }
            
            updateCartCount();
            updateCartDisplay();
            
            showNotification(`${item.name} added to cart!`);
        } else {
            alert(result.message || "Failed to add item to cart.");
        }
    } catch (err) {
        console.error(err);
        // Fallback to local storage
        const existingItem = cart.find(i => i.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ 
                ...item, 
                quantity: 1,
                product_id: item.id.toString() 
            });
        }
        
        saveCartToStorage();
        updateCartCount();
        updateCartDisplay();
        showNotification(`${item.name} added to cart! (offline mode)`);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    saveCartToStorage();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

async function removeFromCartBackend(itemId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        removeFromCart(itemId);
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/cart/remove", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                product_id: itemId.toString()
            })
        });

        const result = await response.json();
        if (response.ok && result.success) {
            removeFromCart(itemId);
        } else {
            removeFromCart(itemId);
        }
    } catch (error) {
        console.error("Backend remove failed:", error);
        removeFromCart(itemId);
    }
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartCount();
            saveCartToStorage();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    const promoSection = document.getElementById('promo-section');
    const cartCount = document.getElementById('cart-count');

    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        if (promoSection) promoSection.style.display = 'none';
        if (cartItemsContainer) cartItemsContainer.innerHTML = '';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    if (promoSection) promoSection.style.display = 'block';

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">Rs ${item.price}</p>
                </div>
                
                <div class="quantity-controls">
                    <div class="quantity-selector">
                        <button onclick="updateQuantity(${item.id}, -1)" class="quantity-btn">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" class="quantity-btn">+</button>
                    </div>
                    
                    <button onclick="removeFromCartBackend(${item.id})" class="delete-btn" title="Remove from cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    updateCartTotals();
}

function applyPromoCode() {
    const promoInput = document.getElementById('promo-input');
    const promoMessage = document.getElementById('promo-message');
    if (!promoInput || !promoMessage) return;
    
    const promoCode = promoInput.value.trim().toUpperCase();
    
    const promoCodes = {
        'SAVE10': { discount: 10, type: 'percentage', description: '10% off' },
        'SAVE20': { discount: 20, type: 'percentage', description: '20% off' },
        'FLAT100': { discount: 100, type: 'fixed', description: 'Rs 100 off' },
        'FLAT200': { discount: 200, type: 'fixed', description: 'Rs 200 off' },
        'WELCOME15': { discount: 15, type: 'percentage', description: '15% off for new customers' },
        'STUDENT': { discount: 150, type: 'fixed', description: 'Student discount Rs 150 off' }
    };
    
    if (!promoCode) {
        showPromoMessage('Please enter a promo code', 'error');
        return;
    }
    
    if (promoCodes[promoCode]) {
        appliedPromo = {
            code: promoCode,
            ...promoCodes[promoCode]
        };
        showPromoMessage(`✅ Promo code applied! ${appliedPromo.description}`, 'success');
        promoInput.disabled = true;
        updateCartTotals();
    } else {
        showPromoMessage('❌ Invalid promo code', 'error');
    }
}

function showPromoMessage(message, type) {
    const promoMessage = document.getElementById('promo-message');
    if (!promoMessage) return;
    
    promoMessage.textContent = message;
    promoMessage.style.display = 'block';
    promoMessage.style.color = type === 'success' ? '#28a745' : '#dc3545';
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 150 : 0;
    
    let discountAmount = 0;
    if (appliedPromo) {
        if (appliedPromo.type === 'percentage') {
            discountAmount = Math.round(subtotal * (appliedPromo.discount / 100));
        } else {
            discountAmount = appliedPromo.discount;
        }
        
        const discountLine = document.getElementById('discount-line');
        const discountCode = document.getElementById('discount-code');
        const discountAmountElement = document.getElementById('discount-amount');
        
        if (discountLine) discountLine.style.display = 'flex';
        if (discountCode) discountCode.textContent = appliedPromo.code;
        if (discountAmountElement) discountAmountElement.textContent = discountAmount;
    } else {
        const discountLine = document.getElementById('discount-line');
        if (discountLine) discountLine.style.display = 'none';
    }
    
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discountedSubtotal * 0.05);
    const total = discountedSubtotal + deliveryFee + tax;

    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total-amount');
    
    if (subtotalElement) subtotalElement.textContent = subtotal;
    if (deliveryFeeElement) deliveryFeeElement.textContent = deliveryFee;
    if (taxElement) taxElement.textContent = tax;
    if (totalElement) totalElement.textContent = total;
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const checkoutState = {
        cart: cart,
        appliedPromo: appliedPromo,
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        total: calculateTotal()
    };
    
    localStorage.setItem('tarkaCheckoutState', JSON.stringify(checkoutState));
    
    window.location.href = 'checkout.html';
}

// ===== ORDER FUNCTIONS =====
function generateOrderId() {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    return `#TKA${randomNumber}`;
}

function getDisplayOrderId(order) {
    if (order.orderId && order.orderId.startsWith('#TKA')) {
        return order.orderId;
    }
    
    if (order.orderId && order.orderId.startsWith('TKA')) {
        return `#${order.orderId}`;
    }
    
    if (order.orderId) {
        const numbers = order.orderId.replace(/\D/g, '');
        if (numbers.length >= 5) {
            return `#TKA${numbers.substring(0, 5)}`;
        }
    }
    
    if (order._id) {
        const idStr = order._id.toString();
        const numbers = idStr.replace(/\D/g, '');
        if (numbers.length >= 5) {
            return `#TKA${numbers.slice(-5)}`;
        }
    }
    
    if (order.id) {
        const numbers = order.id.toString().replace(/\D/g, '');
        if (numbers.length >= 5) {
            return `#TKA${numbers.substring(0, 5)}`;
        }
    }
    
    const timestamp = order.timestamp || order.date || Date.now();
    const timestampStr = timestamp.toString();
    const last5Digits = timestampStr.slice(-5);
    return `#TKA${last5Digits}`;
}

function convertExistingOrdersToTKA() {
    try {
        let orders = JSON.parse(localStorage.getItem('tarkaOrders') || '[]');
        let changed = false;
        
        const convertedOrders = orders.map(order => {
            if (order.orderId && !order.orderId.startsWith('#TKA')) {
                console.log(`🔄 Converting order ID: ${order.orderId} -> TKA format`);
                
                const numbers = order.orderId.toString().replace(/\D/g, '');
                if (numbers.length >= 5) {
                    order.orderId = `#TKA${numbers.substring(0, 5)}`;
                } else {
                    order.orderId = generateOrderId();
                }
                
                order.id = order.orderId;
                changed = true;
            }
            return order;
        });
        
        if (changed) {
            localStorage.setItem('tarkaOrders', JSON.stringify(convertedOrders));
            console.log('✅ Converted existing orders to TKA format');
        }
        
        return convertedOrders;
    } catch (error) {
        console.error('❌ Error converting orders:', error);
        return [];
    }
}

function saveOrderToProfile(orderData) {
    try {
        let orders = JSON.parse(localStorage.getItem('tarkaOrders') || '[]');
        
        if (!orderData.orderId || !orderData.orderId.startsWith('#TKA')) {
            if (orderData.orderId) {
                const numbers = orderData.orderId.toString().replace(/\D/g, '');
                if (numbers.length >= 5) {
                    orderData.orderId = `#TKA${numbers.substring(0, 5)}`;
                } else {
                    orderData.orderId = generateOrderId();
                }
            } else {
                orderData.orderId = generateOrderId();
            }
        }
        
        orderData.id = orderData.orderId;
        
        console.log('💾 Saving order with TKA ID:', orderData.orderId);
        
        orders.push(orderData);
        
        localStorage.setItem('tarkaOrders', JSON.stringify(orders));
        
        console.log('✅ Order saved to tarkaOrders with TKA ID:', orderData.orderId);
        console.log('📊 Total orders in storage:', orders.length);
        
        return true;
    } catch (error) {
        console.error('❌ Error saving order:', error);
        return false;
    }
}

function autoFillUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;
    
    const savedProfile = JSON.parse(localStorage.getItem('tarkaProfile') || '{}');
    
    if (savedProfile[userEmail]) {
        const profile = savedProfile[userEmail];
        
        const phoneField = document.getElementById('phone');
        if (profile.phone && phoneField && !phoneField.value) {
            phoneField.value = profile.phone;
        }
        
        const addressField = document.getElementById('address');
        if (profile.address && addressField && !addressField.value) {
            addressField.value = profile.address;
        }
        
        const storedUsers = JSON.parse(localStorage.getItem('tarkaUsers') || '{}');
        const userData = storedUsers[userEmail];
        const nameField = document.getElementById('fullName');
        if (userData && userData.username && nameField && !nameField.value) {
            nameField.value = userData.username;
        }
    }
}

// ===== CHECKOUT FUNCTIONS =====
function updateCheckoutDisplay() {
    const cartItemsPreview = document.getElementById('cart-items-preview');
    const itemCount = document.getElementById('item-count');
    const orderItems = document.getElementById('order-items');
    
    if (cartItemsPreview) {
        if (cart.length === 0) {
            cartItemsPreview.innerHTML = '<p>No items in cart</p>';
        } else {
            cartItemsPreview.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>Rs${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }
    
    if (itemCount) {
        itemCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    if (orderItems) {
        if (cart.length === 0) {
            orderItems.innerHTML = '<p>No items in order</p>';
        } else {
            orderItems.innerHTML = cart.map(item => `
                <div class="order-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-price">Rs${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('');
        }
    }
    
    updateCheckoutTotal();
}

function updateCheckoutTotal(checkoutCart = cart, checkoutPromo = appliedPromo) {
    const subtotal = checkoutCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 150 : 0;
    
    let discountAmount = 0;
    if (checkoutPromo) {
        if (checkoutPromo.type === 'percentage') {
            discountAmount = Math.round(subtotal * (checkoutPromo.discount / 100));
        } else {
            discountAmount = checkoutPromo.discount;
        }
    }
    
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discountedSubtotal * 0.05);
    const total = discountedSubtotal + deliveryFee + tax;

    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('checkout-total');
    const discountElement = document.getElementById('checkout-discount');
    
    if (subtotalElement) subtotalElement.textContent = `Rs ${subtotal}`;
    if (deliveryFeeElement) deliveryFeeElement.textContent = `Rs ${deliveryFee}`;
    if (taxElement) taxElement.textContent = `Rs ${tax}`;
    if (totalElement) totalElement.textContent = total;
    
    if (discountElement) {
        if (discountAmount > 0) {
            discountElement.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Discount (${checkoutPromo.code})</span>
                    <span style="color: #28a745;">- Rs ${discountAmount}</span>
                </div>
            `;
        } else {
            discountElement.innerHTML = '';
        }
    }
}

// ===== CONFIRMATION PAGE FUNCTIONS =====
function displayOrderConfirmation() {
    if (!document.querySelector('.confirmation-container')) {
        return;
    }

    const orderDetails = JSON.parse(localStorage.getItem('tarkaOrderDetails')) || {};
    
    const orderItemsContainer = document.getElementById('confirmation-order-items');
    const subtotalElement = document.getElementById('confirmation-subtotal');
    const deliveryElement = document.getElementById('confirmation-delivery');
    const taxElement = document.getElementById('confirmation-tax');
    const grandTotalElement = document.getElementById('confirmation-grand-total');
    const orderTotalElement = document.getElementById('order-total');
    const deliveryTimeElement = document.getElementById('delivery-time');
    const orderIdElement = document.getElementById('order-id');
    const discountElement = document.getElementById('confirmation-discount');
    
    if (deliveryTimeElement) {
        if (orderDetails.estimatedDelivery) {
            deliveryTimeElement.textContent = orderDetails.estimatedDelivery;
        } else {
            deliveryTimeElement.textContent = '25-35 minutes';
        }
    }
    
    if (orderIdElement) {
        const orderId = getDisplayOrderId(orderDetails);
        orderIdElement.textContent = orderId;
    }
    
    if (orderItemsContainer) {
        const itemsToDisplay = orderDetails.items || [];
        if (itemsToDisplay.length === 0) {
            orderItemsContainer.innerHTML = '<div class="empty-cart">No items in order</div>';
        } else {
            orderItemsContainer.innerHTML = itemsToDisplay.map(item => `
                <div class="confirmation-order-item">
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">Qty: ${item.quantity}</span>
                    </div>
                    <span class="item-price">Rs ${(item.price * item.quantity)}</span>
                </div>
            `).join('');
        }
    }
    
    const items = orderDetails.items || [];
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 150 : 0;
    
    let discountAmount = 0;
    if (orderDetails.discount !== undefined) {
        discountAmount = orderDetails.discount;
    } else if (orderDetails.appliedPromo) {
        const appliedPromo = orderDetails.appliedPromo;
        if (appliedPromo.type === 'percentage') {
            discountAmount = Math.round(subtotal * (appliedPromo.discount / 100));
        } else {
            discountAmount = appliedPromo.discount;
        }
    }
    
    const discountedSubtotal = Math.max(0, subtotal - discountAmount);
    const tax = Math.round(discountedSubtotal * 0.05);
    const grandTotal = discountedSubtotal + deliveryFee + tax;
    
    if (subtotalElement) subtotalElement.textContent = `Rs ${subtotal}`;
    if (deliveryElement) deliveryElement.textContent = `Rs ${deliveryFee}`;
    if (taxElement) taxElement.textContent = `Rs ${tax}`;
    if (grandTotalElement) grandTotalElement.textContent = `Rs ${grandTotal}`;
    if (orderTotalElement) orderTotalElement.textContent = `Rs ${grandTotal}`;
    
    if (discountElement) {
        if (discountAmount > 0) {
            discountElement.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Discount ${orderDetails.appliedPromo ? `(${orderDetails.appliedPromo.code})` : ''}</span>
                    <span style="color: #28a745;">- Rs ${discountAmount}</span>
                </div>
            `;
            discountElement.style.display = 'block';
        } else {
            discountElement.style.display = 'none';
        }
    }
}

function setupDeliveryTime() {
    const asapRadio = document.getElementById('asap');
    const scheduleRadio = document.getElementById('schedule');
    const scheduleTime = document.getElementById('schedule-time');
    
    if (asapRadio && scheduleRadio && scheduleTime) {
        asapRadio.addEventListener('change', function() {
            if (this.checked) {
                scheduleTime.style.display = 'none';
            }
        });
        
        scheduleRadio.addEventListener('change', function() {
            if (this.checked) {
                scheduleTime.style.display = 'block';
            }
        });
        
        asapRadio.checked = true;
        scheduleTime.style.display = 'none';
    }
}

function handleLogin(event) {
    event.preventDefault();
    userLoggedIn = true;
    localStorage.setItem('loginSuccess', 'true');
    window.location.href = 'home.html';
}

// ===== ORDER TRACKING FUNCTIONS =====
function loadOrderFromStorage() {
    let savedOrder = localStorage.getItem('tarkaCurrentOrder');
    
    if (savedOrder) {
        try {
            currentOrder = JSON.parse(savedOrder);
            console.log('✅ Loaded order from localStorage:', currentOrder.orderId);
        } catch (error) {
            console.error('❌ Error parsing order:', error);
            currentOrder = null;
        }
    } else {
        currentOrder = null;
    }
}

function updateTrackingDisplay() {
    const trackingContent = document.getElementById('tracking-content');
    if (!trackingContent) return;

    if (!currentOrder) {
        trackingContent.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; color: var(--text-dark);">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                <h3 style="color: var(--text-dark); margin-bottom: 1rem; font-size: 1.8rem;">No orders yet</h3>
                <p style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 2rem;">
                    Place something delicious from the <a href="menu.html" style="color: var(--primary-orange); text-decoration: none; font-weight: 600;">menu</a> to start tracking!
                </p>
            </div>
        `;
        return;
    }

    if (currentOrder.status === 'delivered') {
        trackingContent.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; color: var(--text-dark);">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
                <h3 style="color: var(--text-dark); margin-bottom: 1rem; font-size: 1.8rem;">Order Delivered Successfully!</h3>
                <p style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 1rem;">
                    Thank you for your order! We hope you enjoyed your meal. 🍽
                </p>
                <p style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 2rem;">
                    Ready for another delicious experience? <a href="menu.html" style="color: var(--primary-orange); text-decoration: none; font-weight: 600;">Place a new order from our menu</a>
                </p>
            </div>
        `;
        
        localStorage.removeItem('tarkaCurrentOrder');
        localStorage.removeItem('tarkaLastOrderDelivered');
        currentOrder = null;
        
        console.log('✅ Order delivered and cleared from localStorage');
        return;
    }

    const steps = [
        { id: 'confirmed', label: 'Order Confirmed', icon: '✅', time: '1:15:28' },
        { id: 'preparing', label: 'Preparing', icon: '👨‍🍳', time: '1:18:17' },
        { id: 'cooking', label: 'Cooking', icon: '🔥', time: '1:20:45' },
        { id: 'ready', label: 'Ready for Delivery', icon: '📦', time: '1:23:12' },
        { id: 'delivered', label: 'Delivered', icon: '🚚', time: '1:25:30' }
    ];

    const progressPercent = ((steps.findIndex(step => step.id === currentOrder.status) + 1) / steps.length) * 100;
    
    const orderIdDisplay = getDisplayOrderId(currentOrder);
    
    trackingContent.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.95); border-radius: 15px; padding: 2rem; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: var(--text-dark); margin: 0;">Order ${orderIdDisplay}</h3>
                <div style="text-align: right;">
                    <p style="color: var(--text-light); margin: 0; font-size: 0.9rem;">Placed</p>
                    <p style="color: var(--text-dark); margin: 0; font-weight: 600;">${currentOrder.timestamp ? new Date(currentOrder.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '1:15:28'}</p>
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <p style="color: var(--text-dark); margin: 0; font-weight: 600;">Last Updated</p>
                <p style="color: var(--primary-orange); margin: 0; font-weight: 600;">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
        </div>

        <div class="tracking-steps">
            ${steps.map(step => `
                <div class="tracking-step">
                    <div class="step-circle ${getStepClass(step.id)}">
                        ${step.icon}
                    </div>
                    <p style="color: var(--text-dark); margin: 0.5rem 0 0.25rem 0; font-weight: 600;">${step.label}</p>
                    <p style="color: var(--text-light); margin: 0; font-size: 0.9rem;">${step.time}</p>
                </div>
            `).join('')}
        </div>

        <div class="progress-bar" style="margin: 2rem auto;">
            <div class="progress" style="width: ${progressPercent}%;"></div>
        </div>

        <div class="tracking-status" style="text-align: center; margin-top: 2rem;">
            <p style="color: var(--text-dark); margin-bottom: 0.5rem; font-size: 1.1rem;">
                ⏱ Estimated Delivery: <strong style="color: var(--primary-orange);">${getEstimatedDeliveryTime()}</strong>
            </p>
            <p style="color: var(--text-light); margin: 0; font-style: italic;">
                ${getStatusMessage(currentOrder.status)}
            </p>
        </div>
    `;
}

function simulateOrderProgress() {
    if (currentOrder && currentOrder.status === 'delivered') {
        updateTrackingDisplay();
        return;
    }
    
    const steps = ['confirmed', 'preparing', 'cooking', 'ready', 'delivered'];
    let currentIndex = steps.indexOf(currentOrder.status);
    
    if (currentIndex === steps.length - 1) {
        updateTrackingDisplay();
        return;
    }

    const interval = setInterval(() => {
        if (!currentOrder) {
            clearInterval(interval);
            return;
        }
        
        if (currentIndex < steps.length - 1) {
            currentIndex++;
            currentOrder.status = steps[currentIndex];
            saveOrderToStorage();
            updateTrackingDisplay();
            
            if (currentOrder.status === 'delivered') {
                clearInterval(interval);
                localStorage.setItem('tarkaLastOrderDelivered', 'true');
                updateTrackingDisplay();
            }
        } else {
            clearInterval(interval);
        }
    }, 5000);
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-orange);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showSignup() {
    showNotification('Signup feature coming soon!');
}

function saveOrderToStorage() {
    localStorage.setItem('tarkaCurrentOrder', JSON.stringify(currentOrder));
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function calculateDiscount() {
    if (!appliedPromo) return 0;
    
    const subtotal = calculateSubtotal();
    if (appliedPromo.type === 'percentage') {
        return Math.round(subtotal * (appliedPromo.discount / 100));
    } else {
        return appliedPromo.discount;
    }
}

function calculateTotal() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const deliveryFee = subtotal > 0 ? 150 : 0;
    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = Math.round(discountedSubtotal * 0.05);
    return discountedSubtotal + deliveryFee + tax;
}

function getStepClass(stepId) {
    if (!currentOrder) return '';
    const steps = ['confirmed', 'preparing', 'cooking', 'ready', 'delivered'];
    const currentStepIndex = steps.indexOf(currentOrder.status);
    const stepIndex = steps.indexOf(stepId);
    
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'active';
    return '';
}

function getEstimatedDeliveryTime() {
    if (!currentOrder) return '30-40 minutes';
    
    const times = {
        'confirmed': '30-40 minutes',
        'preparing': '25-35 minutes',
        'cooking': '20-30 minutes',
        'ready': '10-20 minutes',
        'delivered': 'Delivered'
    };
    
    return times[currentOrder.status] || '30-40 minutes';
}

function getStatusMessage(status) {
    const messages = {
        'confirmed': 'Your order has been confirmed and will be prepared shortly.',
        'preparing': 'Our chefs are preparing your delicious meal with care.',
        'cooking': 'Your food is being cooked to perfection.',
        'ready': 'Your order is ready and will be dispatched soon.',
        'delivered': 'Enjoy your meal! Thank you for choosing TARKA.'
    };
    
    return messages[status] || 'Your order is being processed.';
}

// ===== COMBO ADD TO CART =====
function setupComboButtons() {
    const comboButtons = document.querySelectorAll(".combo-btn");
    
    comboButtons.forEach(button => {
        button.addEventListener("click", () => {
            const comboCard = button.closest(".special-combo");
            if (!comboCard) return;

            const name = comboCard.querySelector("h4").innerText.trim();
            const price = parseInt(
                comboCard.querySelector(".discounted-price")
                    .innerText.replace(/\D/g, "")
            );
            const image = comboCard.querySelector(".combo-image img").src;

            const comboId = "combo-" + name.replace(/\s+/g, "-").toLowerCase();

            const existingItem = cart.find(item => item.id === comboId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: comboId,
                    name,
                    price,
                    image,
                    quantity: 1,
                    category: "combo"
                });
            }

            saveCartToStorage();
            updateCartCount();
            updateCartDisplay();

            showNotification(`${name} added to cart`);
        });
    });
}

// ===== CONTRAST TOGGLE =====
function setupContrastToggle() {
    const contrastBtn = document.getElementById('contrastBtn');
    if (contrastBtn) {
        contrastBtn.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHighContrast);
        });
    }
}

// ===== DEBUG ORDER IDS =====
function debugOrderIds() {
    console.log('=== ORDER ID DEBUG ===');
    console.log('1. Generated Order ID from function:', generateOrderId());
    
    const orders = JSON.parse(localStorage.getItem('tarkaOrders') || '[]');
    console.log('2. Orders in localStorage:', orders.length);
    
    orders.forEach((order, index) => {
        console.log(`Order ${index + 1}:`, {
            orderId: order.orderId,
            id: order.id,
            total: order.total,
            date: order.timestamp || order.date
        });
    });
    
    const currentOrder = JSON.parse(localStorage.getItem('tarkaCurrentOrder') || '{}');
    console.log('3. Current tracking order:', {
        orderId: currentOrder.orderId,
        id: currentOrder.id
    });
    
    console.log('=== END DEBUG ===');
}

// ===== PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    convertExistingOrdersToTKA();
    loadFavoritesFromStorage();
    loadCartFromStorage();
    loadOrderFromStorage();
    
    if (localStorage.getItem('loginSuccess') === 'true') {
        showNotification('Login successful!');
        localStorage.removeItem('loginSuccess');
    }
    
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'menu.html':
            loadFavoritesFromStorage();
            const category = getUrlParameter('category');
            loadMenu(category);
            
            const urlParams = new URLSearchParams(window.location.search);
            const itemIdFromUrl = urlParams.get('itemId');
            if (itemIdFromUrl) {
                setTimeout(() => {
                    openItemDetail(parseInt(itemIdFromUrl));
                }, 500);
            }
            break;
            
        case 'favourites.html':
            loadFavoritesFromStorage();
            displayFavorites();
            break;
            
        case 'cart.html':
            updateCartDisplay();
            break;
            
        case 'checkout.html':
            const savedCheckoutState = localStorage.getItem('tarkaCheckoutState');
            if (savedCheckoutState) {
                const checkoutState = JSON.parse(savedCheckoutState);
                cart = checkoutState.cart;
                appliedPromo = checkoutState.appliedPromo;
            }
            updateCheckoutDisplay();
            setupDeliveryTime();
            
            setTimeout(() => {
                autoFillUserInfo();
            }, 100);
            break;
            
        case 'tracking.html':
            console.log('=== TRACKING PAGE LOADED ===');
            
            loadOrderFromStorage();
            
            console.log('Current order loaded:', currentOrder);
            console.log('tarkaCurrentOrder in storage:', localStorage.getItem('tarkaCurrentOrder'));
            
            if (!currentOrder && localStorage.getItem('tarkaLastOrderDelivered')) {
                localStorage.removeItem('tarkaLastOrderDelivered');
            }
            
            updateTrackingDisplay();
            
            if (currentOrder && currentOrder.status !== 'delivered') {
                console.log('Starting order tracking simulation');
                simulateOrderProgress();
            }
            break;
        
        case 'confirmation.html':
            displayOrderConfirmation();
            if (currentOrder && currentOrder.status !== 'delivered') {
                setTimeout(() => {
                    simulateOrderProgress();
                }, 2000);
            }
            break;
            
        default:
            loadFavoritesFromStorage();
            loadMenu();
            setupComboButtons();
            break;
    }
    
    setupContrastToggle();
    
    const isHighContrast = localStorage.getItem('highContrast') === 'true';
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    }
    
    document.querySelectorAll('.category-card').forEach(card => {
        const ratingValue = parseFloat(card.getAttribute('data-rating')) || 0;
        const ratingContainer = card.querySelector('.rating');
        
        if (ratingContainer) {
            const fullStars = Math.floor(ratingValue);
            const halfStar = ratingValue % 1 >= 0.5;
            
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.classList.add('fa-solid', 'fa-star');
                
                if (i < fullStars) {
                    star.classList.add('full-star');
                } else if (i === fullStars && halfStar) {
                    star.classList.add('half-star');
                }
                
                ratingContainer.appendChild(star);
            }
        }
    });
    
    const focusable = Array.from(document.querySelectorAll('input, select, textarea, button, a'));
    if (focusable.length === 0) return;

    let index = 0;
    if (focusable.length > 0) focusable[index].focus();

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                index = (index + 1) % focusable.length;
                focusable[index].focus();
                break;

            case 'ArrowUp':
                e.preventDefault();
                index = (index - 1 + focusable.length) % focusable.length;
                focusable[index].focus();
                break;

            case 'Enter':
                if(document.activeElement.tagName === 'BUTTON' || document.activeElement.tagName === 'A') {
                    document.activeElement.click();
                }
                break;

            case 'Escape':
                window.history.back();
                break;
        }
    });
});
// ===== DATABASE CART FUNCTIONS =====

async function syncCartToDatabase() {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.log('⚠️ No userId found for cart sync');
            return false;
        }

        // Get cart from localStorage
        const cartItems = JSON.parse(localStorage.getItem('tarkaCart') || '[]');
        
        if (cartItems.length === 0) {
            // If cart is empty, clear it from database
            try {
                await fetch(`http://localhost:3000/api/cart/clear/${userId}`, {
                    method: 'DELETE'
                });
                console.log('✅ Cleared empty cart from database');
            } catch (error) {
                console.log('⚠️ Could not clear empty cart from database');
            }
            return true;
        }

        // Transform cart items to database format
        const dbCartItems = cartItems.map(item => ({
            product_id: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image || '',
            total: item.price * item.quantity
        }));

        // Send entire cart to database
        const response = await fetch(`http://localhost:3000/api/cart/sync/${userId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: dbCartItems })
        });

        if (response.ok) {
            console.log('✅ Cart synced to database');
            return true;
        } else {
            console.error('❌ Cart sync failed:', await response.text());
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error syncing cart to database:', error);
        return false;
    }
}

// Add this endpoint to your server.js if it doesn't exist
/*
app.post("/api/cart/sync/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items } = req.body;

        // Find or create cart
        let cart = await Cart.findOne({ user_id: userId });
        
        if (!cart) {
            cart = new Cart({
                user_id: userId,
                items: items
            });
        } else {
            cart.items = items;
            cart.updated_at = new Date();
        }

        await cart.save();
        res.json({ success: true, cart });
        
    } catch (err) {
        console.error("Cart sync error:", err);
        res.status(500).json({ success: false, message: "Failed to sync cart" });
    }
});
*/

// ===== UPDATED: addToCart with proper database saving =====
async function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return alert("Item not found!");

    const userId = localStorage.getItem('userId'); 
    if (!userId) {
        alert("Please log in to add items to your cart.");
        window.location.href = 'login.html';
        return;
    }

    // First update local cart
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ 
            ...item, 
            quantity: 1,
            product_id: item.id.toString() 
        });
    }
    
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();

    // Prepare payload for database
    const payload = {
        user_id: userId,
        item: {
            product_id: item.id.toString(),
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            total: item.price
        }
    };
    
    try {
        const response = await fetch("http://localhost:3000/api/cart/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            console.log('✅ Item added to database cart');
        } else {
            console.warn('⚠️ Database cart update failed, but item added locally');
        }
    } catch (err) {
        console.error('❌ Database error:', err);
        // Item already added to local cart, continue
    }
    
    showNotification(`${item.name} added to cart!`);
}

// ===== UPDATED: removeFromCart with database sync =====
async function removeFromCart(itemId) {
    const userId = localStorage.getItem('userId');
    
    // Remove from local cart first
    cart = cart.filter(item => item.id !== itemId);
    updateCartCount();
    saveCartToStorage();
    updateCartDisplay();
    
    // Remove from database if user is logged in
    if (userId) {
        try {
            const response = await fetch("http://localhost:3000/api/cart/remove", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: itemId.toString()
                })
            });
            
            if (response.ok) {
                console.log('✅ Item removed from database cart');
            }
        } catch (error) {
            console.error('❌ Error removing from database cart:', error);
        }
    }
    
    showNotification('Item removed from cart');
}

// ===== UPDATED: updateQuantity with database sync =====
async function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            await removeFromCart(itemId);
        } else {
            updateCartCount();
            saveCartToStorage();
            updateCartDisplay();
            
            // Update in database
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    // First remove, then add with new quantity
                    await fetch("http://localhost:3000/api/cart/remove", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            user_id: userId,
                            product_id: itemId.toString()
                        })
                    });
                    
                    const payload = {
                        user_id: userId,
                        item: {
                            product_id: item.id.toString(),
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                            total: item.price * item.quantity
                        }
                    };
                    
                    await fetch("http://localhost:3000/api/cart/add", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(payload)
                    });
                    
                } catch (error) {
                    console.error('❌ Error updating quantity in database:', error);
                }
            }
        }
    }
}

// ===== UPDATED: loadCartFromStorage with database priority =====
async function loadCartFromStorage() {
    try {
        const userId = localStorage.getItem('userId');
        
        // Always try to load from database first if user is logged in
        if (userId) {
            try {
                console.log('🔄 Loading cart from database for user:', userId);
                const response = await fetch(`http://localhost:3000/api/cart/${userId}`);
                
                if (response.ok) {
                    const result = await response.json();
                    
                    if (result.success && result.cart && result.cart.items) {
                        // Transform database cart items to local format
                        cart = result.cart.items.map(cartItem => ({
                            id: parseInt(cartItem.product_id),
                            name: cartItem.name,
                            price: cartItem.price,
                            quantity: cartItem.quantity,
                            image: cartItem.image,
                            category: menuItems.find(m => m.id === parseInt(cartItem.product_id))?.category || 'unknown'
                        }));
                        
                        console.log('✅ Cart loaded from database:', cart.length, 'items');
                        
                        // Save to localStorage as backup
                        saveCartToStorage();
                        updateCartCount();
                        return;
                    }
                }
            } catch (dbError) {
                console.log('⚠️ Database cart load failed, using localStorage:', dbError);
            }
        }
        
        // Fallback to localStorage
        const savedCart = localStorage.getItem('tarkaCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
            console.log('📦 Cart loaded from localStorage:', cart.length, 'items');
        }
        
    } catch (error) {
        console.error('❌ Error loading cart:', error);
        cart = [];
    }
}

// ===== UPDATED: Enhanced handleCheckout for database saving =====
async function handleCheckout(event) {
    event.preventDefault();
    
    console.log('🚀 CHECKOUT STARTED - Database Integration');
    
    // Disable button to prevent double submission
    const submitBtn = event.target.querySelector('.checkout-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }
    
    // ===== 1. GET FORM VALUES =====
    const fullName = document.getElementById('fullName')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const address = document.getElementById('address')?.value.trim() || '';
    const deliveryTime = document.querySelector('input[name="deliveryTime"]:checked')?.value || 'asap';
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cash';
    const instructions = document.getElementById('delivery-instructions')?.value.trim() || '';
    
    // ===== 2. VALIDATE FORM =====
    if (!fullName || !phone || !address) {
        alert('Please fill in all required fields!');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Place Order';
        }
        return;
    }
    
    if (!/^\d{11}$/.test(phone)) {
        alert('Please enter a valid 11-digit phone number!');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Place Order';
        }
        return;
    }
    
    // ===== 3. GET USER INFO =====
    const user_id = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!user_id || !userEmail) {
        alert('You must be logged in to place an order!');
        window.location.href = 'login.html';
        return;
    }
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Place Order';
        }
        return;
    }
    
    // ===== 4. CALCULATE TOTALS =====
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 150 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total_amount = subtotal + deliveryFee + tax;
    
    // ===== 5. GENERATE ORDER ID =====
    function generateOrderId() {
        const randomNumber = Math.floor(Math.random() * 90000) + 10000;
        return `#TKA${randomNumber}`;
    }
    
    const orderId = generateOrderId();
    const estimatedTime = deliveryTime === 'asap' ? '25-35 minutes' : '35-45 minutes';
    
    // ===== 6. PREPARE ORDER ITEMS FOR DATABASE =====
    const orderItems = cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
    }));
    
    // ===== 7. SAVE TO DATABASE VIA /api/checkout =====
    console.log('📤 Saving order to database via /api/checkout');
    
    const orderData = {
        user_id: user_id,
        user_email: userEmail,
        items: orderItems,
        total_amount: total_amount,
        delivery_address: address,
        delivery_time: deliveryTime,
        payment_method: paymentMethod,
        notes: instructions,
        customer_name: fullName,
        phone: phone
    };
    
    console.log('📦 Order data for database:', orderData);
    
    try {
        const checkoutResponse = await fetch('http://localhost:3000/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        
        const checkoutResult = await checkoutResponse.json();
        console.log('📥 Checkout API response:', checkoutResult);
        
        if (!checkoutResponse.ok || !checkoutResult.success) {
            console.warn('⚠️ /api/checkout failed, trying /api/orders');
            
            // Try alternative endpoint
            const orderResponse = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...orderData,
                    user_name: fullName
                })
            });
            
            const orderResult = await orderResponse.json();
            console.log('📥 Orders API response:', orderResult);
            
            if (!orderResponse.ok || !orderResult.success) {
                throw new Error('Both order endpoints failed');
            }
        }
        
        console.log('✅ Order saved to database successfully');
        
    } catch (error) {
        console.error('❌ Database save error:', error);
        // Continue anyway - we'll save to localStorage
    }
    
    // ===== 8. SAVE TO LOCALSTORAGE FOR TRACKING =====
    const trackingOrderData = {
        orderId: orderId,
        id: orderId,
        email: userEmail,
        items: JSON.parse(JSON.stringify(cart)),
        total: parseFloat(total_amount.toFixed(2)),
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee: parseFloat(deliveryFee.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        fullName: fullName,
        phone: phone,
        address: address,
        deliveryTime: deliveryTime,
        estimatedDelivery: estimatedTime,
        paymentMethod: paymentMethod,
        instructions: instructions || '',
        status: 'confirmed',
        timestamp: new Date().toISOString(),
        appliedPromo: appliedPromo
    };
    
    // Save for tracking
    localStorage.setItem('tarkaCurrentOrder', JSON.stringify(trackingOrderData));
    localStorage.setItem('tarkaOrderDetails', JSON.stringify(trackingOrderData));
    
    // Save to orders history
    let orders = JSON.parse(localStorage.getItem('tarkaOrders') || '[]');
    orders.push(trackingOrderData);
    localStorage.setItem('tarkaOrders', JSON.stringify(orders));
    
    console.log('💾 Order saved to localStorage for tracking');
    
    // ===== 9. SAVE PROFILE INFO =====
    if (document.getElementById('save-address')?.checked) {
        const savedProfile = JSON.parse(localStorage.getItem('tarkaProfile') || '{}');
        savedProfile[userEmail] = {
            ...(savedProfile[userEmail] || {}),
            name: fullName,
            phone: phone,
            address: address,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('tarkaProfile', JSON.stringify(savedProfile));
        
        // Also update database profile
        try {
            await fetch(`http://localhost:3000/api/user/${user_id}/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: fullName,
                    phone: phone,
                    address: address
                })
            });
            console.log('✅ Profile updated in database');
        } catch (error) {
            console.error('❌ Error updating profile in database:', error);
        }
    }
    
    // ===== 10. CLEAR CART FROM DATABASE AND LOCALSTORAGE =====
    try {
        // Clear from database
        await fetch(`http://localhost:3000/api/cart/clear/${user_id}`, {
            method: 'DELETE'
        });
        console.log('✅ Cart cleared from database');
    } catch (error) {
        console.error('❌ Error clearing cart from database:', error);
    }
    
    // Clear from localStorage
    cart = [];
    appliedPromo = null;
    saveCartToStorage();
    updateCartCount();
    updateCartDisplay();
    
    console.log('🛒 Cart cleared from localStorage');
    
    // ===== 11. REDIRECT TO CONFIRMATION =====
    console.log('🎉 Checkout completed! Redirecting to confirmation...');
    
    setTimeout(() => {
        window.location.href = 'confirmation.html';
    }, 500);
}

// ===== ADD THIS FUNCTION TO YOUR server.js =====
/*
// Add this endpoint to server.js for cart sync
app.post("/api/cart/sync/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID required" });
        }

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = await Cart.findOne({ user_id: userId });
        
        if (!cart) {
            cart = new Cart({
                user_id: userId,
                items: items || []
            });
        } else {
            cart.items = items || [];
            cart.updated_at = new Date();
        }

        await cart.save();
        res.json({ success: true, cart: cart });
        
    } catch (err) {
        console.error("Cart sync error:", err);
        res.status(500).json({ success: false, message: "Failed to sync cart", error: err.message });
    }
});
*/
// ===== ADD THESE ENDPOINTS TO YOUR server.js =====

// --- SYNC CART ENDPOINT ---
app.post("/api/cart/sync/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID required" });
        }

        // Validate user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cart = await Cart.findOne({ user_id: userId });
        
        if (!cart) {
            cart = new Cart({
                user_id: userId,
                items: items || []
            });
        } else {
            cart.items = items || [];
            cart.updated_at = new Date();
        }

        await cart.save();
        res.json({ success: true, cart: cart });
        
    } catch (err) {
        console.error("Cart sync error:", err);
        res.status(500).json({ success: false, message: "Failed to sync cart", error: err.message });
    }
});

// --- TEST ENDPOINT FOR DEBUGGING ---
app.get("/api/test-db", async (req, res) => {
    try {
        const users = await User.countDocuments();
        const carts = await Cart.countDocuments();
        const orders = await Order.countDocuments();
        const profiles = await UserProfile.countDocuments();
        
        res.json({
            success: true,
            database: mongoose.connection.name,
            collections: {
                users: users,
                carts: carts,
                orders: orders,
                profiles: profiles
            },
            message: "Database connection successful"
        });
    } catch (err) {
        res.json({
            success: false,
            error: err.message,
            message: "Database connection failed"
        });
    }
});

// --- DEBUG: GET ALL CARTS ---
app.get("/api/debug/carts", async (req, res) => {
    try {
        const carts = await Cart.find({}).populate('user_id', 'email');
        
        const formattedCarts = carts.map(cart => ({
            cart_id: cart._id,
            user_id: cart.user_id,
            user_email: cart.user_id?.email || 'Unknown',
            items_count: cart.items.length,
            items: cart.items.map(item => ({
                product_id: item.product_id,
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            updated_at: cart.updated_at
        }));
        
        res.json({
            success: true,
            total_carts: carts.length,
            carts: formattedCarts
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch carts", error: err.message });
    }
});

// --- DEBUG: GET ALL ORDERS ---
app.get("/api/debug/orders", async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ created_at: -1 }).limit(50);
        
        res.json({
            success: true,
            total_orders: await Order.countDocuments(),
            recent_orders: orders.map(order => ({
                _id: order._id,
                order_id: order._id.toString().slice(-6), // Short ID for display
                user_id: order.user_id,
                user_email: order.user_email,
                user_name: order.user_name || "Not set",
                items_count: order.items.length,
                total_amount: order.total_amount,
                status: order.status,
                created_at: order.created_at,
                delivery_address: order.delivery_address
            }))
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch orders", error: err.message });
    }
});

// --- FIX: ENHANCED CHECKOUT ENDPOINT ---
app.post("/api/checkout", async (req, res) => {
    console.log("🛒 CHECKOUT REQUEST RECEIVED:", req.body);
    
    try {
        const {
            user_id,
            user_email,
            items,
            total_amount,
            delivery_address,
            delivery_time,
            payment_method,
            notes,
            customer_name,
            phone
        } = req.body;

        // Validate required fields
        if (!user_id || !user_email || !items || !total_amount || !delivery_address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields",
                received: req.body 
            });
        }

        // Get user's name from profile if not provided
        let user_name = customer_name || "";
        if (!user_name) {
            try {
                const userProfile = await UserProfile.findOne({ user_id: user_id });
                user_name = userProfile ? userProfile.name : "";
                console.log(`👤 Found user name from profile: ${user_name}`);
            } catch (err) {
                console.log("⚠️ Could not fetch user name from profile:", err);
            }
        }

        // Create order in database
        const order = new Order({
            user_id: user_id,
            user_email: user_email,
            user_name: user_name,
            items: items,
            total_amount: total_amount,
            delivery_address: delivery_address,
            delivery_time: delivery_time || "ASAP",
            payment_method: payment_method || "Cash on Delivery",
            notes: notes || "",
            status: 'pending'
        });

        await order.save();
        
        console.log(`✅ Order created in database: ${order._id}`);
        console.log(`📦 Order saved with name: ${user_name || 'No name'}`);

        // Also create Checkout record for redundancy
        const checkout = new Checkout({
            user_id: user_id,
            user_email: user_email,
            items: items,
            total_amount: total_amount,
            delivery_address: delivery_address,
            delivery_time: delivery_time || "ASAP",
            payment_method: payment_method || "Cash on Delivery",
            notes: notes || ""
        });
        await checkout.save();

        // Clear user's cart
        await Cart.findOneAndDelete({ user_id: user_id });

        res.json({
            success: true,
            message: "Order created successfully",
            order_id: order._id,
            order: {
                _id: order._id,
                user_name: user_name,
                total_amount: total_amount,
                status: order.status
            }
        });

    } catch (err) {
        console.error("❌ Checkout error:", err);
        res.status(500).json({ 
            success: false, 
            message: "Database error during checkout",
            error: err.message 
        });
    }
});

// --- FIX: ENHANCED ORDERS ENDPOINT ---
app.post("/api/orders", async (req, res) => {
    console.log("📝 ORDERS API REQUEST:", req.body);
    
    try {
        const {
            user_id,
            user_email,
            user_name,
            items,
            total_amount,
            delivery_address,
            delivery_time,
            payment_method,
            notes
        } = req.body;

        // Validate required fields
        if (!user_id || !user_email || !items || !total_amount || !delivery_address) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields",
                received: req.body 
            });
        }

        // Get user name from profile if not provided
        let final_user_name = user_name || "";
        if (!final_user_name) {
            try {
                const userProfile = await UserProfile.findOne({ user_id: user_id });
                final_user_name = userProfile ? userProfile.name : "";
                console.log(`👤 Orders API: Found user name from profile: ${final_user_name}`);
            } catch (err) {
                console.log("⚠️ Orders API: Could not fetch user name:", err);
            }
        }

        // Create order
        const order = new Order({
            user_id: user_id,
            user_email: user_email,
            user_name: final_user_name,
            items: items,
            total_amount: total_amount,
            delivery_address: delivery_address,
            delivery_time: delivery_time || "ASAP",
            payment_method: payment_method || "Cash on Delivery",
            notes: notes || "",
            status: 'pending'
        });

        await order.save();
        
        console.log(`✅ Order created via /api/orders: ${order._id}`);

        res.json({
            success: true,
            message: "Order created successfully",
            order_id: order._id,
            order: order
        });

    } catch (err) {
        console.error("❌ Orders API error:", err);
        res.status(500).json({ 
            success: false, 
            message: "Database error",
            error: err.message 
        });
    }
});