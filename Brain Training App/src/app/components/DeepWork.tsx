import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Zap, Moon, Coffee, Brain, Bell, BellOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function DeepWork() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [distractionsBlocked, setDistractionsBlocked] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const percentage = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            setIsBreak(!isBreak);
            if (!isBreak) {
              setSessionsCompleted(prev => prev + 1);
            }
            setMinutes(isBreak ? 25 : 5);
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isBreak ? 5 : 25);
    setSeconds(0);
  };

  const aiMessages = [
    { type: 'ai', message: "Hi! I'm here to help during your focus session. What would you like to understand better?" },
    { type: 'user', message: "Can you explain photosynthesis in simple terms?" },
    { type: 'ai', message: "Sure! Think of photosynthesis like a plant making its own food using sunlight. The plant takes in sunlight, water, and carbon dioxide, then converts them into glucose (sugar) and oxygen. It's basically the plant's way of cooking using light energy! 🌱☀️" },
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timer Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-3xl shadow-xl overflow-hidden ${
              isBreak
                ? 'bg-gradient-to-br from-green-500 to-teal-500'
                : 'bg-gradient-to-br from-blue-600 to-purple-600'
            }`}
          >
            <div className="p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Timer size={32} />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {isBreak ? 'Break Time' : 'Deep Work Mode'}
                    </h2>
                    <p className="text-sm opacity-90">
                      {isBreak ? 'Recharge your mind' : 'Stay focused and avoid distractions'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Sessions Today</div>
                  <div className="text-3xl font-bold">{sessionsCompleted}</div>
                </div>
              </div>

              {/* Circular Timer */}
              <div className="flex items-center justify-center py-8">
                <div className="w-64 h-64 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="white"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - percentage / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-7xl font-bold mb-2">
                      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </div>
                    <div className="text-xl opacity-90">
                      {isBreak ? 'Break' : 'Focus'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTimer}
                  className="w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  {isActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={resetTimer}
                  className="w-12 h-12 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center"
                >
                  <RotateCcw size={20} />
                </motion.button>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-3 gap-3">
                <button className="p-3 bg-white/10 backdrop-blur rounded-xl text-sm hover:bg-white/20 transition-colors">
                  25 min Focus
                </button>
                <button className="p-3 bg-white/10 backdrop-blur rounded-xl text-sm hover:bg-white/20 transition-colors">
                  5 min Break
                </button>
                <button className="p-3 bg-white/10 backdrop-blur rounded-xl text-sm hover:bg-white/20 transition-colors">
                  15 min Break
                </button>
              </div>
            </div>
          </motion.div>

          {/* Focus Stats */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap size={24} className="text-purple-600" />
                </div>
                <div className="text-sm text-gray-600">Focus Streak</div>
              </div>
              <div className="text-3xl font-bold text-gray-800">4</div>
              <div className="text-xs text-gray-500 mt-1">Pomodoros in a row</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Moon size={24} className="text-blue-600" />
                </div>
                <div className="text-sm text-gray-600">Deep Work</div>
              </div>
              <div className="text-3xl font-bold text-gray-800">3.5h</div>
              <div className="text-xs text-gray-500 mt-1">Total today</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Coffee size={24} className="text-green-600" />
                </div>
                <div className="text-sm text-gray-600">Breaks Taken</div>
              </div>
              <div className="text-3xl font-bold text-gray-800">6</div>
              <div className="text-xs text-gray-500 mt-1">Well-timed rests</div>
            </motion.div>
          </div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-6 shadow-md text-white"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
                <Brain size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Focus Insight</h3>
                <p className="text-sm opacity-95 leading-relaxed">
                  "Your brain works best in focused bursts. Studies show that 25-minute intervals 
                  followed by short breaks maximize retention and minimize mental fatigue."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Distraction Blocker */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
              <h3 className="font-semibold flex items-center gap-2">
                {distractionsBlocked ? <BellOff size={20} /> : <Bell size={20} />}
                Distraction Blocker
              </h3>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  {distractionsBlocked ? 'Notifications blocked' : 'Notifications active'}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setDistractionsBlocked(!distractionsBlocked)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    distractionsBlocked ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: distractionsBlocked ? 28 : 2 }}
                    className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </div>

              <div className="space-y-2">
                <div className={`p-3 rounded-lg ${distractionsBlocked ? 'bg-gray-100' : 'bg-red-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Social Media</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      distractionsBlocked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {distractionsBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${distractionsBlocked ? 'bg-gray-100' : 'bg-red-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      distractionsBlocked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {distractionsBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${distractionsBlocked ? 'bg-gray-100' : 'bg-red-50'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Chat Apps</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      distractionsBlocked ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}>
                      {distractionsBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              {distractionsBlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="text-xs text-green-900">
                    ✅ All distractions blocked! Focus mode active.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* AI Tutor Quick Access */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 cursor-pointer"
              onClick={() => setShowAITutor(!showAITutor)}
            >
              <h3 className="font-semibold flex items-center gap-2">
                <Brain size={20} />
                AI Tutor Chat
                <span className="ml-auto text-sm">
                  {showAITutor ? '▼' : '▶'}
                </span>
              </h3>
            </div>

            <AnimatePresence>
              {showAITutor && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 max-h-96 overflow-y-auto space-y-3">
                    {aiMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg ${
                          msg.type === 'ai'
                            ? 'bg-purple-50 text-purple-900'
                            : 'bg-blue-50 text-blue-900 ml-8'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <input
                      type="text"
                      placeholder="Ask anything..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Focus Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl p-6 shadow-md text-white"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap size={20} />
              Focus Tips
            </h3>
            <ul className="space-y-2 text-sm opacity-95">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Hydrate regularly during breaks</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Look away from screen every 20 min</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Take a short walk during long breaks</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Keep your workspace organized</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
