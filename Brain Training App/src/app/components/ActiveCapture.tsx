import { useState } from 'react';
import { FileText, Lightbulb, Mic, Play, Pause, Sparkles, BookOpen, Brain, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ActiveCapture() {
  const [isRecording, setIsRecording] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  // Mock extracted concepts
  const keyTerms = [
    { term: 'Mitochondria', definition: 'Powerhouse of the cell', confidence: 98 },
    { term: 'Photosynthesis', definition: 'Process of converting light to energy', confidence: 95 },
    { term: 'Cellular Respiration', definition: 'Breaking down glucose for ATP', confidence: 92 },
    { term: 'Chloroplast', definition: 'Organelle for photosynthesis', confidence: 90 },
    { term: 'ATP', definition: 'Energy currency of cells', confidence: 88 },
  ];

  const aiSummary = `This chapter covers cellular energy processes. The mitochondria generates ATP through cellular respiration, while chloroplasts perform photosynthesis in plant cells. Both processes are crucial for energy conversion and storage in living organisms.

Key relationships:
• Glucose breakdown → ATP production
• Light energy → Chemical energy storage
• Interconnected metabolic pathways`;

  const suggestedQuestions = [
    "What's the difference between mitochondria and chloroplasts?",
    "Explain the ATP cycle in simple terms",
    "How does cellular respiration relate to breathing?",
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 p-6 max-w-7xl mx-auto">
      {/* Main Content Area - PDF/Document Viewer */}
      <div className="flex-1 bg-white rounded-2xl shadow-md overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText size={24} />
            <div>
              <h2 className="font-semibold">Biology_Chapter_3.pdf</h2>
              <p className="text-xs opacity-90">Cellular Energy & Metabolism</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors">
              Page 12 of 45
            </button>
          </div>
        </div>

        {/* PDF Content Mock */}
        <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">3.2 Cellular Energy Production</h1>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              The mitochondria, often referred to as the "powerhouse of the cell," plays a crucial role in cellular 
              respiration. This process converts biochemical energy from nutrients into adenosine triphosphate (ATP), 
              and then releases waste products.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
              <p className="text-sm text-blue-900 font-medium">
                <strong>Key Concept:</strong> Mitochondria contain their own DNA and are thought to have originated 
                from ancient bacteria through endosymbiosis.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">The ATP Cycle</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Adenosine triphosphate (ATP) is the primary energy carrier in all living organisms. The cell uses ATP 
              to power most of the energy-requiring reactions that occur within it. The cycle of ATP formation and 
              breakdown is continuous and essential for life.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              During cellular respiration, glucose molecules are broken down in a series of enzymatic reactions. 
              This process occurs in three main stages: glycolysis, the Krebs cycle, and the electron transport chain.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 mt-6">Photosynthesis vs. Cellular Respiration</h2>
            
            <p className="text-gray-700 leading-relaxed">
              While mitochondria break down glucose to produce ATP, chloroplasts in plant cells do the opposite. 
              Through photosynthesis, chloroplasts capture light energy and use it to synthesize glucose from 
              carbon dioxide and water. These two processes are complementary and essential for the flow of 
              energy through ecosystems.
            </p>
          </div>
        </div>

        {/* Audio Recording Controls */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isRecording ? (
                <>
                  <Pause size={20} />
                  Recording... 2:34
                </>
              ) : (
                <>
                  <Mic size={20} />
                  Record Lecture
                </>
              )}
            </motion.button>
            
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <div className="flex gap-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-red-600 rounded-full"
                      animate={{
                        height: [8, Math.random() * 24 + 8, 8],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.05,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            
            <div className="flex-1" />
            
            <span className="text-sm text-gray-500">Auto-transcription enabled</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar - AI Features */}
      <div className="w-96 space-y-4">
        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center gap-2">
            <Sparkles size={20} />
            <h3 className="font-semibold">AI Summary</h3>
          </div>
          <div className="p-4">
            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {aiSummary}
            </div>
            <button className="mt-4 w-full py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors">
              Generate Flashcards from Summary
            </button>
          </div>
        </motion.div>

        {/* Key Concepts Extraction */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center gap-2">
            <Lightbulb size={20} />
            <h3 className="font-semibold">Key Terms Extracted</h3>
          </div>
          <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
            {keyTerms.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800">{item.term}</h4>
                  <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                    {item.confidence}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.definition}</p>
              </motion.div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-100">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Add All to Flashcards
            </button>
          </div>
        </motion.div>

        {/* AI Tutor Chat Toggle */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-md p-4 text-white cursor-pointer"
          onClick={() => setShowAIChat(!showAIChat)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur rounded-lg">
              <MessageSquare size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">AI Tutor</h3>
              <p className="text-xs opacity-90">Ask questions about this content</p>
            </div>
            <Brain className={`transform transition-transform ${showAIChat ? 'rotate-180' : ''}`} size={20} />
          </div>
        </motion.div>

        {/* AI Chat Panel */}
        <AnimatePresence>
          {showAIChat && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <div className="bg-gray-800 text-white p-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain size={20} />
                  AI Tutor Chat
                </h3>
              </div>
              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Hi! I'm your AI tutor. I've read this chapter. Ask me anything!
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-medium">Suggested questions:</p>
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      className="w-full text-left p-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
