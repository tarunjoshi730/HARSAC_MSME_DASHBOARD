// ============================================================
// Comprehensive Haryana MSME Data + Ministry of MSME (msme.gov.in)
// ============================================================

export const HARYANA_DISTRICTS = [
  { id: 1, name: 'Ambala', code: 'AMB', lat: 30.3782, lng: 76.7767, population: 1128350, area: 1569, blocks: 5, industrialArea: 'Ambala City Industrial Area', keyIndustries: ['Scientific Instruments', 'Food Processing', 'Textiles', 'Surgical Equipment'], totalUdyam: 38456, micro: 35890, small: 2210, medium: 356, employment: 145000 },
  { id: 2, name: 'Bhiwani', code: 'BHW', lat: 28.7990, lng: 76.1320, population: 1634445, area: 5140, blocks: 7, industrialArea: 'Bhiwani Industrial Estate', keyIndustries: ['Textiles', 'Woolen Industry', 'Cotton Ginning', 'Oil Mills'], totalUdyam: 22340, micro: 20890, small: 1250, medium: 200, employment: 89500 },
  { id: 3, name: 'Charkhi Dadri', code: 'CDR', lat: 28.5921, lng: 76.2708, population: 502276, area: 1370, blocks: 3, industrialArea: 'Dadri Industrial Area', keyIndustries: ['Cotton Processing', 'Food Processing', 'Brick Kilns'], totalUdyam: 9870, micro: 9345, small: 456, medium: 69, employment: 38200 },
  { id: 4, name: 'Faridabad', code: 'FRB', lat: 28.4089, lng: 77.3178, population: 1809733, area: 741, blocks: 4, industrialArea: 'Sector 24-25 Industrial Area, NHPC Chowk', keyIndustries: ['Auto Parts', 'Electronics', 'Engineering', 'IT', 'Rubber Products'], totalUdyam: 98760, micro: 89450, small: 8120, medium: 1190, employment: 425000 },
  { id: 5, name: 'Fatehabad', code: 'FTB', lat: 29.5152, lng: 75.4551, population: 942011, area: 2538, blocks: 5, industrialArea: 'Fatehabad Industrial Estate', keyIndustries: ['Agro Processing', 'Rice Milling', 'Cotton', 'Dairy'], totalUdyam: 14560, micro: 13890, small: 580, medium: 90, employment: 52100 },
  { id: 6, name: 'Gurugram', code: 'GRG', lat: 28.4595, lng: 77.0266, population: 1514432, area: 1253, blocks: 4, industrialArea: 'Udyog Vihar Phase I-V, IMT Manesar', keyIndustries: ['IT/ITES', 'Automobile', 'FMCG', 'Pharma', 'Startups', 'Financial Services'], totalUdyam: 124496, micro: 117103, small: 6493, medium: 900, employment: 680000 },
  { id: 7, name: 'Hisar', code: 'HSR', lat: 29.1492, lng: 75.7217, population: 1743931, area: 3983, blocks: 7, industrialArea: 'HSIIDC Industrial Model Township', keyIndustries: ['Steel Pipes', 'Textiles', 'Agro Processing', 'Cotton Ginning', 'Iron'], totalUdyam: 48920, micro: 45670, small: 2780, medium: 470, employment: 198000 },
  { id: 8, name: 'Jhajjar', code: 'JHJ', lat: 28.6062, lng: 76.6565, population: 958405, area: 1868, blocks: 5, industrialArea: 'Bahadurgarh Industrial Area', keyIndustries: ['Food Processing', 'Dairy', 'Handloom', 'Paper Products'], totalUdyam: 16780, micro: 15890, small: 780, medium: 110, employment: 65800 },
  { id: 9, name: 'Jind', code: 'JND', lat: 29.3162, lng: 76.3166, population: 1334152, area: 2702, blocks: 7, industrialArea: 'Jind Industrial Estate', keyIndustries: ['Rice Milling', 'Agro Processing', 'Cotton', 'Mustard Oil'], totalUdyam: 21450, micro: 20340, small: 960, medium: 150, employment: 88500 },
  { id: 10, name: 'Kaithal', code: 'KTL', lat: 29.8017, lng: 76.3996, population: 1074304, area: 2317, blocks: 6, industrialArea: 'Kaithal Industrial Area', keyIndustries: ['Agro Processing', 'Rice Milling', 'Dairy', 'Sugar'], totalUdyam: 17230, micro: 16450, small: 680, medium: 100, employment: 72400 },
  { id: 11, name: 'Karnal', code: 'KRN', lat: 29.6857, lng: 76.9905, population: 1505324, area: 2520, blocks: 6, industrialArea: 'Karnal Industrial Estate, Sector 3 HUDA', keyIndustries: ['Rice Milling', 'Auto Parts', 'Agro Equipment', 'Dairy', 'Basmati'], totalUdyam: 42350, micro: 39670, small: 2310, medium: 370, employment: 175000 },
  { id: 12, name: 'Kurukshetra', code: 'KKS', lat: 29.9695, lng: 76.8783, population: 964655, area: 1530, blocks: 5, industrialArea: 'Thanesar Industrial Area', keyIndustries: ['Rice Milling', 'Food Processing', 'Handicrafts', 'Tourism'], totalUdyam: 18560, micro: 17560, small: 870, medium: 130, employment: 78500 },
  { id: 13, name: 'Mahendragarh', code: 'MGR', lat: 28.2516, lng: 76.1578, population: 922088, area: 1859, blocks: 5, industrialArea: 'Narnaul Industrial Area', keyIndustries: ['Mining', 'Stone Crushing', 'Cement', 'Marble'], totalUdyam: 13450, micro: 12890, small: 480, medium: 80, employment: 48600 },
  { id: 14, name: 'Nuh (Mewat)', code: 'NUH', lat: 28.1035, lng: 77.0020, population: 1089263, area: 1860, blocks: 5, industrialArea: 'Nuh Industrial Estate', keyIndustries: ['Food Processing', 'Handicrafts', 'Dairy', 'Pottery'], totalUdyam: 8950, micro: 8670, small: 240, medium: 40, employment: 32500 },
  { id: 15, name: 'Palwal', code: 'PLW', lat: 28.1487, lng: 77.3320, population: 1042708, area: 1359, blocks: 4, industrialArea: 'Palwal Industrial Area', keyIndustries: ['Food Processing', 'Brick Kilns', 'Dairy', 'Auto Parts'], totalUdyam: 15670, micro: 14890, small: 670, medium: 110, employment: 58900 },
  { id: 16, name: 'Panchkula', code: 'PCL', lat: 30.6942, lng: 76.8606, population: 561293, area: 898, blocks: 3, industrialArea: 'Panchkula Industrial Area Phase I & II', keyIndustries: ['IT', 'Pharma', 'Electronics', 'Precision Instruments'], totalUdyam: 24560, micro: 22890, small: 1420, medium: 250, employment: 112000 },
  { id: 17, name: 'Panipat', code: 'PNP', lat: 29.3909, lng: 76.9635, population: 1205437, area: 1268, blocks: 5, industrialArea: 'Sector 29 Industrial Area, Textile Hub', keyIndustries: ['Textiles', 'Recycling', 'Handloom', 'Carpet', 'Shoddy Yarn'], totalUdyam: 56780, micro: 53450, small: 2870, medium: 460, employment: 245000 },
  { id: 18, name: 'Rewari', code: 'RWR', lat: 28.1926, lng: 76.6236, population: 900392, area: 1559, blocks: 4, industrialArea: 'Dharuhera Industrial Area, HSIIDC Bawal', keyIndustries: ['Auto Parts', 'Engineering', 'Food Processing', 'Brass'], totalUdyam: 21340, micro: 19890, small: 1250, medium: 200, employment: 92000 },
  { id: 19, name: 'Rohtak', code: 'RTK', lat: 28.8955, lng: 76.6066, population: 1061204, area: 1668, blocks: 5, industrialArea: 'Rohtak Industrial Area, HSIIDC', keyIndustries: ['Auto Parts', 'Food Processing', 'Handloom', 'Chemicals'], totalUdyam: 32450, micro: 30560, small: 1640, medium: 250, employment: 135000 },
  { id: 20, name: 'Sirsa', code: 'SRS', lat: 29.5352, lng: 75.0317, population: 1295189, area: 4277, blocks: 7, industrialArea: 'Sirsa Industrial Estate', keyIndustries: ['Cotton', 'Agro Processing', 'Rice Milling', 'Oil Extraction'], totalUdyam: 18340, micro: 17450, small: 770, medium: 120, employment: 78200 },
  { id: 21, name: 'Sonipat', code: 'SNP', lat: 28.9931, lng: 77.0151, population: 1450001, area: 2260, blocks: 6, industrialArea: 'Kundli Industrial Area, Rai Industrial Area', keyIndustries: ['Auto Parts', 'Food Processing', 'Textiles', 'Electronics', 'Cycle Parts'], totalUdyam: 52340, micro: 49120, small: 2780, medium: 440, employment: 215000 },
  { id: 22, name: 'Yamunanagar', code: 'YMN', lat: 30.1290, lng: 77.2674, population: 1214205, area: 1756, blocks: 5, industrialArea: 'Yamunanagar Industrial Area, Jagadhri Workshop', keyIndustries: ['Paper', 'Plywood', 'Sugar', 'Steel Utensils', 'Brass'], totalUdyam: 38450, micro: 35890, small: 2190, medium: 370, employment: 162000 }
];

