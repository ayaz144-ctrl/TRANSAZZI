import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CustomsSimulatorSection } from './components/CustomsSimulatorSection';
import { AboutSection } from './components/AboutSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CargoTrackerModal } from './components/CargoTrackerModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ArticleModal } from './components/ArticleModal';
import { LegalModal } from './components/LegalModal';
import { QuoteModal } from './components/QuoteModal';
import TrackingPage from './app/tracking/page';
import {
  INITIAL_COMPANY_NAME,
  SERVICES_DATA,
  BLOG_POSTS,
  ServiceItem,
  BlogPost
} from './data/companyData';

export default function App() {
  const [companyName, setCompanyName] = useState<string>(() => {
    const saved = localStorage.getItem('logistics_company_name');
    if (!saved || !saved.includes('TRANSAZZI')) {
      return INITIAL_COMPANY_NAME;
    }
    return saved;
  });

  const [currentView, setCurrentView] = useState<'home' | 'tracking'>(() => {
    return window.location.pathname.startsWith('/tracking') ? 'tracking' : 'home';
  });
  const [activeSection, setActiveSection] = useState<string>(() => {
    return window.location.pathname.startsWith('/tracking') ? 'seguiment' : 'inici';
  });
  const [sheetTrackingCode, setSheetTrackingCode] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('code') || '';
  });

  // Modals state
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingInitialCode, setTrackingInitialCode] = useState('BCN-98234');

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quotePrefilledService, setQuotePrefilledService] = useState('');

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogPost | null>(null);

  const [legalModalType, setLegalModalType] = useState<
    'avisLegal' | 'privacitat' | 'cookies' | 'certificacions' | null
  >(null);

  const handleUpdateCompanyName = (name: string) => {
    setCompanyName(name);
    localStorage.setItem('logistics_company_name', name);
  };

  useEffect(() => {
    const handlePopState = () => {
      const isTracking = window.location.pathname.startsWith('/tracking');
      setCurrentView(isTracking ? 'tracking' : 'home');
      if (isTracking) {
        const params = new URLSearchParams(window.location.search);
        setSheetTrackingCode(params.get('code') || '');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenTrackingPage = (code = '') => {
    const clean = code.trim();
    setSheetTrackingCode(clean);
    setCurrentView('tracking');
    setActiveSection('seguiment');
    const targetUrl = clean ? `/tracking?code=${encodeURIComponent(clean)}` : '/tracking';
    if (window.location.pathname + window.location.search !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'seguiment') {
      handleOpenTrackingPage('');
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      setActiveSection(sectionId);
      setTimeout(() => {
        if (sectionId === 'inici') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'inici') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenTrackingWithCode = (code: string) => {
    setTrackingInitialCode(code);
    setTrackingModalOpen(true);
  };

  const handleOpenQuoteWithService = (serviceTitle: string) => {
    setQuotePrefilledService(serviceTitle);
    setQuoteModalOpen(true);
  };

  // Scroll listener to update active nav tab
  useEffect(() => {
    if (currentView !== 'home') {
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = ['contacte', 'blog', 'qui-som', 'simulador-duana', 'serveis', 'inici'];
      
      for (const section of sections) {
        if (section === 'inici') {
          if (window.scrollY < 400) {
            setActiveSection('inici');
            break;
          }
        } else {
          const el = document.getElementById(section);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Top Navigation */}
      <Navbar
        companyName={companyName}
        onUpdateCompanyName={handleUpdateCompanyName}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => {
          setQuotePrefilledService('');
          setQuoteModalOpen(true);
        }}
        onOpenTrackingModal={() => handleOpenTrackingPage('')}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {currentView === 'tracking' ? (
          <TrackingPage
            initialCode={sheetTrackingCode}
            onBackHome={() => handleNavigate('inici')}
          />
        ) : (
          <>
            {/* Section 1: Hero Section */}
            <div id="inici">
              <Hero
                companyName={companyName}
                onOpenQuoteModal={() => {
                  setQuotePrefilledService('');
                  setQuoteModalOpen(true);
                }}
                onNavigateToServices={() => handleNavigate('serveis')}
                onSearchTracking={handleOpenTrackingWithCode}
                onOpenTrackingPage={handleOpenTrackingPage}
              />
            </div>

        {/* Section 2: Services / Catalogue (3 Detailed Cards + Calculator) */}
        <ServicesSection
          services={SERVICES_DATA}
          onSelectServiceForQuote={handleOpenQuoteWithService}
          onOpenServiceDetail={(service) => setSelectedServiceDetail(service)}
        />

        {/* Section 2.5: Simulador de Despatx Duaner i Temps de Sortida */}
        <CustomsSimulatorSection onOpenQuoteModal={handleOpenQuoteWithService} />

        {/* Section 3: Qui Som (Company background, OEA pillars, Port Hubs & Operations Map) */}
        <AboutSection
          companyName={companyName}
          onSelectLocationForQuote={handleOpenQuoteWithService}
        />

        {/* Section 4: Blog de Comerç Exterior */}
        <BlogSection
          posts={BLOG_POSTS}
          onOpenArticle={(post) => setSelectedArticle(post)}
        />

        {/* Section 5: Contacte & Formulari Operatiu */}
        <ContactSection
          companyName={companyName}
          prefilledService={quotePrefilledService}
        />
          </>
        )}
      </main>

      {/* Dark Corporate Footer */}
      <Footer
        companyName={companyName}
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Interactive Modals */}
      {trackingModalOpen && (
        <CargoTrackerModal
          initialCode={trackingInitialCode}
          onClose={() => setTrackingModalOpen(false)}
        />
      )}

      {quoteModalOpen && (
        <QuoteModal
          initialService={quotePrefilledService || "Vestits d'Alta Costura & Gala"}
          onClose={() => setQuoteModalOpen(false)}
        />
      )}

      {selectedServiceDetail && (
        <ServiceDetailModal
          service={selectedServiceDetail}
          onClose={() => setSelectedServiceDetail(null)}
          onRequestQuote={handleOpenQuoteWithService}
        />
      )}

      {selectedArticle && (
        <ArticleModal
          post={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </div>
  );
}
