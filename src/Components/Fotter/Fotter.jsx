import React from 'react'

export default function Fotter() {
  return (
    <footer className=" bg-black/[0.96] text-gray-300 py-10">
      <div className=" max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {/* About Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">About Us</h4>
          <p className="text-gray-400">
            We are a company dedicated to providing the best services. Our mission is to offer exceptional customer service and high-quality products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-gray-300">Home</a></li>
            <li><a href="/about" className="hover:text-gray-300">Courses</a></li>
            <li><a href="/contact" className="hover:text-gray-300">Contact US</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-2">
            <li><a href="https://facebook.com" className="hover:text-gray-300">Facebook</a></li>
            <li><a href="https://twitter.com" className="hover:text-gray-300">Twitter</a></li>
            <li><a href="https://instagram.com" className="hover:text-gray-300">Instagram</a></li>
            <li><a href="https://linkedin.com" className="hover:text-gray-300">LinkedIn</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@company.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Street Name, City, Country</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  )
}
