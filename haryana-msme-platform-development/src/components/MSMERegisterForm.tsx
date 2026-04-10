import { useState } from 'react';
import { HARYANA_DISTRICTS } from '../data/haryanaData';
import { createEnterprise } from '../utils/database';

interface Props {
  userEmail: string;
  onSuccess: () => void;
  showNotification: (msg: string, type: 'success' | 'error') => void;
}

export default function MSMERegisterForm({ userEmail, onSuccess, showNotification }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    udyamNo: '', enterpriseName: '', ownerName: '', email: userEmail, phone: '',
    aadhar: '', pan: '', gst: '', district: '', address: '', pincode: '',
    category: '', sector: '',
    investment: '', turnover: '', employees: '', bankName: '', accountNo: '', ifsc: '', products: '',
  });

  const u = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));
  const ic = "w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm";
  const lc = "block text-sm font-medium text-gray-700 mb-1";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category) { showNotification('Please select enterprise category', 'error'); return; }
    createEnterprise({
      ...form,
      category: form.category as 'Micro' | 'Small' | 'Medium',
      udyamNo: form.udyamNo || 'UDYAM-HR-' + Date.now().toString().slice(-7),
      status: 'Pending',
    });
    showNotification('🎉 MSME Registration submitted! Awaiting admin approval.', 'success');
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-6 text-white">
            <h1 className="text-2xl font-bold">📋 MSME / Udyam Registration</h1>
            <p className="text-green-100 text-sm mt-1">Register your enterprise on Haryana MSME Portal</p>
            <div className="flex gap-2 mt-5">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex-1">
                  <div className={`h-2 rounded-full ${step >= s ? 'bg-yellow-400' : 'bg-white/30'}`} />
                  <p className="text-xs mt-1 text-green-200">Step {s}: {s === 1 ? 'Basic Info' : s === 2 ? 'Address' : 'Business'}</p>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={onSubmit} className="p-6">
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Step 1: Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={lc}>Enterprise Name *</label><input required className={ic} value={form.enterpriseName} onChange={e => u('enterpriseName', e.target.value)} placeholder="Enter enterprise name" /></div>
                  <div><label className={lc}>Owner Name *</label><input required className={ic} value={form.ownerName} onChange={e => u('ownerName', e.target.value)} placeholder="Full name" /></div>
                  <div><label className={lc}>Email *</label><input type="email" required className={ic} value={form.email} onChange={e => u('email', e.target.value)} placeholder="Email" /></div>
                  <div><label className={lc}>Phone *</label><input type="tel" required className={ic} value={form.phone} onChange={e => u('phone', e.target.value)} placeholder="10-digit mobile" pattern="[0-9]{10}" /></div>
                  <div><label className={lc}>Aadhar Number *</label><input required className={ic} value={form.aadhar} onChange={e => u('aadhar', e.target.value)} placeholder="XXXX-XXXX-XXXX" /></div>
                  <div><label className={lc}>PAN Number *</label><input required className={ic} value={form.pan} onChange={e => u('pan', e.target.value)} placeholder="ABCDE1234F" style={{ textTransform: 'uppercase' }} /></div>
                  <div><label className={lc}>GST Number</label><input className={ic} value={form.gst} onChange={e => u('gst', e.target.value)} placeholder="Optional" /></div>
                  <div><label className={lc}>Existing Udyam No.</label><input className={ic} value={form.udyamNo} onChange={e => u('udyamNo', e.target.value)} placeholder="If any" /></div>
                </div>
                <div className="flex justify-end pt-4">
                  <button type="button" onClick={() => setStep(2)} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700">Next: Address →</button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Step 2: Address & Classification</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><label className={lc}>Full Address *</label><textarea required className={ic} value={form.address} onChange={e => u('address', e.target.value)} placeholder="Complete address" rows={2} /></div>
                  <div>
                    <label className={lc}>District *</label>
                    <select required className={ic + ' pr-8'} value={form.district} onChange={e => u('district', e.target.value)}>
                      <option value="">Select District</option>
                      {HARYANA_DISTRICTS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                  <div><label className={lc}>PIN Code *</label><input required className={ic} value={form.pincode} onChange={e => u('pincode', e.target.value)} placeholder="6-digit PIN" pattern="[0-9]{6}" /></div>
                  <div>
                    <label className={lc}>Category *</label>
                    <select required className={ic + ' pr-8'} value={form.category} onChange={e => u('category', e.target.value)}>
                      <option value="">Select Category</option>
                      <option value="Micro">Micro (Inv ≤ ₹1Cr, TO ≤ ₹5Cr)</option>
                      <option value="Small">Small (Inv ≤ ₹10Cr, TO ≤ ₹50Cr)</option>
                      <option value="Medium">Medium (Inv ≤ ₹50Cr, TO ≤ ₹250Cr)</option>
                    </select>
                  </div>
                  <div>
                    <label className={lc}>Sector *</label>
                    <select required className={ic + ' pr-8'} value={form.sector} onChange={e => u('sector', e.target.value)}>
                      <option value="">Select Sector</option>
                      {['Manufacturing','Trading','Services','IT/ITES','Food Processing','Textiles','Auto Components','Agriculture Allied','Handicrafts','Other'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setStep(1)} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-300">← Back</button>
                  <button type="button" onClick={() => setStep(3)} className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-green-700">Next: Business →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Step 3: Business & Bank Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className={lc}>Investment (₹) *</label><input type="number" required className={ic} value={form.investment} onChange={e => u('investment', e.target.value)} placeholder="Amount in ₹" /></div>
                  <div><label className={lc}>Turnover (₹) *</label><input type="number" required className={ic} value={form.turnover} onChange={e => u('turnover', e.target.value)} placeholder="Annual turnover" /></div>
                  <div><label className={lc}>Employees *</label><input type="number" required className={ic} value={form.employees} onChange={e => u('employees', e.target.value)} placeholder="Total" /></div>
                  <div><label className={lc}>Products / Services *</label><input required className={ic} value={form.products} onChange={e => u('products', e.target.value)} placeholder="e.g. Auto Parts" /></div>
                  <div><label className={lc}>Bank Name *</label><input required className={ic} value={form.bankName} onChange={e => u('bankName', e.target.value)} placeholder="Bank" /></div>
                  <div><label className={lc}>Account No. *</label><input required className={ic} value={form.accountNo} onChange={e => u('accountNo', e.target.value)} placeholder="Account number" /></div>
                  <div><label className={lc}>IFSC Code *</label><input required className={ic} value={form.ifsc} onChange={e => u('ifsc', e.target.value)} placeholder="e.g. SBIN0001234" style={{ textTransform: 'uppercase' }} /></div>
                </div>
                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setStep(2)} className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-300">← Back</button>
                  <button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 shadow-lg">
                    📋 Submit Registration
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
