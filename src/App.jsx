// @ts-nocheck
import React, { useState, useEffect, useMemo, useRef } from 'react';

// --- أيقونات سايبربانك الطبية واللوجستية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconBiohazard = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 12v.01"/><path d="M12 7.5a4.5 4.5 0 0 0-4.5 4.5h9A4.5 4.5 0 0 0 12 7.5Z"/><path d="M15.898 14.5a4.5 4.5 0 0 0 3.898-2.25l-7.796 4.5a4.5 4.5 0 0 0 3.898-2.25Z"/><path d="M8.102 14.5a4.5 4.5 0 0 1-3.898-2.25l7.796 4.5a4.5 4.5 0 0 1-3.898-2.25Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconBox = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2h5"/><path d="M16.5 6.5A2.5 2.5 0 0 0 19 9v1a2.5 2.5 0 0 0 2.5 2.5H22"/><path d="M19 9a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 1-5 0v-1a2.5 2.5 0 0 0-5 0v1A2.5 2.5 0 0 1 5 9"/><path d="M2 12.5h.5A2.5 2.5 0 0 0 5 10V9"/><path d="M19 14.5v1a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 15.5v-1"/><path d="M12 18v4"/><path d="M9 22h6"/></svg>;
const IconInfo = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const IconMessage = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconSpeed = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/></svg>;

const API_URL = "https://script.google.com/macros/s/AKfycbxd_dLjUh72_oZreQKIyPpfkCofq8lmkvP1JMj6t656KEV3Y1gGTBmjMWUYsGhUWdPWUQ/exec";

