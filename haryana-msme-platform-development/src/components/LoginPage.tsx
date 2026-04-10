import { useState } from 'react';

interface Props {
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
  showNotification: (msg: string, type: 'success' | 'error') => void;
}

export default function LoginPage({ onLogin, onNavigate, showNotification }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginAs, setLoginAs] = useState<'user' | 'admin'>('user');

  const handleDemoClick = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@haryanamsme.gov.in');
      setPassword('admin123');
    } else {
      setEmail('user@example.com');
      setPassword('user123');
    }
    setLoginAs(role);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showNotification('Please fill in all fields!', 'error');
      return;
    }
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters!', 'error');
      return;
    }
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">🔐</div>
          <h2 className="text-2xl font-bold text-gray-800">Sign In to MSME Portal</h2>
          <p className="text-gray-500 text-sm">Haryana Government</p>
        </div>

        {/* Role Selector - Option A & B */}
        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => handleDemoClick('user')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              loginAs === 'user' 
                ? 'bg-green-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            👤 Option A — User
          </button>
          <button
            type="button"
            onClick={() => handleDemoClick('admin')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              loginAs === 'admin' 
                ? 'bg-purple-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            🔑 Option B — Admin
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">📧 Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter your email" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">🔒 Password</label>
            <div className="relative">
              <input 
                type={showPass ? 'text' : 'password'} 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-12"
                placeholder="Enter your password" 
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button 
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-base transition-all shadow-lg hover:shadow-xl ${
              loginAs === 'admin'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700'
            }`}
          >
            {loginAs === 'admin' ? '🔑 Sign In as Admin →' : '👤 Sign In as User →'}
          </button>
        </form>
        <div className="mt-5 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{' '}
            <button onClick={() => onNavigate('register')} className="text-green-600 font-bold hover:underline">Register here</button>
          </p>
        </div>
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
          <p className="text-xs font-bold text-gray-800 mb-2">📋 Demo Credentials:</p>
          <div className="space-y-1 text-xs text-gray-600">
            <p><span className="text-green-600 font-bold">Option A (User):</span> Register new account →</p>
            <p><span className="text-purple-600 font-bold">Option B (Admin):</span> admin@haryanamsme.gov.in / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}