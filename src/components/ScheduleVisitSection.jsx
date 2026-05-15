import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import api from '../utils/api';

const ScheduleVisitSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const composedMessage = `Schedule visit request.\nPreferred date: ${formData.date || '-'}\nPreferred time: ${formData.time || '-'}\nMessage: ${formData.message || '-'}`;
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: composedMessage,
      });
      setSuccess('Visit request submitted successfully!');
      setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
    } catch (err) {
      console.error('Failed to submit visit request:', err);
      setError('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-6 title-font">
            Schedule Your Visit
          </h2>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            <strong>"The path to ownership starts with a step."</strong> Schedule a visit to see our house plans and learn how daily payments can make you a landlord. Call us at <strong>+256 759 700099</strong> or fill the form below.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 rounded-none">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      dd/mm/yyyy
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      placeholder="Select date"
                      className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="Select time"
                      className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Enter your message"
                    className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                    required
                  />
                </div>

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#300049] hover:bg-[#4A0072] text-white py-3 text-lg font-medium uppercase tracking-wide transition-all duration-300"
                  >
                    {submitting ? 'Submitting...' : 'Schedule Visit'}
                  </Button>
                  {success && <p className="text-sm text-green-600 mt-3">{success}</p>}
                  {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
                  <p className="text-sm text-stone-600 mt-4">
                    Or call us directly: <strong><a href="tel:+256759700099" className="text-[#300049]">+256 759 700099</a></strong>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScheduleVisitSection;