import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import GenericHero from '../components/GenericHero';

const FAQPage = () => {
  const faqs = [
    {
      question: "How to schedule a viewing?",
      answer: "You can schedule a viewing by filling out our contact form or calling us directly. We offer flexible viewing times to accommodate your schedule."
    },
    {
      question: "Which pricing plan do I pick?",
      answer: "Our pricing plans start from UGX 25 Million. We offer flexible payment options including daily payments as low as UGX 10,000. Choose a plan that fits your budget and income pattern."
    },
    {
      question: "How to choose the right room?",
      answer: "Consider your lifestyle needs, family size, and budget. Our team can help you evaluate different units to find the perfect match for your requirements."
    },
    {
      question: "How long does the process take?",
      answer: "The process typically takes 3-6 months from initial consultation to move-in, depending on financing approval and construction timeline."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section covers navbar */}
      <div className="absolute inset-0 h-[40vh] w-full -z-10">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Frequently Asked Questions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="pt-0 pb-10">
        <GenericHero
          title="Frequently Asked Questions"
          description="Find answers to common questions about our homeownership process."
          backgroundImage=""
        />
      </div>
      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl border-0">
            <CardContent className="p-10 md:p-12">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="rounded-lg border border-stone-200 px-4 md:px-6">
                    <AccordionTrigger className="text-left text-2xl md:text-3xl font-medium text-stone-800 hover:text-[#300049] py-4 md:py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-stone-600 text-lg md:text-xl leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;