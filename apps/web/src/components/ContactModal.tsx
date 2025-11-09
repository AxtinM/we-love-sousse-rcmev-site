'use client';

import { useState } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName?: string;
}

interface ContactForm {
    name: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
}

export default function ContactModal({ isOpen, onClose, productName }: ContactModalProps) {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phoneNumber: '',
        subject: productName ? `Intéressé par: ${productName}` : '',
        message: productName ? `Bonjour,\n\nJe veux acheter le produit "${productName}".\n\nMerci.` : ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phoneNumber: '', subject: '', message: '' });
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                }, 2000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transition show={isOpen}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl sm:rounded-2xl bg-white shadow-2xl transition-all text-left">
                                {/* Header */}
                                <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 px-4 sm:px-6 py-6 sm:py-8 text-white">
                                    <button
                                        onClick={onClose}
                                        className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                                        aria-label="Fermer"
                                    >
                                        <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl sm:text-2xl lg:text-3xl font-bold font-poppins text-left pr-10"
                                    >
                                        {productName ? 'Acheter ce produit' : 'Contactez-nous'}
                                    </Dialog.Title>
                                    <p className="mt-2 text-sm sm:text-base text-emerald-100 font-inter text-left">
                                        Nous vous répondrons dans les plus brefs délais
                                    </p>
                                </div>

                                {/* Form */}
                                <div className="px-4 sm:px-6 py-6 sm:py-8">
                                    {submitStatus === 'success' ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-6 sm:py-8"
                                        >
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Message envoyé !</h4>
                                            <p className="text-sm sm:text-base text-gray-600">Nous vous contacterons bientôt.</p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                            {/* Name */}
                                            <div>
                                                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                    Nom complet *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                                    placeholder="Votre nom"
                                                />
                                            </div>

                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                                    placeholder="votre.email@exemple.com"
                                                />
                                            </div>

                                            {/* Phone Number */}
                                            <div>
                                                <label htmlFor="phoneNumber" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                    {productName ? 'Numéro de téléphone *' : 'Numéro de téléphone (optionnel)'}
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    required={!!productName}
                                                    value={formData.phoneNumber}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                                    placeholder="+216 XX XXX XXX"
                                                />
                                            </div>

                                            {/* Subject */}
                                            <div>
                                                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                    Sujet *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="subject"
                                                    name="subject"
                                                    required
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                                    placeholder="Objet de votre message"
                                                />
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                                    Message *
                                                </label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
                                                    rows={5}
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                                                    placeholder="Votre message..."
                                                />
                                            </div>

                                            {/* Error message */}
                                            {submitStatus === 'error' && (
                                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-red-800 text-xs sm:text-sm">
                                                    Une erreur s'est produite. Veuillez réessayer.
                                                </div>
                                            )}

                                            {/* Submit button */}
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                                                <button
                                                    type="button"
                                                    onClick={onClose}
                                                    className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    Annuler
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full sm:flex-1 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center justify-center">
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Envoi...
                                                        </span>
                                                    ) : (
                                                        'Envoyer'
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
