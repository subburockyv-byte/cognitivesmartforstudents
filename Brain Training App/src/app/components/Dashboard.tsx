import { Brain, Upload, TrendingUp, TrendingDown, AlertTriangle, Battery, Moon, Zap, Clock, Target, Flame } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'motion/react';

export function Dashboard() {
  // Mock data for cognitive readiness
  const cognitiveReadiness = 78;
  const stressLevel = 'Medium'; // Low, Medium, High
  const burnoutRisk = 42;
  const studyEfficiency = 85;
  const focusMinutes = 156;
  const distractionCount = 8;
  const productivityStreak = 12;

  // Weekly performance data
  const weeklyData = [
    { day: 'Mon', focus: 120, fatigue: 30, efficiency: 75 },
    { day: 'Tue', focus: 150, fatigue: 35, efficiency: 82 },
    { day: 'Wed', focus: 180, fatigue: 45, efficiency: 88 },
    { day: 'Thu', focus: 140, fatigue: 55, efficiency: 70 },
    { day: 'Fri', focus: 160, fatigue: 40, efficiency: 85 },
    { day: 'Sat', focus: 90, fatigue: 25, efficiency: 65 },
    { day: 'Sun', focus: 110, fatigue: 20, efficiency: 72 },
  ];

  // Focus pattern insights (hourly)
  const focusPatternData = [
    { hour: '6AM', intensity: 20 },
    { hour: '9AM', intensity: 85 },
    { hour: '12PM', intensity: 65 },
    { hour: '3PM', intensity: 45 },
    { hour: '6PM', intensity: 75 },
    { hour: '9PM', intensity: 90 },
  ];

  // Subject load analysis
  const subjectLoadData = [
    { subject: 'Organic Chem', load: 95, color: '#ef4444' },
    { subject: 'Calculus', load: 78, color: '#f97316' },
    { subject: 'Physics', load: 82, color: '#eab308' },
    { subject: 'Biology', load: 65, color: '#22c55e' },
    { subject: 'Literature', load: 45, color: '#3b82f6' },
  ];

  // Cognitive performance radar
  const cognitiveMetrics = [
    { metric: 'Focus', value: 85 },
    { metric: 'Memory', value: 72 },
    { metric: 'Processing', value: 68 },
    { metric: 'Clarity', value: 78 },
    { metric: 'Energy', value: 65 },
  ];

  // Upcoming tasks
  const upcomingTasks = [
    { subject: 'Organic Chemistry', task: 'Chapter 5 Review', effort: 'High', time: '2h 30m', color: '#ef4444' },
    { subject: 'Calculus II', task: 'Practice Problems', effort: 'Medium', time: '1h 15m', color: '#f97316' },
    { subject: 'Physics', task: 'Lab Report', effort: 'High', time: '2h 00m', color: '#eab308' },
    { subject: 'Biology', task: 'Flashcard Review', effort: 'Low', time: '45m', color: '#22c55e' },
  ];

  // Distraction analysis
  const distractionData = [
    { time: '9AM', count: 2 },
    { time: '10AM', count: 1 },
    { time: '11AM', count: 3 },
    { time: '12PM', count: 5 },
    { time: '1PM', count: 4 },
    { time: '2PM', count: 2 },
  ];

  const getStressColor = (level: string) => {
    if (level === 'Low') return '#22c55e';
    if (level === 'Medium') return '#eab308';
    return '#ef4444';
  };

  const getBurnoutColor = (risk: number) => {
    if (risk < 40) return '#22c55e';
    if (risk < 70) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Neuro Dashboard</h1>
          <p className="text-gray-500 mt-1">Friday, February 20, 2026</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
        >
          <Upload size={20} />
          Upload Content
        </motion.button>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cognitive Readiness Circle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-md relative overflow-hidden"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - cognitiveReadiness / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Brain className="text-blue-600 mb-1" size={24} />
                <span className="text-2xl font-bold">{cognitiveReadiness}%</span>
              </div>
            </div>
            <h3 className="mt-4 font-semibold text-gray-700">Cognitive Readiness</h3>
            <p className="text-xs text-gray-500 mt-1">Based on sleep & habits</p>
          </div>
        </motion.div>

        {/* Mental Stress Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg" style={{ backgroundColor: `${getStressColor(stressLevel)}20` }}>
              <AlertTriangle size={24} style={{ color: getStressColor(stressLevel) }} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Stress Level</h3>
              <p className="text-xs text-gray-500">Current brain load</p>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2" style={{ color: getStressColor(stressLevel) }}>
            {stressLevel}
          </div>
          <div className="flex gap-1 mt-2">
            <div className={`h-2 flex-1 rounded ${stressLevel === 'Low' || stressLevel === 'Medium' || stressLevel === 'High' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`h-2 flex-1 rounded ${stressLevel === 'Medium' || stressLevel === 'High' ? 'bg-yellow-500' : 'bg-gray-200'}`}></div>
            <div className={`h-2 flex-1 rounded ${stressLevel === 'High' ? 'bg-red-500' : 'bg-gray-200'}`}></div>
          </div>
        </motion.div>

        {/* Focus Time Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Focus Time</h3>
              <p className="text-xs text-gray-500">Deep work minutes</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {focusMinutes}m
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Distractions:</span>
            <span className="font-semibold text-red-500">{distractionCount}</span>
          </div>
        </motion.div>

        {/* Study Efficiency Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Zap size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Efficiency Score</h3>
              <p className="text-xs text-gray-500">Today's performance</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">{studyEfficiency}</span>
            <span className="text-lg text-gray-500">/100</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>+12% from yesterday</span>
          </div>
        </motion.div>
      </div>

      {/* Burnout Risk & Streak Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Burnout Risk Meter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <Battery size={24} style={{ color: getBurnoutColor(burnoutRisk) }} />
            <div>
              <h3 className="font-semibold text-gray-700">Burnout Risk</h3>
              <p className="text-xs text-gray-500">Overload detection</p>
            </div>
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div
              className="absolute h-full rounded-full transition-all"
              style={{
                width: `${burnoutRisk}%`,
                backgroundColor: getBurnoutColor(burnoutRisk)
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{burnoutRisk}%</span>
            <span className="text-xs" style={{ color: getBurnoutColor(burnoutRisk) }}>
              {burnoutRisk < 40 ? 'Healthy' : burnoutRisk < 70 ? 'Moderate' : 'High Risk'}
            </span>
          </div>
        </motion.div>

        {/* Productivity Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 shadow-md text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame size={24} />
            <div>
              <h3 className="font-semibold">Productivity Streak</h3>
              <p className="text-xs opacity-90">Consecutive days</p>
            </div>
          </div>
          <div className="text-4xl font-bold">
            {productivityStreak} days
          </div>
          <p className="text-sm opacity-90 mt-2">Keep it going! 🚀</p>
        </motion.div>

        {/* Daily Goal Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target size={24} className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-700">Daily Goals</h3>
              <p className="text-xs text-gray-500">Progress tracker</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Study Hours</span>
                <span className="font-semibold">3/4</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Topics Reviewed</span>
                <span className="font-semibold">8/10</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Performance Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            Weekly Performance Trends
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="focus" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="fatigue" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-gray-600">Focus Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600"></div>
              <span className="text-gray-600">Fatigue Level</span>
            </div>
          </div>
        </motion.div>

        {/* Focus Pattern Insights - Heatmap style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <Moon size={20} className="text-purple-600" />
            Focus Pattern Insights
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={focusPatternData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="intensity" radius={[8, 8, 0, 0]}>
                {focusPatternData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.intensity > 70 ? '#22c55e' : entry.intensity > 50 ? '#3b82f6' : '#94a3b8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Best focus:</span> 9PM • <span className="font-semibold">Lowest:</span> 3PM
            </p>
          </div>
        </motion.div>
      </div>

      {/* Subject Load & Cognitive Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Subject Load Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-gray-700 mb-4">Subject Mental Load</h3>
          <div className="space-y-3">
            {subjectLoadData.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{subject.subject}</span>
                  <span className="font-semibold" style={{ color: subject.color }}>{subject.load}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${subject.load}%`, backgroundColor: subject.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-900">
              ⚠️ <span className="font-semibold">High load detected:</span> Consider a break after Organic Chem
            </p>
          </div>
        </motion.div>

        {/* Cognitive Performance Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-gray-700 mb-4">Cognitive Performance Map</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={cognitiveMetrics}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
              <Radar name="Performance" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Suggestions & Distraction Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AI Study Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 shadow-md text-white"
        >
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Brain size={20} />
            AI Study Suggestions
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
              <p className="text-sm font-medium mb-1">🎯 Take a 10-minute break</p>
              <p className="text-xs opacity-90">Your focus efficiency dropped by 15% in the last hour</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
              <p className="text-sm font-medium mb-1">📚 Review Biology notes</p>
              <p className="text-xs opacity-90">Spaced repetition suggests reviewing yesterday's content</p>
            </div>
            <div className="p-3 bg-white/10 backdrop-blur rounded-lg">
              <p className="text-sm font-medium mb-1">💤 Better sleep schedule</p>
              <p className="text-xs opacity-90">7+ hours sleep improves your focus by 23%</p>
            </div>
          </div>
        </motion.div>

        {/* Distraction Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            Distraction Analysis
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={distractionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-900">
              <span className="font-semibold">Peak distractions:</span> 12PM • Consider enabling Deep Work mode
            </p>
          </div>
        </motion.div>
      </div>

      {/* Upcoming Focus Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-white rounded-2xl p-6 shadow-md"
      >
        <h3 className="font-semibold text-gray-700 mb-4">Upcoming Focus Sessions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {upcomingTasks.map((task, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-gray-100 rounded-xl hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: task.color }}></div>
                  <h4 className="font-semibold text-gray-800">{task.subject}</h4>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    task.effort === 'High'
                      ? 'bg-red-100 text-red-700'
                      : task.effort === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {task.effort} Effort
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{task.task}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>{task.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Smart Break Recommendation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 shadow-md text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
              <Moon size={32} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Smart Break Recommendation</h3>
              <p className="text-sm opacity-90 mt-1">
                You've been studying for 2 hours. Take a 15-minute break to optimize retention.
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold"
          >
            Start Break
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
