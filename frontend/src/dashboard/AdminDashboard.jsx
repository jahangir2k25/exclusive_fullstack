import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import {
    FiArrowRight,
    FiBox,
    FiCheckCircle,
    FiClock,
    FiDollarSign,
    FiPackage,
    FiShoppingCart,
    FiTag,
    FiTrendingUp,
    FiUsers,
} from 'react-icons/fi';
import '../App.css';

const AdminDashboard = () => {
    const products = useSelector((state) => state.allProduct?.value || []);
    const cart = useSelector((state) => state.allProduct?.cart || []);
    const wishlist = useSelector((state) => state.allProduct?.wishlist || []);

    const productCount = products?.length || 0;
    const orderCount = Math.max(8, cart?.length + Math.floor(productCount / 2));
    const wishlistCount = wishlist?.length || 0;
    const revenue = productCount * 74 + orderCount * 38 + wishlistCount * 11;
    const conversionRate = Math.min(96, 58 + Math.round(productCount / 6));
    const healthScore = 91;

    const metrics = [
        { title: 'Products live', value: productCount, detail: 'Catalog is ready for attention', icon: <FiBox /> },
        { title: 'Orders in motion', value: orderCount, detail: 'Demand is staying healthy', icon: <FiPackage /> },
        { title: 'Wishlist saves', value: wishlistCount, detail: 'Shoppers are bookmarking favorites', icon: <FiUsers /> },
        { title: 'Revenue outlook', value: `$${revenue}`, detail: 'Projected momentum for this week', icon: <FiDollarSign /> },
    ];

    const operations = [
        { label: 'Inventory pulse', value: `${productCount} items ready`, color: '#DB4444' },
        { label: 'Checkout confidence', value: `${conversionRate}% conversion`, color: '#f59e0b' },
        { label: 'Store health', value: `${healthScore}% healthy`, color: '#10b981' },
    ];

    const quickActions = [
        { title: 'Add Category', path: '/shop', note: 'Organize your catalog', color: '#DB4444' },
        { title: 'Add Product', path: '/shop', note: 'Publish a new item', color: '#f59e0b' },
        { title: 'All Orders', path: '/attocart', note: 'Track every purchase', color: '#10b981' },
        { title: 'Customers', path: '/account', note: 'Manage shoppers', color: '#6366f1' },
        { title: "Today's Order", path: '/checkout', note: 'Review live requests', color: '#ec4899' },
        { title: 'All Products', path: '/wishlist', note: 'Browse the full catalog', color: '#0f766e' },
    ];

    return (
        <section className="admin-dashboard-shell">
            <div className="admin-panel">
                <div className="panel-header">
                    <div>
                        <p className="panel-kicker">Quick actions</p>
                        <h3>Keep the storefront moving</h3>
                    </div>
                </div>

                <div className="admin-quick-actions">
                    {quickActions.map((action) => (
                        <NavLink
                            to={action.path}
                            className="admin-action-card"
                            key={action.title}
                            style={{ borderColor: action.color, background: `${action.color}12` }}
                        >
                            <div>
                                <strong>{action.title}</strong>
                                <p>{action.note}</p>
                            </div>
                            <div className="admin-action-icon" style={{ background: action.color }}>
                                {action.title === 'Add Category' && <FiTag />}
                                {action.title === 'Add Product' && <FiBox />}
                                {action.title === 'All Orders' && <FiShoppingCart />}
                                {action.title === 'Customers' && <FiUsers />}
                                {action.title === "Today's Order" && <FiPackage />}
                                {action.title === 'All Products' && <FiBox />}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div className="admin-hero">
                <div className="admin-hero-copy">
                    <p className="eyebrow">Commerce control center</p>
                    <h1>Run your storefront with clarity and confidence.</h1>
                    <p>
                        Your admin view now highlights product momentum, customer interest, and the actions that keep the store feeling premium.
                    </p>
                    <div className="hero-actions">
                        <NavLink to="/shop" className="btn btn-primary">
                            Explore catalog <FiArrowRight />
                        </NavLink>
                        <NavLink to="/account" className="btn btn-secondary">
                            Manage account
                        </NavLink>
                    </div>
                </div>

                <div className="admin-highlight-card">
                    <div className="admin-highlight-top">
                        <div>
                            <p className="panel-kicker">Performance snapshot</p>
                            <h3>Store momentum is strong</h3>
                        </div>
                        <span className="badge">+14% week over week</span>
                    </div>
                    <div className="admin-highlight-metric">
                        <strong>{conversionRate}%</strong>
                        <span>Estimated conversion rate</span>
                    </div>
                    <div className="admin-highlight-metric">
                        <strong>{orderCount}</strong>
                        <span>Active shopper journeys</span>
                    </div>
                </div>
            </div>

            <div className="admin-metrics">
                {metrics.map((metric) => (
                    <article className="admin-metric-card" key={metric.title}>
                        <div className="stat-icon">{metric.icon}</div>
                        <h4>{metric.title}</h4>
                        <strong>{metric.value}</strong>
                        <p>{metric.detail}</p>
                    </article>
                ))}
            </div>

            <div className="admin-grid">
                <div className="admin-panel">
                    <div className="panel-header">
                        <div>
                            <p className="panel-kicker">Operations pulse</p>
                            <h3>What is driving this store today</h3>
                        </div>
                        <span className="admin-chip">Live</span>
                    </div>

                    <div className="admin-progress-list">
                        {operations.map((item) => (
                            <div className="admin-progress-row" key={item.label}>
                                <div className="bar-label-row">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill" style={{ width: '78%', background: item.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="admin-grid admin-grid-bottom">
                <div className="admin-panel">
                    <div className="panel-header">
                        <div>
                            <p className="panel-kicker">Featured catalog</p>
                            <h3>Top items now attracting attention</h3>
                        </div>
                    </div>

                    {products.length > 0 ? (
                        <div className="product-list">
                            {products.slice(0, 4).map((product) => (
                                <article className="product-card" key={product.id || product.title}>
                                    <img src={product.thumbnail} alt={product.title} />
                                    <div>
                                        <h4>{product.title}</h4>
                                        <p>{product.category || 'Premium product'}</p>
                                        <span>${product.price}</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-state">Your catalog will appear here as soon as products are loaded.</p>
                    )}
                </div>

                <div className="admin-panel">
                    <div className="panel-header">
                        <div>
                            <p className="panel-kicker">Recent signals</p>
                            <h3>What your team should notice</h3>
                        </div>
                    </div>

                    <ul className="activity-list">
                        <li>
                            <span className="activity-dot" />
                            <div>
                                <strong><FiTrendingUp /> Demand trend</strong>
                                <p>Visitors are exploring more categories this week.</p>
                            </div>
                        </li>
                        <li>
                            <span className="activity-dot" />
                            <div>
                                <strong><FiClock /> Checkout timing</strong>
                                <p>Basket sessions are staying active longer than usual.</p>
                            </div>
                        </li>
                        <li>
                            <span className="activity-dot" />
                            <div>
                                <strong><FiCheckCircle /> Confidence boost</strong>
                                <p>Your store health score is above target for the week.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
