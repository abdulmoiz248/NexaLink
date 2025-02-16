import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Manager",
    quote: "ChatSphere has revolutionized our team communication. It's fast, intuitive, and packed with features!",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    quote: "The end-to-end encryption gives me peace of mind when discussing sensitive projects.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    quote: "I love the custom themes! ChatSphere lets me express my creativity even in my messaging app.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function TestimonialSection() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-indigo-600">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

