import React, { useState, useEffect } from 'react';
import { EyeOff, Eye, ArrowLeft } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  const [countdown, setCountdown] = useState(0);
  const [hasSentOnce, setHasSentOnce] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendResetLink = (e) => {
    if (e) e.preventDefault();
    setHasSentOnce(true);
    setCountdown(10);
    setToastMessage('Link sent!');
    
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleActivateResend = () => {
    setHasSentOnce(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setToastMessage('Welcome to accurvia');
    
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative" style={{ fontFamily: "'ag', sans-serif" }}>
      
      {toastMessage && (
        <div className="fixed top-8 right-8 bg-[#12B76A] text-white px-6 py-3 rounded-md shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 flex items-center gap-2 font-medium z-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {toastMessage}
        </div>
      )}

      <div className="w-full max-w-[440px]">
        
        {view === 'forgot' && (
          <button 
            onClick={() => {
              setView('login');
              setHasSentOnce(false);
              setCountdown(0);
            }}
            className="flex items-center text-[14px] text-gray-800 hover:text-gray-600 mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>
        )}

        <div className="p-10 border border-gray-100 rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 bg-white">
          
          {view === 'login' ? (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-[15px] text-gray-500">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setView('signup')}
                    className="text-[#F5A623] hover:text-[#e0961f] underline decoration-[#F5A623] underline-offset-4 transition-colors cursor-pointer"
                  >
                    Sign Up.
                  </button>
                </p>
              </div>

              <button 
                type="button" 
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#F8F9FA] hover:bg-gray-100 text-gray-800 text-[15px] font-medium rounded-sm transition-colors mb-6 cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </button>

              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-[13px] text-gray-500">or sign in with</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-5">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                </div>

                <div className="mb-5 relative">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <Eye className="w-5 h-5" strokeWidth={1.5} /> : <EyeOff className="w-5 h-5" strokeWidth={1.5} />}
                  </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                  <label className="flex items-center text-[14px] text-gray-800 cursor-pointer select-none">
                    <input type="checkbox" className="mr-2.5 w-[18px] h-[18px] rounded-sm border-gray-300 accent-[#1A2622] cursor-pointer" />
                    Remember me
                  </label>
                  <button 
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[14px] text-[#F5A623] hover:text-[#e0961f] transition-colors cursor-pointer"
                  >
                    Forget password
                  </button>
                </div>

                <button type="submit" className="w-full py-4 px-4 bg-[#1A2622] hover:bg-[#131d1a] text-white text-[15px] font-medium rounded-sm transition-colors shadow-sm cursor-pointer">
                  Login
                </button>
              </form>
            </div>
          ) : view === 'signup' ? (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                <p className="text-[15px] text-gray-500">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setView('login')}
                    className="text-[#F5A623] hover:text-[#e0961f] underline decoration-[#F5A623] underline-offset-4 transition-colors cursor-pointer"
                  >
                    Login.
                  </button>
                </p>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-5">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Full name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                </div>

                <div className="mb-5 relative">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Password</label>
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showSignupPassword ? <Eye className="w-5 h-5" strokeWidth={1.5} /> : <EyeOff className="w-5 h-5" strokeWidth={1.5} />}
                  </button>
                </div>

                <div className="mb-6 relative">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Confirm password</label>
                  <input
                    type={showSignupConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                    className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    {showSignupConfirmPassword ? <Eye className="w-5 h-5" strokeWidth={1.5} /> : <EyeOff className="w-5 h-5" strokeWidth={1.5} />}
                  </button>
                </div>

                <div className="flex items-start mb-8">
                  <label className="flex items-center text-[14px] text-gray-800 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mr-2.5 w-[18px] h-[18px] rounded-sm border-gray-300 accent-[#1A2622] cursor-pointer" 
                    />
                    <span>
                      I agree to the{' '}
                      <a href="#" className="text-[#F5A623] hover:text-[#e0961f] transition-colors cursor-pointer">Terms & Conditions</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#F5A623] hover:text-[#e0961f] transition-colors cursor-pointer">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="w-full py-4 px-4 bg-[#1A2622] hover:bg-[#131d1a] text-white text-[15px] font-medium rounded-sm transition-colors shadow-sm cursor-pointer">
                  Sign Up
                </button>
              </form>
            </div>
          ) : view === 'forgot' ? (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Forget Password</h1>
                <p className="text-[15px] text-gray-500 leading-relaxed">
                  Enter your email address below and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSendResetLink}>
                <div className="mb-6">
                  <label className="block text-[15px] font-bold text-gray-900 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-sm text-[15px] focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 transition-shadow cursor-text"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={hasSentOnce}
                  className={`w-full py-4 px-4 text-white text-[15px] font-medium rounded-sm transition-colors shadow-sm mb-4 ${hasSentOnce ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#1A2622] hover:bg-[#131d1a] cursor-pointer'}`}
                >
                  Send reset link
                </button>

                <div className="text-center mb-8">
                  <button 
                    type="button" 
                    onClick={handleActivateResend}
                    disabled={countdown > 0 || !hasSentOnce}
                    className={`text-[15px] transition-colors ${countdown > 0 || !hasSentOnce ? 'text-gray-400 cursor-not-allowed' : 'text-[#F5A623] hover:text-[#e0961f] cursor-pointer'}`}
                  >
                    {countdown > 0 ? `Resend Link in ${countdown}s` : 'Resend Link'}
                  </button>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-4 text-[13px] text-gray-400">Or</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <button 
                  type="button" 
                  className="w-full py-3.5 px-4 bg-white border border-gray-800 hover:bg-gray-50 text-gray-900 text-[15px] font-medium rounded-sm transition-colors shadow-sm cursor-pointer"
                >
                  Continue with one-time code
                </button>
              </form>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
}

