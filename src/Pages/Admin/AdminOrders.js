import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { adminGetOrders, adminUpdateOrderStatus, isLoggedIn, getStoredUser } from "../../utils/api.js"
import AdminLayout from "./AdminLayout.js"
import "../../css/Admin.css"

const statusColors = {
    pending: "#f59e0b",
    confirmed: "#3b82f6",
    preparing: "#8b5cf6",
    shipped: "#06b6d4",
    delivered: "#22c55e",
    cancelled: "#ef4444"
}

const AdminOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState("")
    const [expandedId, setExpandedId] = useState(null)
    const [msg, setMsg] = useState("")

    useEffect(() => {
        if (!isLoggedIn()) { navigate("/login"); return }
        const user = getStoredUser()
        if (!user || user.role !== "admin") { navigate("/"); return }
        fetchOrders()
    }, [navigate, filter])

    const fetchOrders = async () => {
        try {
            const data = await adminGetOrders({ status: filter || undefined })
            setOrders(data.orders)
        } catch (err) { console.error(err) }
        finally { setLoading(false) }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await adminUpdateOrderStatus(orderId, newStatus)
            fetchOrders()
            setMsg(`Order updated to ${newStatus}`)
            setTimeout(() => setMsg(""), 3000)
        } catch (err) { setMsg("Error: " + err.message) }
    }

    if (loading) return (
        <AdminLayout title="Orders" subtitle="Loading...">
            <div className="admin-loading-inner">Loading orders...</div>
        </AdminLayout>
    )

    return (
        <AdminLayout title="Orders" subtitle={`${orders.length} orders total`}>
            {msg && <div className="admin-msg">{msg}</div>}

            {/* Filter */}
            <div className="order-filters">
                {["", "pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"].map(s => (
                    <button key={s} className={`filter-btn ${filter === s ? "active" : ""}`} onClick={() => { setFilter(s); setLoading(true) }}>
                        {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <div className="no-orders-admin"><h3>No orders found</h3></div>
            ) : (
                <div className="admin-orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="admin-order-card">
                            <div className="aorder-header" onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}>
                                <div className="aorder-info">
                                    <span className="aorder-id">#{order._id.slice(-8).toUpperCase()}</span>
                                    <span className="aorder-customer">{order.user?.fullName || "Unknown"}</span>
                                    <span className="aorder-date">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                                    <span className="aorder-total">₹{order.totalAmount}</span>
                                    <span className="aorder-payment">{order.paymentMethod === "cod" ? "COD" : "Online"}</span>
                                </div>
                                <div className="aorder-status-area">
                                    <select
                                        value={order.status}
                                        onChange={e => { e.stopPropagation(); handleStatusChange(order._id, e.target.value) }}
                                        className="status-select"
                                        style={{ borderColor: statusColors[order.status] }}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        {["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"].map(s => (
                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {expandedId === order._id && (
                                <div className="aorder-details">
                                    <div className="aorder-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="aorder-item">
                                                <span>{item.name}</span>
                                                <span>×{item.quantity}</span>
                                                <span>₹{item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="aorder-footer">
                                        <div>
                                            <strong>Customer:</strong> {order.user?.fullName} ({order.user?.email})
                                            {order.user?.phone && <span> | 📞 {order.user.phone}</span>}
                                        </div>
                                        {order.deliveryAddress && (
                                            <div>
                                                <strong>Address:</strong>{" "}
                                                {typeof order.deliveryAddress === "string"
                                                    ? order.deliveryAddress
                                                    : `${order.deliveryAddress.street}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pinCode}`
                                                }
                                            </div>
                                        )}
                                        <div>
                                            <strong>Payment:</strong> {order.paymentMethod.toUpperCase()} — {order.paymentStatus === "paid" ? "✅ Paid" : "⏳ Pending"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}

export default AdminOrders