// From msme.gov.in - Complete Schemes Data
export const CENTRAL_SCHEMES = [
  {
    id: 1, name: 'PM Vishwakarma', icon: '🔨',
    fullName: 'PM Vishwakarma Yojana',
    description: 'Holistic scheme for traditional artisans and craftspeople working with hands and tools in 18 trades',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹13,000 Crore',
    eligibility: 'Traditional artisans & craftspeople in 18 identified trades',
    benefits: ['PM Vishwakarma Certificate & ID Card', 'Skill Training (5-7 days basic + 15 days advanced)', 'Toolkit Incentive up to ₹15,000', 'Collateral-free loans up to ₹3 Lakh at 5% interest', 'Incentive for Digital Transactions', 'Marketing Support on GeM & e-commerce'],
    status: 'Active', launched: '2023',
    link: 'https://pmvishwakarma.gov.in/'
  },
  {
    id: 2, name: 'PMEGP', icon: '💼',
    fullName: 'Prime Minister Employment Generation Programme',
    description: 'Credit-linked subsidy programme for generating self-employment opportunities through establishment of micro-enterprises',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹3,580 Crore (2024-25)',
    eligibility: 'Individuals above 18 years, SHGs, Cooperative Societies, Charitable Trusts',
    benefits: ['15-35% subsidy on project cost', 'Max ₹50 Lakh (Mfg) / ₹25 Lakh (Service)', 'No income ceiling for manufacturing', '2nd loan for expansion up to ₹1 Crore'],
    status: 'Active', launched: '2008',
    link: 'https://www.kviconline.gov.in/pmegpeportal/'
  },
  {
    id: 3, name: 'CGTMSE', icon: '🛡️',
    fullName: 'Credit Guarantee Fund Trust for Micro & Small Enterprises',
    description: 'Provides collateral-free credit to MSEs, enabling easier bank loan access without third-party guarantee',
    ministry: 'Ministry of MSME & SIDBI',
    budget: '₹9,000 Crore Corpus',
    eligibility: 'New and existing Micro & Small Enterprises',
    benefits: ['Collateral-free credit up to ₹5 Crore', 'Guarantee coverage up to 85% for Micro', '75% for Small enterprises', 'Covers term loan & working capital'],
    status: 'Active', launched: '2000',
    link: 'https://www.cgtmse.in/'
  },
  {
    id: 4, name: 'CHAMPIONS Portal', icon: '🏆',
    fullName: 'Creation and Harmonious Application of Modern Processes for Increasing Output and National Strength',
    description: 'ICT-based technology platform for making MSMEs national and international champions by solving problems end-to-end',
    ministry: 'Ministry of MSME, GoI',
    budget: 'Integrated Platform',
    eligibility: 'All MSMEs seeking assistance',
    benefits: ['Grievance Redressal', 'Handholding for COVID recovery', 'Single window for all MSME issues', 'Direct access to Ministry officials'],
    status: 'Active', launched: '2020',
    link: 'https://champions.gov.in/'
  },
  {
    id: 5, name: 'SAMADHAAN', icon: '⚖️',
    fullName: 'MSME Samadhaan - Delayed Payment Monitoring System',
    description: 'Enables MSMEs to file cases against buyers for delayed payments directly on the portal',
    ministry: 'Ministry of MSME, GoI',
    budget: 'Regulatory Platform',
    eligibility: 'MSMEs with Udyam registration facing delayed payments',
    benefits: ['Online filing of delayed payment cases', 'Tracking case status', 'Buyer accountability', 'Resolution within 90 days'],
    status: 'Active', launched: '2017',
    link: 'https://samadhaan.msme.gov.in/'
  },
  {
    id: 6, name: 'ZED Certification', icon: '✅',
    fullName: 'Zero Defect Zero Effect Scheme',
    description: 'Quality certification scheme encouraging MSMEs to manufacture quality products with minimal environmental impact',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹500 Crore',
    eligibility: 'All Udyam registered MSMEs',
    benefits: ['Subsidy: 80% Micro, 60% Small, 50% Medium', 'International quality standards', 'Brand building', 'Global competitiveness'],
    status: 'Active', launched: '2016',
    link: 'https://zed.msme.gov.in/'
  },
  {
    id: 7, name: 'MSME Sambandh', icon: '🤝',
    fullName: 'Public Procurement Monitoring Portal',
    description: 'Monitors and facilitates public procurement from MSMEs, ensuring 25% procurement target compliance',
    ministry: 'Ministry of MSME, GoI',
    budget: 'Monitoring Platform',
    eligibility: 'All registered MSMEs supplying to CPSEs',
    benefits: ['25% procurement from MSMEs mandated', '4% from SC/ST MSMEs', '3% from women-owned MSMEs', 'Transparent procurement data'],
    status: 'Active', launched: '2018',
    link: 'https://sambandh.msme.gov.in/'
  },
  {
    id: 8, name: 'Udyam Registration', icon: '📋',
    fullName: 'Udyam Registration Portal',
    description: 'Free, paperless, self-declaration based online registration for MSMEs. No documents required. Permanent Udyam number issued.',
    ministry: 'Ministry of MSME, GoI',
    budget: 'Free Registration',
    eligibility: 'Any person intending to establish MSME in India with valid Aadhar & PAN',
    benefits: ['Permanent Udyam Registration Number', 'Udyam Certificate', 'Access to all MSME schemes', 'Bank loan priority', 'Government tender eligibility'],
    status: 'Active', launched: '2020',
    link: 'https://udyamregistration.gov.in/'
  },
  {
    id: 9, name: 'SFURTI', icon: '🏭',
    fullName: 'Scheme of Fund for Regeneration of Traditional Industries',
    description: 'Organizes traditional industries and artisans into clusters for enhanced productivity and competitiveness',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹2,500 Crore',
    eligibility: 'Clusters of traditional artisans (min 500 for regular, 1000 for major)',
    benefits: ['Up to ₹8 Crore per cluster', 'Common facility centers', 'Design & product development', 'Market access support'],
    status: 'Active', launched: '2005',
    link: 'https://sfurti.msme.gov.in/'
  },
  {
    id: 10, name: 'ASPIRE', icon: '🚀',
    fullName: 'A Scheme for Promotion of Innovation, Rural Industries & Entrepreneurship',
    description: 'Promotes innovation and rural entrepreneurship through incubation centers and startups',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹210 Crore',
    eligibility: 'Innovators, rural entrepreneurs, technology business incubators',
    benefits: ['Livelihood Business Incubators (LBI)', 'Technology Business Incubators (TBI)', 'Fund of Funds for startups', 'Up to ₹1 Crore per incubator'],
    status: 'Active', launched: '2015',
    link: 'https://aspire.msme.gov.in/'
  },
  {
    id: 11, name: 'ME Card', icon: '💳',
    fullName: 'Micro Enterprise Credit Card',
    description: 'Customized credit card scheme for Udyam-registered Micro Enterprises for quick working capital access',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹5,000 Crore (Phase 1)',
    eligibility: 'Udyam-registered Micro Enterprises (Investment < ₹1 Cr, Turnover < ₹5 Cr)',
    benefits: ['Credit limit of ₹5 Lakh', '10 Lakh cards in first year', 'Quick working capital', 'Simplified documentation'],
    status: 'Active', launched: '2025',
    link: 'https://msme.gov.in/'
  },
  {
    id: 12, name: 'RAMP', icon: '📈',
    fullName: 'Raising and Accelerating MSME Performance',
    description: 'World Bank-assisted programme to improve MSME access to market and credit, technology upgradation, and greening',
    ministry: 'Ministry of MSME, GoI',
    budget: '₹6,062 Crore',
    eligibility: 'MSMEs across all states',
    benefits: ['Market access improvement', 'Credit facilitation', 'Technology upgradation', 'Environmental compliance support'],
    status: 'Active', launched: '2022',
    link: 'https://ramp.msme.gov.in/'
  }
];

