import React, { useState, useEffect } from 'react';
import { Shield, Lock, Star, CheckCircle, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface EnhancedPaymentHeaderProps {
  merchantName: string;
  merchantLogo: string;
  merchantUrl: string;
  isVerified?: boolean;
  amount?: number;
  currency?: string;
}

const EnhancedPaymentHeader: React.FC<EnhancedPaymentHeaderProps> = ({
  merchantName,
  merchantLogo,
  merchantUrl,
  isVerified = true,
  amount,
  currency = 'USD'
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const dynamicMessages = [
    {
      text: "🔒 Secure checkout with",
      subtitle: "256-bit SSL encryption",
      icon: Lock,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      text: "✨ Complete your premium purchase from",
      subtitle: "Trusted payment partner",
      icon: Star,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      text: "⚡ Finalize your order from",
      subtitle: "Lightning-fast processing",
      icon: Zap,
      gradient: "from-orange-500 to-red-500"
    },
    {
      text: "🛡️ Protected transaction with",
      subtitle: "PCI DSS compliant",
      icon: Shield,
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % dynamicMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [dynamicMessages.length]);

  const currentMessage = dynamicMessages[currentMessageIndex];
  const IconComponent = currentMessage.icon;

  return (
    <div className="premium-card p-6 mb-6 animate-fade-in relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full bg-gradient-to-r ${currentMessage.gradient}`} />
      </div>
      
      {/* Security indicators */}
      <div className="flex justify-center mb-4">
        <div className="flex items-center gap-3 text-xs">
          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
            <Shield className="w-3 h-3 mr-1" />
            SSL Secured
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            PCI Compliant
          </Badge>
        </div>
      </div>

      {/* Main message */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IconComponent className="w-5 h-5 text-primary animate-pulse" />
          <h3 className={`text-lg font-bold bg-gradient-to-r ${currentMessage.gradient} bg-clip-text text-transparent animate-fade-in`}>
            {currentMessage.text}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground opacity-75">
          {currentMessage.subtitle}
        </p>
      </div>
      
      {/* Merchant info */}
      <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
        <div className="relative">
          <img 
            src={merchantLogo} 
            alt={merchantName} 
            className="w-16 h-16 rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
          {isVerified && (
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              {merchantName}
            </h1>
            {isVerified && (
              <Tooltip>
                <TooltipTrigger>
                  <div className="verified-glow">
                    <Badge className="badge-success animate-pulse">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-center">
                    <p className="font-semibold">Verified Merchant</p>
                    <p className="text-xs opacity-75">Security validated</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <a 
            href={merchantUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 justify-center md:justify-start group"
          >
            <span className="story-link">{merchantUrl.replace('https://', '')}</span>
            <div className="w-3 h-3 group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </div>
          </a>
          
          {amount && (
            <div className="mt-2">
              <div className="flex items-center gap-1 justify-center md:justify-start">
                <span className="text-xs text-muted-foreground">Transaction amount:</span>
                <span className="font-bold text-primary">
                  {currency === 'USD' ? '$' : currency} {amount.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust indicators */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
        <div className="text-center">
          <div className="text-xs font-semibold text-green-600">10,000+</div>
          <div className="text-xs text-muted-foreground">Secure payments</div>
        </div>
        <div className="w-px h-8 bg-border/50" />
        <div className="text-center">
          <div className="text-xs font-semibold text-blue-600">99.9%</div>
          <div className="text-xs text-muted-foreground">Uptime</div>
        </div>
        <div className="w-px h-8 bg-border/50" />
        <div className="text-center">
          <div className="text-xs font-semibold text-purple-600">24/7</div>
          <div className="text-xs text-muted-foreground">Support</div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPaymentHeader;