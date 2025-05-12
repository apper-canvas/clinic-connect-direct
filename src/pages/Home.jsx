import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [selectedDoctorForAppointment, setSelectedDoctorForAppointment] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [selectedServiceForAppointment, setSelectedServiceForAppointment] = useState(null);

  // Icon declarations
  const CalendarIcon = getIcon('Calendar');
  const UsersIcon = getIcon('Users');
  const HeartPulseIcon = getIcon('HeartPulse');
  const PhoneIcon = getIcon('Phone');
  const FileTextIcon = getIcon('FileText');
  
  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      availability: "Mon, Wed, Fri"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      rating: 4.7,
      availability: "Tue, Thu, Sat"
    },
    {
      id: 3,
      name: "Dr. Amelia Patel",
      specialty: "Dermatology",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      availability: "Mon, Tue, Thu"
    }
  ];

  // Mock services data
  const services = [
    {
      id: 1,
      name: "General Check-up",
      description: "Comprehensive health assessment with vital signs, medical history review, and preventative care.",
      icon: "Stethoscope",
      duration: "30 min"
    },
    {
      id: 2,
      name: "Vaccination",
      description: "Various vaccines for children and adults, including seasonal flu shots and travel immunizations.",
      icon: "Syringe",
      duration: "15 min"
    },
    {
      id: 3,
      name: "Blood Tests",
      description: "Complete blood count, metabolic panels, cholesterol screening, and specialized tests.",
      icon: "Flask",
      duration: "20 min"
    }
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "5 Tips for Managing Seasonal Allergies",
      excerpt: "Learn effective strategies to minimize allergy symptoms and enjoy the outdoors year-round.",
      image: "https://images.unsplash.com/photo-1583468982228-19f19164aee2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      fullContent: "Learn effective strategies to minimize allergy symptoms and enjoy the outdoors year-round. Seasonal allergies, also known as hay fever or allergic rhinitis, affect millions of people worldwide. The symptoms can range from mild to severe and include sneezing, itchy eyes, runny nose, and congestion. Here are five effective strategies to manage your seasonal allergies: \n\n1. **Monitor Pollen Counts**: Check daily pollen forecasts and plan outdoor activities when counts are lower, typically on rainy, cloudy, and windless days. \n\n2. **Create an Allergy-Free Home**: Keep windows closed during high pollen seasons, use air purifiers with HEPA filters, and regularly clean surfaces to reduce allergen buildup. \n\n3. **Practice Good Hygiene**: Shower and change clothes after spending time outdoors to remove pollen from your body and prevent spreading it throughout your home. \n\n4. **Consider Medication Options**: Over-the-counter antihistamines, nasal sprays, and eye drops can provide relief. For severe symptoms, consult with your doctor about prescription options or immunotherapy. \n\n5. **Try Natural Remedies**: Some people find relief with saline nasal irrigation, local honey, or certain herbal supplements like butterbur or quercetin. \n\nBy incorporating these strategies into your routine, you can significantly reduce allergy symptoms and enjoy a more comfortable experience during allergy season.",
      date: "Apr 12, 2023",
      category: "Wellness"
    },
    {
      id: 2,
      title: "Understanding Blood Pressure Readings",
      excerpt: "What your blood pressure numbers mean and how to maintain healthy levels through lifestyle changes.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      fullContent: "What your blood pressure numbers mean and how to maintain healthy levels through lifestyle changes. Blood pressure is a vital sign that measures the force of blood pushing against the walls of your arteries as your heart pumps. Understanding your readings is crucial for maintaining good health. \n\nA blood pressure reading consists of two numbers: systolic (top number) and diastolic (bottom number), measured in millimeters of mercury (mmHg). \n\n**Normal Blood Pressure**: Below 120/80 mmHg \n**Elevated**: Systolic 120-129 and diastolic below 80 \n**Stage 1 Hypertension**: Systolic 130-139 or diastolic 80-89 \n**Stage 2 Hypertension**: Systolic 140+ or diastolic 90+ \n**Hypertensive Crisis**: Systolic 180+ and/or diastolic 120+ (requires immediate medical attention) \n\nLifestyle changes that can help maintain healthy blood pressure include: \n\n1. **Regular Physical Activity**: Aim for at least 150 minutes of moderate exercise per week. \n\n2. **Heart-Healthy Diet**: Follow the DASH diet (Dietary Approaches to Stop Hypertension) which emphasizes fruits, vegetables, whole grains, and low-fat dairy products. \n\n3. **Reduce Sodium Intake**: Limit sodium to less than 2,300mg per day (about 1 teaspoon of salt). \n\n4. **Maintain a Healthy Weight**: Even modest weight loss can significantly lower blood pressure. \n\n5. **Limit Alcohol Consumption**: No more than one drink per day for women and two for men. \n\n6. **Manage Stress**: Practice relaxation techniques like deep breathing, meditation, or yoga. \n\n7. **Quit Smoking**: Tobacco causes an immediate, temporary increase in blood pressure and contributes to damaged arteries. \n\nRegular monitoring and working with your healthcare provider are essential parts of managing your blood pressure effectively.",
      date: "Mar 28, 2023",
      category: "Health Education"
    }
  ];

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: CalendarIcon },
    { id: 'doctors', label: 'Our Doctors', icon: UsersIcon },
    { id: 'services', label: 'Services', icon: HeartPulseIcon },
    { id: 'contact', label: 'Contact', icon: PhoneIcon },
    { id: 'blog', label: 'Health Tips', icon: FileTextIcon },
  ];

  const renderTabContent = () => {
    const bookAppointmentProps = { selectedDoctor: selectedDoctorForAppointment, selectedService: selectedServiceForAppointment };
    switch (activeTab) {
      case 'appointments':
        return <MainFeature {...bookAppointmentProps} />;
      
      case 'doctors':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map(doctor => (
              <motion.div 
                key={doctor.id}
                className="card p-6 h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row items-center mb-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{doctor.name}</h3>
                    <p className="text-secondary-dark dark:text-secondary-light">{doctor.specialty}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{doctor.rating}/5</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
                  Available: {doctor.availability}
                </p>
                <div className="mt-auto pt-4">
                  <button 
                    className="btn-outline w-full"
                    onClick={() => {
                      setActiveTab('appointments');
                      setSelectedDoctorForAppointment(doctor);
                      setSelectedServiceForAppointment(null);
                      toast.success(`${doctor.name} selected for appointment`);
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        );
      
      case 'services':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => {
              const ServiceIcon = getIcon(service.icon);
              return (
                <motion.div 
                  key={service.id}
                  className="card-neu"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 inline-flex p-3 rounded-full bg-primary/10 dark:bg-primary-dark/30">
                    <ServiceIcon className="h-6 w-6 text-primary dark:text-primary-light" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{service.name}</h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-surface-500 dark:text-surface-500">
                      Duration: {service.duration}
                    </span>
                    <button 
                      className="btn-primary text-sm px-3 py-1"
                      onClick={() => {
                        setActiveTab('appointments');
                        setSelectedServiceForAppointment(service);
                        setSelectedDoctorForAppointment(null);
                        toast.info(`${service.name} service selected`);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        );
      
      case 'contact':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 dark:bg-primary-dark/30 p-2 rounded-full mr-3">
                    {(() => {
                      const MapPinIcon = getIcon('MapPin');
                      return <MapPinIcon className="h-5 w-5 text-primary dark:text-primary-light" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      123 Healthcare Avenue<br />
                      Medical District, City 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 dark:bg-primary-dark/30 p-2 rounded-full mr-3">
                    {(() => {
                      const PhoneIcon = getIcon('Phone');
                      return <PhoneIcon className="h-5 w-5 text-primary dark:text-primary-light" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 dark:bg-primary-dark/30 p-2 rounded-full mr-3">
                    {(() => {
                      const MailIcon = getIcon('Mail');
                      return <MailIcon className="h-5 w-5 text-primary dark:text-primary-light" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      info@clinicconnect.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 dark:bg-primary-dark/30 p-2 rounded-full mr-3">
                    {(() => {
                      const ClockIcon = getIcon('Clock');
                      return <ClockIcon className="h-5 w-5 text-primary dark:text-primary-light" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p className="text-surface-600 dark:text-surface-400">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="card p-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent successfully! We will get back to you soon.");
              }}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="form-input" 
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="form-input" 
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="form-input" 
                    placeholder="Message subject"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="form-input" 
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        );
      
      case 'blog':
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {blogPosts.map(post => (
                <motion.div 
                  key={post.id}
                  className="card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary dark:bg-secondary-dark/30 dark:text-secondary-light">
                        {post.category}
                      </span>
                      <span className="text-xs text-surface-500 dark:text-surface-400">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-surface-600 dark:text-surface-400 mb-4">
                      {expandedPosts[post.id] ? post.fullContent : post.excerpt}
                    </p>
                    <button 
                      className="inline-flex items-center text-secondary dark:text-secondary-light font-medium hover:underline"
                      onClick={() => {
                        // Toggle expanded state for this post
                        setExpandedPosts(prev => ({
                          ...prev,
                          [post.id]: !prev[post.id]
                        }));
                        toast.info(`Reading "${post.title}" article`);
                      }}
                    >
                      {expandedPosts[post.id] ? 'Show less' : 'Read more'}
                      {(() => {
                        const ArrowRightIcon = getIcon('ArrowRight');
                        return <ArrowRightIcon className="ml-1 h-4 w-4" />;
                      })()}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="card p-6">
              <h3 className="text-2xl font-semibold mb-4">Subscribe to Health Tips</h3>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Get the latest health tips, wellness advice, and clinic updates delivered to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => {
                e.preventDefault();
                toast.success("Subscribed to health tips newsletter!");
              }}>
                <input 
                  type="email" 
                  className="form-input flex-grow" 
                  placeholder="Your email address"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        );
      
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div>
      {/* Hero section */}
      <section className="mb-10">
        <div className="card-neu overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-6 lg:p-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-dark dark:text-primary-light">
                  Your Health, Our Priority
                </h1>
                <p className="text-lg mb-6 text-surface-600 dark:text-surface-300">
                  Book appointments, consult with specialists, and get the care you deserve with our comprehensive healthcare services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="btn-primary text-base px-6 py-3" 
                    onClick={() => {
                      setActiveTab('appointments');
                      setSelectedDoctorForAppointment(null);
                      setSelectedServiceForAppointment(null);
                    }}
                  >
                    Book Appointment
                  </button>
                  <button 
                    className="btn-outline text-base px-6 py-3"
                    onClick={() => setActiveTab('services')}
                  >
                    Our Services
                  </button>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 p-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Healthcare professionals"
                className="rounded-2xl w-full h-auto object-cover shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs navigation */}
      <section className="mb-8">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex space-x-2 min-w-max pb-2">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white dark:bg-primary-light dark:text-surface-900 shadow-soft' 
                    : 'hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab content */}
      <motion.section
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.section>
    </div>
  );
};

export default Home;