// --- حقن ستايل السايبربانك[cite: 3] ---
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    .bg-ai-grid {
      background-image: linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px);
      background-size: 30px 30px; background-position: center center;
    }
    @keyframes pulse-ring-red {
      0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); border-color: rgba(244, 63, 94, 1); }
      70% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); border-color: rgba(244, 63, 94, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); border-color: rgba(244, 63, 94, 1); }
    }
    .ready-blink-red { animation: pulse-ring-red 1.5s infinite; background-color: rgba(244, 63, 94, 0.05) !important; }
    
    @keyframes scroll-news-seamless { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
    .ticker-track { display: flex; width: max-content; animation-name: scroll-news-seamless; animation-timing-function: linear; animation-iteration-count: infinite; }
    .ticker-track:hover { animation-play-state: paused; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 16px; width: 16px; border-radius: 50%; background: #22d3ee; cursor: pointer; box-shadow: 0 0 10px rgba(34,211,238,0.5); }
  `;
  document.head.appendChild(style);
}

// =====================================
// المكونات الفرعية[cite: 3]
// =====================================
const InfoTicker = ({ tips, speed }) => {
  if (!tips || tips.length === 0) return null;
  const tipElements = tips.map((tip, index) => (
    <span key={index} className="flex items-center gap-3 px-8 whitespace-nowrap" dir="rtl">
        {tip.includes('عاجل') || tip.includes('تعميم') ? <span className="text-rose-500 text-sm animate-ping">●</span> : <span className="text-cyan-400 text-sm">●</span>}
        {tip}
    </span>
  ));
  return (
    <div className="w-full bg-[#05080f] border-t border-[#162235] h-12 flex items-center overflow-hidden relative z-50 shrink-0" dir="ltr">
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#05080f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#05080f] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 h-full flex items-center bg-[#090d16] border-l border-[#162235] px-4 z-20 shadow-[5px_0_15px_rgba(0,0,0,0.5)]" dir="rtl">
         <IconInfo className="text-cyan-400 ml-2 animate-pulse" />
         <span className="font-mono text-xs font-black text-cyan-400 tracking-wider">PHARMA INTEL</span>
      </div>
      <div className="ticker-track text-[15px] font-bold text-slate-300 tracking-wide" style={{ animationDuration: `${speed}s` }}>
        <div className="flex items-center">{tipElements}</div>
        <div className="flex items-center">{tipElements}</div>
      </div>
    </div>
  );
};

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:bg-slate-900 hover:text-white border border-transparent'}`}>
    {icon}
    <span className="absolute right-24 bg-[#090d16] border border-slate-700 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

const StatCard = ({ title, value, badge, color, isPulse = false }) => {
  const colors = {
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.15)]",
    rose: "text-rose-400 border-rose-500/40 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    white: "text-white border-slate-500/30 bg-white/5"
  };
  return (
    <div className={`bg-[#090d16]/80 backdrop-blur-md p-5 rounded-2xl flex flex-col justify-between shadow-xl border relative overflow-hidden group hover:scale-[1.02] transition-transform ${colors[color].split('shadow')[0]} ${colors[color].split(' ').pop()}`}>
      <div className={`absolute top-0 right-0 w-16 h-16 bg-${color}-500/10 rounded-bl-full pointer-events-none`}></div>
      <span className="text-slate-400 text-xs font-black tracking-wider uppercase z-10">{title}</span>
      <div className="flex items-baseline justify-between mt-2 z-10">
        <span className={`text-4xl font-black font-mono ${colors[color].split(' ')[0]} ${isPulse?'animate-pulse':''}`}>{value}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${colors[color].split('shadow')[0]} bg-black/40`}>{badge}</span>
      </div>
    </div>
  );
};

// =====================================
// التطبيق الرئيسي
// =====================================
export default function App() {
  const [activeTab, setActiveTab] = useState('drugs_board');
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // نظام الصندوق
  const [pharmacyName, setPharmacyName] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // الشريط الإخباري
  const [tickerTips, setTickerTips] = useState([
      "⚠️ تعميم وزارة الصحة: السحب الفوري لجميع تشغيلات Amoxil 500mg.",
      "💡 يرجى من كافة الصيدليات المعتمدة تجهيز الصناديق قبل تاريخ 5 من الشهر.",
      "🚚 مندوبو التوزيع متواجدون في مناطق (عمان، الزرقاء، إربد) على مدار الساعة."
  ]);
  const [tickerSpeed, setTickerSpeed] = useState(150);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    fetchDrugsData();
    return () => clearInterval(timer);
  }, []);

  const fetchDrugsData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error("Connection Error:", error);
    }
    setLoading(false);
  };

  const toggleDrugSelect = (drugStr) => {
    if (selectedDrugs.includes(drugStr)) {
        setSelectedDrugs(selectedDrugs.filter(d => d !== drugStr));
    } else {
        setSelectedDrugs([...selectedDrugs, drugStr]);
    }
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!pharmacyName) return alert("معرف الصيدلية مطلوب!");
    if (selectedDrugs.length === 0) return alert("لم يتم تحديد أي أصناف!");
    setIsSubmitting(true);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ pharmacyName, readyDrugs: selectedDrugs.join(" | "), notes })
      });
      setSubmitSuccess(true);
      setTimeout(() => { setSubmitSuccess(false); setSelectedDrugs([]); setPharmacyName(""); }, 5000);
    } catch (error) {
      alert("فشل في الربط مع السيرفر الرئيسي!");
    }
    setIsSubmitting(false);
  };

  const stats = useMemo(() => {
      const critical = drugs.filter(d => String(d['سبب_السحب']).includes('صحة') || String(d['سبب_السحب']).includes('تعميم')).length;
      return { total: drugs.length, critical, standard: drugs.length - critical };
  }, [drugs]);

  return (
    <div className="h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden relative" dir="rtl">
      
      {/* الهيدر الفخم المستوحى من[cite: 3] */}
      <header className="w-full bg-[#090d16]/90 backdrop-blur-sm border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10 relative shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 right-1/4 w-96 h-full bg-rose-500/5 blur-[100px]"></div>
             <div className="absolute top-0 left-1/4 w-96 h-full bg-cyan-500/5 blur-[100px]"></div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-10 w-10 bg-[#0f172a] rounded-xl flex items-center justify-center overflow-hidden border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
             <IconBiohazard className="text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1"><IconCpu /> PHARMA GRID</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">ENTERPRISE <span className="text-rose-400 font-light text-sm">Warehouse OS</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-cyan-400 animate-ping text-[6px]">●</span>
            <span>AMMAN ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-ai-grid opacity-10 pointer-events-none"></div>
        
        {/* الشريط الجانبي */}
        <aside className="w-20 bg-[#04070d]/90 backdrop-blur-md border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20 relative shrink-0">
          <SidebarButton icon={<IconGrid />} title="لوحة السحب المباشر" isActive={activeTab === 'drugs_board'} onClick={() => setActiveTab('drugs_board')} />
          <SidebarButton icon={<IconBox />} title="اعتماد صندوق صيدلية" isActive={activeTab === 'submit_box'} onClick={() => setActiveTab('submit_box')} />
          <SidebarButton icon={<IconMessage />} title="مركز البث (الشريط)" isActive={activeTab === 'ticker'} onClick={() => setActiveTab('ticker')} />
        </aside>

        {/* مساحة العرض الرئيسية */}
        <main className="flex-1 p-6 overflow-y-auto w-full z-10 relative">
          
          {/* شاشة 1: لوحة الأدوية */}
          {activeTab === 'drugs_board' && (
            <div className="w-full space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <StatCard title="إجمالي طلبات السحب" value={stats.total} badge="ALL NODES" color="white" />
                    <StatCard title="سحب طارئ (تعميم)" value={stats.critical} badge="CRITICAL" color="rose" isPulse={true} />
                    <StatCard title="سحب لانتهاء الصلاحية" value={stats.standard} badge="STANDARD" color="amber" />
                </div>

                <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            الشبكة الرقمية للأصناف المطلوبة
                        </h2>
                        {selectedDrugs.length > 0 && (
                            <button onClick={() => setActiveTab('submit_box')} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-lg font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.3)] animate-pulse">
                                متابعة تجهيز الصندوق ({selectedDrugs.length})
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-cyan-400 col-span-full py-16 flex flex-col items-center justify-center font-mono font-bold border-2 border-dashed border-[#162235] rounded-xl animate-pulse">
                            <IconBrain className="text-4xl mb-3" />
                            CONNECTING TO QUANTUM DB...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                            {drugs.map((d, idx) => {
                                const isCritical = String(d['سبب_السحب']).includes('صحة') || String(d['سبب_السحب']).includes('تعميم');
                                const drugStr = `${d['اسم_الدواء']} (باتش: ${d['رقم_الباتش (Batch)']})`;
                                const isSelected = selectedDrugs.includes(drugStr);
                                
                                // تحديد تأثيرات البطاقة بناءً على نوع السحب والاختيار
                                let glow = isCritical ? "border-rose-500/60 bg-[#14040a]/90 shadow-[0_0_35px_rgba(244,63,94,0.15)] ready-blink-red" : "border-[#1a2740] bg-[#050914]/80 hover:border-amber-500/40";
                                let badge = isCritical ? "bg-rose-500 text-black border-rose-400" : "bg-amber-400/10 text-amber-400 border-amber-400/20";
                                
                                if (isSelected) {
                                    glow = "border-emerald-500 bg-[#04140d]/90 shadow-[0_0_30px_rgba(16,185,129,0.3)]";
                                }

                                return (
                                    <div key={idx} onClick={() => toggleDrugSelect(drugStr)} className={`backdrop-blur-md border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer relative overflow-hidden group`}>
                                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}></div>
                                        
                                        {isSelected && (
                                            <div className="absolute top-0 right-0 bg-emerald-500 text-black font-black px-3 py-1 rounded-bl-xl text-xs z-20 flex items-center gap-1 shadow-lg">
                                                <IconCheck /> تم الضم
                                            </div>
                                        )}

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1">
                                                    <IconCpu /> DB-ID #{d['ID']}
                                                </span>
                                                <span className={`text-[10px] px-3 py-1 rounded border font-black tracking-wider ${badge}`}>
                                                    {d['سبب_السحب']}
                                                </span>
                                            </div>
                                            <div className="mb-5 border-b border-slate-800/50 pb-4">
                                                <h3 className="font-black text-white text-xl tracking-wide mb-1.5" dir="ltr">{d['اسم_الدواء']}</h3>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-slate-500 font-mono">BATCH NO:</span>
                                                    <span className="font-bold text-cyan-400 text-sm font-mono tracking-widest">{d['رقم_الباتش (Batch)']}</span>
                                                </div>
                                            </div>
                                            <div className="bg-[#0a101d]/80 backdrop-blur-sm border border-[#162235] rounded-xl px-4 py-3 flex justify-between items-center">
                                                <span className="text-[9px] text-slate-500 block font-mono font-bold tracking-widest">EXPIRATION DATE</span>
                                                <span className="font-mono text-white font-black">{String(d['تاريخ_الانتهاء']).substring(0,10)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
          )}

          {/* شاشة 2: اعتماد الصندوق */}
          {activeTab === 'submit_box' && (
              <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in mt-10">
                  <div className="bg-[#070b12]/90 backdrop-blur-md border border-[#121e30] rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
                      <div className="absolute -right-20 -top-20 text-slate-800/20 opacity-10 pointer-events-none transform scale-[3]"><IconBox/></div>
                      
                      <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8 border-b border-[#162235] pb-6 flex items-center gap-3 relative z-10">
                          <div className="bg-cyan-500/10 p-3 rounded-xl text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                              <IconBox />
                          </div>
                          اعتماد الصندوق وإصدار بوليصة السحب
                      </h2>

                      {submitSuccess ? (
                          <div className="text-center py-12 relative z-10">
                              <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-pulse">
                                  <IconCheck />
                              </div>
                              <h3 className="text-3xl font-black text-emerald-400 mb-3 tracking-wide">تم التشفير والاعتماد!</h3>
                              <p className="text-slate-400 mb-8 font-mono">SYSTEM: LOGISTICS TEAM NOTIFIED.</p>
                              <button onClick={() => setActiveTab('drugs_board')} className="bg-[#0a101d] border border-[#162235] text-slate-300 px-8 py-3 rounded-xl font-bold hover:bg-slate-800 hover:text-white transition-all">
                                  العودة للشبكة
                              </button>
                          </div>
                      ) : (
                          <form onSubmit={submitOrder} className="space-y-6 relative z-10">
                              <div>
                                  <label className="text-[11px] text-slate-400 block font-black mb-2 tracking-wider uppercase font-mono">Pharmacy Authentication ID</label>
                                  <input 
                                      type="text" value={pharmacyName} onChange={e => setPharmacyName(e.target.value)}
                                      className="w-full bg-[#090d16] border border-[#162235] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-bold shadow-inner"
                                      placeholder="مثال: صيدلية الشفاء"
                                  />
                              </div>

                              <div className="bg-[#090d16] p-5 rounded-xl border border-[#162235] shadow-inner">
                                  <div className="flex justify-between items-center mb-4">
                                      <label className="text-[11px] text-slate-400 block font-black tracking-wider uppercase font-mono">Secured Drugs Payload</label>
                                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg text-xs font-bold border border-cyan-500/30">
                                          {selectedDrugs.length} أصناف
                                      </span>
                                  </div>
                                  <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                                      {selectedDrugs.length === 0 ? (
                                          <div className="text-rose-400 text-xs font-bold py-2">يرجى العودة للوحة السحب وتحديد الأصناف أولاً.</div>
                                      ) : (
                                          selectedDrugs.map((d, i) => <div key={i} className="text-sm text-slate-300 border-l-2 border-emerald-500 pl-3 py-1 font-mono">{d}</div>)
                                      )}
                                  </div>
                              </div>

                              <div>
                                  <label className="text-[11px] text-slate-400 block font-black mb-2 tracking-wider uppercase font-mono">Logistics Notes</label>
                                  <textarea 
                                      value={notes} onChange={e => setNotes(e.target.value)} rows="2"
                                      className="w-full bg-[#090d16] border border-[#162235] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-cyan-500 transition-all font-bold resize-none shadow-inner"
                                      placeholder="ملاحظات إضافية للمندوب..."
                                  />
                              </div>

                              <button type="submit" disabled={isSubmitting || selectedDrugs.length === 0} 
                                  className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-xl flex justify-center items-center gap-3 ${isSubmitting || selectedDrugs.length === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' : 'bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.3)]'}`}>
                                  {isSubmitting ? <span className="animate-pulse">TRANSMITTING...</span> : <><IconSpeed/> اعتماد الطلب وإرسال البوليصة</>}
                              </button>
                          </form>
                      )}
                  </div>
              </div>
          )}

          {/* شاشة 3: إدارة البث (الشريط) مستوحاة من[cite: 3] */}
          {activeTab === 'ticker' && (
              <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in mt-10">
                  <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                          <IconMessage />
                      </div>
                      إدارة الإشعارات المركزية (البث المباشر للصيدليات)
                  </h2>
                  <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-2xl">
                      <div className="mb-8 pb-8 border-b border-[#162235]">
                          <h3 className="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2">
                              <IconSpeed /> التحكم بسرعة الشريط (المدة الزمنية للدورة: <span className="text-white font-mono">{tickerSpeed}s</span>)
                          </h3>
                          <div className="flex items-center gap-4 bg-[#090d16] p-5 rounded-xl border border-[#162235] shadow-inner">
                              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest whitespace-nowrap">Fast (أسرع)</span>
                              <input type="range" min="20" max="300" step="5" value={tickerSpeed} onChange={(e) => setTickerSpeed(parseInt(e.target.value, 10))} className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer outline-none" dir="ltr" />
                              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest whitespace-nowrap">Slow (أبطأ)</span>
                          </div>
                      </div>
                      <div className="text-slate-500 font-bold text-center py-10 border-2 border-dashed border-[#162235] rounded-xl">
                          يمكن ربط هذه الشاشة بقاعدة البيانات لاحقاً لتحديث الشريط لجميع الصيدليات آنياً.
                      </div>
                  </div>
              </div>
          )}
        </main>
      </div>
      
      {/* الشريط الإخباري الفخم[cite: 3] */}
      <InfoTicker tips={tickerTips} speed={tickerSpeed} />
    </div>
  );
}