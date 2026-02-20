import { useState } from 'react';
import { BookOpen, Brain, RotateCcw, Check, X, Star, TrendingUp, Network } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MemoryPalace() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showKnowledgeGraph, setShowKnowledgeGraph] = useState(false);

  // Mock flashcards
  const flashcards = [
    {
      id: 1,
      front: 'What is the powerhouse of the cell?',
      back: 'The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration.',
      confidence: 85,
      lastReviewed: '2 days ago',
      nextReview: 'Tomorrow',
    },
    {
      id: 2,
      front: 'Define photosynthesis',
      back: 'Photosynthesis is the process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.',
      confidence: 72,
      lastReviewed: '1 week ago',
      nextReview: 'Today',
    },
    {
      id: 3,
      front: 'What is ATP?',
      back: 'ATP (Adenosine Triphosphate) is the primary energy currency of cells, storing and transferring energy for cellular processes.',
      confidence: 90,
      lastReviewed: '1 day ago',
      nextReview: 'In 3 days',
    },
    {
      id: 4,
      front: 'Explain the Krebs Cycle',
      back: 'The Krebs Cycle (Citric Acid Cycle) is a series of chemical reactions that generate energy through the oxidation of acetyl-CoA.',
      confidence: 45,
      lastReviewed: '3 weeks ago',
      nextReview: 'Today',
    },
  ];

  // Review statistics
  const reviewStats = {
    cardsToReview: 12,
    cardsReviewed: 45,
    avgRetention: 82,
    streak: 7,
  };

  // Spaced repetition schedule
  const spacedRepetitionData = [
    { interval: 'Today', cards: 8, color: '#ef4444' },
    { interval: 'Tomorrow', cards: 5, color: '#f97316' },
    { interval: 'This Week', cards: 15, color: '#eab308' },
    { interval: 'Next Week', cards: 12, color: '#22c55e' },
    { interval: 'Later', cards: 25, color: '#3b82f6' },
  ];

  // Knowledge graph nodes (subjects and their connections)
  const knowledgeNodes = [
    { id: 1, subject: 'Biology', x: 50, y: 30, size: 80, color: '#22c55e', mastery: 85 },
    { id: 2, subject: 'Chemistry', x: 30, y: 60, size: 70, color: '#3b82f6', mastery: 72 },
    { id: 3, subject: 'Physics', x: 70, y: 60, size: 65, color: '#f97316', mastery: 68 },
    { id: 4, subject: 'Calculus', x: 50, y: 80, size: 75, color: '#a855f7', mastery: 78 },
  ];

  const connections = [
    { from: 1, to: 2 }, // Biology to Chemistry
    { from: 1, to: 3 }, // Biology to Physics
    { from: 2, to: 3 }, // Chemistry to Physics
    { from: 2, to: 4 }, // Chemistry to Calculus
    { from: 3, to: 4 }, // Physics to Calculus
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 300);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    }, 300);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="text-blue-600" size={32} />
            Memory Palace
          </h1>
          <p className="text-gray-500 mt-1">Master your knowledge with spaced repetition</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowKnowledgeGraph(!showKnowledgeGraph)}
          className={`px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-colors ${
            showKnowledgeGraph
              ? 'bg-purple-600 text-white'
              : 'bg-white text-purple-600 border-2 border-purple-600'
          }`}
        >
          <Network size={20} />
          {showKnowledgeGraph ? 'Hide' : 'Show'} Knowledge Graph
        </motion.button>
      </div>

      {/* Review Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-6 shadow-md text-white"
        >
          <div className="text-4xl font-bold mb-2">{reviewStats.cardsToReview}</div>
          <div className="text-sm opacity-90">Cards to Review</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-2">
            <Check className="text-green-600" size={24} />
            <div className="text-3xl font-bold text-gray-800">{reviewStats.cardsReviewed}</div>
          </div>
          <div className="text-sm text-gray-500">Cards Reviewed Today</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={24} />
            <div className="text-3xl font-bold text-gray-800">{reviewStats.avgRetention}%</div>
          </div>
          <div className="text-sm text-gray-500">Avg Retention Rate</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-md text-white"
        >
          <div className="flex items-center gap-2 mb-2">
            <Star size={24} />
            <div className="text-3xl font-bold">{reviewStats.streak}</div>
          </div>
          <div className="text-sm opacity-90">Day Study Streak</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Flashcard Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Flashcard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ minHeight: '400px' }}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain size={24} />
                  <div>
                    <h3 className="font-semibold">Flashcard Review</h3>
                    <p className="text-xs opacity-90">Card {currentCard + 1} of {flashcards.length}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(flashcards[currentCard].confidence)}`}>
                  {flashcards[currentCard].confidence}% Confidence
                </div>
              </div>

              {/* Card Content */}
              <div
                className="relative cursor-pointer p-12"
                style={{ minHeight: '320px' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <AnimatePresence mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="front"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <div className="text-6xl mb-6">❓</div>
                      <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {flashcards[currentCard].front}
                      </h2>
                      <p className="text-sm text-gray-500 mt-6">Click to reveal answer</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="back"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center h-full"
                    >
                      <div className="text-6xl mb-6">💡</div>
                      <p className="text-lg text-gray-700 text-center leading-relaxed max-w-xl">
                        {flashcards[currentCard].back}
                      </p>
                      <p className="text-sm text-gray-500 mt-6">Click to see question</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Navigation */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Last reviewed:</span> {flashcards[currentCard].lastReviewed}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Next review:</span> {flashcards[currentCard].nextReview}
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} />
                    Flip Card
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                  >
                    Next →
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Confidence Rating Buttons */}
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 grid grid-cols-3 gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Didn't Know
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 bg-yellow-100 text-yellow-700 rounded-xl font-medium hover:bg-yellow-200 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  Somewhat
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-4 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Check size={20} />
                  Knew It!
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          {/* Knowledge Graph */}
          <AnimatePresence>
            {showKnowledgeGraph && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Network size={20} />
                    Knowledge Graph - Subject Connections
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative w-full h-96 bg-gray-50 rounded-xl overflow-hidden">
                    <svg className="w-full h-full">
                      {/* Draw connections */}
                      {connections.map((conn, i) => {
                        const fromNode = knowledgeNodes.find(n => n.id === conn.from)!;
                        const toNode = knowledgeNodes.find(n => n.id === conn.to)!;
                        return (
                          <line
                            key={i}
                            x1={`${fromNode.x}%`}
                            y1={`${fromNode.y}%`}
                            x2={`${toNode.x}%`}
                            y2={`${toNode.y}%`}
                            stroke="#cbd5e1"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        );
                      })}

                      {/* Draw nodes */}
                      {knowledgeNodes.map((node) => (
                        <g key={node.id}>
                          <circle
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={node.size / 2}
                            fill={node.color}
                            opacity="0.2"
                          />
                          <circle
                            cx={`${node.x}%`}
                            cy={`${node.y}%`}
                            r={node.size / 3}
                            fill={node.color}
                          />
                          <text
                            x={`${node.x}%`}
                            y={`${node.y}%`}
                            textAnchor="middle"
                            dy=".3em"
                            className="text-xs font-bold fill-white"
                          >
                            {node.mastery}%
                          </text>
                          <text
                            x={`${node.x}%`}
                            y={`${node.y + 12}%`}
                            textAnchor="middle"
                            className="text-sm font-semibold"
                            fill="#1f2937"
                          >
                            {node.subject}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-900">
                      <span className="font-semibold">Insight:</span> Your Biology and Chemistry knowledge are strongly connected. 
                      Mastering Biology concepts will improve your Chemistry understanding by 15%.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Spaced Repetition Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
              <h3 className="font-semibold">Review Schedule</h3>
              <p className="text-xs opacity-90">Spaced repetition plan</p>
            </div>
            <div className="p-4 space-y-3">
              {spacedRepetitionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{item.interval}</span>
                  </div>
                  <span className="text-lg font-bold text-gray-800">{item.cards}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Start Review Session
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left px-4">
                📝 Create New Deck
              </button>
              <button className="w-full py-3 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition-colors text-left px-4">
                🎯 Practice Mode
              </button>
              <button className="w-full py-3 bg-orange-50 text-orange-700 rounded-lg font-medium hover:bg-orange-100 transition-colors text-left px-4">
                📊 View Statistics
              </button>
              <button className="w-full py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors text-left px-4">
                🔄 Generate from Notes
              </button>
            </div>
          </motion.div>

          {/* Memory Retention Tip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-md text-white"
          >
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Brain size={20} />
              Memory Tip
            </h3>
            <p className="text-sm opacity-95 leading-relaxed">
              Studies show reviewing content within 24 hours improves retention by 70%. 
              You're on track with your review schedule! 🎯
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