// Haryana State Schemes
export const HARYANA_SCHEMES = [
  {
    id: 101, name: 'PADMA', icon: '🌸',
    fullName: 'Programme to Accelerate Development for MSME Advancement',
    description: 'State initiative to develop MSME clusters with common infrastructure in every block of Haryana',
    budget: '₹500 Crore', status: 'Active',
    benefits: ['25 acres minimum cluster area', 'Common Facility Centers', 'Plug & Play infrastructure', 'Testing laboratories']
  },
  {
    id: 102, name: 'HEPP 2020', icon: '📜',
    fullName: 'Haryana Enterprise & Employment Policy 2020',
    description: 'Comprehensive state policy providing fiscal incentives to new and expanding enterprises in Haryana',
    budget: 'State Budget', status: 'Active',
    benefits: ['Net SGST reimbursement up to 10 years', 'Stamp duty exemption 100%', 'Electricity duty exemption 10 years', 'Employment subsidy ₹48,000/year per employee', 'Interest subsidy 5% for 7 years', 'CLU charges exemption']
  },
  {
    id: 103, name: 'MSME Award', icon: '🏅',
    fullName: 'Haryana State MSME Awards',
    description: 'Annual recognition for outstanding MSMEs in various categories including quality, innovation, export and women entrepreneurship',
    budget: '₹5 Crore', status: 'Active',
    benefits: ['Cash prize up to ₹5 Lakh', 'State recognition certificate', 'Publicity and branding support']
  },
  {
    id: 104, name: 'ODOP', icon: '🎯',
    fullName: 'One District One Product',
    description: 'Identifies signature products of each district for focused development, marketing, and export promotion',
    budget: '₹100 Crore', status: 'Active',
    benefits: ['Brand promotion of local products', 'Market linkage support', 'Quality improvement', 'Export facilitation']
  }
];

