import React, { useState } from 'react';
import { 
  Shield, 
  ChevronDown, 
  Globe, 
  Moon, 
  Sun,
  CreditCard,
  Building,
  Bitcoin,
  ExternalLink,
  Copy,
  Check,
  Info,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import techoneLogo from '@/assets/techone-logo.png';
import pgxLogo from '@/assets/pgx-logo.png';

const PaymentGateway = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const orderData = {
    orderId: 'ORD-2024-001523',
    transactionId: 'TXN-PGX-789456123',
    productName: 'Premium Software License',
    amount: 299.99,
    currency: 'USD'
  };

  const customerData = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105'
  };

  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105'
  });
  const [orderBreakdown, setOrderBreakdown] = useState({
    subtotal: 249.99,
    tax: 25.00,
    processingFee: 15.00,
    discount: -10.00
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const saveCustomerInfo = () => {
    // In a real app, this would save to a database
    console.log('Saving customer info:', editedCustomer);
    setIsEditingCustomer(false);
  };

  const cancelEditCustomer = () => {
    setEditedCustomer(customerData);
    setIsEditingCustomer(false);
  };

  const handleCustomerFieldChange = (field: string, value: string) => {
    setEditedCustomer(prev => ({ ...prev, [field]: value }));
  };

  const totalAmount = orderBreakdown.subtotal + orderBreakdown.tax + orderBreakdown.processingFee + orderBreakdown.discount;

  return (
    <TooltipProvider>
      <div className={`min-h-screen bg-background transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* Header with Theme Toggle and Language Selector */}
        <div className="flex justify-between items-center p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">Secure Checkout</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">EN</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={darkMode} onCheckedChange={toggleTheme} />
              <Moon className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 pb-32 md:pb-8">
          {/* Merchant Details Section */}
          <div className="premium-card p-6 mb-6 animate-fade-in">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-3">You are paying to</p>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 w-full justify-center md:justify-start">
                <img 
                  src={techoneLogo} 
                  alt="TechOne Online" 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-foreground">TechOne Online</h1>
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="verified-glow">
                          <Badge className="badge-success">
                            <Shield className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Merchant</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <a 
                    href="https://techoneonline.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    techoneonline.com
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 md:gap-6">
            {/* Left Column - Order & Customer Details */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="premium-card p-6 animate-slide-up">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  Order Summary
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Order ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{orderData.orderId}</span>
                      <button
                        onClick={() => copyToClipboard(orderData.orderId, 'orderId')}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === 'orderId' ? (
                          <Check className="w-3 h-3 text-success" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Transaction ID</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono">{orderData.transactionId}</span>
                      <button
                        onClick={() => copyToClipboard(orderData.transactionId, 'transactionId')}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedField === 'transactionId' ? (
                          <Check className="w-3 h-3 text-success" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{orderData.productName}</span>
                      <span className="text-sm">${orderBreakdown.subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${orderBreakdown.tax}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>${orderBreakdown.processingFee}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-success">Discount Applied</span>
                      <span className="text-success">${orderBreakdown.discount}</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="gradient-primary bg-clip-text text-transparent">
                        ${totalAmount.toFixed(2)} {orderData.currency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="premium-card p-6 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                    Customer Information
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditingCustomer ? saveCustomerInfo() : setIsEditingCustomer(true)}
                    className="flex items-center gap-2"
                  >
                    {isEditingCustomer ? (
                      <>
                        <Save className="w-3 h-3" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="w-3 h-3" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
                
                {isEditingCustomer ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="editName" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="editName"
                        value={editedCustomer.name}
                        onChange={(e) => handleCustomerFieldChange('name', e.target.value)}
                        className="input-premium mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editEmail" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="editEmail"
                        type="email"
                        value={editedCustomer.email}
                        onChange={(e) => handleCustomerFieldChange('email', e.target.value)}
                        className="input-premium mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editPhone" className="text-sm font-medium">Phone Number</Label>
                      <Input
                        id="editPhone"
                        value={editedCustomer.phone}
                        onChange={(e) => handleCustomerFieldChange('phone', e.target.value)}
                        className="input-premium mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="editAddress" className="text-sm font-medium">Address</Label>
                      <Input
                        id="editAddress"
                        value={editedCustomer.address}
                        onChange={(e) => handleCustomerFieldChange('address', e.target.value)}
                        className="input-premium mt-1"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={cancelEditCustomer}
                        className="flex items-center gap-2"
                      >
                        <X className="w-3 h-3" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <span className="ml-2 font-medium">{editedCustomer.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="ml-2 font-medium">{editedCustomer.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2 font-medium">{editedCustomer.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Address:</span>
                      <span className="ml-2 font-medium">{editedCustomer.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Payment Methods */}
            <div className="space-y-6">
              <PaymentMethodsSection 
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Order Summary - Collapsible */}
            <div className="premium-card animate-slide-up">
              <button
                onClick={() => toggleSection('order')}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="font-semibold">Order Summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                    ${totalAmount.toFixed(2)}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'order' ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {expandedSection === 'order' && (
                <div className="px-4 pb-4 space-y-3 border-t border-border/50">
                  <div className="pt-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Order ID</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{orderData.orderId}</span>
                        <button
                          onClick={() => copyToClipboard(orderData.orderId, 'orderId')}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedField === 'orderId' ? (
                            <Check className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Transaction ID</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">{orderData.transactionId}</span>
                        <button
                          onClick={() => copyToClipboard(orderData.transactionId, 'transactionId')}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {copiedField === 'transactionId' ? (
                            <Check className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm">{orderData.productName}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customer Details - Collapsible */}
            <div className="premium-card animate-slide-up">
              <button
                onClick={() => toggleSection('customer')}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="font-semibold">Customer Information</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSection === 'customer' ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedSection === 'customer' && (
                <div className="px-4 pb-4 border-t border-border/50">
                  <div className="pt-3 space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <span className="ml-2 font-medium">{customerData.name}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="ml-2 font-medium">{customerData.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="ml-2 font-medium">{customerData.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Address:</span>
                      <span className="ml-2 font-medium">{customerData.address}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <PaymentMethodsSection 
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>
        </div>

        {/* Sticky Bottom Pay Button for Mobile */}
        <div className="sticky-bottom md:hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Total Amount</span>
            <span className="text-xl font-bold">${totalAmount.toFixed(2)} {orderData.currency}</span>
          </div>
          <Button className="btn-primary w-full h-14 text-lg font-semibold">
            Complete Payment
          </Button>
          
          {/* PGX Branding */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Powered by</span>
            <img src={pgxLogo} alt="PGX" className="h-4 opacity-80" />
          </div>
        </div>

        {/* PGX Branding for Desktop */}
        <div className="hidden md:flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
          <span>Powered by</span>
          <img src={pgxLogo} alt="PGX" className="h-5 opacity-80" />
        </div>
      </div>
    </TooltipProvider>
  );
};

// Payment Methods Component
const PaymentMethodsSection = ({ paymentMethod, setPaymentMethod }: { 
  paymentMethod: string; 
  setPaymentMethod: (method: string) => void; 
}) => {
  return (
    <div className="premium-card p-6 animate-slide-up">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-secondary"></div>
        Payment Method
      </h2>

      {/* Payment Method Tabs */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => setPaymentMethod('credit-card')}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            paymentMethod === 'credit-card'
              ? 'border-primary bg-primary/5 shadow-glow'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="text-xs font-medium">Card</span>
        </button>

        <button
          onClick={() => setPaymentMethod('bank-transfer')}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            paymentMethod === 'bank-transfer'
              ? 'border-primary bg-primary/5 shadow-glow'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <Building className="w-5 h-5" />
          <span className="text-xs font-medium">Bank</span>
        </button>

        <button
          onClick={() => setPaymentMethod('crypto')}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all relative ${
            paymentMethod === 'crypto'
              ? 'border-primary bg-primary/5 shadow-glow'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <Bitcoin className="w-5 h-5" />
          <span className="text-xs font-medium">Crypto</span>
          <Badge className="badge-warning absolute -top-2 -right-2 text-[10px] px-1">
            Sandbox
          </Badge>
        </button>
      </div>

      {/* Payment Forms */}
      {paymentMethod === 'credit-card' && <CreditCardForm />}
      {paymentMethod === 'bank-transfer' && <BankTransferForm />}
      {paymentMethod === 'crypto' && <CryptoPaymentForm />}

      {/* Pay Button for Desktop */}
      <div className="hidden md:block mt-8">
        <Button className="btn-primary w-full h-14 text-lg font-semibold">
          Complete Payment - ${(249.99 + 25.00 + 15.00 - 10.00).toFixed(2)} USD
        </Button>
        
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

// Credit Card Form Component
const CreditCardForm = () => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
        <Input
          id="cardNumber"
          placeholder="1234 5678 9012 3456"
          className="input-premium mt-1"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            className="input-premium mt-1"
          />
        </div>
        <div>
          <Label htmlFor="cvv" className="text-sm font-medium">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            className="input-premium mt-1"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="cardHolder" className="text-sm font-medium">Cardholder Name</Label>
        <Input
          id="cardHolder"
          placeholder="John Smith"
          className="input-premium mt-1"
        />
      </div>
    </div>
  );
};

// Bank Transfer Form Component
const BankTransferForm = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent">Bank Transfer Instructions</p>
            <p className="text-muted-foreground mt-1">
              You will be redirected to your bank's secure portal to complete the payment.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="bankAccount" className="text-sm font-medium">Select Bank Account</Label>
        <select className="w-full input-premium mt-1">
          <option>Chase Bank - ***4567</option>
          <option>Wells Fargo - ***8901</option>
          <option>Bank of America - ***2345</option>
        </select>
      </div>
    </div>
  );
};

// Crypto Payment Form Component
const CryptoPaymentForm = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-warning mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-warning">Sandbox Mode</p>
            <p className="text-muted-foreground mt-1">
              This is a test environment. No real cryptocurrency will be charged.
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="cryptoCurrency" className="text-sm font-medium">Select Cryptocurrency</Label>
        <select className="w-full input-premium mt-1">
          <option>Bitcoin (BTC)</option>
          <option>Ethereum (ETH)</option>
          <option>USD Coin (USDC)</option>
        </select>
      </div>
      
      <div>
        <Label htmlFor="walletAddress" className="text-sm font-medium">Wallet Address</Label>
        <Input
          id="walletAddress"
          placeholder="Enter your wallet address"
          className="input-premium mt-1"
        />
      </div>
    </div>
  );
};

export default PaymentGateway;