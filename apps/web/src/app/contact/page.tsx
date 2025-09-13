import { getContact } from "@/lib/api";
import { Metadata } from "next";

// Enable ISR with 1 hour revalidation
export const revalidate = 3600; // 1 hour in seconds

export const metadata: Metadata = {
  title: "Contact | We Love Sousse",
  description: "Contactez-nous pour plus d'informations sur We Love Sousse",
};

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-12 text-neutral-dark">Contact</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-neutral-dark">Nos informations</h2>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 text-primary">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <a 
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {contact.email}
                    </a>
                  </div>

                  {/* Phones */}
                  {contact.phones?.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 text-blue-600">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <a 
                          href={`tel:${phone.number}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {phone.number}
                        </a>
                        {phone.label && (
                          <span className="text-gray-500 ml-2">({phone.label})</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Address */}
                  {contact.address && (
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 text-blue-600 mt-1">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 whitespace-pre-line">{contact.address}</p>
                        {contact.googleMapsUrl && (
                          <a
                            href={contact.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                          >
                            Voir sur Google Maps →
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          {/* Google Maps */}
          {contact.googleMapsUrl && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold text-center mb-8">Notre localisation</h2>
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src={contact.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation We Love Sousse"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
