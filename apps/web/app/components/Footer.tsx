import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import NewsletterSignup from "./NewsletterSignup"

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">ChatSphere</h3>
            <p className="text-indigo-200">Connect Seamlessly, Anytime, Anywhere</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-indigo-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-indigo-200 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-indigo-800">
          <NewsletterSignup />
        </div>
        <div className="mt-8 text-center text-indigo-200">
          <p>&copy; {new Date().getFullYear()} ChatSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