export const FIELD_OFFICES = [
  { district: 'Ambala', officer: 'Sh. Deepak Narwal', designation: 'Deputy Director', address: 'Room No. 222-223, 2nd Floor, Mini Secretariat, Ambala Cantt', phone: '0171-2632247', email: 'ad-amb.msme@hry.gov.in' },
  { district: 'Bhiwani', officer: 'Smt. Neelima', designation: 'Deputy Director', address: 'Room No. 107, 2nd Floor, Mini Secretariat, Bhiwani', phone: '01664-242425', email: 'ad-bhw.msme@hry.gov.in' },
  { district: 'Charkhi Dadri', officer: 'Sh. Sandeep Dangi', designation: 'Deputy Director', address: 'Room No. 13-14, Kisan Model School, Loharu Road', phone: '01276-243563', email: 'ad-cdd.msme@hry.gov.in' },
  { district: 'Faridabad', officer: 'Sh. Ramandeep', designation: 'Deputy Director', address: 'District MSME Centre, Near Neelam Chowk, Faridabad', phone: '0129-4611002', email: 'ad-frb.msme@hry.gov.in' },
  { district: 'Fatehabad', officer: 'Sh. Janak Kumar', designation: 'Deputy Director', address: '1st Floor, Panchayat Bhawan, Fatehabad', phone: '01667-225123', email: 'ad-ftb.msme@hry.gov.in' },
  { district: 'Gurugram', officer: 'Sh. Gaurav Lather', designation: 'Deputy Director', address: 'Plot No. 2, IDC, Sector-16, Gurugram', phone: '0124-2334254', email: 'ad-grg.msme@hry.gov.in' },
  { district: 'Hisar', officer: 'Sh. Vikram Singh', designation: 'Deputy Director', address: 'District MSME Centre, Hisar', phone: '01662-234567', email: 'ad-hsr.msme@hry.gov.in' },
  { district: 'Jhajjar', officer: 'Sh. Sudarshan', designation: 'Deputy Director', address: 'Old Industrial Area, Near ZECO Company, Bahadurgarh', phone: '01276-243563', email: 'ad-jhj.msme@hry.gov.in' },
  { district: 'Jind', officer: 'Sh. Ritul Singla', designation: 'Deputy Director', address: 'Near Mini Secretariat, Court Road, Jind', phone: '01681-245384', email: 'ad-jnd.msme@hry.gov.in' },
  { district: 'Kaithal', officer: 'Sh. Kapil Mittal', designation: 'Deputy Director', address: 'District MSME Center, Kaithal', phone: '01746-223456', email: 'ad-ktl.msme@hry.gov.in' },
  { district: 'Karnal', officer: 'Sh. Sunil Sharma', designation: 'Deputy Director', address: 'District MSME Centre, Karnal', phone: '0184-2255678', email: 'ad-krn.msme@hry.gov.in' },
  { district: 'Kurukshetra', officer: 'Sh. Pankaj Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Thanesar', phone: '01744-234567', email: 'ad-kks.msme@hry.gov.in' },
  { district: 'Mahendragarh', officer: 'Sh. Rajender Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Narnaul', phone: '01282-245678', email: 'ad-mgr.msme@hry.gov.in' },
  { district: 'Nuh', officer: 'Sh. Mohd. Imran', designation: 'Deputy Director', address: 'District MSME Centre, Nuh', phone: '01267-225456', email: 'ad-nuh.msme@hry.gov.in' },
  { district: 'Palwal', officer: 'Sh. Ravi Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Palwal', phone: '01275-234567', email: 'ad-plw.msme@hry.gov.in' },
  { district: 'Panchkula', officer: 'Sh. Manish Gupta', designation: 'Deputy Director', address: 'District MSME Centre, Panchkula', phone: '0172-2560132', email: 'ad-pcl.msme@hry.gov.in' },
  { district: 'Panipat', officer: 'Sh. Amit Verma', designation: 'Deputy Director', address: 'District MSME Centre, Panipat', phone: '0180-2645567', email: 'ad-pnp.msme@hry.gov.in' },
  { district: 'Rewari', officer: 'Sh. Satish Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Rewari', phone: '01274-234567', email: 'ad-rwr.msme@hry.gov.in' },
  { district: 'Rohtak', officer: 'Sh. Deepak Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Rohtak', phone: '01262-245567', email: 'ad-rtk.msme@hry.gov.in' },
  { district: 'Sirsa', officer: 'Sh. Parveen Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Sirsa', phone: '01666-234567', email: 'ad-srs.msme@hry.gov.in' },
  { district: 'Sonipat', officer: 'Sh. Anil Kumar', designation: 'Deputy Director', address: 'District MSME Centre, Sonipat', phone: '0130-2245567', email: 'ad-snp.msme@hry.gov.in' },
  { district: 'Yamunanagar', officer: 'Sh. Rakesh Bansal', designation: 'Deputy Director', address: 'District MSME Centre, Yamunanagar', phone: '01732-234567', email: 'ad-ymn.msme@hry.gov.in' }
];

