// @ts-nocheck
import { useState, useEffect, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  HARYANA_DISTRICTS, CENTRAL_SCHEMES, HARYANA_SCHEMES, FIELD_OFFICES,
  INDUSTRIAL_CLUSTERS, SECTOR_DATA, YEARLY_REGISTRATION, CATEGORY_DATA,
  TOP_PRODUCTS, GOVERNMENT_PORTALS, NATIONAL_STATS, MSME_CLASSIFICATION,
  ODOP_DATA
} from './data/haryanaData';
import {
  User, Enterprise, createUser, authenticateUser, getCurrentUser,
  logoutUser, getEnterprises, createEnterprise, updateEnterprise,
  deleteEnterprise, getStatistics, getUsers
} from './utils/database';
import TickerBar from './components/TickerBar';
import Notification from './components/Notification';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MSMERegisterForm from './components/MSMERegisterForm';
import DistrictsPage from './components/DistrictsPage';

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'admin' | 'msme-register' | 'districts' | 'schemes' | 'clusters' | 'analytics' | 'odop' | 'portals' | 'contact';

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('overview');
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [rejectModalId, setRejectModalId] = useState<string | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Initialize
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setEnterprises(getEnterprises());
  }, []);

  const refreshData = useCallback(() => {
    setEnterprises(getEnterprises());
  }, []);

  useEffect(() => { refreshData(); }, [currentPage, refreshData]);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const navigate = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleLogin = (email: string, password: string) => {
    const user = authenticateUser(email, password);
    if (user) {
      setCurrentUser(user);
      showNotification('Welcome back, ' + user.name + '!', 'success');
      navigate(user.role === 'admin' ? 'admin' : 'dashboard');
    } else {
      showNotification('Invalid email or password. Please try again.', 'error');
    }
  };

  const handleRegister = (name: string, email: string, password: string, phone: string) => {
    const allUsers = getUsers();
    if (allUsers.find((u: User) => u.email === email)) {
      showNotification('Email already registered! Please use a different email.', 'error');
      return;
    }
    createUser({ email, password, name, phone, role: 'user' });
    showNotification('Registration successful! Please login now.', 'success');
    navigate('login');
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    navigate('home');
    showNotification('Logged out successfully!', 'success');
  };

  const stats = getStatistics();

  // ─── NAVBAR ───
  const navItems = [
    { key: 'home' as Page, label: 'Home', icon: '🏠' },
    { key: 'districts' as Page, label: 'Districts', icon: '📍' },
    { key: 'schemes' as Page, label: 'Schemes', icon: '🎯' },
    { key: 'clusters' as Page, label: 'Clusters', icon: '🏭' },
    { key: 'analytics' as Page, label: 'Analytics', icon: '📊' },
    { key: 'odop' as Page, label: 'ODOP', icon: '🎪' },
    { key: 'portals' as Page, label: 'Portals', icon: '🌐' },
    { key: 'contact' as Page, label: 'Contact', icon: '📞' },
  ];

  // ─── RENDER PAGES ───

  // ====================== HOME PAGE ======================
  const renderHome = () => (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-[200px] animate-float">🏭</div>
          <div className="absolute bottom-10 right-10 text-[150px]">🇮🇳</div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-5 border border-white/20">
                <span className="animate-pulse-slow">🟢</span> Official Portal — Govt of Haryana & Ministry of MSME
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
                Empowering <span className="text-yellow-300">Haryana's MSME</span> Ecosystem
              </h1>
              <p className="text-green-100 text-lg mb-8 leading-relaxed">
                Complete digital platform for Micro, Small & Medium Enterprise registration, 
                scheme discovery, analytics & administration across all 22 districts of Haryana. 
                Integrated with Ministry of MSME (msme.gov.in) services.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => currentUser ? navigate('msme-register') : navigate('login')}
                  className="bg-yellow-400 text-yellow-900 px-7 py-3.5 rounded-xl font-bold text-base hover:bg-yellow-300 transition-all shadow-xl flex items-center gap-2 hover:scale-105">
                  📋 Register MSME →
                </button>
                <button onClick={() => navigate('schemes')}
                  className="bg-white/15 backdrop-blur text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/25 border border-white/25 flex items-center gap-2">
                  🎯 Explore Schemes
                </button>
                <button onClick={() => navigate('analytics')}
                  className="bg-white/15 backdrop-blur text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-white/25 border border-white/25 flex items-center gap-2">
                  📊 View Analytics
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏭', label: 'Registered MSMEs', value: '8,92,456', bg: 'from-blue-500 to-blue-600' },
                { icon: '👥', label: 'Employment', value: '42.5 Lakh+', bg: 'from-purple-500 to-purple-600' },
                { icon: '📍', label: 'Districts Active', value: '22', bg: 'from-orange-500 to-red-500' },
                { icon: '🏗️', label: 'Industrial Areas', value: '56+', bg: 'from-cyan-500 to-teal-600' },
                { icon: '💰', label: 'MSME Investment', value: '₹1.2L Cr+', bg: 'from-yellow-500 to-orange-500' },
                { icon: '📈', label: 'Export Share', value: '45.7%', bg: 'from-pink-500 to-rose-600' },
              ].map((item, i) => (
                <div key={i} className={`bg-gradient-to-br ${item.bg} rounded-2xl p-5 shadow-xl hover:scale-105 transition-transform cursor-default`}>
                  <span className="text-3xl">{item.icon}</span>
                  <p className="text-2xl font-extrabold mt-2">{item.value}</p>
                  <p className="text-xs opacity-80 mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MSME Classification */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              📑 MSME Classification (Composite Criteria — Effective July 2020)
            </h2>
            <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Source: msme.gov.in</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {MSME_CLASSIFICATION.map((cls, i) => (
              <div key={i} className="border-2 rounded-xl p-5 hover:shadow-lg transition-all" style={{ borderColor: cls.color + '40' }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{ backgroundColor: cls.color }}>{cls.type}</span>
                  <span className="text-sm font-mono text-gray-400">{CATEGORY_DATA[i]?.percentage || 0}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Investment</span><span className="font-semibold text-gray-800">{cls.investmentLimit}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Turnover</span><span className="font-semibold text-gray-800">{cls.turnoverLimit}</span></div>
                  <div className="pt-2 border-t">
                    <p className="text-2xl font-extrabold" style={{ color: cls.color }}>{(CATEGORY_DATA[i]?.count || 0).toLocaleString('en-IN')}</p>
                    <p className="text-xs text-gray-400">Registered in Haryana</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">📊 Top Districts by Udyam Registration</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={[...HARYANA_DISTRICTS].sort((a, b) => b.totalUdyam - a.totalUdyam).slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={75} fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="totalUdyam" fill="#10B981" radius={[6, 6, 0, 0]} name="Registrations" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">🎯 Sector-wise Distribution</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={SECTOR_DATA} cx="50%" cy="50%" outerRadius={110} innerRadius={55} paddingAngle={3} dataKey="count" nameKey="sector">
                  {SECTOR_DATA.map((_entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {SECTOR_DATA.map((s, i) => (
                <span key={i} className="text-xs flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{backgroundColor: COLORS[i % COLORS.length]}}></span>{s.sector} ({s.percentage}%)</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Yearly Trend */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">📈 Udyam Registration Growth Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={YEARLY_REGISTRATION}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="year" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip />
              <Area type="monotone" dataKey="registrations" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} name="Registrations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Services */}
      <div className="bg-gradient-to-br from-gray-50 to-green-50 py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Integrated MSME Services</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">As per Ministry of MSME, Government of India (msme.gov.in)</p>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              { icon: '📋', title: 'Udyam Registration', desc: 'Free, paperless self-declaration based MSME registration with permanent Udyam number', action: 'msme-register' as Page },
              { icon: '🔨', title: 'PM Vishwakarma', desc: 'Holistic support for traditional artisans — training, tools, credit & marketing', action: 'schemes' as Page },
              { icon: '🛡️', title: 'CGTMSE', desc: 'Collateral-free credit guarantee up to ₹5 Crore for MSEs', action: 'schemes' as Page },
              { icon: '📊', title: 'MSME Dashboard', desc: 'Real-time analytics, district data & performance metrics', action: 'analytics' as Page },
              { icon: '⚖️', title: 'SAMADHAAN', desc: 'File delayed payment cases online — resolution within 90 days', action: 'portals' as Page },
              { icon: '🤝', title: 'MSME Sambandh', desc: '25% public procurement from MSMEs monitored transparently', action: 'portals' as Page },
              { icon: '🏆', title: 'CHAMPIONS', desc: 'Single window for grievance redressal & handholding for MSMEs', action: 'portals' as Page },
              { icon: '💳', title: 'ME Card (New)', desc: '₹5 Lakh credit card for Micro Enterprises — 10L cards in Year 1', action: 'schemes' as Page },
            ].map((item, i) => (
              <div key={i} onClick={() => navigate(item.action)}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-green-300 group">
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="text-base font-bold text-gray-800 mb-1 group-hover:text-green-700">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ODOP Preview */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">One District One Product (ODOP)</h2>
            <p className="text-sm text-gray-500">Signature products from all 22 districts of Haryana</p>
          </div>
          <button onClick={() => navigate('odop')} className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">View All →</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ODOP_DATA.slice(0, 12).map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all text-center cursor-default">
              <span className="text-3xl block mb-2">{item.icon}</span>
              <p className="font-bold text-gray-800 text-sm">{item.district}</p>
              <p className="text-xs text-gray-500 mt-1">{item.product}</p>
            </div>
          ))}
        </div>
      </div>

      {/* National Stats */}
      <div className="bg-green-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">India MSME at a Glance</h2>
          <p className="text-center text-green-300 text-sm mb-10">Data from Ministry of MSME (msme.gov.in) & Udyam Dashboard</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Udyam', value: '4.77 Cr+', sub: 'Registered MSMEs' },
              { label: 'GDP Contribution', value: '30%', sub: 'Of National GDP' },
              { label: 'Employment', value: '12 Crore', sub: 'Direct Employment' },
              { label: 'Export Share', value: '45.73%', sub: 'Of Total Exports' },
              { label: 'Haryana Rank', value: '#8', sub: NATIONAL_STATS.haryanaShare + '% of India' },
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-xl p-5 text-center border border-white/10">
                <p className="text-3xl font-extrabold text-yellow-300">{item.value}</p>
                <p className="text-sm font-medium mt-1">{item.label}</p>
                <p className="text-xs text-green-300 mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Government Portals */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Government Portals & Links</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {GOVERNMENT_PORTALS.map((portal, i) => (
            <a key={i} href={portal.link} target="_blank" rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all flex items-center gap-3 group">
              <span className="text-2xl">{portal.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm group-hover:text-green-700 truncate">{portal.name}</p>
                <p className="text-xs text-gray-400 truncate">{portal.type}</p>
              </div>
              <span className="text-gray-300 group-hover:text-green-500 text-xs">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // Login/Register/MSMERegister/Districts are now separate components

  // (Register component moved to separate file)

  // ====================== USER DASHBOARD ======================
  const renderDashboard = () => {
    if (!currentUser) { navigate('login'); return null; }
    const userEnts = enterprises.filter(e => e.email === currentUser.email);

    return (
      <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">👤 My Dashboard</h1>
              <p className="text-gray-500 text-sm">Welcome, {currentUser.name} | {currentUser.email}</p>
            </div>
            <button onClick={() => navigate('msme-register')}
              className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 flex items-center gap-2 shadow-md">
              ➕ Register New MSME
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Applications', value: userEnts.length, icon: '📋', color: 'bg-blue-500' },
              { label: 'Approved', value: userEnts.filter(e => e.status === 'Approved').length, icon: '✅', color: 'bg-green-500' },
              { label: 'Pending', value: userEnts.filter(e => e.status === 'Pending').length, icon: '⏳', color: 'bg-yellow-500' },
              { label: 'Rejected', value: userEnts.filter(e => e.status === 'Rejected').length, icon: '❌', color: 'bg-red-500' },
            ].map((s, i) => (
              <div key={i} className={`${s.color} text-white rounded-xl p-5 shadow-md`}>
                <span className="text-2xl">{s.icon}</span>
                <p className="text-3xl font-extrabold mt-2">{s.value}</p>
                <p className="text-sm opacity-80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Enterprises List */}
          {userEnts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🏭</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No MSME Registered Yet</h3>
              <p className="text-gray-400 mb-6">Start by registering your first enterprise</p>
              <button onClick={() => navigate('msme-register')} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700">
                Register MSME Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userEnts.map((ent) => (
                <div key={ent.id} className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:border-green-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-bold text-gray-800">{ent.enterpriseName}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          ent.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          ent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>{ent.status}</span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">📋 {ent.registrationNo} | 🏷️ {ent.udyamNo}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span>📍 {ent.district}</span>
                        <span>🏭 {ent.category}</span>
                        <span>📦 {ent.sector}</span>
                        <span>👥 {ent.employees} emp</span>
                      </div>
                    </div>
                    <button onClick={() => setSelectedEnterprise(ent)}
                      className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 flex items-center gap-1">
                      👁️ View Details
                    </button>
                  </div>
                  {ent.remarks && (
                    <div className="mt-3 p-2 bg-red-50 rounded-lg text-xs text-red-600 flex items-center gap-1">
                      ⚠️ <strong>Remarks:</strong> {ent.remarks}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ====================== ADMIN PORTAL ======================
  const renderAdmin = () => {
    if (!currentUser || currentUser.role !== 'admin') { navigate('login'); return null; }

    const allUsers = getUsers();
    const filteredEnterprises = enterprises.filter(ent => {
      const s = searchQuery.toLowerCase();
      const matchSearch = !s || ent.enterpriseName.toLowerCase().includes(s) || ent.ownerName.toLowerCase().includes(s) || ent.registrationNo.toLowerCase().includes(s);
      const matchDistrict = !filterDistrict || ent.district === filterDistrict;
      const matchStatus = !filterStatus || ent.status === filterStatus;
      const matchCategory = !filterCategory || ent.category === filterCategory;
      return matchSearch && matchDistrict && matchStatus && matchCategory;
    });

    const pendingEnts = enterprises.filter(e => e.status === 'Pending');

    const doApprove = (id: string) => {
      updateEnterprise(id, { status: 'Approved', approvedDate: new Date().toISOString(), approvedBy: currentUser.id });
      refreshData();
      showNotification('Enterprise approved successfully!', 'success');
    };

    const doReject = (id: string, remarks: string) => {
      updateEnterprise(id, { status: 'Rejected', remarks: remarks || 'Application rejected by admin' });
      refreshData();
      showNotification('Enterprise rejected.', 'error');
      setRejectModalId(null);
      setRejectRemarks('');
    };

    const doDelete = (id: string) => {
      deleteEnterprise(id);
      refreshData();
      showNotification('Enterprise deleted.', 'success');
      setDeleteConfirmId(null);
    };

    const tabs = [
      { key: 'overview', label: 'Overview', icon: '📊' },
      { key: 'enterprises', label: 'All Enterprises', icon: '🗃️' },
      { key: 'pending', label: 'Pending (' + pendingEnts.length + ')', icon: '⏳' },
      { key: 'users', label: 'Users (' + allUsers.length + ')', icon: '👥' },
      { key: 'reports', label: 'Reports', icon: '📈' },
    ];

    return (
      <div className="min-h-screen bg-gray-100 animate-fade-in">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-5">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">🔑 Admin Control Panel</h1>
            <p className="text-gray-400 text-sm">Welcome, {currentUser.name} | Manage enterprises, users, approvals & reports</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b sticky top-[52px] z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setAdminTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                    adminTab === tab.key ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                  <span>{tab.icon}</span> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Reject Modal */}
          {rejectModalId && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setRejectModalId(null)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-800 mb-3">❌ Reject Enterprise</h3>
                <p className="text-sm text-gray-500 mb-3">Please provide rejection remarks:</p>
                <textarea
                  value={rejectRemarks}
                  onChange={e => setRejectRemarks(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-sm mb-4"
                  rows={3}
                  placeholder="e.g., Incomplete documents, Invalid GST..."
                />
                <div className="flex gap-3 justify-end">
                  <button onClick={() => { setRejectModalId(null); setRejectRemarks(''); }} className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">Cancel</button>
                  <button onClick={() => doReject(rejectModalId, rejectRemarks)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">Reject</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirm Modal */}
          {deleteConfirmId && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirmId(null)}>
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold text-gray-800 mb-3">🗑️ Delete Enterprise</h3>
                <p className="text-sm text-gray-500 mb-4">Are you sure you want to permanently delete this enterprise?</p>
                <div className="flex gap-3 justify-end">
                  <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium">Cancel</button>
                  <button onClick={() => doDelete(deleteConfirmId)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold">Delete</button>
                </div>
              </div>
            </div>
          )}

          {/* OVERVIEW */}
          {adminTab === 'overview' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Total Enterprises', value: stats.total, icon: '🏭', color: 'bg-blue-600' },
                  { label: 'Approved', value: stats.approved, icon: '✅', color: 'bg-green-600' },
                  { label: 'Pending', value: stats.pending, icon: '⏳', color: 'bg-yellow-500' },
                  { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'bg-red-500' },
                  { label: 'Total Users', value: allUsers.length, icon: '👥', color: 'bg-purple-600' },
                ].map((s, i) => (
                  <div key={i} className={`${s.color} text-white rounded-xl p-5 shadow-lg`}>
                    <span className="text-2xl">{s.icon}</span>
                    <p className="text-3xl font-extrabold mt-2">{s.value}</p>
                    <p className="text-xs opacity-80">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4">📊 Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={[
                        { name: 'Micro', value: stats.micro },
                        { name: 'Small', value: stats.small },
                        { name: 'Medium', value: stats.medium },
                      ]} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => name + ' ' + (percent * 100).toFixed(0) + '%'}>
                        <Cell fill="#10B981" />
                        <Cell fill="#3B82F6" />
                        <Cell fill="#8B5CF6" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-5">
                  <h3 className="font-bold text-gray-800 mb-4">📝 Recent Registrations</h3>
                  <div className="space-y-2 max-h-[260px] overflow-y-auto">
                    {enterprises.slice(-8).reverse().map((ent) => (
                      <div key={ent.id} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100" onClick={() => setSelectedEnterprise(ent)}>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{ent.enterpriseName}</p>
                          <p className="text-xs text-gray-400">{ent.district} | {new Date(ent.registrationDate).toLocaleDateString('en-IN')}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          ent.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          ent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>{ent.status}</span>
                      </div>
                    ))}
                    {enterprises.length === 0 && <p className="text-center text-gray-400 py-8">No enterprises yet</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALL ENTERPRISES */}
          {adminTab === 'enterprises' && (
            <div>
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input type="text" placeholder="Search name, owner, reg no..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" />
                </div>
                <select value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)} className="border rounded-lg px-3 py-2 text-sm pr-8">
                  <option value="">All Districts</option>
                  {HARYANA_DISTRICTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-lg px-3 py-2 text-sm pr-8">
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border rounded-lg px-3 py-2 text-sm pr-8">
                  <option value="">All Categories</option>
                  <option value="Micro">Micro</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                </select>
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">{filteredEnterprises.length} results</span>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-gray-600">Enterprise</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Owner</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">District</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Category</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Date</th>
                        <th className="px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredEnterprises.map((ent) => (
                        <tr key={ent.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-800">{ent.enterpriseName}</p>
                            <p className="text-xs text-gray-400">{ent.registrationNo}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{ent.ownerName}</td>
                          <td className="px-4 py-3 text-gray-600">{ent.district}</td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            ent.category === 'Micro' ? 'bg-green-100 text-green-700' :
                            ent.category === 'Small' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                          }`}>{ent.category}</span></td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            ent.status === 'Approved' ? 'bg-green-100 text-green-700' :
                            ent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>{ent.status}</span></td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{new Date(ent.registrationDate).toLocaleDateString('en-IN')}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              <button onClick={() => setSelectedEnterprise(ent)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-xs" title="View">👁️</button>
                              {ent.status === 'Pending' && (
                                <>
                                  <button onClick={() => doApprove(ent.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg text-xs" title="Approve">✅</button>
                                  <button onClick={() => { setRejectModalId(ent.id); setRejectRemarks(''); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs" title="Reject">❌</button>
                                </>
                              )}
                              <button onClick={() => setDeleteConfirmId(ent.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg text-xs" title="Delete">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredEnterprises.length === 0 && (
                    <div className="text-center py-12 text-gray-400">No enterprises found matching your filters.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PENDING */}
          {adminTab === 'pending' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">⏳ Pending Approvals ({pendingEnts.length})</h2>
              {pendingEnts.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center shadow-md">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="text-gray-500 text-lg font-medium">All caught up! No pending applications.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingEnts.map((ent) => (
                    <div key={ent.id} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-yellow-400">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg">{ent.enterpriseName}</h3>
                          <p className="text-sm text-gray-500">{ent.ownerName} | {ent.district} | {ent.category} | {ent.sector}</p>
                          <p className="text-xs text-gray-400 mt-1">📋 {ent.registrationNo} | 📧 {ent.email} | 📞 {ent.phone}</p>
                          <p className="text-xs text-gray-400 mt-1">💰 Inv: ₹{parseInt(ent.investment || '0').toLocaleString('en-IN')} | 📈 T/O: ₹{parseInt(ent.turnover || '0').toLocaleString('en-IN')} | 👥 {ent.employees} emp</p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button onClick={() => setSelectedEnterprise(ent)} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">👁️ View</button>
                          <button onClick={() => doApprove(ent.id)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700">✅ Approve</button>
                          <button onClick={() => { setRejectModalId(ent.id); setRejectRemarks(''); }} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700">❌ Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* USERS */}
          {adminTab === 'users' && (
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Registered Users ({allUsers.length})</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Email</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">Joined</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-600">MSMEs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {allUsers.map((u: User) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-gray-600">{u.email}</td>
                          <td className="px-4 py-3 text-gray-600">{u.phone}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                              {u.role === 'admin' ? '🔑 Admin' : '👤 User'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-500 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                          <td className="px-4 py-3 text-center font-bold text-green-600">{enterprises.filter(e => e.email === u.email).length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {adminTab === 'reports' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-4">📊 District-wise Applications</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={HARYANA_DISTRICTS.map(d => ({ name: d.name, count: enterprises.filter(e => e.district === d.name).length })).filter(d => d.count > 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={10} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} name="Applications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5">
                <h3 className="font-bold text-gray-800 mb-4">📊 Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={[
                      { name: 'Approved', value: stats.approved },
                      { name: 'Pending', value: stats.pending },
                      { name: 'Rejected', value: stats.rejected },
                    ]} cx="50%" cy="50%" outerRadius={100} dataKey="value"
                      label={({ name, percent }) => name + ' ' + (percent * 100).toFixed(0) + '%'}>
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-5 md:col-span-2">
                <h3 className="font-bold text-gray-800 mb-4">📋 Key Metrics Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-extrabold text-green-700">{stats.total}</p>
                    <p className="text-xs text-gray-500">Total Enterprises</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-extrabold text-blue-700">{stats.totalEmployees}</p>
                    <p className="text-xs text-gray-500">Total Employees</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-extrabold text-purple-700">₹{(stats.totalInvestment / 10000000).toFixed(1)} Cr</p>
                    <p className="text-xs text-gray-500">Total Investment</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-extrabold text-orange-700">₹{(stats.totalTurnover / 10000000).toFixed(1)} Cr</p>
                    <p className="text-xs text-gray-500">Total Turnover</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // MSME Register Form and Districts page are now separate components

  // ====================== SCHEMES PAGE ======================
  const renderSchemes = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">🎯 Government Schemes for MSMEs</h1>
        <p className="text-gray-500 mb-8 text-sm">Central (msme.gov.in) + State (Haryana) Schemes</p>
        <h2 className="text-xl font-bold text-gray-800 mb-4">🇮🇳 Central Schemes ({CENTRAL_SCHEMES.length})</h2>
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {CENTRAL_SCHEMES.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-green-300 transition-all">
              <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-4 flex items-start gap-3">
                <span className="text-3xl">{scheme.icon}</span>
                <div><h3 className="text-base font-bold text-white">{scheme.name}</h3><p className="text-green-200 text-xs">{scheme.fullName}</p></div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-600">{scheme.description}</p>
                <div><p className="text-xs font-bold text-gray-500 uppercase">Eligibility</p><p className="text-sm text-gray-700">{scheme.eligibility}</p></div>
                <div><p className="text-xs font-bold text-gray-500 uppercase">Key Benefits</p>
                  <ul className="text-sm text-gray-700 space-y-0.5">{scheme.benefits.map((b, i) => (<li key={i} className="flex items-start gap-1"><span className="text-green-500 mt-0.5">✓</span>{b}</li>))}</ul>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div><p className="text-xs text-gray-400">Budget</p><p className="font-bold text-green-600 text-sm">{scheme.budget}</p></div>
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">{scheme.status}</span>
                </div>
                <a href={scheme.link} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-green-50 text-green-700 py-2 rounded-xl text-sm font-medium hover:bg-green-100">Visit Portal →</a>
              </div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">🏛️ Haryana State Schemes ({HARYANA_SCHEMES.length})</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {HARYANA_SCHEMES.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:border-orange-300 transition-all">
              <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-4 flex items-center gap-3">
                <span className="text-3xl">{scheme.icon}</span>
                <div><h3 className="text-base font-bold text-white">{scheme.name}</h3><p className="text-orange-100 text-xs">{scheme.fullName}</p></div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-600">{scheme.description}</p>
                <ul className="text-sm text-gray-700 space-y-0.5">{scheme.benefits.map((b, i) => (<li key={i} className="flex items-start gap-1"><span className="text-orange-500 mt-0.5">✓</span>{b}</li>))}</ul>
                <div className="flex items-center justify-between pt-3 border-t">
                  <p className="font-bold text-orange-600 text-sm">{scheme.budget}</p>
                  <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">{scheme.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ====================== CLUSTERS PAGE ======================
  const renderClusters = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">🏭 Industrial Clusters</h1>
        <p className="text-gray-500 mb-8 text-sm">Major MSME clusters across Haryana</p>
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {INDUSTRIAL_CLUSTERS.map((cluster, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden flex border border-gray-100 hover:border-green-300 transition-all">
              <div className={`w-2 flex-shrink-0 ${['bg-green-500','bg-blue-500','bg-purple-500','bg-yellow-500','bg-red-500','bg-cyan-500'][i % 6]}`} />
              <div className="p-5 flex-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{cluster.name}</h3>
                <p className="text-gray-500 text-xs mb-3">{cluster.district} | {cluster.speciality}</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-lg font-extrabold text-gray-800">{cluster.units.toLocaleString()}</p><p className="text-[10px] text-gray-400">Units</p></div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-lg font-extrabold text-green-600">₹{cluster.turnover.toLocaleString()} Cr</p><p className="text-[10px] text-gray-400">Turnover</p></div>
                  <div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-lg font-extrabold text-blue-600">{cluster.employment.toLocaleString()}</p><p className="text-[10px] text-gray-400">Employment</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Cluster Turnover Comparison (₹ Crore)</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={[...INDUSTRIAL_CLUSTERS].sort((a, b) => b.turnover - a.turnover)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={110} fontSize={9} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="turnover" fill="#8B5CF6" radius={[6, 6, 0, 0]} name="Turnover (₹ Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // ====================== ANALYTICS PAGE ======================
  const renderAnalytics = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">📊 MSME Analytics Dashboard</h1>
        <p className="text-gray-500 mb-8 text-sm">Comprehensive data from Udyam Dashboard & Haryana MSME Directorate</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total MSMEs', value: '8,92,456', icon: '🏭', color: 'from-green-500 to-green-600' },
            { label: 'Employment', value: '42.5L+', icon: '👥', color: 'from-blue-500 to-blue-600' },
            { label: 'Exports', value: '₹75K Cr', icon: '📦', color: 'from-purple-500 to-purple-600' },
            { label: 'Clusters', value: '56+', icon: '🏗️', color: 'from-orange-500 to-orange-600' },
          ].map((item, i) => (
            <div key={i} className={`bg-gradient-to-br ${item.color} text-white rounded-xl p-5 shadow-lg`}>
              <span className="text-3xl">{item.icon}</span>
              <p className="text-2xl font-extrabold mt-2">{item.value}</p>
              <p className="text-xs opacity-80">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={5} dataKey="count" nameKey="category">
                  {CATEGORY_DATA.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {CATEGORY_DATA.map((c, i) => (
                <span key={i} className="text-xs flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{backgroundColor: c.color}}></span>{c.category} ({c.percentage}%)</span>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3">Registration Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={YEARLY_REGISTRATION}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="registrations" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} name="Registrations" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3">Sector-wise Analysis</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={SECTOR_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="sector" type="category" width={90} fontSize={11} />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" radius={[0, 6, 6, 0]} name="Enterprises" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <h3 className="font-bold text-gray-800 mb-3">Top Districts by Employment</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={[...HARYANA_DISTRICTS].sort((a, b) => b.employment - a.employment).slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} fontSize={10} />
                <YAxis fontSize={10} />
                <Tooltip />
                <Bar dataKey="employment" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Employment" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="font-bold text-gray-800 mb-3">Top Export Products (₹ Crores)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...TOP_PRODUCTS].sort((a, b) => b.exportValue - a.exportValue)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-30} textAnchor="end" height={70} fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="exportValue" fill="#10B981" radius={[6, 6, 0, 0]} name="Export Value (₹ Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // ====================== ODOP PAGE ======================
  const renderOdop = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">🎯 One District One Product (ODOP)</h1>
        <p className="text-gray-500 mb-8 text-sm">Signature products from each of Haryana's 22 districts</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ODOP_DATA.map((item, i) => {
            const dist = HARYANA_DISTRICTS.find(d => d.name === item.district);
            return (
              <div key={i} className="bg-white rounded-2xl shadow-md p-5 border border-gray-100 hover:border-green-300 hover:shadow-lg transition-all text-center">
                <span className="text-5xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-800 text-lg">{item.district}</h3>
                <p className="text-green-600 font-medium text-sm mb-2">{item.product}</p>
                {dist && <p className="text-xs text-gray-400">{dist.totalUdyam.toLocaleString('en-IN')} MSMEs</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ====================== PORTALS PAGE ======================
  const renderPortals = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">🌐 Government Portals & Links</h1>
        <p className="text-gray-500 mb-8 text-sm">All official MSME portals from Ministry of MSME & Haryana Government</p>
        <div className="grid md:grid-cols-3 gap-5">
          {GOVERNMENT_PORTALS.map((portal, i) => (
            <a key={i} href={portal.link} target="_blank" rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:border-green-400 hover:shadow-xl transition-all group">
              <span className="text-4xl block mb-3">{portal.icon}</span>
              <h3 className="font-bold text-gray-800 text-base group-hover:text-green-700 mb-1">{portal.name}</h3>
              <p className="text-sm text-gray-500 mb-3">{portal.type}</p>
              <p className="text-xs text-blue-500 flex items-center gap-1">Visit Portal →</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  // ====================== CONTACT PAGE ======================
  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">📞 Field Offices & Contact</h1>
        <p className="text-gray-500 mb-8 text-sm">District-level MSME offices across Haryana</p>
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-2xl p-6 text-white mb-8 shadow-xl">
          <h2 className="text-xl font-bold mb-3">🏛️ Directorate of MSME, Haryana (Head Office)</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">📍 Bays 15-20, Sector 4, Panchkula - 134112</div>
            <div className="flex items-center gap-2">📞 0172-2560132, 2560133</div>
            <div className="flex items-center gap-2">📧 dir-msme@hry.gov.in</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {FIELD_OFFICES.map((office, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:border-green-300 transition-all">
              <h3 className="font-bold text-gray-800 text-base mb-2">📍 {office.district}</h3>
              <div className="space-y-1.5 text-sm text-gray-600">
                <p className="font-medium text-gray-700">{office.officer}</p>
                <p className="text-xs text-gray-400">{office.designation}</p>
                <p className="text-xs">{office.address}</p>
                <p className="text-green-600 text-xs">📞 {office.phone}</p>
                <p className="text-blue-600 text-xs">📧 {office.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ====================== ENTERPRISE MODAL ======================
  const renderEnterpriseModal = () => {
    if (!selectedEnterprise) return null;
    const ent = selectedEnterprise;
    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedEnterprise(null)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-5 text-white rounded-t-2xl flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{ent.enterpriseName}</h2>
              <p className="text-green-200 text-xs mt-1">{ent.registrationNo} | {ent.udyamNo}</p>
            </div>
            <button onClick={() => setSelectedEnterprise(null)} className="text-white/60 hover:text-white text-xl">✕</button>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                ent.status === 'Approved' ? 'bg-green-100 text-green-700' :
                ent.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
              }`}>{ent.status}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                ent.category === 'Micro' ? 'bg-green-100 text-green-700' :
                ent.category === 'Small' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
              }`}>{ent.category}</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">{ent.sector}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Owner', ent.ownerName], ['Email', ent.email], ['Phone', ent.phone], ['Aadhar', ent.aadhar],
                ['PAN', ent.pan], ['GST', ent.gst || 'N/A'], ['District', ent.district], ['PIN', ent.pincode],
                ['Investment', '₹' + parseInt(ent.investment || '0').toLocaleString('en-IN')],
                ['Turnover', '₹' + parseInt(ent.turnover || '0').toLocaleString('en-IN')],
                ['Employees', ent.employees], ['Products', ent.products],
                ['Bank', ent.bankName], ['Account', ent.accountNo], ['IFSC', ent.ifsc],
                ['Registered', new Date(ent.registrationDate).toLocaleDateString('en-IN')],
              ].map(([label, val], i) => (
                <div key={i}><p className="text-xs text-gray-400">{label}</p><p className="font-medium text-gray-800">{val}</p></div>
              ))}
            </div>
            <div className="text-sm"><p className="text-xs text-gray-400">Address</p><p className="text-gray-800">{ent.address}</p></div>
            {ent.remarks && <div className="p-3 bg-red-50 rounded-lg text-sm text-red-600"><strong>Remarks:</strong> {ent.remarks}</div>}
            {ent.approvedDate && <p className="text-xs text-gray-400">Approved on: {new Date(ent.approvedDate).toLocaleDateString('en-IN')}</p>}
          </div>
        </div>
      </div>
    );
  };

  // ====================== FOOTER ======================
  const renderFooter = () => (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏭</span>
              <span className="text-lg font-bold">Haryana MSME Portal</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Official portal of Directorate of MSME, Government of Haryana. 
              Integrated with Ministry of MSME, Government of India services.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-1.5 text-gray-400 text-xs">
              {[
                { label: 'MSME Registration', p: 'msme-register' as Page },
                { label: 'Schemes', p: 'schemes' as Page },
                { label: 'Districts', p: 'districts' as Page },
                { label: 'Analytics', p: 'analytics' as Page },
                { label: 'ODOP', p: 'odop' as Page },
              ].map((item, i) => (
                <li key={i}><button onClick={() => navigate(item.p)} className="hover:text-white">{item.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Government Portals</h4>
            <ul className="space-y-1.5 text-gray-400 text-xs">
              <li><a href="https://msme.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Ministry of MSME</a></li>
              <li><a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">Udyam Registration</a></li>
              <li><a href="https://champions.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">CHAMPIONS Portal</a></li>
              <li><a href="https://msme.haryana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">MSME Haryana</a></li>
              <li><a href="https://gis.haryana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white">GIS Haryana</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 text-sm">Contact</h4>
            <ul className="space-y-1.5 text-gray-400 text-xs">
              <li>📞 0172-2560132</li>
              <li>📧 dir-msme@hry.gov.in</li>
              <li>📍 Bays 15-20, Sector 4, Panchkula</li>
              <li>🌐 msme.haryana.gov.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-xs text-gray-500">
              <p>© 2025 Directorate of MSME, Haryana | Ministry of MSME, Government of India</p>
              <p className="mt-1">Data: msme.gov.in, dashboard.msme.gov.in, msme.haryana.gov.in & gis.haryana.gov.in</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>🇮🇳</span><span>Designed for Digital India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // ====================== MAIN RENDER ======================
  return (
    <div className="min-h-screen bg-gray-50">
      <TickerBar />
      
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-green-800 via-green-700 to-emerald-600 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-2.5">
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => navigate('home')}>
              <div className="bg-white p-1.5 rounded-lg shadow-md"><div className="text-2xl">🏭</div></div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white leading-tight">Haryana MSME Portal</h1>
                <p className="text-green-200 text-[10px]">Govt of Haryana | Ministry of MSME, GoI</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button key={item.key} onClick={() => navigate(item.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    currentPage === item.key ? 'bg-white text-green-700 shadow-md' : 'text-white hover:bg-white/15'
                  }`}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="hidden md:block text-right">
                    <p className="text-white text-xs font-medium">{currentUser.name}</p>
                    <p className="text-green-200 text-[10px]">{currentUser.role === 'admin' ? '🔑 Admin' : '👤 User'}</p>
                  </div>
                  {currentUser.role === 'admin' ? (
                    <button onClick={() => navigate('admin')}
                      className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-300 flex items-center gap-1">
                      ⚙️ Admin
                    </button>
                  ) : (
                    <button onClick={() => navigate('dashboard')}
                      className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-400 flex items-center gap-1">
                      📊 Dashboard
                    </button>
                  )}
                  <button onClick={handleLogout}
                    className="bg-red-500/80 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500 flex items-center gap-1">
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => navigate('login')}
                    className="bg-white text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-50 flex items-center gap-1 shadow-md">
                    🔐 Login
                  </button>
                  <button onClick={() => navigate('register')}
                    className="bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-300 flex items-center gap-1">
                    👤 Register
                  </button>
                </div>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white p-1.5 rounded-lg hover:bg-white/15 text-xl">
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-green-900/95 backdrop-blur-lg border-t border-green-600 animate-slide-down">
            <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button key={item.key} onClick={() => navigate(item.key)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    currentPage === item.key ? 'bg-white text-green-700' : 'text-white hover:bg-white/10'
                  }`}>
                  <span>{item.icon}</span> {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Notification */}
      {notification && <Notification message={notification.message} type={notification.type} />}

      {/* Pages */}
      {currentPage === 'home' && renderHome()}
      {currentPage === 'login' && <LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(p as Page)} />}
      {currentPage === 'register' && <RegisterPage onRegister={handleRegister} onNavigate={(p) => navigate(p as Page)} showNotification={showNotification} />}
      {currentPage === 'dashboard' && renderDashboard()}
      {currentPage === 'admin' && renderAdmin()}
      {currentPage === 'msme-register' && (currentUser ? <MSMERegisterForm userEmail={currentUser.email} onSuccess={() => { refreshData(); navigate('dashboard'); }} showNotification={showNotification} /> : <LoginPage onLogin={handleLogin} onNavigate={(p) => navigate(p as Page)} />)}
      {currentPage === 'districts' && <DistrictsPage />}
      {currentPage === 'schemes' && renderSchemes()}
      {currentPage === 'clusters' && renderClusters()}
      {currentPage === 'analytics' && renderAnalytics()}
      {currentPage === 'odop' && renderOdop()}
      {currentPage === 'portals' && renderPortals()}
      {currentPage === 'contact' && renderContact()}

      {/* Enterprise Detail Modal */}
      {renderEnterpriseModal()}

      {renderFooter()}
    </div>
  );
}

export default App;
