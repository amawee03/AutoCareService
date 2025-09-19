import React, { useState } from 'react'
import Footer from '../components/layouts/FooterSection'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-extrabold text-center mb-8 text-red-600">Contact Us</h1>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-red-600">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions or need assistance? Fill out the form or contact us directly using the details below.
              </p>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600">123 AutoCare Street, Colombo, Sri Lanka</p>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Phone</h3>
                <p className="text-gray-600">+94 11 234 5678</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-gray-600">support@autocare.com</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-red-600">Send Us a Message</h2>
              {submitted && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg font-semibold">
                  Your message has been sent successfully!
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={5}
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-red-600 text-white py-3 rounded-lg font-semibold shadow-sm transition ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-700'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ContactUs
