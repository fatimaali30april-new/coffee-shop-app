const API_URL = '/api/products';

// --- 1. NAVBAR & FOOTER RENDERING ---
function renderNavbar() {
    const nav = document.getElementById('nav-container');
    if (!nav) return;
    nav.innerHTML = `
        <nav class="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-50 px-6 py-4">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <a href="index.html" class="flex items-center gap-3">
                    <div class="bg-orange-800 text-white p-2 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
                    </div>
                    <span class="text-2xl font-bold text-orange-900 tracking-tighter">Bean & Brew</span>
                </a>
                
                <div class="hidden md:flex space-x-8 font-medium text-gray-700">
                    <a href="index.html" class="hover:text-orange-600 transition">Home</a>
                    <a href="products.html" class="hover:text-orange-600 transition">Menu</a>
                    <a href="contact.html" class="hover:text-orange-600 transition">Contact</a>
                    <a href="admin.html" class="text-orange-800 font-bold border-l pl-4 border-orange-100">Admin</a>
                </div>
            </div>
        </nav>
    `;
}
function renderFooter() {
    const footer = document.getElementById('footer-container');
    if (!footer) return;
    footer.innerHTML = `
        <footer class="bg-orange-900 text-orange-50 py-12 px-6 mt-20">
            <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 class="text-xl font-bold mb-4">Bean & Brew</h3>
                    <p class="opacity-70">Serving the finest artisanal coffee and pastries since 2026.</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Quick Links</h4>
                    <ul class="space-y-2 opacity-70">
                        <li><a href="products.html">Menu</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Newsletter</h4>
                    <input type="email" placeholder="Your email" class="bg-orange-800 border-none p-3 rounded-lg w-full text-white placeholder-orange-300">
                </div>
            </div>
            <div class="text-center mt-12 pt-8 border-t border-orange-800 opacity-50">
                &copy; 2026 Bean & Brew Coffee House. All rights reserved.
            </div>
        </footer>
    `;
}

// --- 2. MENU / PRODUCTS LOGIC (READ) ---
async function loadProducts(containerId, category = 'All') {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const res = await fetch(API_URL);
        let products = await res.json();

        if (category !== 'All') {
            products = products.filter(p => p.category === category);
        }

        container.innerHTML = products.map(p => `
            <div class="bg-white rounded-[2.5rem] p-4 shadow-sm border border-orange-50 hover:shadow-xl transition-all group">
                <div class="relative overflow-hidden rounded-[2rem] h-64 mb-6">
                    <img src="${p.image}" alt="${p.name}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full font-bold text-orange-900 shadow-sm">
                        $${p.price.toFixed(2)}
                    </div>
                </div>
                <div class="px-2 pb-4">
                    <span class="text-xs font-bold text-orange-400 uppercase tracking-widest">${p.category}</span>
                    <h3 class="text-xl font-bold text-gray-900 mt-1 mb-4">${p.name}</h3>
                    <button onclick="addToCart(${p.id}, '${p.name}', ${p.price})" class="w-full bg-orange-50 text-orange-900 py-3 rounded-2xl font-bold hover:bg-orange-900 hover:text-white transition-colors">
                        Add to Order
                    </button>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error("Error loading products:", err);
    }
}

function filterMenu(cat) {
    loadProducts('full-menu', cat);
}

// --- 3. CART SYSTEM (LOCALSTORAGE) ---
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('coffee_cart')) || [];
    cart.push({ id, name, price });
    localStorage.setItem('coffee_cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
}

// --- 4. ADMIN PANEL: CRUD OPERATIONS ---

// READ: Load Table
async function loadAdminProducts() {
    const tableBody = document.getElementById('admin-table-body');
    if (!tableBody) return;

    const res = await fetch(API_URL);
    const data = await res.json();

    tableBody.innerHTML = data.map(p => `
        <tr class="border-b border-orange-50 hover:bg-orange-50/50 transition">
            <td class="p-5 flex items-center space-x-4">
                <img src="${p.image}" class="w-12 h-12 rounded-xl object-cover">
                <span class="font-bold text-gray-800">${p.name}</span>
            </td>
            <td class="p-5 text-gray-600">${p.category}</td>
            <td class="p-5 font-bold text-orange-800">$${p.price.toFixed(2)}</td>
            <td class="p-5 text-center space-x-2">
                <button onclick="editProduct(${p.id}, '${p.name}', '${p.category}', ${p.price}, '${p.image}')" 
                    class="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition font-bold">Edit</button>
                <button onclick="deleteProduct(${p.id})" 
                    class="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg transition font-bold">Delete</button>
            </td>
        </tr>
    `).join('');
}

// DELETE
async function deleteProduct(id) {
    if (confirm("Kiya aap waqai is item ko delete karna chahte hain?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadAdminProducts();
    }
}

// UPDATE (Step 1: Fill Form)
function editProduct(id, name, category, price, image) {
    document.getElementById('prod-id').value = id;
    document.getElementById('name').value = name;
    document.getElementById('category').value = category;
    document.getElementById('price').value = price;
    document.getElementById('image').value = image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// CREATE & UPDATE (Step 2: Submit)
const productForm = document.getElementById('product-form');
if (productForm) {
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('prod-id').value;
        const productData = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            image: document.getElementById('image').value
        };

        if (id) {
            // PUT request for Edit
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            // POST request for Add
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }

        e.target.reset();
        document.getElementById('prod-id').value = "";
        loadAdminProducts();
        alert("Inventory Updated!");
    });
}

// --- 5. INITIALIZE ---
window.onload = () => {
    renderNavbar();
    renderFooter();
    
    // Check which page we are on
    if (document.getElementById('full-menu')) {
        loadProducts('full-menu');
    }
    if (document.getElementById('admin-table-body')) {
        loadAdminProducts();
    }
};
