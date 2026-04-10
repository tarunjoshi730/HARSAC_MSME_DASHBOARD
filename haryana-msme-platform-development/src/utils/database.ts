// Local Database Utility for MSME Portal
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  phone: string;
  createdAt: string;
}

export interface Enterprise {
  id: string;
  registrationNo: string;
  udyamNo: string;
  enterpriseName: string;
  ownerName: string;
  email: string;
  phone: string;
  aadhar: string;
  pan: string;
  gst: string;
  district: string;
  address: string;
  pincode: string;
  category: 'Micro' | 'Small' | 'Medium';
  sector: string;
  investment: string;
  turnover: string;
  employees: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  products: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  registrationDate: string;
  approvedDate?: string;
  approvedBy?: string;
  remarks?: string;
}

const DB_KEYS = {
  USERS: 'haryana_msme_users',
  ENTERPRISES: 'haryana_msme_enterprises',
  CURRENT_USER: 'haryana_msme_current_user'
};

// Initialize with default admin
const initDefaultData = () => {
  const users = localStorage.getItem(DB_KEYS.USERS);
  if (!users) {
    const defaultUsers: User[] = [
      {
        id: 'admin-001',
        email: 'admin@haryanamsme.gov.in',
        password: 'admin123',
        name: 'System Administrator',
        role: 'admin',
        phone: '9999999999',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  const enterprises = localStorage.getItem(DB_KEYS.ENTERPRISES);
  if (!enterprises) {
    const sampleEnterprises: Enterprise[] = [
      {
        id: 'ent-001',
        registrationNo: 'MSME-HR-2024-001',
        udyamNo: 'UDYAM-HR-01-0012345',
        enterpriseName: 'Haryana Steel Industries',
        ownerName: 'Rajesh Kumar',
        email: 'rajesh@steelindustries.com',
        phone: '9876543210',
        aadhar: '1234-5678-9012',
        pan: 'ABCDE1234F',
        gst: '06ABCDE1234F1Z5',
        district: 'Hisar',
        address: 'Industrial Area Phase-2, Hisar',
        pincode: '125001',
        category: 'Medium',
        sector: 'Manufacturing',
        investment: '50000000',
        turnover: '120000000',
        employees: '150',
        bankName: 'State Bank of India',
        accountNo: '1234567890',
        ifsc: 'SBIN0001234',
        products: 'Steel Bars, Wire Rods, Structural Steel',
        status: 'Approved',
        registrationDate: '2024-01-15T10:30:00Z',
        approvedDate: '2024-01-20T14:00:00Z',
        approvedBy: 'admin-001'
      },
      {
        id: 'ent-002',
        registrationNo: 'MSME-HR-2024-002',
        udyamNo: 'UDYAM-HR-01-0012346',
        enterpriseName: 'Gurugram Tech Solutions',
        ownerName: 'Priya Sharma',
        email: 'priya@gtechsolutions.com',
        phone: '9876543211',
        aadhar: '2345-6789-0123',
        pan: 'BCDEF2345G',
        gst: '06BCDEF2345G1Z6',
        district: 'Gurugram',
        address: 'Sector 44, Gurugram',
        pincode: '122003',
        category: 'Small',
        sector: 'IT/ITES',
        investment: '2500000',
        turnover: '8500000',
        employees: '45',
        bankName: 'HDFC Bank',
        accountNo: '9876543210',
        ifsc: 'HDFC0001234',
        products: 'Software Development, IT Consulting',
        status: 'Approved',
        registrationDate: '2024-02-10T11:00:00Z',
        approvedDate: '2024-02-15T09:30:00Z',
        approvedBy: 'admin-001'
      },
      {
        id: 'ent-003',
        registrationNo: 'MSME-HR-2024-003',
        udyamNo: 'UDYAM-HR-01-0012347',
        enterpriseName: 'Panipat Handloom Works',
        ownerName: 'Amit Verma',
        email: 'amit@panipathandloom.com',
        phone: '9876543212',
        aadhar: '3456-7890-1234',
        pan: 'CDEFG3456H',
        gst: '06CDEFG3456H1Z7',
        district: 'Panipat',
        address: 'Sector 18, Industrial Area, Panipat',
        pincode: '132103',
        category: 'Micro',
        sector: 'Manufacturing',
        investment: '800000',
        turnover: '2500000',
        employees: '12',
        bankName: 'Punjab National Bank',
        accountNo: '5678901234',
        ifsc: 'PUNB0001234',
        products: 'Bed Sheets, Curtains, Blankets',
        status: 'Pending',
        registrationDate: '2024-03-05T14:20:00Z'
      },
      {
        id: 'ent-004',
        registrationNo: 'MSME-HR-2024-004',
        udyamNo: 'UDYAM-HR-01-0012348',
        enterpriseName: 'Karnal Rice Mills',
        ownerName: 'Suresh Gupta',
        email: 'suresh@karnalrice.com',
        phone: '9876543213',
        aadhar: '4567-8901-2345',
        pan: 'DEFGH4567I',
        gst: '06DEFGH4567I1Z8',
        district: 'Karnal',
        address: 'Main GT Road, Karnal',
        pincode: '132001',
        category: 'Small',
        sector: 'Manufacturing',
        investment: '3500000',
        turnover: '15000000',
        employees: '35',
        bankName: 'Union Bank of India',
        accountNo: '6789012345',
        ifsc: 'UBIN0001234',
        products: 'Basmati Rice, Non-Basmati Rice, Rice Bran Oil',
        status: 'Approved',
        registrationDate: '2024-02-20T09:45:00Z',
        approvedDate: '2024-02-25T11:00:00Z',
        approvedBy: 'admin-001'
      },
      {
        id: 'ent-005',
        registrationNo: 'MSME-HR-2024-005',
        udyamNo: 'UDYAM-HR-01-0012349',
        enterpriseName: 'Ambala Scientific Co.',
        ownerName: 'Dr. Rakesh Bansal',
        email: 'rakesh@ambalascientific.com',
        phone: '9876543214',
        aadhar: '5678-9012-3456',
        pan: 'EFGHI5678J',
        gst: '06EFGHI5678J1Z9',
        district: 'Ambala',
        address: 'Scientific Market, Ambala City',
        pincode: '134003',
        category: 'Micro',
        sector: 'Manufacturing',
        investment: '500000',
        turnover: '1800000',
        employees: '8',
        bankName: 'Bank of Baroda',
        accountNo: '7890123456',
        ifsc: 'BARB0001234',
        products: 'Laboratory Equipment, Microscopes',
        status: 'Pending',
        registrationDate: '2024-03-12T16:30:00Z'
      },
      {
        id: 'ent-006',
        registrationNo: 'MSME-HR-2024-006',
        udyamNo: 'UDYAM-HR-01-0012350',
        enterpriseName: 'Faridabad Auto Components',
        ownerName: 'Vikram Singh',
        email: 'vikram@fac.com',
        phone: '9876543215',
        aadhar: '6789-0123-4567',
        pan: 'FGHIJ6789K',
        gst: '06FGHIJ6789K1Z0',
        district: 'Faridabad',
        address: 'Sector 24, Industrial Area, Faridabad',
        pincode: '121005',
        category: 'Medium',
        sector: 'Manufacturing',
        investment: '25000000',
        turnover: '75000000',
        employees: '85',
        bankName: 'ICICI Bank',
        accountNo: '8901234567',
        ifsc: 'ICIC0001234',
        products: 'Brake Pads, Clutch Plates, Suspension Parts',
        status: 'Approved',
        registrationDate: '2024-01-25T13:15:00Z',
        approvedDate: '2024-02-01T10:00:00Z',
        approvedBy: 'admin-001'
      },
      {
        id: 'ent-007',
        registrationNo: 'MSME-HR-2024-007',
        udyamNo: 'UDYAM-HR-01-0012351',
        enterpriseName: 'Yamunanagar Paper Mill',
        ownerName: 'Mohit Agarwal',
        email: 'mohit@ypm.com',
        phone: '9876543216',
        aadhar: '7890-1234-5678',
        pan: 'GHIJK7890L',
        gst: '06GHIJK7890L1Z1',
        district: 'Yamunanagar',
        address: 'Paper Mill Road, Yamunanagar',
        pincode: '135001',
        category: 'Medium',
        sector: 'Manufacturing',
        investment: '35000000',
        turnover: '95000000',
        employees: '120',
        bankName: 'Canara Bank',
        accountNo: '9012345678',
        ifsc: 'CNRB0001234',
        products: 'Writing Paper, Packaging Paper, Cardboard',
        status: 'Approved',
        registrationDate: '2024-02-05T08:45:00Z',
        approvedDate: '2024-02-12T15:30:00Z',
        approvedBy: 'admin-001'
      },
      {
        id: 'ent-008',
        registrationNo: 'MSME-HR-2024-008',
        udyamNo: 'UDYAM-HR-01-0012352',
        enterpriseName: 'Sonipat Food Processing',
        ownerName: 'Neha Kapoor',
        email: 'neha@sfp.com',
        phone: '9876543217',
        aadhar: '8901-2345-6789',
        pan: 'HIJKL8901M',
        gst: '06HIJKL8901M1Z2',
        district: 'Sonipat',
        address: 'Kundli Industrial Area, Sonipat',
        pincode: '131001',
        category: 'Small',
        sector: 'Food Processing',
        investment: '4500000',
        turnover: '12000000',
        employees: '28',
        bankName: 'Axis Bank',
        accountNo: '0123456789',
        ifsc: 'UTIB0001234',
        products: 'Ready-to-eat Meals, Pickles, Sauces',
        status: 'Pending',
        registrationDate: '2024-03-15T11:20:00Z'
      },
      {
        id: 'ent-009',
        registrationNo: 'MSME-HR-2024-009',
        udyamNo: 'UDYAM-HR-01-0012353',
        enterpriseName: 'Rewari Engineering Works',
        ownerName: 'Ramesh Yadav',
        email: 'ramesh@rew.com',
        phone: '9876543218',
        aadhar: '9012-3456-7890',
        pan: 'IJKLM9012N',
        gst: '06IJKLM9012N1Z3',
        district: 'Rewari',
        address: 'Dharuhera Industrial Area, Rewari',
        pincode: '123106',
        category: 'Small',
        sector: 'Manufacturing',
        investment: '6000000',
        turnover: '18000000',
        employees: '42',
        bankName: 'Yes Bank',
        accountNo: '1234509876',
        ifsc: 'YESB0001234',
        products: 'Machine Parts, CNC Components',
        status: 'Rejected',
        registrationDate: '2024-03-01T10:00:00Z',
        remarks: 'Incomplete documentation - GST certificate missing'
      },
      {
        id: 'ent-010',
        registrationNo: 'MSME-HR-2024-010',
        udyamNo: 'UDYAM-HR-01-0012354',
        enterpriseName: 'Rohtak Dairy Products',
        ownerName: 'Ankit Choudhary',
        email: 'ankit@rdp.com',
        phone: '9876543219',
        aadhar: '0123-4567-8901',
        pan: 'JKLMN0123O',
        gst: '06JKLMN0123O1Z4',
        district: 'Rohtak',
        address: 'Delhi Road, Rohtak',
        pincode: '124001',
        category: 'Micro',
        sector: 'Food Processing',
        investment: '1200000',
        turnover: '4500000',
        employees: '15',
        bankName: 'Indian Bank',
        accountNo: '2345678901',
        ifsc: 'IDIB0001234',
        products: 'Milk, Curd, Paneer, Ghee',
        status: 'Pending',
        registrationDate: '2024-03-18T09:30:00Z'
      }
    ];
    localStorage.setItem(DB_KEYS.ENTERPRISES, JSON.stringify(sampleEnterprises));
  }
};

// User operations
export const getUsers = (): User[] => {
  initDefaultData();
  const data = localStorage.getItem(DB_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  return newUser;
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
  }
  return user || null;
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem(DB_KEYS.CURRENT_USER);
};

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};

// Enterprise operations
export const getEnterprises = (): Enterprise[] => {
  initDefaultData();
  const data = localStorage.getItem(DB_KEYS.ENTERPRISES);
  return data ? JSON.parse(data) : [];
};

export const createEnterprise = (enterprise: Omit<Enterprise, 'id' | 'registrationNo' | 'registrationDate'>): Enterprise => {
  const enterprises = getEnterprises();
  const newEnterprise: Enterprise = {
    ...enterprise,
    id: `ent-${Date.now()}`,
    registrationNo: `MSME-HR-${new Date().getFullYear()}-${String(enterprises.length + 1).padStart(3, '0')}`,
    registrationDate: new Date().toISOString()
  };
  enterprises.push(newEnterprise);
  localStorage.setItem(DB_KEYS.ENTERPRISES, JSON.stringify(enterprises));
  return newEnterprise;
};

export const updateEnterprise = (id: string, updates: Partial<Enterprise>): Enterprise | null => {
  const enterprises = getEnterprises();
  const index = enterprises.findIndex(e => e.id === id);
  if (index !== -1) {
    enterprises[index] = { ...enterprises[index], ...updates };
    localStorage.setItem(DB_KEYS.ENTERPRISES, JSON.stringify(enterprises));
    return enterprises[index];
  }
  return null;
};

export const deleteEnterprise = (id: string): boolean => {
  const enterprises = getEnterprises();
  const filtered = enterprises.filter(e => e.id !== id);
  if (filtered.length !== enterprises.length) {
    localStorage.setItem(DB_KEYS.ENTERPRISES, JSON.stringify(filtered));
    return true;
  }
  return false;
};

export const getEnterpriseById = (id: string): Enterprise | null => {
  const enterprises = getEnterprises();
  return enterprises.find(e => e.id === id) || null;
};

export const getEnterprisesByStatus = (status: Enterprise['status']): Enterprise[] => {
  return getEnterprises().filter(e => e.status === status);
};

export const getEnterprisesByDistrict = (district: string): Enterprise[] => {
  return getEnterprises().filter(e => e.district === district);
};

export const getEnterprisesByUserEmail = (email: string): Enterprise[] => {
  return getEnterprises().filter(e => e.email === email);
};

// Statistics
export const getStatistics = () => {
  const enterprises = getEnterprises();
  return {
    total: enterprises.length,
    pending: enterprises.filter(e => e.status === 'Pending').length,
    approved: enterprises.filter(e => e.status === 'Approved').length,
    rejected: enterprises.filter(e => e.status === 'Rejected').length,
    micro: enterprises.filter(e => e.category === 'Micro').length,
    small: enterprises.filter(e => e.category === 'Small').length,
    medium: enterprises.filter(e => e.category === 'Medium').length,
    totalEmployees: enterprises.reduce((sum, e) => sum + parseInt(e.employees || '0'), 0),
    totalInvestment: enterprises.reduce((sum, e) => sum + parseInt(e.investment || '0'), 0),
    totalTurnover: enterprises.reduce((sum, e) => sum + parseInt(e.turnover || '0'), 0)
  };
};
