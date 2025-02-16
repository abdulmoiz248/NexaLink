import Link from "next/link"
import { MessageCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white">
          <MessageCircle size={32} />
          <span className="text-xl font-bold">ChatSphere</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#features" className="text-white hover:text-indigo-200 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#testimonials" className="text-white hover:text-indigo-200 transition-colors">
                Testimonials
              </Link>
            </li>
            <li>
              <Link href="#" className="text-white hover:text-indigo-200 transition-colors">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

