"use client"

import type React from "react"

import { useState } from "react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup logic here
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h4 className="text-lg font-semibold mb-4 text-center">Stay Updated!</h4>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
          required
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-6 py-2 rounded-r-full hover:bg-indigo-600 transition-colors"
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}

