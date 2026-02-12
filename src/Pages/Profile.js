import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateProfile, addAddress, editAddress, deleteAddress, isLoggedIn, setStoredUser } from "../utils/api.js"
import "../css/Profile.css"

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editingProfile, setEditingProfile] = useState(false)
    const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" })
    const [addressForm, setAddressForm] = useState({ label: "home", street: "", city: "", state: "", pinCode: "", phone: "", isDefault: false })
    const [showAddressForm, setShowAddressForm] = useState(false)
    const [editingAddressId, setEditingAddressId] = useState(null)
    const [msg, setMsg] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (!isLoggedIn()) { navigate("/login"); return }
        fetchProfile()
    }, [navigate])

    const fetchProfile = async () => {
        try {
            const data = await getProfile()
            setUser(data.user)
            setProfileForm({ fullName: data.user.fullName, phone: data.user.phone || "" })
            setStoredUser(data.user)
        } catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }

    const handleProfileSave = async () => {
        try {
            setError("")
            const data = await updateProfile(profileForm)
            setUser(data.user)
            setStoredUser(data.user)
            setEditingProfile(false)
            setMsg("Profile updated!")
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setError(err.message) }
    }

    const resetAddressForm = () => {
        setAddressForm({ label: "home", street: "", city: "", state: "", pinCode: "", phone: "", isDefault: false })
        setShowAddressForm(false)
        setEditingAddressId(null)
    }

    const handleAddressSave = async () => {
        try {
            setError("")
            let data
            if (editingAddressId) {
                data = await editAddress(editingAddressId, addressForm)
            } else {
                data = await addAddress(addressForm)
            }
            setUser(prev => ({ ...prev, addresses: data.addresses }))
            resetAddressForm()
            setMsg(editingAddressId ? "Address updated!" : "Address added!")
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setError(err.message) }
    }

    const handleEditAddress = (addr) => {
        setAddressForm({ label: addr.label, street: addr.street, city: addr.city, state: addr.state, pinCode: addr.pinCode, phone: addr.phone, isDefault: addr.isDefault })
        setEditingAddressId(addr._id)
        setShowAddressForm(true)
    }

    const handleDeleteAddress = async (id) => {
        try {
            setError("")
            const data = await deleteAddress(id)
            setUser(prev => ({ ...prev, addresses: data.addresses }))
            setMsg("Address deleted")
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setError(err.message) }
    }

    if (loading) return <div className="profile-page"><div className="profile-loading">Loading profile...</div></div>

    if (!user) return (
        <div className="profile-page">
            <section className="profile-hero">
                <h1>My Profile</h1>
                <p>Manage your account and delivery addresses</p>
            </section>
            <section className="profile-content">
                <div className="profile-msg error">{error || "Failed to load profile"}</div>
                <button className="edit-btn" onClick={() => { setLoading(true); setError(""); fetchProfile() }}>Retry</button>
            </section>
        </div>
    )

    return (
        <div className="profile-page">
            <section className="profile-hero">
                <h1>My Profile</h1>
                <p>Manage your account and delivery addresses</p>
            </section>

            <section className="profile-content">
                {msg && <div className="profile-msg success">{msg}</div>}
                {error && <div className="profile-msg error">{error}</div>}

                {/* Profile Card */}
                <div className="profile-card">
                    <div className="card-header">
                        <h2>👤 Personal Information</h2>
                        {!editingProfile && (
                            <button className="edit-btn" onClick={() => setEditingProfile(true)}>Edit</button>
                        )}
                    </div>

                    {editingProfile ? (
                        <div className="profile-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input value={profileForm.fullName} onChange={e => setProfileForm({ ...profileForm, fullName: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input value={profileForm.phone} onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })} placeholder="+91 98765 43210" />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input value={user.email} disabled className="disabled" />
                            </div>
                            <div className="form-actions">
                                <button className="save-btn" onClick={handleProfileSave}>Save</button>
                                <button className="cancel-btn" onClick={() => setEditingProfile(false)}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-info">
                            <p><strong>Name:</strong> {user.fullName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
                            <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>

                {/* Addresses Card */}
                <div className="profile-card">
                    <div className="card-header">
                        <h2>📍 Delivery Addresses</h2>
                        {!showAddressForm && (
                            <button className="edit-btn" onClick={() => { resetAddressForm(); setShowAddressForm(true) }}>+ Add</button>
                        )}
                    </div>

                    {showAddressForm && (
                        <div className="address-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Label</label>
                                    <select value={addressForm.label} onChange={e => setAddressForm({ ...addressForm, label: e.target.value })}>
                                        <option value="home">🏠 Home</option>
                                        <option value="work">💼 Work</option>
                                        <option value="other">📌 Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input value={addressForm.phone} onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })} placeholder="+91 98765 43210" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Street Address</label>
                                <input value={addressForm.street} onChange={e => setAddressForm({ ...addressForm, street: e.target.value })} placeholder="123 Food Street, Apt 4" />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input value={addressForm.city} onChange={e => setAddressForm({ ...addressForm, city: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input value={addressForm.state} onChange={e => setAddressForm({ ...addressForm, state: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Pin Code</label>
                                    <input value={addressForm.pinCode} onChange={e => setAddressForm({ ...addressForm, pinCode: e.target.value })} />
                                </div>
                            </div>
                            <label className="default-check">
                                <input type="checkbox" checked={addressForm.isDefault} onChange={e => setAddressForm({ ...addressForm, isDefault: e.target.checked })} />
                                Set as default address
                            </label>
                            <div className="form-actions">
                                <button className="save-btn" onClick={handleAddressSave}>{editingAddressId ? "Update" : "Add"} Address</button>
                                <button className="cancel-btn" onClick={resetAddressForm}>Cancel</button>
                            </div>
                        </div>
                    )}

                    {user.addresses && user.addresses.length > 0 ? (
                        <div className="address-list">
                            {user.addresses.map(addr => (
                                <div key={addr._id} className={`address-card ${addr.isDefault ? "default" : ""}`}>
                                    <div className="addr-header">
                                        <span className="addr-label">
                                            {addr.label === "home" ? "🏠" : addr.label === "work" ? "💼" : "📌"} {addr.label}
                                        </span>
                                        {addr.isDefault && <span className="default-badge">Default</span>}
                                    </div>
                                    <p>{addr.street}</p>
                                    <p>{addr.city}, {addr.state} - {addr.pinCode}</p>
                                    <p>📞 {addr.phone}</p>
                                    <div className="addr-actions">
                                        <button onClick={() => handleEditAddress(addr)}>Edit</button>
                                        <button className="del" onClick={() => handleDeleteAddress(addr._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-addresses">No saved addresses. Add one for faster checkout!</p>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Profile
