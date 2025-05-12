import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { format, addDays, startOfDay, addHours } from 'date-fns';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon declarations
  const CalendarIcon = getIcon('Calendar');
  const ClockIcon = getIcon('Clock');
  const UserIcon = getIcon('User');
  const PhoneIcon = getIcon('Phone');
  const MailIcon = getIcon('Mail');
  const FileTextIcon = getIcon('FileText');
  const CheckCircleIcon = getIcon('CheckCircle');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  // State management
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [dateRange, setDateRange] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Generate 7 days from today for selection
  useEffect(() => {
    const today = startOfDay(new Date());
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(today, i));
    }
    setDateRange(days);
    // Clear selections when component mounts/remounts
    setSelectedDate(null);
    setSelectedTime(null);
  }, []);

  // Doctors data
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Pediatrics", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Dr. Amelia Patel", specialty: "Dermatology", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
  ];

  // Services data
  const services = [
    { id: 1, name: "General Check-up", duration: "30 min", price: "$120" },
    { id: 2, name: "Consultation", duration: "45 min", price: "$150" },
    { id: 3, name: "Specialized Exam", duration: "60 min", price: "$200" }
  ];

  // Generate available time slots
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    const baseDate = selectedDate;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const time = addHours(baseDate, hour);
        time.setMinutes(minute);
        
        // Simulate some time slots being unavailable
        const isAvailable = Math.random() > 0.3; // 70% of slots available
        
        slots.push({
          time,
          formatted: format(time, 'h:mm a'),
          available: isAvailable
        });
      }
    }
    
    return slots;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 1500);
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (step === 1 && !selectedDate) {
      toast.error('Please select a date for your appointment');
      return;
    }
    
    if (step === 1 && !selectedTime) {
      toast.error('Please select a time slot for your appointment');
      return;
    }
    
    if (step === 2 && !selectedDoctor) {
      toast.error('Please select a doctor for your appointment');
      return;
    }
    
    if (step === 2 && !selectedService) {
      toast.error('Please select a service for your appointment');
      return;
    }
    
    setStep(prev => prev + 1);
  };

  const goToPrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Reset the form and start over
  const resetForm = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDoctor(null);
    setSelectedService(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: ''
    });
    setValidationErrors({});
    setShowConfirmation(false);
  };

  // Render confirmation screen
  if (showConfirmation) {
    return (
      <motion.div 
        className="card-neu max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center px-6 py-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-secondary/20 dark:bg-secondary-dark/30 p-3">
              <CheckCircleIcon className="h-16 w-16 text-secondary dark:text-secondary-light" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Appointment Confirmed!</h2>
          <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
            Your appointment has been scheduled successfully. You will receive a confirmation email shortly.
          </p>
          
          <div className="bg-surface-100 dark:bg-surface-800 rounded-xl p-6 mb-8 max-w-md mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Date & Time</p>
                <p className="font-medium">{format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}</p>
              </div>
              
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Doctor</p>
                <p className="font-medium">{selectedDoctor.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Service</p>
                <p className="font-medium">{selectedService.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-surface-500 dark:text-surface-500">Patient</p>
                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              </div>
            </div>
          </div>
          
          <button 
            className="btn-primary w-full md:w-auto px-6 py-3"
            onClick={resetForm}
          >
            Book Another Appointment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="w-full flex items-center">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center font-semibold 
              ${step >= 1 ? 'bg-primary text-white dark:bg-primary-light dark:text-surface-900' : 'bg-surface-200 text-surface-600 dark:bg-surface-700 dark:text-surface-400'}`}>
              1
            </div>
            <div className={`h-1 flex-1 mx-2 
              ${step > 1 ? 'bg-primary dark:bg-primary-light' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center font-semibold 
              ${step >= 2 ? 'bg-primary text-white dark:bg-primary-light dark:text-surface-900' : 'bg-surface-200 text-surface-600 dark:bg-surface-700 dark:text-surface-400'}`}>
              2
            </div>
            <div className={`h-1 flex-1 mx-2 
              ${step > 2 ? 'bg-primary dark:bg-primary-light' : 'bg-surface-200 dark:bg-surface-700'}`}></div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center font-semibold 
              ${step >= 3 ? 'bg-primary text-white dark:bg-primary-light dark:text-surface-900' : 'bg-surface-200 text-surface-600 dark:bg-surface-700 dark:text-surface-400'}`}>
              3
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-surface-600 dark:text-surface-400">
          <span className={step === 1 ? 'font-medium text-primary dark:text-primary-light' : ''}>
            Date & Time
          </span>
          <span className={step === 2 ? 'font-medium text-primary dark:text-primary-light' : ''}>
            Provider & Service
          </span>
          <span className={step === 3 ? 'font-medium text-primary dark:text-primary-light' : ''}>
            Your Information
          </span>
        </div>
      </div>

      {/* Step content */}
      <motion.div
        key={`step-${step}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="card-neu"
      >
        {step === 1 && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Date selection */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary dark:text-primary-light" />
                  Select Date
                </h2>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                  {dateRange.map((date, index) => (
                    <button
                      key={index}
                      className={`p-2 rounded-lg border-2 transition text-center
                        ${selectedDate && date.getTime() === selectedDate.getTime() 
                          ? 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-dark/30' 
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'}
                      `}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null); // Clear time selection when date changes
                      }}
                    >
                      <div className="text-xs font-medium text-surface-500 dark:text-surface-400">
                        {format(date, 'EEE')}
                      </div>
                      <div className="text-lg font-bold">
                        {format(date, 'd')}
                      </div>
                      <div className="text-xs">
                        {format(date, 'MMM')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Time selection */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-primary dark:text-primary-light" />
                  Select Time
                </h2>
                
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {getTimeSlots().map((slot, index) => (
                      <button
                        key={index}
                        className={`p-2 rounded-lg border-2 transition text-center
                          ${!slot.available ? 'bg-surface-100 dark:bg-surface-800 text-surface-400 dark:text-surface-600 border-surface-200 dark:border-surface-700 cursor-not-allowed' :
                            selectedTime === slot.formatted
                              ? 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-dark/30' 
                              : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'
                          }
                        `}
                        onClick={() => slot.available && setSelectedTime(slot.formatted)}
                        disabled={!slot.available}
                      >
                        <div className="text-sm font-medium">
                          {slot.formatted}
                        </div>
                        {!slot.available && (
                          <div className="text-xs">Unavailable</div>
                        )}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center text-surface-500 dark:text-surface-400 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-lg">
                    Please select a date first
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Doctor selection */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-primary dark:text-primary-light" />
                  Select Doctor
                </h2>
                
                <div className="space-y-3">
                  {doctors.map(doctor => (
                    <button
                      key={doctor.id}
                      className={`w-full p-3 rounded-lg border-2 transition flex items-center
                        ${selectedDoctor && selectedDoctor.id === doctor.id 
                          ? 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-dark/30' 
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'}
                      `}
                      onClick={() => setDoctorSelection(doctor)}
                    >
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="text-left">
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-surface-500 dark:text-surface-400">
                          {doctor.specialty}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Service selection */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileTextIcon className="h-5 w-5 mr-2 text-primary dark:text-primary-light" />
                  Select Service
                </h2>
                
                <div className="space-y-3">
                  {services.map(service => (
                    <button
                      key={service.id}
                      className={`w-full p-4 rounded-lg border-2 transition text-left
                        ${selectedService && selectedService.id === service.id 
                          ? 'border-primary bg-primary/10 dark:border-primary-light dark:bg-primary-dark/30' 
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary-light'}
                      `}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="font-medium mb-1">{service.name}</div>
                      <div className="flex justify-between text-sm">
                        <span className="text-surface-500 dark:text-surface-400">
                          Duration: {service.duration}
                        </span>
                        <span className="font-medium text-secondary dark:text-secondary-light">
                          {service.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
                      onClick={() => setServiceSelection(service)}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Your Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName"
                      className={`form-input pl-10 ${validationErrors.firstName ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                  </div>
                  {validationErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.firstName}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName"
                      className={`form-input pl-10 ${validationErrors.lastName ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                  </div>
                  {validationErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.lastName}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      className={`form-input pl-10 ${validationErrors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                  </div>
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number *</label>
                  <div className="relative">
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className={`form-input pl-10 ${validationErrors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-surface-400" />
                  </div>
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{validationErrors.phone}</p>
                  )}
                </div>
                
                <div className="form-group md:col-span-2">
                  <label htmlFor="notes" className="form-label">Additional Notes (Optional)</label>
                  <textarea 
                    id="notes" 
                    name="notes"
                    rows="3" 
                    className="form-input"
                    placeholder="Please provide any information that might be helpful for your visit"
                    value={formData.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 bg-surface-100 dark:bg-surface-800 rounded-lg p-4">
                <h3 className="font-medium mb-3">Appointment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-surface-500 dark:text-surface-400">Date:</span>{' '}
                    <span className="font-medium">{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</span>
                  </div>
                  <div>
                    <span className="text-surface-500 dark:text-surface-400">Time:</span>{' '}
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div>
                    <span className="text-surface-500 dark:text-surface-400">Doctor:</span>{' '}
                    <span className="font-medium">{selectedDoctor?.name}</span>
                  </div>
                  <div>
                    <span className="text-surface-500 dark:text-surface-400">Service:</span>{' '}
                    <span className="font-medium">{selectedService?.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn-primary w-full py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Confirm Appointment"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step navigation */}
        <div className="px-6 py-4 border-t border-surface-200 dark:border-surface-700 flex justify-between">
          {step > 1 ? (
            <button 
              className="btn-outline"
              onClick={goToPrevStep}
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 && (
            <button 
              className="btn-primary"
              onClick={goToNextStep}
            >
              Next
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MainFeature;