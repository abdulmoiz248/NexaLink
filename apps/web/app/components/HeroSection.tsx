import { motion } from "framer-motion"
import { MessageSquare, Smile, Send } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect Seamlessly, Anytime, Anywhere
          </motion.h1>
          <motion.p
            className="text-xl text-indigo-100 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fast, Secure, and Fun Messaging for Everyone
          </motion.p>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
              Sign Up
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors">
              Login
            </button>
          </motion.div>
        </div>
        <div className="lg:w-1/2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                  <Smile className="text-white" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="text-white font-semibold">Alice</h3>
                  <p className="text-indigo-200 text-sm">Online</p>
                </div>
              </div>
              <div className="space-y-4">
                <motion.div
                  className="bg-white bg-opacity-30 rounded-lg p-3 max-w-xs"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-white">Hey! How's it going?</p>
                </motion.div>
                <motion.div
                  className="bg-indigo-500 rounded-lg p-3 max-w-xs ml-auto"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <p className="text-white">Great! Just trying out ChatSphere. It's amazing!</p>
                </motion.div>
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="bg-white bg-opacity-20 text-white placeholder-indigo-200 rounded-full py-2 px-4 flex-grow focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="ml-2 bg-indigo-500 p-2 rounded-full">
                  <Send className="text-white" size={20} />
                </button>
              </div>
            </div>
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <MessageSquare className="text-white" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

