import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation, 
  useParams,
  Navigate
} from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  ClipboardList, 
  PlayCircle, 
  MapPin, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Navigation,
  ExternalLink,
  ChevronDown,
  Info,
  LifeBuoy,
  BriefcaseMedical,
  Scale,
  Settings,
  GraduationCap,
  Instagram,
  ArrowRight,
  HeartHandshake,
  AlertTriangle,
  Waves,
  Download,
  Youtube
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CURRICULUM_DATA, 
  FULL_STANDARDS_DATA, 
  VIDEO_CATEGORIES, 
  NOTICES,
  QUESTION_BANK_DATA,
  CurriculumDetail,
  VideoCategory,
  VideoItem
} from './data';
import { 
  PORTAL_CONFIG,
  PDF_DATA
} from './constants';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>('1-class');
  const [playingVideo, setPlayingVideo] = useState<VideoItem | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  const activePage = location.pathname.split('/')[1] || 'home';

  const handleDownload = async (fileKey: string | number, fileName: string) => {
    const fileUrl = PDF_DATA[fileKey];
    
    if (!fileUrl || fileUrl === '#' || fileUrl === '') {
      alert("파일을 찾을 수 없습니다. 관리자(@swimology__)에게 문의하세요.");
      return;
    }

    setIsDownloading(fileName);

    try {
      const isExternal = fileUrl.startsWith('http');

      if (isExternal) {
          try {
              await fetch(fileUrl, { method: 'HEAD', mode: 'no-cors' });
              await new Promise(resolve => setTimeout(resolve, 1200));
              
              const link = document.createElement('a');
              link.href = fileUrl;
              link.target = "_blank";
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } catch (e) {
              window.open(fileUrl, '_blank');
          }
      } else {
          const response = await fetch(fileUrl);
          if (!response.ok) throw new Error('File not found');

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("현재 파일을 불러올 수 없습니다. 경로를 확인해주세요. 관리자(@swimology__)에게 문의하세요.");
    } finally {
      setIsDownloading(null);
    }
  };

  useEffect(() => {
    if (playingVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [playingVideo]);

  const navItems = [
    { path: '/', label: '홈', icon: Home, id: 'home' },
    { path: '/theory', label: '이론교육', icon: BookOpen, id: 'theory' },
    { path: '/videos', label: '실기영상', icon: PlayCircle, id: 'videos' },
    { path: '/standards', label: '평가기준', icon: ClipboardList, id: 'standards' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#FF6B00] selection:text-white pb-safe">
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-2xl border-b border-slate-100 py-3 px-6 shadow-sm">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
            <Link 
                to="/"
                className="flex items-center gap-3 cursor-pointer group"
            >
                <div className="p-1.5 bg-slate-900 rounded-xl group-hover:bg-[#003366] transition-colors">
                    <LifeBuoy size={24} className="text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[14px] font-black tracking-tight text-slate-800 leading-none">SWIMOLOGY</span>
                    <span className="text-[8px] font-black text-[#003366] uppercase tracking-[0.1em] whitespace-nowrap mt-1 opacity-80 italic">EDUCATION ARCHIVE</span>
                </div>
            </Link>
            <div className="flex items-center gap-2">
                <a 
                  href={PORTAL_CONFIG.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors group"
                >
                    <Instagram size={14} className="text-slate-400 group-hover:text-pink-500" />
                    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-800 uppercase tracking-wider">INSTAGRAM</span>
                </a>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/theory" element={<TheoryPage activeTab={activeTab} setActiveTab={setActiveTab} handleDownload={handleDownload} isDownloading={isDownloading} />} />
          <Route path="/videos" element={<Navigate to="/videos/chapter1" replace />} />
          <Route path="/videos/:chapterId" element={<VideosPage setPlayingVideo={setPlayingVideo} />} />
          <Route path="/standards" element={<StandardsPage />} />
        </Routes>
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-xl border-t border-slate-100 pt-3 pb-safe-offset-4">
        <div className="flex justify-around items-center px-4 max-w-2xl mx-auto">
          {navItems.map(item => {
            const isActive = activePage === item.id || (item.id === 'home' && location.pathname === '/');
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center gap-1.5 px-3 py-1 transition-all ${
                  isActive ? 'text-[#003366]' : 'text-slate-400'
                }`}
              >
                <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-slate-50 shadow-inner border border-slate-100' : ''}`}>
                  <item.icon size={22} className={isActive ? 'stroke-[2.5px]' : ''} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Content */}
      <footer className="bg-slate-50 pt-16 pb-32 px-6">
        <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
                <LifeBuoy size={20} className="text-slate-900" />
                <span className="text-lg font-black italic tracking-tighter text-slate-900">Swimology</span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-6 break-keep">
                OFFICIAL EDUCATION ARCHIVE & COMMUNITY
            </p>
            <div className="flex justify-center gap-6 mb-10">
                <a 
                  href={PORTAL_CONFIG.links.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 rounded-[1.2rem] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-tr hover:from-purple-600 hover:to-orange-500 hover:border-transparent hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 group"
                  title="Instagram"
                >
                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href={PORTAL_CONFIG.links.youtube} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 rounded-[1.2rem] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#FF0000] hover:border-transparent hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300 group"
                  title="YouTube"
                >
                    <Youtube size={20} className="group-hover:scale-110 transition-transform" />
                </a>
            </div>
            <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                © 2026 Swimology. All rights reserved.
            </p>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/95 flex items-start justify-center p-4 backdrop-blur-md overflow-y-auto pt-safe pb-safe"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative my-auto min-h-max"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-[120]">
                <button
                  onClick={() => setPlayingVideo(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center backdrop-blur-md"
                >
                    <X size={24} />
                </button>
              </div>
              
              <div className="w-full aspect-video bg-black relative">
                  <iframe
                  className="w-full h-full absolute inset-0 max-w-full"
                  style={{ aspectRatio: '16 / 9' }}
                  src={`https://www.youtube.com/embed/${playingVideo.id}?autoplay=1`}
                  title={playingVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  />
              </div>

              <div className="p-6 md:p-10 bg-slate-900 border-t border-white/5 touch-pan-y">
                  <h3 className="text-xl md:text-2xl font-black text-white mb-6 underline decoration-[#FF6B00] decoration-4 underline-offset-8 decoration-skip-ink-none italic tracking-tight">{playingVideo.title}</h3>
                  
                  {playingVideo.description && (
                      <div className="mb-8 p-6 bg-white/5 border border-white/10 rounded-2xl">
                          <div className="flex items-center gap-2 mb-3">
                              <Info size={14} className="text-[#FF6B00]" />
                              <span className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest">강의 핵심 요약</span>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed font-light">{playingVideo.description}</p>
                      </div>
                  )}

                  {playingVideo.points && playingVideo.points.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {playingVideo.points.map((p, i) => (
                              <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">포인트 {i + 1}</span>
                                  <p className="text-sm text-slate-300 font-medium leading-snug">{p}</p>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANLINESS ---

function HomePage() {
  return (
    <div className="flex flex-col pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0055A4]/20 rounded-full -mr-32 -mt-16 blur-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black text-white leading-[1.1] tracking-tighter mb-4 italic break-keep">
              {PORTAL_CONFIG.name}<br/><span className="text-[#0055A4]">EDUCATION</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <Link 
            to="/theory"
            className="bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-3 group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-[#FF6B00] flex items-center justify-center shadow-inner">
                <BookOpen size={20} />
            </div>
            <div className="text-left">
                <h3 className="text-sm font-black text-slate-800 leading-tight uppercase">이론교육<br/>문제은행</h3>
                <ChevronRight size={14} className="text-slate-300 mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          <Link 
            to="/videos"
            className="bg-white p-5 rounded-3xl shadow-xl border border-slate-100 flex flex-col gap-3 group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0055A4] flex items-center justify-center shadow-inner">
                <PlayCircle size={20} />
            </div>
            <div className="text-left">
                <h3 className="text-sm font-black text-slate-800 leading-tight uppercase">실기영상<br/>가이드북</h3>
                <ChevronRight size={14} className="text-slate-300 mt-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Instagram Connect */}
      <section className="px-6 py-12 max-w-2xl mx-auto w-full">
        <a 
          href={PORTAL_CONFIG.links.instagram}
          target="_blank"
          rel="noreferrer"
          className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-8 rounded-[3rem] shadow-2xl flex items-center justify-between group active:scale-95 transition-all text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Instagram size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">OFFICIAL INSTAGRAM</span>
            </div>
            <h3 className="text-2xl font-black italic tracking-tighter">@swimology__</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <ArrowRight size={24} />
          </div>
        </a>
      </section>

      {/* Official Link Section */}
      <section className="px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="bg-slate-900 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-[#FF6B00]" />
            <h3 className="text-2xl font-black text-white mb-6 italic tracking-tighter">해양경찰청<br/>수상구조사 종합정보</h3>
            <a 
                href="https://imsm.kcg.go.kr/CLMS/" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-xl shadow-white/5 hover:bg-slate-100"
            >
                바로가기 <ExternalLink size={16} className="text-[#0055A4]" />
            </a>
            
        </div>
      </section>
    </div>
  );
}

function TheoryPage({ activeTab, setActiveTab, handleDownload, isDownloading }: any) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const activeData = CURRICULUM_DATA.find(c => c.id === activeTab) || CURRICULUM_DATA[0];
  const isClass1 = activeTab === '1-class';

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
        case 'rescue': return <LifeBuoy size={18} />;
        case 'first-aid': return <BriefcaseMedical size={18} />;
        case 'law': return <Scale size={18} />;
        case 'gear': return <Settings size={18} />;
        case 'teaching': return <GraduationCap size={18} />;
        case 'attitude': return <HeartHandshake size={18} />;
        case 'emergency': return <AlertTriangle size={18} />;
        case 'survival': return <Waves size={18} />;
        default: return <BookOpen size={18} />;
    }
  };

  return (
    <div className="pt-24 pb-32 px-6 max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-black text-slate-900 mb-8 italic tracking-tighter break-keep uppercase">이론교육 문제은행</h2>
      
      {/* Tab Selection */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-10">
          {CURRICULUM_DATA.map(tab => (
              <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3.5 rounded-xl text-xs font-black transition-all ${activeTab === tab.id ? 'bg-white text-[#003366] shadow-md border border-slate-100' : 'text-slate-400'}`}
              >
                  {tab.name.split(' ')[0]} 과정
              </button>
          ))}
      </div>

      <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
      >
          <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/20 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h4 className="text-sm font-black text-[#FF6B00] uppercase tracking-[0.2em] mb-2 break-keep">통합 문제은행</h4>
              <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 mb-6">
                  <AlertCircle size={14} className="text-[#FF6B00]" />
                  <span className="text-[10px] font-bold text-[#FF6B00] break-keep">수상구조사 자격시험 통합 문제은행 (총 500문항)</span>
              </div>
              <p className="text-slate-400 text-xs font-light leading-relaxed mb-8 break-keep">
                  국가자격 시험의 핵심 이론 및 기출 유형을 정리한<br/>Swimology 전용 과목별 트레이닝 뱅크입니다.
              </p>
              
              <div className="space-y-4">
                  {QUESTION_BANK_DATA.map((qb) => (
                      <div key={qb.id} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                          <button 
                              onClick={() => setExpandedSubject(expandedSubject === qb.id ? null : qb.id)}
                              className="w-full px-6 py-5 flex items-center justify-between text-left group"
                          >
                              <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white/10 rounded-lg text-slate-300 group-hover:text-white group-hover:bg-[#FF6B00] transition-all">
                                      {getSubjectIcon(qb.iconName)}
                                  </div>
                                  <div>
                                      <div className="flex items-center gap-2 mb-0.5">
                                          <h5 className="font-bold text-white text-sm">{qb.chapter}장 {qb.title}</h5>
                                      </div>
                                      <div className="flex items-center gap-3">
                                          <div className="flex items-center gap-1">
                                              <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">{qb.range}</span>
                                          </div>
                                          <div className="w-1 h-1 rounded-full bg-slate-700" />
                                          <span className="text-[9px] text-slate-500 font-bold">{qb.totalQuestions}개 문항</span>
                                      </div>
                                  </div>
                              </div>
                              <ChevronDown 
                                  size={18} 
                                  className={`text-slate-500 transition-transform ${expandedSubject === qb.id ? 'rotate-180 text-white' : ''}`} 
                              />
                          </button>
                          
                          <AnimatePresence>
                              {expandedSubject === qb.id && (
                                  <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="px-6 pb-6"
                                  >
                                      <div className="pt-2 border-t border-white/5 mb-6">
                                          <div className="flex flex-wrap gap-2 mb-6 mt-4">
                                              {qb.keywords.map((kw, i) => (
                                                  <span key={i} className="text-[10px] font-bold text-[#FF6B00] bg-[#FF6B00]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                                      {kw}
                                                  </span>
                                              ))}
                                          </div>
                                          
                                          <div className="space-y-4">
                                              <h6 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                  <AlertCircle size={12} className="text-[#0055A4]" /> 핵심 요약 및 기출 샘플
                                              </h6>
                                              {qb.samples.map((sample, idx) => (
                                                  <div key={idx} className="bg-black/20 p-4 rounded-xl border border-white/5">
                                                      <p className="text-white text-xs font-bold mb-2">Q. {sample.question}</p>
                                                      <p className="text-slate-400 text-[11px] font-medium leading-relaxed">A. {sample.answer}</p>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                      
                                      <button 
                                          disabled={isDownloading !== null}
                                          onClick={() => handleDownload(qb.chapter, `swimology_chapter_${qb.chapter}.pdf`)}
                                          className="w-full bg-[#003366] text-white py-4 rounded-2xl text-[13px] font-black flex items-center justify-center gap-2.5 shadow-xl shadow-blue-900/20 hover:bg-[#002244] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                          {isDownloading === `swimology_chapter_${qb.chapter}.pdf` ? (
                                              <><Clock size={16} className="animate-spin" /> 파일 준비 중...</>
                                          ) : (
                                              <>
                                                <Download size={18} />
                                                <span className="tracking-tight">{qb.chapter}장 문제은행 PDF 다운로드</span>
                                              </>
                                          )}
                                      </button>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  ))}
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 flex flex-col gap-3">
                  <button 
                      disabled={isDownloading !== null}
                      onClick={() => handleDownload("unified", "swimology_question_bank_unified_500.pdf")}
                      className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 py-5 rounded-2xl text-white font-black text-[13px] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                      {isDownloading === "swimology_question_bank_unified_500.pdf" ? (
                          <><Clock size={18} className="animate-spin text-[#FF6B00]" /> 파일 준비 중...</>
                      ) : (
                          <><Download size={18} className="text-[#FF6B00]" /> <span className="leading-tight text-center">문제은행 PDF 다운로드<br/>(500문항)</span></>
                      )}
                  </button>
              </div>
          </div>

          <div className="bg-[#003366] p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
              <BookOpen className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10" />
              <h3 className="text-3xl font-black mb-2 leading-tight break-keep">{activeData.name}</h3>
              <p className="text-blue-100/80 text-[13px] font-light leading-relaxed break-keep">{activeData.summary}</p>
          </div>

          <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#003366]" /> 핵심 커리큘럼
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400">총 {isClass1 ? '64' : '40'}시간 이수</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeData.subjects.map((sub, i) => (
                      <div key={i} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all flex flex-col">
                          <div className="p-6 flex items-start justify-between bg-slate-50/50">
                              <div>
                                  <h5 className="font-black text-slate-800 text-[15px] mb-1">{sub.title}</h5>
                                  <div className="flex items-center gap-1.5">
                                      <Clock size={12} className="text-[#003366]" />
                                      <span className="text-[10px] font-black text-[#003366] uppercase">
                                          {isClass1 ? sub.hours1 : sub.hours2}시간
                                      </span>
                                  </div>
                              </div>
                          </div>
                          <div className="p-6 pt-4 flex-grow">
                              <div className="flex flex-wrap gap-2">
                                  {sub.topics.map((topic, idx) => (
                                      <div key={idx} className="bg-white border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                          <div className="w-1 h-1 rounded-full bg-[#003366]" />
                                          <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{topic}</span>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </motion.div>
    </div>
  );
}

function VideosPage({ setPlayingVideo }: { setPlayingVideo: (video: VideoItem) => void }) {
  const { chapterId } = useParams();
  const activeChapter = VIDEO_CATEGORIES.find(cat => cat.id === chapterId) || VIDEO_CATEGORIES[0];

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto w-full min-h-[80vh]">
        <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase break-keep">실기영상 아카이브</h2>
            <p className="text-slate-500 text-xs font-light max-w-sm mx-auto leading-relaxed break-keep">7개 동작 과목별 핵심 포인트를 영상을 통해 숙지하세요.</p>
        </div>

        {/* Chapter Sub Navigation */}
        <div className="relative mb-12">
          <div className="flex items-center gap-3 p-2 bg-slate-100/50 rounded-[2.5rem] shadow-inner border border-slate-200/60 overflow-x-auto no-scrollbar scroll-smooth">
            {VIDEO_CATEGORIES.map((cat) => {
              const isActive = activeChapter.id === cat.id;
              const displayName = cat.name.replace('Chapter ', '');
              return (
                <Link
                  key={cat.id}
                  to={`/videos/${cat.id}`}
                  className={`whitespace-nowrap px-6 py-3.5 rounded-full text-[11px] font-black transition-all duration-300 relative ${
                    isActive 
                    ? 'bg-[#003366] text-white shadow-xl shadow-blue-900/20 scale-105' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/80'
                  }`}
                >
                  {displayName}
                  {isActive && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 bg-[#003366] rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
          {/* Scroll Hint Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none rounded-r-[2.5rem]" />
        </div>
        
        <motion.div 
          key={activeChapter.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden min-h-[600px]"
        >
            <div className="p-8 md:p-12 border-b border-slate-50 bg-slate-50/30">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-[#FF6B00]">
                        <PlayCircle size={32} />
                    </div>
                    <div>
                        <h3 className="font-black text-slate-900 text-2xl italic tracking-tight uppercase leading-none">{activeChapter.name}</h3>
                        <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-2">{activeChapter.items.length}개 항목</p>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12 space-y-12">
                {/* Embeddable Videos (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {activeChapter.items.filter(item => item.type === 'embed').map((item, i) => (
                        <div 
                            key={i}
                            onClick={() => setPlayingVideo(item)}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden bg-slate-100 relative mb-5 border border-slate-100 shadow-sm transition-all group-hover:shadow-2xl group-hover:-translate-y-2">
                                <img 
                                    src={`https://img.youtube.com/vi/${item.id}/maxresdefault.jpg`} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 group-hover:scale-110 transition-transform">
                                        <PlayCircle size={40} fill="currentColor" fillOpacity={0.2} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start justify-between gap-4 px-2">
                                <div>
                                    <h4 className="text-[17px] font-black text-slate-800 line-clamp-1 italic group-hover:text-[#003366] transition-colors">{item.title}</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">내부 플레이어 재생 가능</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#FF6B00] group-hover:text-white transition-colors">
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Link Only Videos (Text List) */}
                {activeChapter.items.some(item => item.type === 'link') && (
                    <div className="pt-12 border-t border-slate-100">
                        <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                            <div className="w-1.5 h-4 bg-[#FF6B00] rounded-full" /> 추가 학습 아카이브 (외부 링크)
                        </h5>
                        <div className="grid gap-4">
                            {activeChapter.items.filter(item => item.type === 'link').map((item, i) => (
                                <a 
                                    key={i}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:bg-[#003366]/5 hover:border-[#003366]/20 transition-all active:scale-[0.99]"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
                                            <ExternalLink size={24} />
                                        </div>
                                        <div>
                                            <h6 className="text-[15px] font-black text-slate-700 italic group-hover:text-slate-900 leading-tight">{item.title}</h6>
                                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">YouTube 채널에서 직접 시청 가능</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={22} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    </div>
  );
}

function StandardsPage() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <div className="pt-24 pb-32 px-6 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
            <h2 className="text-[10px] font-black text-[#FF6B00] uppercase tracking-[0.3em] mb-4">공식 실기 평가 가이드</h2>
            <h3 className="text-3xl font-black text-slate-900 mb-6 italic tracking-tighter uppercase underline decoration-[#FF6B00] decoration-4 underline-offset-8 break-keep">실기 평가 세부 기준</h3>
            <p className="text-slate-500 text-xs font-light max-w-md mx-auto leading-relaxed break-keep">
                해양경찰청 고시 및 자격시험 세부 기준을 바탕으로 작성되었습니다.<br/>
                각 항목을 클릭하여 상세 판정 기준과 실격 사유를 확인하세요.
            </p>
        </div>

        <div className="space-y-6">
            {FULL_STANDARDS_DATA.map((section, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden"
                >
                    <button 
                        onClick={() => setExpandedSubject(expandedSubject === section.category ? null : section.category)}
                        className="w-full flex items-center justify-between p-8 text-left outline-none group"
                    >
                        <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-[#FF6B00] group-hover:scale-110 transition-transform">
                                {idx < 4 ? <Waves size={24} /> : <HeartHandshake size={24} />}
                            </div>
                            <div>
                                <h4 className="font-black text-slate-900 text-lg italic tracking-tight">{section.category}</h4>
                                <p className="text-[11px] text-slate-400 font-light mt-0.5">{section.description}</p>
                            </div>
                        </div>
                        <ChevronRight 
                            size={20} 
                            className={`text-slate-300 transition-transform duration-300 ${expandedSubject === section.category ? 'rotate-90 text-[#FF6B00]' : ''}`} 
                        />
                    </button>

                    <AnimatePresence>
                        {expandedSubject === section.category && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50/50 border-t border-slate-50"
                            >
                                <div className="p-8 space-y-10">
                                    {/* Score Table */}
                                    <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-slate-950 text-white uppercase text-[9px] font-black tracking-widest">
                                                    <th className="px-6 py-4">평가 항목</th>
                                                    <th className="px-6 py-4 border-l border-white/5">1급 기준</th>
                                                    <th className="px-6 py-4 border-l border-white/5">2급 기준</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-50">
                                                {section.items.map((item, i) => (
                                                    <tr key={i} className="text-xs transition-colors hover:bg-slate-50/50">
                                                        <td className="px-6 py-4 font-bold text-slate-700 flex items-center gap-2">
                                                            {item.critical && <AlertCircle size={12} className="text-[#FF6B00]" />}
                                                            {item.item}
                                                        </td>
                                                        <td className={`px-6 py-4 font-black ${item.critical ? 'text-[#0055A4]' : 'text-slate-500'}`}>{item.class1}</td>
                                                        <td className={`px-6 py-4 font-black ${item.critical ? 'text-[#FF6B00]' : 'text-slate-500'}`}>{item.class2}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Action Details */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <Info size={14} /> 수행 세부 방법
                                            </h5>
                                            <ul className="space-y-3">
                                                {section.details.map((detail, i) => (
                                                    <li key={i} className="text-[12px] text-slate-600 font-medium leading-relaxed flex items-start gap-2">
                                                        <span className="text-[#FF6B00]">•</span> {detail}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-orange-50/30 p-6 rounded-3xl border border-orange-100/50">
                                            <h5 className="text-[10px] font-black text-[#FF6B00] uppercase tracking-widest mb-4 flex items-center gap-2">
                                                <X size={14} /> 실격 및 감정 사유
                                            </h5>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <div className="text-[9px] font-black text-orange-950/40 uppercase tracking-wider mb-2">실격</div>
                                                    {section.disqualifications.map((dq, i) => (
                                                        <div key={i} className="text-[11px] text-orange-900 font-black flex items-start gap-2 leading-tight">
                                                            <AlertTriangle size={12} className="shrink-0 mt-0.5" /> {dq}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="pt-3 border-t border-orange-100">
                                                    <div className="text-[9px] font-black text-orange-950/40 uppercase tracking-wider mb-2">감점</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {section.deductions.map((d, i) => (
                                                            <span key={i} className="bg-white border border-orange-100 text-[10px] text-slate-500 px-2 py-1 rounded-lg">
                                                                {d}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>

        {/* Download Section & Next Steps */}
        <div className="mt-24 pt-12 border-t border-slate-100">
            <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-14 text-center">
                <h4 className="text-xl font-black text-slate-900 mb-2 italic uppercase">공식 가이드 다운로드</h4>
                <p className="text-slate-500 text-xs font-light mb-10 max-w-sm mx-auto">
                    해양경찰청 공식 평가 가이드 PDF를 다운로드하세요.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <a 
                        href={PDF_DATA.lv1_guide}
                        className="bg-[#003366] text-white rounded-2xl py-5 px-8 flex items-center justify-center gap-3 hover:bg-[#002244] transition-all active:scale-[0.98] shadow-xl shadow-blue-900/10 group"
                    >
                        <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                        <div className="text-left">
                            <div className="text-[11px] font-black break-keep">1급 평가기준 다운로드</div>
                        </div>
                    </a>

                    <a 
                        href={PDF_DATA.lv2_guide}
                        className="bg-[#FF6B00] text-white rounded-2xl py-5 px-8 flex items-center justify-center gap-3 hover:bg-[#E65A00] transition-all active:scale-[0.98] shadow-xl shadow-orange-500/10 group"
                    >
                        <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                        <div className="text-left">
                            <div className="text-[11px] font-black break-keep">2급 평가기준 다운로드</div>
                        </div>
                    </a>
                </div>

                <p className="mt-12 text-[10px] text-slate-400 font-light mb-8">
                    본 자료는 해양경찰청 공식 평가 가이드를 바탕으로 작성되었습니다.
                </p>

                <div className="h-px bg-slate-200 w-12 mx-auto mb-8" />

                <Link 
                    to="/videos"
                    className="inline-flex items-center gap-3 text-slate-900 font-black text-xs hover:gap-5 transition-all group"
                >
                    <PlayCircle size={16} className="text-[#FF6B00]" />
                    실기영상 보러가기
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
            </div>
        </div>
    </div>
  );
}