export const INDUSTRIAL_CLUSTERS = [
  { name: 'Faridabad Auto Parts Cluster', district: 'Faridabad', units: 2500, turnover: 8500, employment: 85000, speciality: 'Automobile Components & Engineering' },
  { name: 'Gurugram IT/ITES Cluster', district: 'Gurugram', units: 4500, turnover: 45000, employment: 320000, speciality: 'Information Technology & BPO Services' },
  { name: 'Panipat Textile Cluster', district: 'Panipat', units: 3200, turnover: 6500, employment: 120000, speciality: 'Handloom, Textiles & Recycling' },
  { name: 'Hisar Steel Cluster', district: 'Hisar', units: 1800, turnover: 12000, employment: 65000, speciality: 'Steel Pipes & Iron Products' },
  { name: 'Karnal Rice Processing', district: 'Karnal', units: 1500, turnover: 4500, employment: 42000, speciality: 'Basmati Rice Processing & Export' },
  { name: 'Yamunanagar Paper & Plywood', district: 'Yamunanagar', units: 1200, turnover: 3800, employment: 48000, speciality: 'Paper, Plywood & Timber' },
  { name: 'Sonipat Food & Auto', district: 'Sonipat', units: 980, turnover: 2800, employment: 38000, speciality: 'Food Processing & Cycle Parts' },
  { name: 'Ambala Scientific Instruments', district: 'Ambala', units: 650, turnover: 1200, employment: 18000, speciality: 'Scientific & Surgical Instruments' },
  { name: 'Rewari-Bawal Engineering', district: 'Rewari', units: 850, turnover: 2200, employment: 28000, speciality: 'Engineering Goods & Auto Parts' },
  { name: 'Rohtak-Jhajjar Industrial Belt', district: 'Rohtak', units: 720, turnover: 1800, employment: 22000, speciality: 'Mixed Manufacturing' },
  { name: 'IMT Manesar Auto Hub', district: 'Gurugram', units: 1100, turnover: 15000, employment: 75000, speciality: 'Automobile Manufacturing (Maruti Vendor)' },
  { name: 'Kundli Industrial Area', district: 'Sonipat', units: 890, turnover: 3200, employment: 32000, speciality: 'Food, Pharma & Packaging' }
];

export const SECTOR_DATA = [
  { sector: 'Manufacturing', count: 324500, percentage: 36.4, color: '#10B981' },
  { sector: 'Trading', count: 245600, percentage: 27.5, color: '#3B82F6' },
  { sector: 'Services', count: 198400, percentage: 22.2, color: '#F59E0B' },
  { sector: 'IT/ITES', count: 78900, percentage: 8.8, color: '#8B5CF6' },
  { sector: 'Agri Allied', count: 45056, percentage: 5.1, color: '#EF4444' }
];

export const YEARLY_REGISTRATION = [
  { year: '2018-19', registrations: 45230, growth: 0 },
  { year: '2019-20', registrations: 52340, growth: 15.7 },
  { year: '2020-21', registrations: 68450, growth: 30.8 },
  { year: '2021-22', registrations: 89560, growth: 30.8 },
  { year: '2022-23', registrations: 112340, growth: 25.4 },
  { year: '2023-24', registrations: 145670, growth: 29.7 },
  { year: '2024-25', registrations: 178890, growth: 22.8 },
  { year: '2025-26', registrations: 198450, growth: 10.9 }
];

export const CATEGORY_DATA = [
  { category: 'Micro', count: 756234, percentage: 84.7, color: '#10B981', investment: 'Up to ₹1 Crore', turnover: 'Up to ₹5 Crore' },
  { category: 'Small', count: 112456, percentage: 12.6, color: '#3B82F6', investment: '₹1-10 Crore', turnover: '₹5-50 Crore' },
  { category: 'Medium', count: 23766, percentage: 2.7, color: '#8B5CF6', investment: '₹10-50 Crore', turnover: '₹50-250 Crore' }
];

export const TOP_PRODUCTS = [
  { product: 'Auto Components', district: 'Gurugram/Faridabad', exportValue: 8500 },
  { product: 'IT Services', district: 'Gurugram', exportValue: 45000 },
  { product: 'Steel Products', district: 'Hisar', exportValue: 6800 },
  { product: 'Textiles & Handloom', district: 'Panipat', exportValue: 4200 },
  { product: 'Basmati Rice', district: 'Karnal/Kaithal', exportValue: 2500 },
  { product: 'Paper & Packaging', district: 'Yamunanagar', exportValue: 1800 },
  { product: 'Scientific Instruments', district: 'Ambala', exportValue: 850 },
  { product: 'Dairy Products', district: 'Kurukshetra/Karnal', exportValue: 1200 }
];

export const GOVERNMENT_PORTALS = [
  { name: 'Udyam Registration', type: 'MSME Registration', link: 'https://udyamregistration.gov.in/', icon: '📋' },
  { name: 'CHAMPIONS Portal', type: 'Grievance & Handholding', link: 'https://champions.gov.in/', icon: '🏆' },
  { name: 'MSME Samadhaan', type: 'Delayed Payments', link: 'https://samadhaan.msme.gov.in/', icon: '⚖️' },
  { name: 'GeM Portal', type: 'Govt e-Marketplace', link: 'https://gem.gov.in/', icon: '🛒' },
  { name: 'MSME Sambandh', type: 'Procurement Monitoring', link: 'https://sambandh.msme.gov.in/', icon: '🤝' },
  { name: 'TReDS Portal', type: 'Invoice Discounting', link: 'https://trex.gov.in/', icon: '💰' },
  { name: 'PM Vishwakarma', type: 'Artisan Support', link: 'https://pmvishwakarma.gov.in/', icon: '🔨' },
  { name: 'My MSME Portal', type: 'One Stop Solution', link: 'https://my.msme.gov.in/', icon: '🌐' },
  { name: 'MSME Dashboard', type: 'Data & Statistics', link: 'https://dashboard.msme.gov.in/', icon: '📊' },
  { name: 'GIS Haryana', type: 'Geographic Info System', link: 'https://gis.haryana.gov.in/', icon: '🗺️' },
  { name: 'Haryana MSME', type: 'State MSME Portal', link: 'https://msme.haryana.gov.in/', icon: '🏛️' },
  { name: 'HSIIDC', type: 'Industrial Infrastructure', link: 'https://hsiidc.org.in/', icon: '🏗️' }
];

// National MSME statistics (from msme.gov.in dashboard)
export const NATIONAL_STATS = {
  totalUdyam: 47700000,      // 4.77 crore as of 2025
  microShare: 97.0,
  smallShare: 1.5,
  mediumShare: 0.8,
  exportShare: 45.73,
  gdpContribution: 30,
  employmentCrore: 12,
  haryanaShare: 2.1,
  totalStates: 36,
  haryanaRank: 8
};

// MSME Classification as per GoI (post July 2020)
export const MSME_CLASSIFICATION = [
  { type: 'Micro', investmentLimit: '≤ ₹1 Crore', turnoverLimit: '≤ ₹5 Crore', color: '#10B981' },
  { type: 'Small', investmentLimit: '≤ ₹10 Crore', turnoverLimit: '≤ ₹50 Crore', color: '#3B82F6' },
  { type: 'Medium', investmentLimit: '≤ ₹50 Crore', turnoverLimit: '≤ ₹250 Crore', color: '#8B5CF6' }
];

// ODOP (One District One Product) for Haryana
export const ODOP_DATA = [
  { district: 'Ambala', product: 'Scientific Instruments', icon: '🔬' },
  { district: 'Panipat', product: 'Textiles & Handloom', icon: '🧶' },
  { district: 'Karnal', product: 'Basmati Rice', icon: '🌾' },
  { district: 'Gurugram', product: 'IT Services', icon: '💻' },
  { district: 'Faridabad', product: 'Auto Components', icon: '⚙️' },
  { district: 'Hisar', product: 'Steel Pipes', icon: '🔩' },
  { district: 'Yamunanagar', product: 'Paper & Plywood', icon: '📦' },
  { district: 'Rohtak', product: 'Food Processing', icon: '🍱' },
  { district: 'Sonipat', product: 'Cycle Parts', icon: '🚲' },
  { district: 'Rewari', product: 'Brass Wares', icon: '🏺' },
  { district: 'Kurukshetra', product: 'Dairy Products', icon: '🥛' },
  { district: 'Panchkula', product: 'Pharma', icon: '💊' },
  { district: 'Sirsa', product: 'Cotton Textiles', icon: '🧵' },
  { district: 'Bhiwani', product: 'Woolen Items', icon: '🧣' },
  { district: 'Jind', product: 'Mustard Oil', icon: '🫒' },
  { district: 'Kaithal', product: 'Rice Products', icon: '🍚' },
  { district: 'Fatehabad', product: 'Agro Products', icon: '🌿' },
  { district: 'Mahendragarh', product: 'Marble & Stone', icon: '🪨' },
  { district: 'Nuh', product: 'Handicrafts', icon: '🎨' },
  { district: 'Palwal', product: 'Furniture', icon: '🪑' },
  { district: 'Jhajjar', product: 'Dairy', icon: '🧈' },
  { district: 'Charkhi Dadri', product: 'Cotton Ginning', icon: '🌱' }
];
