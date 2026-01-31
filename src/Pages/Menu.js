import { useState } from "react"

// TypeScript types removed for JS compatibility
import "../css/Menu.css"

const Menu = () => {
  // Sample menu data - replace with your actual menu items
  const menuData = {
    "Popular": [
      {
        id: 1,
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces",
        price: 299,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        category: "Popular",
        isVeg: false,
        rating: 4.8
      },
      {
        id: 2,
        name: "Paneer Tikka",
        description: "Grilled cottage cheese marinated in spices",
        price: 249,
        image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617",
        category: "Popular",
        isVeg: true,
        rating: 4.7
      },
      {
        id: 3,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 349,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
        category: "Popular",
        isVeg: true,
        rating: 4.6
      },
      {
        id: 4,
        name: "Chicken Biryani",
        description: "Fragrant basmati rice with spiced chicken",
        price: 279,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
        category: "Popular",
        isVeg: false,
        rating: 4.9
      }
    ],
    "Starters": [
      {
        id: 5,
        name: "Spring Rolls",
        description: "Crispy vegetable rolls with sweet chili sauce",
        price: 149,
        image: "https://images.unsplash.com/photo-1620452485617-66ca6fcccc9e",
        category: "Starters",
        isVeg: true,
        rating: 4.4
      },
      {
        id: 6,
        name: "Chicken Wings",
        description: "Spicy buffalo wings with ranch dip",
        price: 199,
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7",
        category: "Starters",
        isVeg: false,
        rating: 4.5
      },
      {
        id: 7,
        name: "Crispy Corn",
        description: "Golden fried corn kernels with spices",
        price: 129,
        image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14",
        category: "Starters",
        isVeg: true,
        rating: 4.3
      },
      {
        id: 8,
        name: "Garlic Bread",
        description: "Toasted bread with garlic butter and herbs",
        price: 99,
        image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f",
        category: "Starters",
        isVeg: true,
        rating: 4.2
      }
    ],
    "Main Course": [
      {
        id: 9,
        name: "Dal Makhani",
        description: "Creamy black lentils slow-cooked with butter",
        price: 219,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d",
        category: "Main Course",
        isVeg: true,
        rating: 4.7
      },
      {
        id: 10,
        name: "Fish Curry",
        description: "Fresh fish in tangy coconut curry",
        price: 329,
        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb",
        category: "Main Course",
        isVeg: false,
        rating: 4.6
      },
      {
        id: 11,
        name: "Palak Paneer",
        description: "Cottage cheese in creamy spinach gravy",
        price: 229,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        category: "Main Course",
        isVeg: true,
        rating: 4.5
      },
      {
        id: 12,
        name: "Mutton Rogan Josh",
        description: "Aromatic Kashmiri mutton curry",
        price: 399,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
        category: "Main Course",
        isVeg: false,
        rating: 4.8
      }
    ],
    "Breads & Rice": [
      {
        id: 13,
        name: "Butter Naan",
        description: "Soft tandoori bread brushed with butter",
        price: 49,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e",
        category: "Breads & Rice",
        isVeg: true,
        rating: 4.6
      },
      {
        id: 14,
        name: "Jeera Rice",
        description: "Basmati rice tempered with cumin seeds",
        price: 129,
        image: "https://images.unsplash.com/photo-1596797038530-2c107229654b",
        category: "Breads & Rice",
        isVeg: true,
        rating: 4.4
      },
      {
        id: 15,
        name: "Garlic Naan",
        description: "Tandoori bread topped with garlic",
        price: 59,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        category: "Breads & Rice",
        isVeg: true,
        rating: 4.7
      },
      {
        id: 16,
        name: "Veg Fried Rice",
        description: "Wok-tossed rice with vegetables",
        price: 169,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
        category: "Breads & Rice",
        isVeg: true,
        rating: 4.5
      }
    ],
    "Desserts": [
      {
        id: 17,
        name: "Gulab Jamun",
        description: "Soft milk dumplings in rose-flavored syrup",
        price: 79,
        image: "https://images.unsplash.com/photo-1589119908995-c6b5de3f3d48",
        category: "Desserts",
        isVeg: true,
        rating: 4.8
      },
      {
        id: 18,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center",
        price: 149,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51",
        category: "Desserts",
        isVeg: true,
        rating: 4.9
      },
      {
        id: 19,
        name: "Ice Cream Sundae",
        description: "Vanilla ice cream with chocolate sauce and nuts",
        price: 129,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
        category: "Desserts",
        isVeg: true,
        rating: 4.6
      },
      {
        id: 20,
        name: "Rasmalai",
        description: "Soft cheese patties in sweet milk",
        price: 99,
        image: "https://images.unsplash.com/photo-1606471191009-63d2e24c422f",
        category: "Desserts",
        isVeg: true,
        rating: 4.7
      }
    ],
    "Beverages": [
      {
        id: 21,
        name: "Fresh Lime Soda",
        description: "Refreshing lemon soda with mint",
        price: 59,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
        category: "Beverages",
        isVeg: true,
        rating: 4.5
      },
      {
        id: 22,
        name: "Mango Lassi",
        description: "Sweet yogurt drink with mango pulp",
        price: 79,
        image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8",
        category: "Beverages",
        isVeg: true,
        rating: 4.7
      },
      {
        id: 23,
        name: "Masala Chai",
        description: "Traditional Indian spiced tea",
        price: 39,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f",
        category: "Beverages",
        isVeg: true,
        rating: 4.6
      },
      {
        id: 24,
        name: "Cold Coffee",
        description: "Chilled coffee with ice cream",
        price: 99,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735",
        category: "Beverages",
        isVeg: true,
        rating: 4.8
      }
    ]
  }

  const [selectedCategory, setSelectedCategory] = useState("Popular")
  const [cart, setCart] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const categories = Object.keys(menuData)

  // Filter items based on search query
  const getFilteredItems = () => {
    const items = menuData[selectedCategory]
    if (!searchQuery) return items
    return items.filter((item) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <div className="menu-page">
      
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-title">Our Menu</h1>
          <p className="menu-subtitle">
            Explore our delicious selection of dishes crafted with love
          </p>
          
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="menu-content">
        <div className="menu-container">
          
          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="menu-items-grid">
            {getFilteredItems().map(item => (
              <div key={item.id} className="menu-item-card">
                
                {/* Item Image */}
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <div className="item-badge">
                    {item.isVeg ? (
                      <span className="veg-badge">🟢 Veg</span>
                    ) : (
                      <span className="non-veg-badge">🔴 Non-Veg</span>
                    )}
                  </div>
                </div>

                {/* Item Details */}
                <div className="item-details">
                  <div className="item-header">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-rating">
                      ⭐ {item.rating}
                    </div>
                  </div>
                  
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-footer">
                    <span className="item-price">₹{item.price}</span>
                    <button 
                      className="add-btn"
                      onClick={() => addToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* No Results Message */}
          {getFilteredItems().length === 0 && (
            <div className="no-results">
              <h3>No items found</h3>
              <p>Try searching for something else</p>
            </div>
          )}

        </div>
      </section>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="floating-cart">
          <a href="/cart" className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-info">
              <span className="cart-count">{getCartItemCount()} items</span>
              <span className="cart-total">₹{getCartTotal()}</span>
            </span>
            <span className="view-cart">View Cart</span>
          </a>
        </div>
      )}

    </div>
  )
}

export default Menu