import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { adminGetStats, isLoggedIn, getStoredUser } from "../../utils/api.js"
import AdminLayout from "./AdminLayout.js"
import "../../css/Admin.css"

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const user = getStoredUser()

        if (!isLoggedIn()) { navigate("/login"); return }
        if (!user || user.role !== "admin") {
            // Stay on page to show Access Denied
        } else {
            fetchStats()
        }
    }, [navigate])

    const user = getStoredUser()
    if (user && user.role !== "admin") {
        return (
            <div style={{ padding: 40, textAlign: "center", paddingTop: 100 }}>
                <h1>Access Denied</h1>
                <p>You are logged in as <strong>{user.email}</strong> but you do not have admin permissions.</p>
                <p>Role found: <code>{user.role || "none"}</code></p>
                <button onClick={() => navigate("/")} style={{ padding: "10px 20px", marginTop: 20 }}>Go Home</button>
            </div>
        )
    }

    const fetchStats = async () => {
        try {
            const data = await adminGetStats()
            setStats(data.stats)
        } catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }

    if (loading) return (
        <AdminLayout title="Dashboard" subtitle="Loading...">
            <div className="admin-loading-inner">Loading dashboard...</div>
        </AdminLayout>
    )

    if (error) return (
        <AdminLayout title="Dashboard" subtitle="Error">
            <div className="admin-error-inner">{error}</div>
        </AdminLayout>
    )

    const statusMap = {}
    if (stats?.ordersByStatus) {
        stats.ordersByStatus.forEach(s => { statusMap[s._id] = s.count })
    }

    return (
        <AdminLayout title="Dashboard" subtitle="Overview of your Epic Eats store">
            {/* Stats Cards */}
            <div className="dash-stats">
                <div className="dash-stat-card">
                    <div className="dash-stat-icon products">📦</div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{stats.totalProducts}</span>
                        <span className="dash-stat-label">Products</span>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-icon orders">🛒</div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{stats.totalOrders}</span>
                        <span className="dash-stat-label">Total Orders</span>
                    </div>
                </div>
                <div className="dash-stat-card">
                    <div className="dash-stat-icon users">👥</div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">{stats.totalUsers}</span>
                        <span className="dash-stat-label">Customers</span>
                    </div>
                </div>
                <div className="dash-stat-card revenue">
                    <div className="dash-stat-icon rev">💰</div>
                    <div className="dash-stat-info">
                        <span className="dash-stat-value">₹{stats.revenue?.toLocaleString() || 0}</span>
                        <span className="dash-stat-label">Revenue</span>
                    </div>
                </div>
            </div>

            {/* Order Status Overview */}
            <div className="dash-section">
                <h2 className="dash-section-title">Order Status</h2>
                <div className="dash-status-grid">
                    {["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"].map(s => (
                        <div key={s} className={`dash-status-chip ${s}`}>
                            <span className="dash-chip-count">{statusMap[s] || 0}</span>
                            <span className="dash-chip-label">{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="dash-section">
                <h2 className="dash-section-title">Quick Actions</h2>
                <div className="dash-quick-actions">
                    <button className="dash-action-btn" onClick={() => navigate("/admin/products")}>
                        <span>🍔</span> Manage Products
                    </button>
                    <button className="dash-action-btn" onClick={() => navigate("/admin/orders")}>
                        <span>📋</span> Manage Orders
                    </button>
                    <button className="dash-action-btn" onClick={() => navigate("/menu")}>
                        <span>👁️</span> View Store
                    </button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard
