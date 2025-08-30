import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuperAdminDashboard.css';

// Currency formatter - supports multiple currencies with English numerals
const formatCurrency = (amount, currency = 'USD') => {
  const currencyConfig = {
    'USD': {
      locale: 'en-US',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    },
    'IQD': {
      locale: 'en-US', // Changed to English locale for English numerals
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  };
  
  const config = currencyConfig[currency] || currencyConfig['USD'];
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: config.minimumFractionDigits,
    maximumFractionDigits: config.maximumFractionDigits
  }).format(amount);
};

function SuperAdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [createBusinessStep, setCreateBusinessStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Currency selection state
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Language selection state (en/ku)
  const [categories, setCategories] = useState([
    { id: 'food', name: 'Food', nameKu: 'خواردن', displayName: 'Food', displayNameKu: 'خواردن', order: 1 },
    { id: 'beverages', name: 'Beverages', nameKu: 'خواردنەوە', displayName: 'Drinks', displayNameKu: 'خواردنەوە', order: 2 },
    { id: 'retail', name: 'Retail', nameKu: 'فرۆشتن', displayName: 'Retail', displayNameKu: 'فرۆشتن', order: 3 },
    { id: 'services', name: 'Services', nameKu: 'خزمەتگوزاری', displayName: 'Services', displayNameKu: 'خزمەت', order: 4 },
    { id: 'electronics', name: 'Electronics', nameKu: 'ئەلیکترۆنی', displayName: 'Electronics', displayNameKu: 'ئەلیکترۆنی', order: 5 },
    { id: 'clothing', name: 'Clothing', nameKu: 'جل و بەرگ', displayName: 'Clothing', displayNameKu: 'جل و بەرگ', order: 6 },
    { id: 'beauty', name: 'Beauty', nameKu: 'جوانی', displayName: 'Beauty', displayNameKu: 'جوانی', order: 7 },
    { id: 'health', name: 'Health', nameKu: 'تەندروستی', displayName: 'Health', displayNameKu: 'تەندروستی', order: 8 },
    { id: 'automotive', name: 'Automotive', nameKu: 'ئۆتۆمبێل', displayName: 'Auto', displayNameKu: 'ئۆتۆمبێل', order: 9 },
    { id: 'sports', name: 'Sports', nameKu: 'وەرزش', displayName: 'Sports', displayNameKu: 'وەرزش', order: 10 },
    { id: 'books', name: 'Books', nameKu: 'کتێب', displayName: 'Books', displayNameKu: 'کتێب', order: 11 },
    { id: 'home-garden', name: 'Home & Garden', nameKu: 'ماڵ و باخچە', displayName: 'Home', displayNameKu: 'ماڵ', order: 12 },
    { id: 'other', name: 'Other', nameKu: 'ئەوانی تر', displayName: 'Other', displayNameKu: 'ئەوانی تر', order: 99 }
  ]); // Enhanced categories for menu navigation with Kurdish support
  const [newCategoryInput, setNewCategoryInput] = useState(''); // For adding new categories
  const [newCategoryInputKu, setNewCategoryInputKu] = useState(''); // For adding new categories in Kurdish
  const [activeMenuSection, setActiveMenuSection] = useState(''); // For tracking active menu section
  const [saveStatus, setSaveStatus] = useState(''); // For showing save feedback
  const navigate = useNavigate();

  // POS Products State
  const [posProducts, setPosProducts] = useState([]);
  
  // Staff Management State
  const [staffMembers, setStaffMembers] = useState([]);
  const [newStaffEmail, setNewStaffEmail] = useState('');
  const [newStaffPassword, setNewStaffPassword] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('cashier');
  const [showPassword, setShowPassword] = useState(false);
  
  // Branding State
  const [brandingData, setBrandingData] = useState({
    logo: null,
    logoPreview: null,
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    bannerImage: null,
    bannerPreview: null,
    tagline: '',
    taglineKu: ''
  });
  
  // Restaurant Data State
  const [restaurantData, setRestaurantData] = useState({
    name: 'Restaurant Name',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@restaurant.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    backgroundMedia: null
  });

  // Retail Data State
  const [retailData, setRetailData] = useState({
    name: 'Retail Store',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@store.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    products: [
      { id: 1, nameEn: 'Coffee Beans', nameKu: 'دانەی قاوە', price: '29.99', currency: 'USD', image: null },
      { id: 2, nameEn: 'Tea Bags', nameKu: 'کیسەی چا', price: '49.99', currency: 'USD', image: null },
      { id: 3, nameEn: 'Honey Jar', nameKu: 'گۆزەی هەنگوین', price: '19.99', currency: 'USD', image: null }
    ]
  });

  // Services Data State
  const [servicesData, setServicesData] = useState({
    name: 'Services Center',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@services.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    services: [
      { id: 1, nameEn: 'Consultation', nameKu: 'ڕاوێژکاری', price: '50.00', currency: 'USD', duration: '1 hour', description: 'Professional service' },
      { id: 2, nameEn: 'Installation', nameKu: 'دامەزراندن', price: '75.00', currency: 'USD', duration: '2 hours', description: 'Premium service' }
    ]
  });

  // Healthcare Data State
  const [healthcareData, setHealthcareData] = useState({
    name: 'Healthcare Center',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@healthcare.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    doctors: [
      { id: 1, name: 'Dr. John Smith', specialty: 'General Medicine', experience: '10 years' },
      { id: 2, name: 'Dr. Jane Doe', specialty: 'Pediatrics', experience: '8 years' }
    ],
    openHours: '9:00 AM - 6:00 PM'
  });

  // Beauty Salon Data State
  const [beautySalonData, setBeautySalonData] = useState({
    name: 'Beauty Salon',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@beautysalon.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    treatments: [
      { id: 1, nameEn: 'Haircut & Style', nameKu: 'بڕین و ڕێکخستنی قژ', price: '45.00', currency: 'USD', duration: '1 hour' },
      { id: 2, nameEn: 'Manicure', nameKu: 'جوانکاری دەست', price: '25.00', currency: 'USD', duration: '45 mins' },
      { id: 3, nameEn: 'Facial Treatment', nameKu: 'چارەسەری ڕووخسار', price: '80.00', currency: 'USD', duration: '1.5 hours' }
    ]
  });

  // Auto Shop Data State
  const [autoShopData, setAutoShopData] = useState({
    name: 'Auto Repair Shop',
    location: 'Location',
    phone: '(555) 123-4567',
    email: 'info@autoshop.com',
    address: '123 Main St, City',
    website: '', // Domain/website URL
    facebook: '',
    instagram: '',
    tiktok: '',
    services: [
      { id: 1, nameEn: 'Oil Change', nameKu: 'گۆڕینی ڕوون', price: '35.00', currency: 'USD', duration: '30 mins' },
      { id: 2, nameEn: 'Brake Repair', nameKu: 'چاککردنەوەی بریک', price: '150.00', currency: 'USD', duration: '2 hours' },
      { id: 3, nameEn: 'Tire Replacement', nameKu: 'گۆڕینی تایر', price: '200.00', currency: 'USD', duration: '1 hour' }
    ]
  });

  // Business Hours State
  const [businessHours, setBusinessHours] = useState({
    monday: { open: '09:00', close: '18:00', isOpen: true },
    tuesday: { open: '09:00', close: '18:00', isOpen: true },
    wednesday: { open: '09:00', close: '18:00', isOpen: true },
    thursday: { open: '09:00', close: '18:00', isOpen: true },
    friday: { open: '09:00', close: '18:00', isOpen: true },
    saturday: { open: '10:00', close: '16:00', isOpen: true },
    sunday: { open: '09:00', close: '18:00', isOpen: false }
  });
  const [selectedTimezone, setSelectedTimezone] = useState('GMT+3');
  const [holidayMode, setHolidayMode] = useState(false);

  // Save/Load Functions
  const saveProgress = () => {
    try {
      setSaveStatus('saving');
      const progressData = {
        createBusinessStep,
        selectedTemplate,
        selectedCurrency,
        selectedLanguage,
        categories,
        posProducts,
        staffMembers,
        brandingData,
        restaurantData,
        retailData,
        servicesData,
        healthcareData,
        beautySalonData,
        autoShopData,
        businessHours,
        selectedTimezone,
        holidayMode,
        activeMenuSection,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem('cashier-business-progress', JSON.stringify(progressData));
      setSaveStatus('saved');
      console.log('Progress saved successfully!');
      
      // Clear save status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('error');
      console.error('Error saving progress:', error);
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const loadProgress = () => {
    try {
      const savedProgress = localStorage.getItem('cashier-business-progress');
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        
        setCreateBusinessStep(progressData.createBusinessStep || 1);
        setSelectedTemplate(progressData.selectedTemplate || null);
        setSelectedCurrency(progressData.selectedCurrency || 'USD');
        setSelectedLanguage(progressData.selectedLanguage || 'en');
        setCategories(progressData.categories || []);
        setPosProducts(progressData.posProducts || []);
        setStaffMembers(progressData.staffMembers || []);
        setBrandingData(progressData.brandingData || {
          logo: null,
          logoPreview: null,
          primaryColor: '#007bff',
          secondaryColor: '#6c757d',
          bannerImage: null,
          bannerPreview: null,
          tagline: '',
          taglineKu: ''
        });
        setRestaurantData(progressData.restaurantData || {
          name: 'Restaurant Name',
          location: 'Location',
          phone: '(555) 123-4567',
          email: 'info@restaurant.com',
          address: '123 Main St, City',
          facebook: '',
          instagram: '',
          tiktok: '',
          backgroundMedia: null
        });
        setRetailData(progressData.retailData || retailData);
        setServicesData(progressData.servicesData || servicesData);
        setHealthcareData(progressData.healthcareData || healthcareData);
        setBeautySalonData(progressData.beautySalonData || beautySalonData);
        setAutoShopData(progressData.autoShopData || autoShopData);
        setBusinessHours(progressData.businessHours || {
          monday: { open: '09:00', close: '18:00', isOpen: true },
          tuesday: { open: '09:00', close: '18:00', isOpen: true },
          wednesday: { open: '09:00', close: '18:00', isOpen: true },
          thursday: { open: '09:00', close: '18:00', isOpen: true },
          friday: { open: '09:00', close: '18:00', isOpen: true },
          saturday: { open: '10:00', close: '16:00', isOpen: true },
          sunday: { open: '09:00', close: '18:00', isOpen: false }
        });
        setSelectedTimezone(progressData.selectedTimezone || 'GMT+3');
        setHolidayMode(progressData.holidayMode || false);
        
        console.log('Progress loaded successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return false;
  };

  const clearProgress = () => {
    if (window.confirm('Are you sure you want to clear all saved progress? This action cannot be undone.')) {
      localStorage.removeItem('cashier-business-progress');
      // Reset to initial state
      setCreateBusinessStep(1);
      setSelectedTemplate(null);
      setSelectedCurrency('USD');
      setSelectedLanguage('en');
      setPosProducts([]);
      setStaffMembers([]);
      setBrandingData({
        logo: null,
        logoPreview: null,
        primaryColor: '#007bff',
        secondaryColor: '#6c757d',
        bannerImage: null,
        bannerPreview: null,
        tagline: '',
        taglineKu: ''
      });
      setRestaurantData({
        name: 'Restaurant Name',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@restaurant.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        backgroundMedia: null
      });
      setRetailData({
        name: 'Retail Store',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@store.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        products: [
          { id: 1, nameEn: 'Coffee Beans', nameKu: 'دانەی قاوە', price: '29.99', currency: 'USD', image: null },
          { id: 2, nameEn: 'Tea Bags', nameKu: 'کیسەی چا', price: '49.99', currency: 'USD', image: null },
          { id: 3, nameEn: 'Honey Jar', nameKu: 'گۆزەی هەنگوین', price: '19.99', currency: 'USD', image: null }
        ]
      });
      setServicesData({
        name: 'Services Center',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@services.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        services: [
          { id: 1, nameEn: 'Consultation', nameKu: 'ڕاوێژکاری', price: '50.00', currency: 'USD', duration: '1 hour', description: 'Professional service' },
          { id: 2, nameEn: 'Installation', nameKu: 'دامەزراندن', price: '75.00', currency: 'USD', duration: '2 hours', description: 'Premium service' }
        ]
      });
      setHealthcareData({
        name: 'Healthcare Center',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@healthcare.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        doctors: [
          { id: 1, name: 'Dr. John Smith', specialty: 'General Medicine', experience: '10 years' },
          { id: 2, name: 'Dr. Jane Doe', specialty: 'Pediatrics', experience: '8 years' }
        ],
        openHours: '9:00 AM - 6:00 PM'
      });
      setBeautySalonData({
        name: 'Beauty Salon',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@beautysalon.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        treatments: [
          { id: 1, nameEn: 'Haircut & Style', nameKu: 'بڕین و ڕێکخستنی قژ', price: '45.00', currency: 'USD', duration: '1 hour' },
          { id: 2, nameEn: 'Manicure', nameKu: 'جوانکاری دەست', price: '25.00', currency: 'USD', duration: '45 mins' },
          { id: 3, nameEn: 'Facial Treatment', nameKu: 'چارەسەری ڕووخسار', price: '80.00', currency: 'USD', duration: '1.5 hours' }
        ]
      });
      setAutoShopData({
        name: 'Auto Repair Shop',
        location: 'Location',
        phone: '(555) 123-4567',
        email: 'info@autoshop.com',
        address: '123 Main St, City',
        website: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        services: [
          { id: 1, nameEn: 'Oil Change', nameKu: 'گۆڕینی ڕوون', price: '35.00', currency: 'USD', duration: '30 mins' },
          { id: 2, nameEn: 'Brake Repair', nameKu: 'چاککردنەوەی بریک', price: '150.00', currency: 'USD', duration: '2 hours' },
          { id: 3, nameEn: 'Tire Replacement', nameKu: 'گۆڕینی تایر', price: '200.00', currency: 'USD', duration: '1 hour' }
        ]
      });
      setBusinessHours({
        monday: { open: '09:00', close: '18:00', isOpen: true },
        tuesday: { open: '09:00', close: '18:00', isOpen: true },
        wednesday: { open: '09:00', close: '18:00', isOpen: true },
        thursday: { open: '09:00', close: '18:00', isOpen: true },
        friday: { open: '09:00', close: '18:00', isOpen: true },
        saturday: { open: '10:00', close: '16:00', isOpen: true },
        sunday: { open: '09:00', close: '18:00', isOpen: false }
      });
      setSelectedTimezone('GMT+3');
      setHolidayMode(false);
      
      setSaveStatus('cleared');
      console.log('Progress cleared!');
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (createBusinessStep > 1 || posProducts.length > 0) {
        saveProgress();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Remove dependencies to prevent infinite loops

  // Load progress on component mount
  useEffect(() => {
    loadProgress();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // POS Product Management Functions
  const addPOSProduct = () => {
    const nameEn = document.getElementById('productNameEn').value;
    const nameKu = document.getElementById('productNameKu').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const stock = document.getElementById('productStock').value;
    const showStock = document.getElementById('showStockCheckbox').checked;
    const imageFile = document.getElementById('productImage').files[0];
    
    if (!nameEn || !nameKu || !price || !category || !stock) {
      alert('Please fill in all required fields including both English and Kurdish names');
      return;
    }
    
    const newProduct = {
      id: Date.now(),
      nameEn: nameEn,
      nameKu: nameKu,
      price: price, // Store the raw price as entered by the user
      currency: selectedCurrency, // Store which currency was used for input
      category: category,
      stock: parseInt(stock),
      showStock: showStock, // Whether to display stock in POS/menu
      image: imageFile
    };
    
    setPosProducts([...posProducts, newProduct]);
    
    // Clear form
    document.getElementById('productNameEn').value = '';
    document.getElementById('productNameKu').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('showStockCheckbox').checked = false;
    document.getElementById('productImage').value = '';
    
    // Auto-save after adding product
    setTimeout(() => saveProgress(), 1000);
  };
  
  const removePOSProduct = (productId) => {
    setPosProducts(posProducts.filter(product => product.id !== productId));
    // Auto-save after removing product
    setTimeout(() => saveProgress(), 1000);
  };

  // Category Management Functions
  const addNewCategory = () => {
    if (newCategoryInput.trim() && newCategoryInputKu.trim() && 
        !categories.find(cat => cat.name.toLowerCase() === newCategoryInput.trim().toLowerCase())) {
      const newCategory = {
        id: newCategoryInput.trim().toLowerCase().replace(/\s+/g, '-'),
        name: newCategoryInput.trim(),
        nameKu: newCategoryInputKu.trim(),
        displayName: newCategoryInput.trim(),
        displayNameKu: newCategoryInputKu.trim(),
        order: categories.length + 1
      };
      setCategories([...categories, newCategory]);
      setNewCategoryInput('');
      setNewCategoryInputKu('');
      // Auto-save after adding category
      setTimeout(() => saveProgress(), 1000);
    } else if (!newCategoryInput.trim() || !newCategoryInputKu.trim()) {
      alert('Please fill in both English and Kurdish category names');
    }
  };

  const removeCategory = (categoryToRemove) => {
    if (categories.length > 1) { // Keep at least one category
      setCategories(categories.filter(cat => cat.id !== categoryToRemove.id));
      // Auto-save after removing category
      setTimeout(() => saveProgress(), 1000);
    }
  };

  // Currency-aware pricing helper
  // This function converts prices between USD and IQD based on the source and target currencies
  const getCurrencyPrice = (price, targetCurrency, sourceCurrency = 'USD') => {
    const numPrice = parseFloat(price);
    
    // If the price is already in the target currency, return as is
    if (sourceCurrency === targetCurrency) {
      return numPrice;
    }
    
    // Convert between USD and IQD
    if (sourceCurrency === 'USD' && targetCurrency === 'IQD') {
      return numPrice * 1300; // 1 USD = ~1300 IQD
    }
    if (sourceCurrency === 'IQD' && targetCurrency === 'USD') {
      return numPrice / 1300; // Convert IQD back to USD
    }
    
    return numPrice;
  };

  const handleLocationClick = (address) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleWebsiteClick = (website) => {
    if (!website) return;
    
    // Add https:// if no protocol is specified
    let url = website;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    window.open(url, '_blank');
  };

  // Staff Management Functions
  const addStaffMember = () => {
    if (!newStaffName || !newStaffEmail || !newStaffPassword) {
      alert('Please fill in all staff member details');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newStaffEmail)) {
      alert('Please enter a valid email address');
      return;
    }

    // Password validation
    if (newStaffPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    // Check if email already exists
    if (staffMembers.find(staff => staff.email === newStaffEmail)) {
      alert('This email is already in use');
      return;
    }

    const newStaff = {
      id: Date.now(),
      name: newStaffName,
      email: newStaffEmail,
      password: newStaffPassword, // In production, this should be hashed
      role: newStaffRole,
      createdAt: new Date().toISOString()
    };

    setStaffMembers([...staffMembers, newStaff]);
    
    // Clear form
    setNewStaffName('');
    setNewStaffEmail('');
    setNewStaffPassword('');
    setNewStaffRole('cashier');
    
    // Auto-save after adding staff
    setTimeout(() => saveProgress(), 1000);
  };

  const removeStaffMember = (staffId) => {
    setStaffMembers(staffMembers.filter(staff => staff.id !== staffId));
    // Auto-save after removing staff
    setTimeout(() => saveProgress(), 1000);
  };

  // Password Generator Functions
  const generateStrongPassword = (length = 12) => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    // Ensure at least one character from each category
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(12);
    setNewStaffPassword(newPassword);
  };

  const copyPasswordToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(newStaffPassword);
      alert('Password copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = newStaffPassword;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Password copied to clipboard!');
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 'none', score: 0, feedback: 'Enter a password' };
    
    let score = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');
    
    if (password.length >= 12) score += 1;
    
    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Lowercase letters');
    
    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Uppercase letters');
    
    if (/\d/.test(password)) score += 1;
    else feedback.push('Numbers');
    
    if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) score += 1;
    else feedback.push('Special characters');
    
    // Determine strength
    let strength;
    if (score <= 2) strength = 'weak';
    else if (score <= 4) strength = 'medium';
    else strength = 'strong';
    
    return {
      strength,
      score,
      feedback: feedback.length > 0 ? `Missing: ${feedback.join(', ')}` : 'Strong password!'
    };
  };

  const updateProduct = (id, field, value) => {
    setRetailData({
      ...retailData,
      products: retailData.products.map(product => 
        product.id === id ? { ...product, [field]: value } : product
      )
    });
  };

  const addProduct = () => {
    const newId = Math.max(...retailData.products.map(p => p.id)) + 1;
    setRetailData({
      ...retailData,
      products: [...retailData.products, { id: newId, nameEn: `Product ${newId}`, nameKu: `بەرهەم ${newId}`, price: '0.00', currency: 'USD', image: null }]
    });
  };

  const removeProduct = (id) => {
    setRetailData({
      ...retailData,
      products: retailData.products.filter(product => product.id !== id)
    });
  };

  const templates = [
    { id: 1, name: 'Restaurant', icon: '🍽️', description: 'Perfect for restaurants, cafes, and food businesses' },
    { id: 2, name: 'Retail Store', icon: '🛍️', description: 'Ideal for clothing, electronics, and retail shops' },
    { id: 3, name: 'Services', icon: '🔧', description: 'Great for repair shops, salons, and service providers' },
    { id: 4, name: 'Healthcare', icon: '🏥', description: 'Designed for clinics, pharmacies, and medical centers' },
    { id: 5, name: 'Beauty Salon', icon: '💄', description: 'Perfect for beauty salons and spa businesses' },
    { id: 6, name: 'Auto Shop', icon: '🚗', description: 'Ideal for car repair and automotive services' }
  ];

  const renderCreateBusiness = () => {
    switch(createBusinessStep) {
      case 1:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 1: Choose a Template</h2>
              <p>Select a template that best fits your business type</p>
            </div>
            
            {/* Saved Progress Section */}
            {(() => {
              const savedProgress = localStorage.getItem('cashier-business-progress');
              if (savedProgress) {
                try {
                  const progressData = JSON.parse(savedProgress);
                  const savedTemplate = templates.find(t => t.id === progressData.selectedTemplate?.id);
                  
                  return (
                    <div className="saved-progress-window">
                      <div className="saved-progress-header">
                        <h3>📋 Saved Progress Found</h3>
                        <div className="progress-info">
                          <span className="saved-date">
                            Last saved: {progressData.lastSaved ? new Date(progressData.lastSaved).toLocaleString() : 'Unknown'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="progress-details">
                        {savedTemplate && (
                          <div className="progress-template">
                            <span className="template-icon">{savedTemplate.icon}</span>
                            <div className="template-info">
                              <h4>{savedTemplate.name}</h4>
                              <p>Step {progressData.createBusinessStep || 1} of 5</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="progress-stats">
                          <div className="stat-item">
                            <span className="stat-number">{progressData.posProducts?.length || 0}</span>
                            <span className="stat-label">Products</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">{progressData.staffMembers?.length || 0}</span>
                            <span className="stat-label">Staff</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">{progressData.categories?.length || 0}</span>
                            <span className="stat-label">Categories</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="progress-actions">
                        <button 
                          className="load-progress-btn"
                          onClick={() => {
                            if (loadProgress()) {
                              // Progress loaded successfully, navigate to the saved step
                              setCreateBusinessStep(progressData.createBusinessStep || 1);
                            }
                          }}
                        >
                          📂 Continue Progress
                        </button>
                        <button 
                          className="clear-progress-btn"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to clear saved progress and start fresh?')) {
                              clearProgress();
                              // Force a re-render by updating state
                              setCreateBusinessStep(1);
                              setSelectedTemplate(null);
                            }
                          }}
                        >
                          🗑️ Start Fresh
                        </button>
                      </div>
                    </div>
                  );
                } catch (error) {
                  console.error('Error parsing saved progress:', error);
                  return null;
                }
              }
              return null;
            })()}
            
            <div className="templates-grid">
              {templates.map((template) => (
                <div key={template.id} className="template-block">
                  <div className="template-icon">{template.icon}</div>
                  <h3>{template.name}</h3>
                  <p>{template.description}</p>
                  <button 
                    className="select-template-btn"
                    onClick={() => {
                      setSelectedTemplate(template);
                      setCreateBusinessStep(2);
                    }}
                  >
                    Select Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 2: Setup POS Interface</h2>
              <p>Configure products for your cashier system</p>
            </div>
            
            <div className="pos-setup-container">
              <div className="pos-config-panel">
                <h3>Product Management</h3>
                <p>Add products that will be available in your cashier interface</p>
                
                <div className="product-form">
                  {/* Currency Selection */}
                  <div className="currency-selection">
                    <h4>Select Your Currency</h4>
                    <div className="currency-options">
                      <label className={`currency-option ${selectedCurrency === 'USD' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="currency" 
                          value="USD" 
                          checked={selectedCurrency === 'USD'}
                          onChange={(e) => setSelectedCurrency(e.target.value)}
                        />
                        <span className="currency-flag">🇺🇸</span>
                        <span className="currency-code">USD</span>
                        <span className="currency-name">US Dollar</span>
                      </label>
                      <label className={`currency-option ${selectedCurrency === 'IQD' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="currency" 
                          value="IQD" 
                          checked={selectedCurrency === 'IQD'}
                          onChange={(e) => setSelectedCurrency(e.target.value)}
                        />
                        <span className="currency-flag">🇮🇶</span>
                        <span className="currency-code">IQD</span>
                        <span className="currency-name">Iraqi Dinar</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Product Name (English):</label>
                      <input 
                        type="text" 
                        placeholder="Enter product name in English"
                        className="form-input"
                        id="productNameEn"
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Name (Kurdish):</label>
                      <input 
                        type="text" 
                        placeholder="ناوی بەرهەمەکە بە کوردی"
                        className="form-input kurdish-input"
                        id="productNameKu"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Price ({selectedCurrency}):</label>
                      <input 
                        type="number" 
                        step={selectedCurrency === 'USD' ? "0.01" : "1000"}
                        placeholder={selectedCurrency === 'USD' ? "0.00" : "25000"}
                        className="form-input"
                        id="productPrice"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category:</label>
                      <select className="form-input" id="productCategory">
                        <option value="">Select category</option>
                        {categories.sort((a, b) => a.order - b.order).map((category) => (
                          <option key={category.id} value={category.id}>
                            {selectedLanguage === 'en' ? category.name : category.nameKu}
                          </option>
                        ))}
                      </select>
                      
                      {/* Add New Category Section */}
                      <div className="add-category-section">
                        <div className="add-category-inputs">
                          <div className="add-category-input">
                            <label>Category Name (English):</label>
                            <input
                              type="text"
                              placeholder="Add new category in English"
                              value={newCategoryInput}
                              onChange={(e) => setNewCategoryInput(e.target.value)}
                              className="form-input small-input english-input"
                              onKeyPress={(e) => e.key === 'Enter' && addNewCategory()}
                            />
                          </div>
                          <div className="add-category-input">
                            <label>Category Name (Kurdish):</label>
                            <input
                              type="text"
                              placeholder="پۆلی نوێ بە کوردی زیاد بکە"
                              value={newCategoryInputKu}
                              onChange={(e) => setNewCategoryInputKu(e.target.value)}
                              className="form-input small-input kurdish-input"
                              dir="rtl"
                              onKeyPress={(e) => e.key === 'Enter' && addNewCategory()}
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={addNewCategory}
                            className="add-category-btn"
                          >
                            + Add Category
                          </button>
                        </div>
                        
                        {/* Category Management */}
                        <div className="category-tags">
                          {categories.sort((a, b) => a.order - b.order).map((category) => (
                            <span key={category.id} className="category-tag">
                              <span className="category-name english-text">{category.name}</span>
                              <span className="category-name kurdish-text">{category.nameKu}</span>
                              <small className="category-nav-name">
                                Nav: {selectedLanguage === 'en' ? category.displayName : category.displayNameKu}
                              </small>
                              {categories.length > 1 && (
                                <button 
                                  type="button"
                                  onClick={() => removeCategory(category)}
                                  className="remove-category-btn"
                                >
                                  ×
                                </button>
                              )}
                            </span>
                          ))}
                        </div>
                        
                        {/* Menu Navigation Preview */}
                        <div className="menu-nav-preview">
                          <h5>Menu Navigation Preview ({selectedLanguage === 'en' ? 'English' : 'Kurdish'}):</h5>
                          <div className="nav-preview-bar">
                            {categories.sort((a, b) => a.order - b.order).map((category) => (
                              <button key={category.id} className={`nav-preview-btn ${selectedLanguage === 'ku' ? 'kurdish-text' : ''}`}>
                                {selectedLanguage === 'en' ? category.displayName : category.displayNameKu}
                              </button>
                            ))}
                          </div>
                          <small className="nav-preview-note">
                            This is how categories will appear in your menu navigation bar
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Stock Quantity:</label>
                      <input 
                        type="number" 
                        placeholder="100"
                        className="form-input"
                        id="productStock"
                      />
                      
                      {/* Show Stock Checkbox */}
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input 
                            type="checkbox" 
                            id="showStockCheckbox"
                            className="checkbox-input"
                            defaultChecked={true}
                          />
                          <span className="checkbox-text">Show stock quantity in POS/Menu</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Product Image:</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      className="form-file"
                      id="productImage"
                    />
                  </div>
                  
                  <button 
                    className="add-product-btn"
                    onClick={() => addPOSProduct()}
                  >
                    + Add Product
                  </button>
                </div>
              </div>
              
              <div className="pos-preview-panel">
                <div className="preview-header">
                  <h3>Cashier Interface Preview</h3>
                  <div className="language-toggle">
                    <button 
                      className={`lang-btn ${selectedLanguage === 'en' ? 'active' : ''}`}
                      onClick={() => setSelectedLanguage('en')}
                    >
                      🇺🇸 EN
                    </button>
                    <button 
                      className={`lang-btn ${selectedLanguage === 'ku' ? 'active' : ''}`}
                      onClick={() => setSelectedLanguage('ku')}
                    >
                      <span className="kurdish-text">🔴⚪🟢 کوردی</span>
                    </button>
                  </div>
                </div>
                <div className="cashier-interface-preview">
                  <div className="pos-header">
                    <h4>💰 {selectedTemplate?.name} POS System</h4>
                    <div className="pos-total">Total: {formatCurrency(0, selectedCurrency)}</div>
                  </div>
                  
                  <div className="pos-products-grid">
                    {posProducts.map((product) => (
                      <div key={product.id} className="pos-product-card">
                        <div className="pos-product-image">
                          {product.image ? (
                            <img src={URL.createObjectURL(product.image)} alt={selectedLanguage === 'en' ? product.nameEn : product.nameKu} />
                          ) : (
                            <div className="pos-image-placeholder">📦</div>
                          )}
                        </div>
                        <div className="pos-product-info">
                          <h5 className={selectedLanguage === 'ku' ? 'display-kurdish' : ''}>{selectedLanguage === 'en' ? product.nameEn : product.nameKu}</h5>
                          <p className="pos-product-price">{formatCurrency(getCurrencyPrice(product.price, selectedCurrency, product.currency || selectedCurrency), selectedCurrency)}</p>
                          {product.showStock && (
                            <p className="pos-product-stock">Stock: {product.stock}</p>
                          )}
                        </div>
                        <button 
                          className="pos-remove-btn"
                          onClick={() => removePOSProduct(product.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    
                    {posProducts.length === 0 && (
                      <div className="pos-empty-state">
                        <p>No products added yet</p>
                        <p>Add products using the form on the left</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="step-actions">
              <button 
                className="back-btn"
                onClick={() => setCreateBusinessStep(1)}
              >
                ← Back
              </button>
              <button 
                className="continue-btn"
                onClick={() => setCreateBusinessStep(3)}
                disabled={posProducts.length === 0}
              >
                Continue to Menu Builder →
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 3: Build Your Menu</h2>
              <p>Create a beautiful menu with smooth navigation</p>
            </div>
            
            <div className="menu-builder-container">
              {/* Menu Navigation Bar Preview */}
              <div className="menu-nav-section">
                <h3>Menu Navigation</h3>
                <div className="menu-nav-bar">
                  {categories
                    .filter(category => posProducts.some(product => product.category === category.id))
                    .sort((a, b) => a.order - b.order)
                    .map((category) => (
                    <button 
                      key={category.id} 
                      className={`menu-nav-btn ${activeMenuSection === category.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveMenuSection(category.id);
                        const element = document.getElementById(`menu-section-${category.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                    >
                      {selectedLanguage === 'en' ? category.displayName : category.displayNameKu}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Content Sections */}
              <div className="menu-content">
                {categories
                  .filter(category => posProducts.some(product => product.category === category.id))
                  .sort((a, b) => a.order - b.order)
                  .map((category) => {
                    const categoryProducts = posProducts.filter(product => product.category === category.id);
                    return (
                      <div key={category.id} id={`menu-section-${category.id}`} className="menu-section">
                        <h3 className={`menu-section-title ${selectedLanguage === 'ku' ? 'kurdish-text' : ''}`}>
                          {selectedLanguage === 'en' ? category.name : category.nameKu}
                        </h3>
                        
                        <div className="menu-products-grid">
                          {categoryProducts.map((product) => (
                            <div key={product.id} className="menu-product-card">
                              {product.image && (
                                <div className="menu-product-image">
                                  <img src={URL.createObjectURL(product.image)} alt={product.nameEn} />
                                </div>
                              )}
                              <div className="menu-product-info">
                                <h4 className={selectedLanguage === 'ku' ? 'kurdish-text' : ''}>
                                  {selectedLanguage === 'en' ? product.nameEn : product.nameKu}
                                </h4>
                                <p className="menu-product-price">
                                  {formatCurrency(getCurrencyPrice(product.price, selectedCurrency, product.currency || selectedCurrency), selectedCurrency)}
                                </p>
                                {product.showStock && (
                                  <p className="menu-product-stock">Stock: {product.stock}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                
                {posProducts.length === 0 && (
                  <div className="empty-menu">
                    <p>No products added yet. Go back to Step 2 to add products.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="step-navigation">
              <button 
                className="back-btn"
                onClick={() => setCreateBusinessStep(2)}
              >
                ← Back to Products
              </button>
              <button 
                className="continue-btn"
                onClick={() => setCreateBusinessStep(4)}
                disabled={posProducts.length === 0}
              >
                Continue to Staff Management →
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 4: Staff Management</h2>
              <p>Add cashier accounts and manage staff access</p>
            </div>
            
            <div className="staff-management-container">
              {/* Add New Staff Member */}
              <div className="add-staff-section">
                <h3>Add New Staff Member</h3>
                <div className="staff-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name:</label>
                      <input
                        type="text"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        placeholder="Enter full name"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address:</label>
                      <input
                        type="email"
                        value={newStaffEmail}
                        onChange={(e) => setNewStaffEmail(e.target.value)}
                        placeholder="staff@business.com"
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Password:</label>
                      <div className="password-input-container">
                        <div className="password-field">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={newStaffPassword}
                            onChange={(e) => setNewStaffPassword(e.target.value)}
                            placeholder="Enter secure password"
                            className="form-input password-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="toggle-password-btn"
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={handleGeneratePassword}
                          className="generate-password-btn"
                          title="Generate strong password"
                        >
                          Generate
                        </button>
                        {newStaffPassword && (
                          <button
                            type="button"
                            onClick={copyPasswordToClipboard}
                            className="copy-password-btn"
                            title="Copy password to clipboard"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                      {newStaffPassword && (
                        <div className="password-strength">
                          <div className={`strength-meter strength-${getPasswordStrength(newStaffPassword).strength}`}>
                            <div className="strength-fill"></div>
                          </div>
                          <span className={`strength-text strength-${getPasswordStrength(newStaffPassword).strength}`}>
                            {getPasswordStrength(newStaffPassword).strength.toUpperCase()} - {getPasswordStrength(newStaffPassword).feedback}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Role:</label>
                      <select
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value)}
                        className="form-select"
                      >
                        <option value="cashier">Cashier</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    onClick={addStaffMember}
                    className="add-staff-btn"
                  >
                    Add Staff Member
                  </button>
                </div>
              </div>

              {/* Staff Members List */}
              <div className="staff-list-section">
                <h3>Staff Members ({staffMembers.length})</h3>
                
                {staffMembers.length === 0 ? (
                  <div className="no-staff">
                    <p>No staff members added yet.</p>
                    <p>Add your first cashier account above.</p>
                  </div>
                ) : (
                  <div className="staff-grid">
                    {staffMembers.map((staff) => (
                      <div key={staff.id} className="staff-card">
                        <div className="staff-header">
                          <h4>{staff.name}</h4>
                          <span className={`role-badge ${staff.role}`}>
                            {staff.role}
                          </span>
                        </div>
                        <div className="staff-details">
                          <p>📧 {staff.email}</p>
                          <p>🔒 Password: ••••••••</p>
                          <p>📅 Added: {new Date(staff.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button
                          onClick={() => removeStaffMember(staff.id)}
                          className="remove-staff-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="step-actions">
              <button 
                className="back-btn"
                onClick={() => setCreateBusinessStep(3)}
              >
                ← Back to Menu Builder
              </button>
              <button 
                className="continue-btn"
                onClick={() => setCreateBusinessStep(5)}
              >
                Continue to Template Setup →
              </button>
            </div>
          </div>
        );
      case 5:
        if (selectedTemplate?.name === 'Restaurant') {
          return (
            <div className="restaurant-template">
              <div className="template-preview">
                <h2>Restaurant Template Configuration</h2>
                <div className="language-toggle" style={{marginBottom: '20px', textAlign: 'center'}}>
                  <button 
                    className={`lang-btn ${selectedLanguage === 'en' ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage('en')}
                  >
                    🇺🇸 English
                  </button>
                  <button 
                    className={`lang-btn ${selectedLanguage === 'ku' ? 'active' : ''}`}
                    onClick={() => setSelectedLanguage('ku')}
                  >
                    <span className="kurdish-text">🔴⚪🟢 کوردی</span>
                  </button>
                </div>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Restaurant Name:</label>
                      <input 
                        type="text" 
                        value={restaurantData.name}
                        onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={restaurantData.location}
                        onChange={(e) => setRestaurantData({...restaurantData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={restaurantData.phone}
                        onChange={(e) => setRestaurantData({...restaurantData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={restaurantData.email}
                        onChange={(e) => setRestaurantData({...restaurantData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={restaurantData.address}
                        onChange={(e) => setRestaurantData({...restaurantData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Website/Domain:</label>
                      <input 
                        type="url" 
                        value={restaurantData.website}
                        onChange={(e) => setRestaurantData({...restaurantData, website: e.target.value})}
                        className="config-input"
                        placeholder="https://yourbusiness.com or yourbusiness.com"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={restaurantData.facebook}
                        onChange={(e) => setRestaurantData({...restaurantData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={restaurantData.instagram}
                        onChange={(e) => setRestaurantData({...restaurantData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={restaurantData.tiktok}
                        onChange={(e) => setRestaurantData({...restaurantData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Background Media:</label>
                      <input 
                        type="file" 
                        accept="image/*,video/*"
                        onChange={(e) => setRestaurantData({...restaurantData, backgroundMedia: e.target.files[0]})}
                        className="config-file"
                      />
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="restaurant-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{restaurantData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(restaurantData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {restaurantData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Middle Section */}
                      <div className="restaurant-middle">
                        <div className="background-section">
                          <div className="background-placeholder" style={{
                            backgroundImage: restaurantData.backgroundMedia ? `url(${URL.createObjectURL(restaurantData.backgroundMedia)})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}>
                            {!restaurantData.backgroundMedia && (
                              <p>🖼️ Upload Background Picture or Video</p>
                            )}
                            <div className="menu-section">
                              <button 
                                className="menu-btn"
                                style={{
                                  background: brandingData.primaryColor,
                                  borderColor: brandingData.primaryColor
                                }}
                              >
                                📋 View Menu
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="restaurant-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${restaurantData.phone}`} className="contact-link phone-link">
                              📞 {restaurantData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${restaurantData.email}`} className="contact-link email-link">
                              📧 {restaurantData.email}
                            </a>
                          </p>
                          {restaurantData.website && (
                            <p>
                              <span 
                                onClick={() => handleWebsiteClick(restaurantData.website)} 
                                className="contact-link website-link"
                                style={{cursor: 'pointer'}}
                              >
                                🌐 {restaurantData.website.replace(/^https?:\/\//, '')}
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {restaurantData.facebook && (
                              <a href={restaurantData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {restaurantData.instagram && (
                              <a href={restaurantData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {restaurantData.tiktok && (
                              <a href={restaurantData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(restaurantData.address)}
                          >
                            📍 {restaurantData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (selectedTemplate?.name === 'Retail Store') {
          return (
            <div className="retail-template">
              <div className="template-preview">
                <h2>Retail Store Template Configuration</h2>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Store Name:</label>
                      <input 
                        type="text" 
                        value={retailData.name}
                        onChange={(e) => setRetailData({...retailData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={retailData.location}
                        onChange={(e) => setRetailData({...retailData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={retailData.phone}
                        onChange={(e) => setRetailData({...retailData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={retailData.email}
                        onChange={(e) => setRetailData({...retailData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={retailData.address}
                        onChange={(e) => setRetailData({...retailData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={retailData.facebook}
                        onChange={(e) => setRetailData({...retailData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={retailData.instagram}
                        onChange={(e) => setRetailData({...retailData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={retailData.tiktok}
                        onChange={(e) => setRetailData({...retailData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                    
                    <h4>Products</h4>
                    {retailData.products.map((product) => (
                      <div key={product.id} className="product-config">
                        <div className="config-group">
                          <label>Product Name:</label>
                          <input 
                            type="text" 
                            value={product.name}
                            onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                            className="config-input"
                          />
                        </div>
                        <div className="config-group">
                          <label>Price ({selectedCurrency}):</label>
                          <input 
                            type="number" 
                            step={selectedCurrency === 'USD' ? "0.01" : "1000"}
                            value={product.price}
                            onChange={(e) => updateProduct(product.id, 'price', e.target.value)}
                            className="config-input"
                          />
                        </div>
                        <div className="config-group">
                          <label>Product Image:</label>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => updateProduct(product.id, 'image', e.target.files[0])}
                            className="config-file"
                          />
                        </div>
                        <button 
                          className="remove-product-btn"
                          onClick={() => removeProduct(product.id)}
                        >
                          Remove Product
                        </button>
                      </div>
                    ))}
                    
                    <button className="add-product-btn" onClick={addProduct}>
                      + Add Product
                    </button>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="retail-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{retailData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(retailData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {retailData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Products Section */}
                      <div className="retail-products">
                        <h3>Our Products</h3>
                        <div className="products-grid">
                          {retailData.products.map((product) => (
                            <div key={product.id} className="product-card">
                              <div className="product-image">
                                {product.image ? (
                                  <img 
                                    src={URL.createObjectURL(product.image)} 
                                    alt={product.name}
                                  />
                                ) : (
                                  <div className="image-placeholder">📷</div>
                                )}
                              </div>
                              <div className="product-info">
                                <h4 className={selectedLanguage === 'ku' ? 'display-kurdish' : ''}>{selectedLanguage === 'en' ? product.nameEn : product.nameKu}</h4>
                                <p className="product-price">{formatCurrency(getCurrencyPrice(product.price, selectedCurrency, product.currency || 'USD'), selectedCurrency)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="retail-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${retailData.phone}`} className="contact-link phone-link">
                              📞 {retailData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${retailData.email}`} className="contact-link email-link">
                              📧 {retailData.email}
                            </a>
                          </p>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {retailData.facebook && (
                              <a href={retailData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {retailData.instagram && (
                              <a href={retailData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {retailData.tiktok && (
                              <a href={retailData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(retailData.address)}
                          >
                            📍 {retailData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (selectedTemplate?.name === 'Services') {
          return (
            <div className="services-template">
              <div className="template-preview">
                <h2>Services Template Configuration</h2>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Business Name:</label>
                      <input 
                        type="text" 
                        value={servicesData.name}
                        onChange={(e) => setServicesData({...servicesData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={servicesData.location}
                        onChange={(e) => setServicesData({...servicesData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={servicesData.phone}
                        onChange={(e) => setServicesData({...servicesData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={servicesData.email}
                        onChange={(e) => setServicesData({...servicesData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={servicesData.address}
                        onChange={(e) => setServicesData({...servicesData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={servicesData.facebook}
                        onChange={(e) => setServicesData({...servicesData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={servicesData.instagram}
                        onChange={(e) => setServicesData({...servicesData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={servicesData.tiktok}
                        onChange={(e) => setServicesData({...servicesData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="services-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{servicesData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(servicesData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {servicesData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Services Section */}
                      <div className="services-middle">
                        <h3>Our Services</h3>
                        <div className="services-grid">
                          {servicesData.services.map((service) => (
                            <div key={service.id} className="service-card">
                              <div className="service-icon">🔧</div>
                              <h4 className={selectedLanguage === 'ku' ? 'display-kurdish' : ''}>{selectedLanguage === 'en' ? service.nameEn : service.nameKu}</h4>
                              <p className="service-price">{formatCurrency(getCurrencyPrice(service.price, selectedCurrency, service.currency || 'USD'), selectedCurrency)}</p>
                              <p className="service-duration">{service.duration}</p>
                              <p className="service-description">{service.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="services-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${servicesData.phone}`} className="contact-link phone-link">
                              📞 {servicesData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${servicesData.email}`} className="contact-link email-link">
                              📧 {servicesData.email}
                            </a>
                          </p>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {servicesData.facebook && (
                              <a href={servicesData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {servicesData.instagram && (
                              <a href={servicesData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {servicesData.tiktok && (
                              <a href={servicesData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(servicesData.address)}
                          >
                            📍 {servicesData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (selectedTemplate?.name === 'Healthcare') {
          return (
            <div className="healthcare-template">
              <div className="template-preview">
                <h2>Healthcare Template Configuration</h2>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Clinic Name:</label>
                      <input 
                        type="text" 
                        value={healthcareData.name}
                        onChange={(e) => setHealthcareData({...healthcareData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={healthcareData.location}
                        onChange={(e) => setHealthcareData({...healthcareData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={healthcareData.phone}
                        onChange={(e) => setHealthcareData({...healthcareData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={healthcareData.email}
                        onChange={(e) => setHealthcareData({...healthcareData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={healthcareData.address}
                        onChange={(e) => setHealthcareData({...healthcareData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Opening Hours:</label>
                      <input 
                        type="text" 
                        value={healthcareData.openingHours}
                        onChange={(e) => setHealthcareData({...healthcareData, openingHours: e.target.value})}
                        className="config-input"
                        placeholder="Mon-Fri 9:00-18:00, Sat 9:00-15:00"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={healthcareData.facebook}
                        onChange={(e) => setHealthcareData({...healthcareData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={healthcareData.instagram}
                        onChange={(e) => setHealthcareData({...healthcareData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={healthcareData.tiktok}
                        onChange={(e) => setHealthcareData({...healthcareData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="healthcare-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{healthcareData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(healthcareData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {healthcareData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Doctors Section */}
                      <div className="healthcare-middle">
                        <h3>Our Doctors</h3>
                        <div className="doctors-grid">
                          {healthcareData.doctors.map((doctor) => (
                            <div key={doctor.id} className="doctor-card">
                              <div className="doctor-icon">👨‍⚕️</div>
                              <h4>Dr. {doctor.name}</h4>
                              <p className="doctor-specialty">{doctor.specialty}</p>
                              <p className="doctor-experience">{doctor.experience}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="opening-hours">
                          <h4>Opening Hours</h4>
                          <p>{healthcareData.openingHours}</p>
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="healthcare-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${healthcareData.phone}`} className="contact-link phone-link">
                              📞 {healthcareData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${healthcareData.email}`} className="contact-link email-link">
                              📧 {healthcareData.email}
                            </a>
                          </p>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {healthcareData.facebook && (
                              <a href={healthcareData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {healthcareData.instagram && (
                              <a href={healthcareData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {healthcareData.tiktok && (
                              <a href={healthcareData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer">
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(healthcareData.address)}
                          >
                            📍 {healthcareData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (selectedTemplate?.name === 'Beauty Salon') {
          return (
            <div className="beauty-template">
              <div className="template-preview">
                <h2>Beauty Salon Template Configuration</h2>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Salon Name:</label>
                      <input 
                        type="text" 
                        value={beautySalonData.name}
                        onChange={(e) => setBeautySalonData({...beautySalonData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={beautySalonData.location}
                        onChange={(e) => setBeautySalonData({...beautySalonData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={beautySalonData.phone}
                        onChange={(e) => setBeautySalonData({...beautySalonData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={beautySalonData.email}
                        onChange={(e) => setBeautySalonData({...beautySalonData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={beautySalonData.address}
                        onChange={(e) => setBeautySalonData({...beautySalonData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={beautySalonData.facebook}
                        onChange={(e) => setBeautySalonData({...beautySalonData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={beautySalonData.instagram}
                        onChange={(e) => setBeautySalonData({...beautySalonData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={beautySalonData.tiktok}
                        onChange={(e) => setBeautySalonData({...beautySalonData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="beauty-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{beautySalonData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(beautySalonData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {beautySalonData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Treatments Section */}
                      <div className="beauty-middle">
                        <h3>Our Treatments</h3>
                        <div className="treatments-grid">
                          {beautySalonData.treatments.map((treatment) => (
                            <div key={treatment.id} className="treatment-card">
                              <div className="treatment-icon">💄</div>
                              <h4 className={selectedLanguage === 'ku' ? 'display-kurdish' : ''}>{selectedLanguage === 'en' ? treatment.nameEn : treatment.nameKu}</h4>
                              <p className="treatment-price">{formatCurrency(getCurrencyPrice(treatment.price, selectedCurrency, treatment.currency || 'USD'), selectedCurrency)}</p>
                              <p className="treatment-duration">{treatment.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="beauty-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${beautySalonData.phone}`} className="contact-link phone-link">
                              📞 {beautySalonData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${beautySalonData.email}`} className="contact-link email-link">
                              📧 {beautySalonData.email}
                            </a>
                          </p>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {beautySalonData.facebook && (
                              <a href={beautySalonData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {beautySalonData.instagram && (
                              <a href={beautySalonData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {beautySalonData.tiktok && (
                              <a href={beautySalonData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(beautySalonData.address)}
                          >
                            📍 {beautySalonData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (selectedTemplate?.name === 'Auto Shop') {
          return (
            <div className="auto-template">
              <div className="template-preview">
                <h2>Auto Shop Template Configuration</h2>
                <div className="config-and-preview">
                  
                  {/* Configuration Panel */}
                  <div className="config-panel">
                    <h3>Business Information</h3>
                    
                    <div className="config-group">
                      <label>Shop Name:</label>
                      <input 
                        type="text" 
                        value={autoShopData.name}
                        onChange={(e) => setAutoShopData({...autoShopData, name: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Location Button Text:</label>
                      <input 
                        type="text" 
                        value={autoShopData.location}
                        onChange={(e) => setAutoShopData({...autoShopData, location: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Phone:</label>
                      <input 
                        type="text" 
                        value={autoShopData.phone}
                        onChange={(e) => setAutoShopData({...autoShopData, phone: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Email:</label>
                      <input 
                        type="email" 
                        value={autoShopData.email}
                        onChange={(e) => setAutoShopData({...autoShopData, email: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Address:</label>
                      <input 
                        type="text" 
                        value={autoShopData.address}
                        onChange={(e) => setAutoShopData({...autoShopData, address: e.target.value})}
                        className="config-input"
                      />
                    </div>
                    
                    <h4>Branding & Appearance</h4>
                    
                    {/* Logo Upload */}
                    <div className="config-group">
                      <label>Business Logo:</label>
                      <div className="logo-upload-area-compact">
                        {brandingData.logoPreview ? (
                          <div className="logo-preview-compact">
                            <img src={brandingData.logoPreview} alt="Logo Preview" className="logo-preview-image-compact" />
                            <button 
                              className="remove-logo-btn-compact"
                              onClick={() => setBrandingData({...brandingData, logo: null, logoPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="logo-upload-placeholder-compact">
                            <span>📁 Upload Logo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      logo: file,
                                      logoPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Brand Colors */}
                    <div className="config-group">
                      <label>Primary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.primaryColor}
                          onChange={(e) => setBrandingData({...brandingData, primaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#007bff"
                        />
                      </div>
                    </div>
                    
                    <div className="config-group">
                      <label>Secondary Brand Color:</label>
                      <div className="color-input-container-compact">
                        <input
                          type="color"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="color-picker-compact"
                        />
                        <input
                          type="text"
                          value={brandingData.secondaryColor}
                          onChange={(e) => setBrandingData({...brandingData, secondaryColor: e.target.value})}
                          className="config-input color-text-input-compact"
                          placeholder="#6c757d"
                        />
                      </div>
                    </div>
                    
                    {/* Banner Image */}
                    <div className="config-group">
                      <label>Header Banner:</label>
                      <div className="banner-upload-area-compact">
                        {brandingData.bannerPreview ? (
                          <div className="banner-preview-compact">
                            <img src={brandingData.bannerPreview} alt="Banner Preview" className="banner-preview-image-compact" />
                            <button 
                              className="remove-banner-btn-compact"
                              onClick={() => setBrandingData({...brandingData, bannerImage: null, bannerPreview: null})}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="banner-upload-placeholder-compact">
                            <span>🖼️ Upload Banner</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setBrandingData({
                                      ...brandingData,
                                      bannerImage: file,
                                      bannerPreview: e.target.result
                                    });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="file-input-compact"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Taglines */}
                    <div className="config-group">
                      <label>Business Tagline (English):</label>
                      <input
                        type="text"
                        value={brandingData.tagline}
                        onChange={(e) => setBrandingData({...brandingData, tagline: e.target.value})}
                        placeholder="Your business tagline or slogan"
                        className="config-input"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Business Tagline (Kurdish):</label>
                      <input
                        type="text"
                        value={brandingData.taglineKu}
                        onChange={(e) => setBrandingData({...brandingData, taglineKu: e.target.value})}
                        placeholder="نووسینی کورتەی بازرگانی"
                        className="config-input kurdish-input"
                        dir="rtl"
                      />
                    </div>
                    
                    <h4>Social Media</h4>
                    
                    <div className="config-group">
                      <label>Facebook URL:</label>
                      <input 
                        type="url" 
                        value={autoShopData.facebook}
                        onChange={(e) => setAutoShopData({...autoShopData, facebook: e.target.value})}
                        className="config-input"
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>Instagram URL:</label>
                      <input 
                        type="url" 
                        value={autoShopData.instagram}
                        onChange={(e) => setAutoShopData({...autoShopData, instagram: e.target.value})}
                        className="config-input"
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>
                    
                    <div className="config-group">
                      <label>TikTok URL:</label>
                      <input 
                        type="url" 
                        value={autoShopData.tiktok}
                        onChange={(e) => setAutoShopData({...autoShopData, tiktok: e.target.value})}
                        className="config-input"
                        placeholder="https://tiktok.com/@yourpage"
                      />
                    </div>
                  </div>
                  
                  {/* Live Preview */}
                  <div className="live-preview">
                    <h3>Live Preview</h3>
                    <div className="template-mockup">
                      {/* Banner/Header Image */}
                      {brandingData.bannerPreview && (
                        <div className="preview-banner-header">
                          <img src={brandingData.bannerPreview} alt="Header Banner" className="preview-banner-header-image" />
                        </div>
                      )}
                      
                      {/* Header */}
                      <div className="auto-header" style={{
                        borderBottom: `3px solid ${brandingData.primaryColor}`,
                        background: `linear-gradient(135deg, ${brandingData.primaryColor}05, ${brandingData.secondaryColor}05)`
                      }}>
                        <div className="logo-section">
                          <div className="logo-placeholder">
                            {brandingData.logoPreview ? (
                              <img src={brandingData.logoPreview} alt="Business Logo" className="preview-logo-header" />
                            ) : (
                              <span>📷</span>
                            )}
                          </div>
                          <div className="business-info">
                            <h3 style={{color: brandingData.primaryColor}}>{autoShopData.name}</h3>
                            {/* Show taglines if available */}
                            {brandingData.tagline && (
                              <p className="preview-tagline-header" style={{color: brandingData.secondaryColor}}>
                                {brandingData.tagline}
                              </p>
                            )}
                            {brandingData.taglineKu && (
                              <p className="preview-tagline-header kurdish-text" style={{color: brandingData.secondaryColor}} dir="rtl">
                                {brandingData.taglineKu}
                              </p>
                            )}
                            <button 
                              className="location-btn"
                              onClick={() => handleLocationClick(autoShopData.address)}
                              style={{
                                background: brandingData.primaryColor,
                                borderColor: brandingData.primaryColor
                              }}
                            >
                              📍 {autoShopData.location}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Services Section */}
                      <div className="auto-middle">
                        <h3>Our Services</h3>
                        <div className="auto-services-grid">
                          {autoShopData.services.map((service) => (
                            <div key={service.id} className="auto-service-card">
                              <div className="auto-service-icon">🚗</div>
                              <h4 className={selectedLanguage === 'ku' ? 'display-kurdish' : ''}>{selectedLanguage === 'en' ? service.nameEn : service.nameKu}</h4>
                              <p className="auto-service-price">{formatCurrency(getCurrencyPrice(service.price, selectedCurrency, service.currency || 'USD'), selectedCurrency)}</p>
                              <p className="auto-service-duration">{service.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Footer */}
                      <div className="auto-footer">
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Contact</h4>
                          <p>
                            <a href={`tel:${autoShopData.phone}`} className="contact-link phone-link">
                              📞 {autoShopData.phone}
                            </a>
                          </p>
                          <p>
                            <a href={`mailto:${autoShopData.email}`} className="contact-link email-link">
                              📧 {autoShopData.email}
                            </a>
                          </p>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Social Media</h4>
                          <div className="social-links">
                            {autoShopData.facebook && (
                              <a href={autoShopData.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📘 Facebook
                              </a>
                            )}
                            {autoShopData.instagram && (
                              <a href={autoShopData.instagram} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                📷 Instagram
                              </a>
                            )}
                            {autoShopData.tiktok && (
                              <a href={autoShopData.tiktok} className="social-btn" target="_blank" rel="noopener noreferrer"
                                 style={{background: brandingData.secondaryColor}}>
                                🎵 TikTok
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="footer-section">
                          <h4 style={{color: brandingData.primaryColor}}>Location</h4>
                          <button 
                            className="location-text-btn"
                            onClick={() => handleLocationClick(autoShopData.address)}
                          >
                            📍 {autoShopData.address}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="template-actions">
                  <button 
                    className="back-btn"
                    onClick={() => setCreateBusinessStep(1)}
                  >
                    ← Back
                  </button>
                  <button 
                    className="continue-btn"
                    onClick={() => setCreateBusinessStep(6)}
                  >
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="step-container">
            <h2>Template Configuration</h2>
            <p>Configure your {selectedTemplate?.name} template</p>
            <div className="language-toggle" style={{marginBottom: '20px', textAlign: 'center'}}>
              <button 
                className={`lang-btn ${selectedLanguage === 'en' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('en')}
              >
                🇺🇸 English
              </button>
              <button 
                className={`lang-btn ${selectedLanguage === 'ku' ? 'active' : ''}`}
                onClick={() => setSelectedLanguage('ku')}
              >
                <span className="kurdish-text">🔴⚪🟢 کوردی</span>
              </button>
            </div>
            <button onClick={() => setCreateBusinessStep(1)}>← Back</button>
          </div>
        );
      case 6:
        return (
          <div className="step-container">
            <div className="step-header">
              <h2>Step 6: Business Hours</h2>
              <p>Set your operating schedule and timezone</p>
            </div>
            
            <div className="business-hours-container">
              <div className="hours-config-panel">
                <h3>🕒 Operating Hours</h3>
                <p>Configure when your business is open to customers</p>
                
                <div className="timezone-selection">
                  <label>🌍 Timezone:</label>
                  <select 
                    value={selectedTimezone} 
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="timezone-select"
                  >
                    <option value="GMT-12">GMT-12 (Baker Island)</option>
                    <option value="GMT-11">GMT-11 (American Samoa)</option>
                    <option value="GMT-10">GMT-10 (Hawaii)</option>
                    <option value="GMT-9">GMT-9 (Alaska)</option>
                    <option value="GMT-8">GMT-8 (Pacific Time)</option>
                    <option value="GMT-7">GMT-7 (Mountain Time)</option>
                    <option value="GMT-6">GMT-6 (Central Time)</option>
                    <option value="GMT-5">GMT-5 (Eastern Time)</option>
                    <option value="GMT-4">GMT-4 (Atlantic Time)</option>
                    <option value="GMT-3">GMT-3 (Argentina)</option>
                    <option value="GMT-2">GMT-2 (South Georgia)</option>
                    <option value="GMT-1">GMT-1 (Azores)</option>
                    <option value="GMT+0">GMT+0 (London)</option>
                    <option value="GMT+1">GMT+1 (Central Europe)</option>
                    <option value="GMT+2">GMT+2 (Eastern Europe)</option>
                    <option value="GMT+3">GMT+3 (Baghdad, Kuwait)</option>
                    <option value="GMT+4">GMT+4 (Dubai)</option>
                    <option value="GMT+5">GMT+5 (Pakistan)</option>
                    <option value="GMT+6">GMT+6 (Bangladesh)</option>
                    <option value="GMT+7">GMT+7 (Thailand)</option>
                    <option value="GMT+8">GMT+8 (Singapore)</option>
                    <option value="GMT+9">GMT+9 (Japan)</option>
                    <option value="GMT+10">GMT+10 (Australia East)</option>
                    <option value="GMT+11">GMT+11 (Solomon Islands)</option>
                    <option value="GMT+12">GMT+12 (New Zealand)</option>
                  </select>
                </div>
                
                <div className="holiday-mode">
                  <label className="holiday-toggle">
                    <input
                      type="checkbox"
                      checked={holidayMode}
                      onChange={(e) => setHolidayMode(e.target.checked)}
                    />
                    <span className="holiday-text">
                      🌴 Holiday Mode (Temporarily close business)
                    </span>
                  </label>
                </div>
                
                <div className="days-schedule">
                  {Object.entries(businessHours).map(([day, hours]) => (
                    <div key={day} className="day-schedule">
                      <div className="day-header">
                        <span className="day-name">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                        <label className="day-toggle">
                          <input
                            type="checkbox"
                            checked={hours.isOpen}
                            onChange={(e) => {
                              setBusinessHours({
                                ...businessHours,
                                [day]: { ...hours, isOpen: e.target.checked }
                              });
                            }}
                          />
                          <span className={`toggle-status ${hours.isOpen ? 'open' : 'closed'}`}>
                            {hours.isOpen ? '✅ Open' : '❌ Closed'}
                          </span>
                        </label>
                      </div>
                      
                      {hours.isOpen && (
                        <div className="time-inputs">
                          <div className="time-group">
                            <label>Open:</label>
                            <input
                              type="time"
                              value={hours.open}
                              onChange={(e) => {
                                setBusinessHours({
                                  ...businessHours,
                                  [day]: { ...hours, open: e.target.value }
                                });
                              }}
                              className="time-input"
                            />
                          </div>
                          <div className="time-group">
                            <label>Close:</label>
                            <input
                              type="time"
                              value={hours.close}
                              onChange={(e) => {
                                setBusinessHours({
                                  ...businessHours,
                                  [day]: { ...hours, close: e.target.value }
                                });
                              }}
                              className="time-input"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="quick-actions">
                  <h4>⚡ Quick Actions</h4>
                  <div className="quick-buttons">
                    <button
                      className="quick-btn"
                      onClick={() => {
                        const newHours = { ...businessHours };
                        Object.keys(newHours).forEach(day => {
                          if (day !== 'sunday') {
                            newHours[day] = { open: '09:00', close: '18:00', isOpen: true };
                          }
                        });
                        setBusinessHours(newHours);
                      }}
                    >
                      🏢 Standard Hours (9-6, Mon-Sat)
                    </button>
                    <button
                      className="quick-btn"
                      onClick={() => {
                        const newHours = { ...businessHours };
                        Object.keys(newHours).forEach(day => {
                          newHours[day] = { open: '00:00', close: '23:59', isOpen: true };
                        });
                        setBusinessHours(newHours);
                      }}
                    >
                      🌍 24/7 Service
                    </button>
                    <button
                      className="quick-btn"
                      onClick={() => {
                        const newHours = { ...businessHours };
                        Object.keys(newHours).forEach(day => {
                          if (['friday', 'saturday'].includes(day)) {
                            newHours[day] = { open: '18:00', close: '02:00', isOpen: true };
                          } else if (day === 'sunday') {
                            newHours[day] = { open: '18:00', close: '00:00', isOpen: true };
                          } else {
                            newHours[day] = { open: '18:00', close: '23:00', isOpen: true };
                          }
                        });
                        setBusinessHours(newHours);
                      }}
                    >
                      🌙 Evening Hours (Restaurant/Bar)
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="hours-preview">
                <h3>📅 Schedule Preview</h3>
                <div className="schedule-card">
                  <div className="current-status">
                    {holidayMode ? (
                      <div className="status-holiday">
                        🌴 Currently on Holiday
                      </div>
                    ) : (
                      <div className="status-open">
                        🕒 Schedule Active
                      </div>
                    )}
                  </div>
                  
                  <div className="weekly-schedule">
                    {Object.entries(businessHours).map(([day, hours]) => (
                      <div key={day} className={`schedule-day ${hours.isOpen ? 'open' : 'closed'}`}>
                        <span className="schedule-day-name">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                        <span className="schedule-day-hours">
                          {hours.isOpen ? `${hours.open} - ${hours.close}` : 'Closed'}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="timezone-info">
                    <span>🌍 Timezone: {selectedTimezone}</span>
                  </div>
                  
                  <div className="customer-display">
                    <h4>👀 How customers see it:</h4>
                    <div className="customer-hours-display">
                      {holidayMode ? (
                        <span className="holiday-notice">🌴 Temporarily Closed for Holiday</span>
                      ) : (
                        <>
                          {(() => {
                            const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase().slice(0, 3);
                            const dayMap = {
                              'sun': 'sunday', 'mon': 'monday', 'tue': 'tuesday',
                              'wed': 'wednesday', 'thu': 'thursday', 'fri': 'friday', 'sat': 'saturday'
                            };
                            const currentDay = dayMap[today] || 'monday';
                            
                            const todayHours = businessHours[currentDay];
                            const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                            
                            if (!todayHours?.isOpen) {
                              return <span className="status-closed">❌ Closed Today</span>;
                            }
                            
                            const isCurrentlyOpen = currentTime >= todayHours.open && currentTime <= todayHours.close;
                            
                            return (
                              <span className={`current-status ${isCurrentlyOpen ? 'open-now' : 'closed-now'}`}>
                                {isCurrentlyOpen ? 
                                  `✅ Open Now - Closes at ${todayHours.close}` : 
                                  `❌ Closed - Opens at ${todayHours.open}`
                                }
                              </span>
                            );
                          })()}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="step-actions">
              <button 
                className="back-btn"
                onClick={() => setCreateBusinessStep(5)}
              >
                ← Back to Template Setup
              </button>
              <button 
                className="continue-btn"
                onClick={() => setCreateBusinessStep(7)}
              >
                Continue to Review & Launch →
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="create-business-page">
            <h2>Create New Business</h2>
            <p>Add a new business to the cashier system.</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'dashboard':
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🏪</div>
                <div className="stat-info">
                  <h3>Active Shops</h3>
                  <div className="stat-number">0</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>Monthly Revenue</h3>
                  <div className="stat-number">$0.00</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📈</div>
                <div className="stat-info">
                  <h3>Total Revenue</h3>
                  <div className="stat-number">$0.00</div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Active Users</h3>
                  <div className="stat-number">0</div>
                </div>
              </div>
            </div>
            
            <div className="subscription-stats">
              <h3>Subscription Overview</h3>
              <div className="subscription-grid">
                <div className="subscription-card">
                  <div className="sub-icon">📅</div>
                  <div className="sub-info">
                    <h4>Monthly Subscriptions</h4>
                    <div className="sub-count">0 shops</div>
                    <div className="sub-revenue">$0.00/month</div>
                  </div>
                </div>
                
                <div className="subscription-card">
                  <div className="sub-icon">📆</div>
                  <div className="sub-info">
                    <h4>Yearly Subscriptions</h4>
                    <div className="sub-count">0 shops</div>
                    <div className="sub-revenue">$0.00/year</div>
                  </div>
                </div>
                
                <div className="subscription-card">
                  <div className="sub-icon">💎</div>
                  <div className="sub-info">
                    <h4>One-Time Payments</h4>
                    <div className="sub-count">0 shops</div>
                    <div className="sub-revenue">$0.00 total</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="revenue-breakdown">
              <h3>Revenue Breakdown</h3>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <span>Monthly Subscription Fees:</span>
                  <span>$0.00</span>
                </div>
                <div className="breakdown-item">
                  <span>Yearly Subscription Fees:</span>
                  <span>$0.00</span>
                </div>
                <div className="breakdown-item">
                  <span>One-Time Purchase Fees:</span>
                  <span>$0.00</span>
                </div>
                <div className="breakdown-item">
                  <span>Transaction Fees:</span>
                  <span>$0.00</span>
                </div>
                <div className="breakdown-item">
                  <span>Setup Fees:</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'create-business':
        return renderCreateBusiness();
      default:
        return (
          <div>
            <h2>Welcome, Super Admin!</h2>
            <p>Manage your cashier system from here.</p>
          </div>
        );
    }
  };

  return (
    <div className="superadmin-dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1>💰 Super Admin Dashboard</h1>
          <div className="save-controls">
            <button 
              onClick={saveProgress} 
              className="save-btn"
              title="Save current progress"
            >
              💾 Save
            </button>
            <button 
              onClick={clearProgress} 
              className="clear-btn"
              title="Clear all saved data"
            >
              🗑️ Clear
            </button>
            {saveStatus && (
              <span className={`save-status ${saveStatus}`}>
                {saveStatus === 'saving' && '💾 Saving...'}
                {saveStatus === 'saved' && '✅ Saved!'}
                {saveStatus === 'error' && '❌ Error!'}
                {saveStatus === 'cleared' && '🗑️ Cleared!'}
              </span>
            )}
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>
      
      <div className="dashboard-layout">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={`nav-item ${currentPage === 'create-business' ? 'active' : ''}`}
              onClick={() => setCurrentPage('create-business')}
            >
              🏪 Create Business
            </button>
          </nav>
        </aside>
        
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
