// Types for MSME Portal

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface MSMEEnterprise {
  id: string;
  userId: string;
  enterpriseName: string;
  ownerName: string;
  aadharNumber: string;
  panNumber: string;
  gstNumber: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  city: string;
  pincode: string;
  category: 'micro' | 'small' | 'medium';
  sector: string;
  investmentAmount: number;
  annualTurnover: number;
  employeeCount: number;
  udyamNumber?: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

export interface DashboardStats {
  totalEnterprises: number;
  microEnterprises: number;
  smallEnterprises: number;
  mediumEnterprises: number;
  pendingApprovals: number;
  totalEmployment: number;
  totalInvestment: number;
  districtWiseData: { district: string; count: number }[];
  sectorWiseData: { sector: string; count: number }[];
  monthlyRegistrations: { month: string; count: number }[];
}

export const HARYANA_DISTRICTS = [
  'Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad',
  'Gurugram', 'Hisar', 'Jhajjar', 'Jind', 'Kaithal',
  'Karnal', 'Kurukshetra', 'Mahendragarh', 'Nuh', 'Palwal',
  'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa',
  'Sonipat', 'Yamunanagar'
];

export const MSME_SECTORS = [
  'Manufacturing', 'Textile & Apparel', 'Food Processing', 'Auto Components',
  'Electronics & IT', 'Pharmaceuticals', 'Chemical & Fertilizers',
  'Engineering', 'Leather Products', 'Handicrafts', 'Agro-based',
  'Rubber & Plastics', 'Metal Fabrication', 'Paper Products',
  'Wood & Furniture', 'Printing & Packaging', 'Services', 'Other'
];

export const HARYANA_MSME_STATS: DashboardStats = {
  totalEnterprises: 892456,
  microEnterprises: 756234,
  smallEnterprises: 112456,
  mediumEnterprises: 23766,
  pendingApprovals: 4521,
  totalEmployment: 4250000,
  totalInvestment: 125000,
  districtWiseData: [
    { district: 'Gurugram', count: 125000 },
    { district: 'Faridabad', count: 98000 },
    { district: 'Panipat', count: 72000 },
    { district: 'Sonipat', count: 65000 },
    { district: 'Hisar', count: 58000 },
    { district: 'Karnal', count: 52000 },
    { district: 'Ambala', count: 48000 },
    { district: 'Rohtak', count: 45000 },
    { district: 'Yamunanagar', count: 42000 },
    { district: 'Sirsa', count: 38000 },
    { district: 'Kurukshetra', count: 35000 },
    { district: 'Jind', count: 32000 },
    { district: 'Kaithal', count: 28000 },
    { district: 'Fatehabad', count: 25000 },
    { district: 'Bhiwani', count: 22000 },
    { district: 'Mahendragarh', count: 20000 },
    { district: 'Rewari', count: 18000 },
    { district: 'Palwal', count: 15000 },
    { district: 'Jhajjar', count: 14000 },
    { district: 'Panchkula', count: 12000 },
    { district: 'Nuh', count: 10000 },
    { district: 'Charkhi Dadri', count: 8000 }
  ],
  sectorWiseData: [
    { sector: 'Manufacturing', count: 245000 },
    { sector: 'Services', count: 198000 },
    { sector: 'Textile & Apparel', count: 125000 },
    { sector: 'Food Processing', count: 85000 },
    { sector: 'Auto Components', count: 62000 },
    { sector: 'Engineering', count: 45000 },
    { sector: 'Electronics & IT', count: 38000 },
    { sector: 'Pharmaceuticals', count: 28000 },
    { sector: 'Other', count: 66456 }
  ],
  monthlyRegistrations: [
    { month: 'Jan', count: 12500 },
    { month: 'Feb', count: 11800 },
    { month: 'Mar', count: 15200 },
    { month: 'Apr', count: 13400 },
    { month: 'May', count: 14100 },
    { month: 'Jun', count: 12900 },
    { month: 'Jul', count: 11200 },
    { month: 'Aug', count: 13800 },
    { month: 'Sep', count: 14500 },
    { month: 'Oct', count: 15800 },
    { month: 'Nov', count: 16200 },
    { month: 'Dec', count: 14500 }
  ]
};
