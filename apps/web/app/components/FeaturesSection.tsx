import { motion } from "framer-motion"
import { Lock, Users, Palette, Phone } from "lucide-react"

const features = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Your messages are secure and private with our advanced encryption.",
  },
  {
    icon: Users,
    title: "Group Chats",
    description: "Create and manage group conversations with ease.",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Personalize your chat experience with custom themes and colors.",
  },
  {
    icon: Phone,
    title: "Voice & Video Calls",
    description: "Stay connected with high-quality voice and video calls.",
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-600">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

