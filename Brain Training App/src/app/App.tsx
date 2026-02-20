import { useState } from 'react';
import { Brain, FileText, Timer, BookOpen, Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { ActiveCapture } from './components/ActiveCapture';
import { DeepWork } from './components/DeepWork';
import { MemoryPalace } from './components/MemoryPalace';

type Screen = 'dashboard' | 'capture' | 'deepwork' | 'memory';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: Brain },
    { id: 'capture' as Screen, label: 'Active Capture', icon: FileText },
    { id: 'deepwork' as Screen, label: 'Deep Work', icon: Timer },
    { id: 'memory' as Screen, label: 'Memory Palace', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Cognitive</h1>
                <p className="text-xs text-gray-500">Smart Study Assistant</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeScreen === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveScreen(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} className="text-gray-600" />
            </button>

            {/* User Profile */}
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">Sarah Chen</p>
                <p className="text-xs text-gray-500">Pre-Med Student</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                SC
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveScreen(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-64px)]">
        {activeScreen === 'dashboard' && <Dashboard />}
        {activeScreen === 'capture' && <ActiveCapture />}
        {activeScreen === 'deepwork' && <DeepWork />}
        {activeScreen === 'memory' && <MemoryPalace />}
      </main>

      {/* Problem Statement & Future Growth - Judge's Notes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                🎯 The Problem
              </h3>
              <p className="text-lg leading-relaxed opacity-95">
                <strong>Students lose 70% of new information within 24 hours</strong> due to the 
                forgetting curve. Traditional study methods fail to address this. Cognitive uses 
                AI-powered spaced repetition, cognitive load tracking, and smart break recommendations 
                to bridge that gap and maximize retention.
              </p>
              <div className="mt-4 p-4 bg-white/10 backdrop-blur rounded-lg">
                <p className="text-sm">
                  <strong>Target Users:</strong> College students overwhelmed by fragmented notes, 
                  constant digital distractions, and ineffective study habits.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                🚀 Future Growth
              </h3>
              <p className="text-lg leading-relaxed opacity-95 mb-4">
                Cognitive is designed for seamless integration with existing educational platforms:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <span><strong>Canvas/Blackboard Integration:</strong> Automatically sync assignments, 
                  syllabi, and course materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🤝</span>
                  <span><strong>Collaborative Study Groups:</strong> Share flashcards and knowledge 
                  graphs with classmates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎓</span>
                  <span><strong>Institutional Dashboard:</strong> Professors can track class-wide 
                  engagement and identify struggling students early</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
