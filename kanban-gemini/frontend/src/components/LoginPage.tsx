'use client';

import React, { useState } from 'react';
import { LayoutGrid, ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a brief login delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#032147]">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#032147] via-[#0a3366] to-[#032147]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#209dd7]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#753991]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#ecad0a]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-16">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
              <LayoutGrid className="w-6 h-6 text-[#ecad0a]" />
            </div>
            <span className="text-white/90 text-xl font-bold tracking-tight">Kanban PM</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Organize.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#209dd7] to-[#ecad0a]">
              Prioritize.
            </span><br />
            Deliver.
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-md mb-12">
            A streamlined single-board workspace for teams that value clarity, focus, and shipping faster.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {['Drag & Drop', '5 Columns', 'Real-Time Sync', 'Minimal Design'].map((feature) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 text-white/60 bg-white/5 backdrop-blur-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Bottom decorative bar */}
          <div className="absolute bottom-12 left-16 xl:left-24 right-16 xl:right-24">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-white/25 text-xs mt-4">
              Project Management -- Simplified
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-[#f4f7fb] px-6 sm:px-12 relative">
        {/* Subtle background texture */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#209dd7]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#753991]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center space-x-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-[#032147] flex items-center justify-center border-b-2 border-[#ecad0a]">
              <LayoutGrid className="w-5 h-5 text-[#ecad0a]" />
            </div>
            <span className="text-[#032147] text-lg font-bold tracking-tight">Kanban PM</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-[#032147] tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-[#888888] mt-1.5">
              Sign in to your project workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#032147] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="team@company.com"
                data-testid="login-email"
                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#209dd7] focus:border-[#209dd7] outline-none transition-all placeholder:text-slate-400 shadow-xs"
                autoFocus
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#032147]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-[#209dd7] font-semibold hover:underline"
                  tabIndex={-1}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  data-testid="login-password"
                  className="w-full px-4 py-3 pr-11 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#209dd7] focus:border-[#209dd7] outline-none transition-all placeholder:text-slate-400 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#032147] transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="w-4 h-4 rounded border-slate-300 text-[#753991] focus:ring-[#753991] cursor-pointer"
              />
              <label htmlFor="remember" className="text-xs text-[#888888] cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="login-submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#753991] hover:bg-[#622e7a] text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="px-3 text-xs text-[#888888]">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#032147] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-[#032147] hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-[#888888] mt-8">
            New to the platform?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="text-[#209dd7] font-semibold hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
