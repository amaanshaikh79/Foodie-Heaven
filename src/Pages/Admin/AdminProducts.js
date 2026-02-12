import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, isLoggedIn, getStoredUser } from "../../utils/api.js"
import AdminLayout from "./AdminLayout.js"
import "../../css/Admin.css"

const AdminProducts = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: "", price: "", category: "Popular", isVeg: true, stock: 50, unit: "plate", image: "" })
    const [imageFile, setImageFile] = useState(null)
    const [saving, setSaving] = useState(false)
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (!isLoggedIn()) { navigate("/login"); return }
        const user = getStoredUser()
        if (!user || user.role !== "admin") { navigate("/"); return }
        fetchProducts()
    }, [navigate])

    const fetchProducts = async () => {
        try {
            const data = await adminGetProducts({ search })
            setProducts(data.products)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    useEffect(() => {
        const timer = setTimeout(() => { setLoading(true); fetchProducts() }, 300)
        return () => clearTimeout(timer)
    }, [search])

    const resetForm = () => {
        setFormData({ name: "", description: "", price: "", category: "Popular", isVeg: true, stock: 50, unit: "plate", image: "" })
        setImageFile(null)
        setEditingProduct(null)
        setShowForm(false)
    }

    const handleEdit = (product) => {
        setFormData({
            name: product.name, description: product.description, price: product.price,
            category: product.category, isVeg: product.isVeg, stock: product.stock,
            unit: product.unit, image: product.image
        })
        setEditingProduct(product)
        setShowForm(true)
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            const fd = new FormData()
            fd.append("name", formData.name)
            fd.append("description", formData.description)
            fd.append("price", formData.price)
            fd.append("category", formData.category)
            fd.append("isVeg", formData.isVeg)
            fd.append("stock", formData.stock)
            fd.append("unit", formData.unit)
            if (imageFile) {
                fd.append("image", imageFile)
            } else if (formData.image) {
                fd.append("image", formData.image)
            }

            if (editingProduct) {
                await adminUpdateProduct(editingProduct._id, fd)
                setMsg("Product updated!")
            } else {
                await adminCreateProduct(fd)
                setMsg("Product created!")
            }

            resetForm()
            fetchProducts()
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setMsg("Error: " + err.message) }
        finally { setSaving(false) }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Deactivate this product?")) return
        try {
            await adminDeleteProduct(id)
            fetchProducts()
            setMsg("Product deactivated")
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setMsg("Error: " + err.message) }
    }

    const categories = ["Popular", "Starters", "Main Course", "Breads & Rice", "Desserts", "Beverages", "Fruits", "Vegetables", "Dairy", "Snacks"]

    if (loading && products.length === 0) return (
        <AdminLayout title="Products" subtitle="Loading...">
            <div className="admin-loading-inner">Loading products...</div>
        </AdminLayout>
    )

    return (
        <AdminLayout title="Products" subtitle={`${products.length} products in catalog`}>
            {msg && <div className="admin-msg">{msg}</div>}

            {/* Toolbar */}
            <div className="admin-toolbar">
                <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="admin-search" />
                <button className="add-product-btn" onClick={() => { resetForm(); setShowForm(true) }}>+ Add Product</button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
                <div className="form-modal">
                    <div className="form-modal-content">
                        <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
                        <div className="pform-grid">
                            <div className="form-group">
                                <label>Name *</label>
                                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Price (₹) *</label>
                                <input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Unit</label>
                                <select value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })}>
                                    {["kg", "piece", "pack", "plate", "glass", "serving"].map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Veg?</label>
                                <select value={formData.isVeg} onChange={e => setFormData({ ...formData, isVeg: e.target.value === "true" })}>
                                    <option value="true">🟢 Veg</option>
                                    <option value="false">🔴 Non-Veg</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group full">
                            <label>Description *</label>
                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={3} />
                        </div>
                        <div className="form-group full">
                            <label>{imageFile ? "New image selected ✅" : "Image"}</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                            {!imageFile && formData.image && <input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="Or paste image URL" style={{ marginTop: 8 }} />}
                        </div>
                        <div className="form-actions">
                            <button className="save-btn" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                            <button className="cancel-btn" onClick={resetForm}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Table */}
            <div className="product-table">
                <div className="table-header">
                    <span>Image</span>
                    <span>Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span>Stock</span>
                    <span>Status</span>
                    <span>Actions</span>
                </div>
                {products.map(product => (
                    <div key={product._id} className={`table-row ${!product.isActive ? "inactive" : ""}`}>
                        <span className="td-img"><img src={product.image} alt={product.name} loading="lazy" /></span>
                        <span className="td-name">{product.name}</span>
                        <span className="td-cat">{product.category}</span>
                        <span className="td-price">₹{product.price}/{product.unit}</span>
                        <span className={`td-stock ${product.stock < 10 ? "low" : ""}`}>{product.stock}</span>
                        <span><span className={`active-badge ${product.isActive ? "active" : "inactive"}`}>{product.isActive ? "Active" : "Inactive"}</span></span>
                        <span className="td-actions">
                            <button className="btn-edit" onClick={() => handleEdit(product)}>✏️</button>
                            <button className="btn-del" onClick={() => handleDelete(product._id)}>🗑️</button>
                        </span>
                    </div>
                ))}
            </div>
        </AdminLayout>
    )
}

export default AdminProducts
