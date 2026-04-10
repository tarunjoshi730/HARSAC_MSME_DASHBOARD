import { useState } from 'react';

interface Props {
  onRegister: (name: string, email: string, password: string, phone: string) => void;
  onNavigate: (page: string) => void;
  showNotification: (msg: string, type: 'success' | 'error') => void;
}

export default function RegisterPage({ onRegister, onNavigate, showNotification }: Props) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      showNotification('Passwords do not match!', 'error');
      return;
    }
    if (form.password.length < 6) {
      showNotification('Password must be at least 6 characters!', 'error');
      return;
    }
    onRegister(form.name, form.email, form.password, form.phone);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl">👤</div>
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 text-sm">Join Haryana MSME Portal</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
              placeholder="Enter your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
              placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
              placeholder="10-digit mobile number" pattern="[0-9]{10}" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
                placeholder="Min 6 chars" minLength={6} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm *</label>
              <input type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm"
                placeholder="Re-enter" minLength={6} />
            </div>
          </div>
          <button type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg">
            Create Account →
          </button>
        </form>
        <div className="mt-5 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{' '}
            <button onClick={() => onNavigate('login')} className="text-green-600 font-bold hover:underline">Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
}
