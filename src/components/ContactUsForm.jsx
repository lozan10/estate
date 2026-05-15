import React, { useMemo, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import api from '../utils/api';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';

const ContactUsForm = ({ propertyId: propPropertyId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const queryPropertyId = searchParams.get('property_id');
  const propertyId = propPropertyId || queryPropertyId || null;

  const { properties, apartments } = useData();
  const allProps = useMemo(() => [...(properties || []), ...(apartments || [])], [properties, apartments]);
  const relatedProperty = useMemo(() => allProps.find(p => p.id === propertyId), [allProps, propertyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);
    try {
      // POST to /api/contact
      await api.post('/contact', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        ...(propertyId ? { property_id: propertyId } : {})
      });
      setSuccess('Thanks! Your message has been sent.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-3 title-font">
            Contact Us
          </h2>
          <p className="text-stone-600">Have a question? Send us a message and we’ll get back to you.</p>
          {propertyId && (
            <p className="text-sm text-stone-500 mt-2">
              Regarding: {relatedProperty ? relatedProperty.title : `Property ${propertyId}`}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-lg border-0 rounded-none">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Full name</label>
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
                    <label className="block text-sm font-medium text-stone-700 mb-2">E-mail</label>
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
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone</label>
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

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter your message"
                    className="w-full px-4 py-3 bg-transparent border-b border-stone-300 focus:ring-0 focus:border-[#300049] transition-all duration-300 placeholder:text-stone-400"
                    required
                  />
                </div>

                <div className="text-center pt-2">
                  <Button type="submit" disabled={submitting} className="w-full bg-[#300049] hover:bg-[#4A0072] text-white py-3 text-lg font-medium uppercase tracking-wide transition-all duration-300">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                  {success && <p className="text-sm text-green-600 mt-3">{success}</p>}
                  {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUsForm;
