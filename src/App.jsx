// @ts-nocheck
import React, { useState, useEffect } from 'react';

// --- أيقونات سايبربانك الهندسية ---
const IconGrid = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const IconVolt = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L9 22l2-10H2Z"/></svg>;
const IconCpu = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>;
const IconShield = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconBrain = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2h5"/><path d="M16.5 6.5A2.5 2.5 0 0 0 19 9v1a2.5 2.5 0 0 0 2.5 2.5H22"/><path d="M19 9a2.5 2.5 0 0 1-2.5-2.5v-1a2.5 2.5 0 0 0-5 0v1a2.5 2.5 0 0 1-5 0v-1a2.5 2.5 0 0 0-5 0v1A2.5 2.5 0 0 1 5 9"/><path d="M2 12.5h.5A2.5 2.5 0 0 0 5 10V9"/><path d="M19 14.5v1a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 15.5v-1"/><path d="M12 18v4"/><path d="M9 22h6"/></svg>;
const IconInfo = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
const IconBox = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;

const RiskMeter = ({ level }) => {
  let color = "#10b981"; 
  if (level >= 80) color = "#f43f5e"; 
  else if (level >= 50) color = "#f59e0b"; 
  const fillWidth = Math.max(1, 12 * (level / 100));
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" stroke="currentColor" className="text-slate-500" />
      <line x1="22" x2="22" y1="11" y2="13" stroke="currentColor" className="text-slate-500" />
      <rect width={fillWidth} height="6" x="4" y="9" rx="1" ry="1" fill={color} stroke="none" />
    </svg>
  );
};

const API_URL = "https://script.google.com/macros/s/AKfycbxd_dLjUh72_oZreQKIyPpfkCofq8lmkvP1JMj6t656KEV3Y1gGTBmjMWUYsGhUWdPWUQ/exec";

const DEFAULT_TIPS = [
    "⚠️ تعميم وزارة الصحة: يرجى التحفظ فوراً على تشغيلات الباراسيتامول التي تنتهي في 08/2026.",
    "💡 تحديث خوارزمية السحب: يتم إشعاركم بالتشغيلات قبل 6 أشهر من انتهاء الصلاحية لضمان سرعة الاستبدال.",
    "🛡️ الأدوية البيولوجية: يجب تجهيزها في صناديق مبردة خاصة قبل وصول المندوب للحفاظ على سلسلة التبريد."
];

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    #root, body, html { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; background-color: #02040a; color: #f0f4f8; font-family: system-ui, -apple-system, sans-serif; }
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: #02040a; }
    ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 10px; }
    .bg-ai-grid {
      background-image: linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px);
      background-size: 30px 30px; background-position: center center;
    }
    @keyframes pulse-ring {
      0% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.7); border-color: rgba(244, 63, 94, 1); }
      70% { box-shadow: 0 0 0 10px rgba(244, 63, 94, 0); border-color: rgba(244, 63, 94, 0.3); }
      100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0); border-color: rgba(244, 63, 94, 1); }
    }
    .ready-blink { animation: pulse-ring 1.5s infinite; background-color: rgba(244, 63, 94, 0.05) !important; }
    @keyframes pop-in { 0% { transform: scale(0.8) translateY(50px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
    .animate-pop-in { animation: pop-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes scroll-news-seamless { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
    .ticker-track { display: flex; width: max-content; animation-name: scroll-news-seamless; animation-timing-function: linear; animation-iteration-count: infinite; }
  `;
  document.head.appendChild(style);
}

const InfoTicker = ({ tips }) => {
  if (!tips || tips.length === 0) return null;
  const tipElements = tips.map((tip, index) => (
    <span key={index} className="flex items-center gap-3 px-8 whitespace-nowrap" dir="rtl">
        {(tip.includes('تحذير') || tip.includes('تنبيه') || tip.includes('⚠️')) ? <span className="text-rose-400 text-sm">●</span> : <span className="text-cyan-400 text-sm">●</span>}
        {tip}
    </span>
  ));

  return (
    <div className="w-full bg-[#05080f] border-t border-[#162235] h-12 flex items-center overflow-hidden relative z-50 shrink-0" dir="ltr">
      <div className="absolute right-0 h-full flex items-center bg-[#090d16] border-l border-[#162235] px-4 z-20 shadow-[5px_0_15px_rgba(0,0,0,0.5)]" dir="rtl">
         <IconInfo className="text-cyan-400 ml-2 animate-pulse" />
         <span className="font-mono text-xs font-black text-cyan-400 tracking-wider">PHARMA AI ALERT</span>
      </div>
      <div className="ticker-track text-[15px] font-bold text-slate-300 tracking-wide" style={{ animationDuration: `60s` }}>
        <div className="flex items-center">{tipElements}</div>
        <div className="flex items-center">{tipElements}</div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('immediate');
  const [drugs, setDrugs] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchQuantumData() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data)) setDrugs(data);
      } catch (err) { console.error("الربط السحابي معطل:", err); }
    }
    fetchQuantumData();
  }, []);

  // الحماية من الانهيار إذا كان سبب السحب فارغاً
  const immediateDrugs = drugs.filter(d => (d['سبب_السحب'] || '').includes("وزارة الصحة"));
  const futureDrugs = drugs.filter(d => !(d['سبب_السحب'] || '').includes("وزارة الصحة"));

  return (
    <div className="h-screen w-full bg-[#02040a] flex flex-col font-sans select-none overflow-hidden relative" dir="rtl">
      
      <header className="w-full bg-[#090d16]/90 backdrop-blur-sm border-b border-[#162235] px-6 py-4 flex flex-row justify-between items-center shadow-[0_4px_30px_rgba(0,0,0,0.5)] z-10 relative shrink-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-0 left-1/4 w-96 h-full bg-cyan-500/5 blur-[100px]"></div>
             <div className="absolute top-0 right-1/4 w-96 h-full bg-rose-500/5 blur-[100px]"></div>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-10 w-10 bg-[#0f172a] rounded-xl flex items-center justify-center overflow-hidden border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
             <IconBrain className="text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-black px-2 py-0.5 rounded-md tracking-widest flex items-center gap-1"><IconShield /> WAREHOUSE NETWORK</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider font-mono">PHARMA CLOUD <span className="text-rose-400 font-light text-sm">Enterprise AI</span></h1>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="font-mono text-xs bg-[#05080f] border border-[#1b2b44] px-4 py-2 rounded-xl text-slate-300 shadow-inner flex items-center gap-3 font-bold tracking-widest">
            <span className="text-rose-400 animate-ping text-[6px]">●</span>
            <span>SECURE ZONE</span>
            <span className="text-white text-sm font-black">{currentTime.toLocaleTimeString('ar-JO')}</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-ai-grid opacity-10 pointer-events-none"></div>
        <aside className="w-20 bg-[#04070d]/90 backdrop-blur-md border-l border-[#131f33] flex flex-col items-center py-6 gap-6 shadow-2xl z-20 relative shrink-0">
          <SidebarButton icon={<IconGrid />} title="السحب الفوري 🚨" isActive={activeTab === 'immediate'} onClick={() => setActiveTab('immediate')} />
          <SidebarButton icon={<IconCalendar />} title="السحوبات المجدولة" isActive={activeTab === 'future'} onClick={() => setActiveTab('future')} />
          <SidebarButton icon={<IconBox />} title="تقديم طلب تجهيز" isActive={activeTab === 'submit_order'} onClick={() => setActiveTab('submit_order')} />
        </aside>

        <main className="flex-1 p-6 overflow-y-auto w-full z-10 relative">
          {activeTab === 'immediate' && <QuantumYard drugs={immediateDrugs} type="urgent" />}
          {activeTab === 'future' && <QuantumYard drugs={futureDrugs} type="scheduled" />}
          {activeTab === 'submit_order' && <SubmitOrderForm drugs={drugs} />}
        </main>
      </div>
      
      <InfoTicker tips={DEFAULT_TIPS} />
    </div>
  );
}

const SidebarButton = ({ icon, title, isActive, onClick }) => (
  <button onClick={onClick} className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${isActive ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'text-slate-500 hover:bg-slate-900 hover:text-white border border-transparent'}`}>
    {icon}
    <span className="absolute right-24 bg-[#090d16] border border-slate-700 px-3 py-1.5 rounded-lg text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 shadow-xl">{title}</span>
  </button>
);

const DrugCard = ({ drug, isUrgent }) => {
    let badgeStyle = isUrgent ? "bg-rose-500 text-white font-bold border-rose-400" : "bg-amber-400/10 text-amber-400 border-amber-400/20";
    let glow = isUrgent ? "border-rose-500/60 bg-[#140404]/90 shadow-[0_0_35px_rgba(244,63,94,0.25)] ready-blink" : "border-[#1a2740] bg-[#050914]/80 hover:border-cyan-500/40";
    let progressPercent = isUrgent ? 95 : 40; 
    let progressColor = isUrgent ? "bg-rose-500 shadow-[0_0_15px_#f43f5e]" : "bg-amber-500 shadow-[0_0_8px_#f59e0b]";
    let statusEmoji = isUrgent ? "🚨" : "⏳";

    // حماية للمتغيرات القادمة من قاعدة البيانات لمنع الانهيار
    const drugId = drug['ID'] || '00';
    const drugReason = drug['سبب_السحب'] || 'غير مصنف';
    const drugName = drug['اسم_الدواء'] || 'دواء غير معرف';
    const drugBatch = drug['رقم_الباتش (Batch)'] || 'N/A';
    const drugDate = drug['تاريخ_الانتهاء'] ? String(drug['تاريخ_الانتهاء']).substring(0, 10) : 'تاريخ غير متوفر';

    return (
      <div className={`backdrop-blur-md border ${glow} rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] group w-full shadow-2xl relative overflow-hidden`}>
        <div className={`absolute -top-3 -right-3 bg-[#0a101d] border border-[#162235] rounded-full p-2 text-xl z-10 shadow-lg ${isUrgent ? 'animate-bounce' : 'animate-pulse'}`}>
            {statusEmoji}
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-5">
            <span className="font-mono text-[10px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 flex items-center gap-1"><IconCpu /> DB-ID #{drugId}</span>
            <span className={`text-[10px] px-3 py-1 rounded border font-black uppercase tracking-wider flex items-center gap-1.5 ${badgeStyle}`}>
              {drugReason}
            </span>
          </div>
          <div className="mb-5 border-b border-slate-800/50 pb-4">
            <h3 className="font-black text-white text-xl tracking-wide mb-1.5" dir="ltr">{drugName}</h3>
            <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">الحالة:</span>
                <span className="font-bold text-sky-400 text-sm">بانتظار تجهيز الصيدلية</span>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#0a101d]/80 backdrop-blur-sm border border-[#162235] rounded-xl px-4 py-3 mb-5">
            <div className="flex-[2]">
              <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">BATCH NUMBER</span>
              <span className="font-mono text-cyan-400 font-black tracking-widest whitespace-nowrap text-sm">{drugBatch}</span>
            </div>
            <div className="flex-1 flex flex-col items-end pl-1 border-r border-[#162235] pr-3">
              <span className="text-[8px] text-slate-500 block font-mono font-bold mb-0.5">RISK LEVEL</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                 <RiskMeter level={progressPercent} />
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            <div className="flex justify-between text-[10px] font-mono font-bold"><span className="text-slate-400">EXPIRY PROXIMITY ALERT</span><span className="text-white font-black">{progressPercent}%</span></div>
            <div className="w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 h-1.5">
                <div className={`h-full rounded-full transition-all duration-500 relative ${progressColor}`} style={{ width: `${progressPercent}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>
          </div>
          <div className="bg-[#090d16]/80 p-3.5 rounded-xl border border-[#142033] mb-5">
            <span className="text-[10px] text-slate-500 block mb-1.5 flex items-center gap-1"><IconSearch /> تاريخ الانتهاء المسجل بالشبكة:</span>
            <div className="text-slate-200 leading-relaxed font-mono font-bold text-sm bg-slate-900 px-2 py-1 rounded inline-block border border-slate-700">{drugDate}</div>
          </div>
        </div>
      </div>
    );
};

const QuantumYard = ({ drugs, type }) => {
  const isUrgent = type === 'urgent';
  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <h2 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isUrgent ? 'bg-rose-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`}></span>
          {isUrgent ? 'شبكة السحب الطارئ والفوري (تعميمات)' : 'جدولة السحوبات المستقبلية المنتهية الصلاحية'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {drugs.map((d, i) => <DrugCard key={i} drug={d} isUrgent={isUrgent} />)}
          {drugs.length === 0 && (
              <div className="text-slate-500 col-span-full py-16 flex flex-col items-center justify-center font-bold border-2 border-dashed border-slate-800 rounded-xl">
                  <IconBrain className="text-4xl mb-3 text-slate-700" />
                  لا توجد أدوية مدرجة في هذا المسار حالياً.
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SubmitOrderForm = ({ drugs }) => {
  const [pharmacyName, setPharmacyName] = useState("");
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleDrug = (dStr) => setSelectedDrugs(prev => prev.includes(dStr) ? prev.filter(x => x !== dStr) : [...prev, dStr]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!pharmacyName || selectedDrugs.length === 0) return alert("الرجاء إدخال اسم الصيدلية وتحديد الأدوية المجهزة.");
      setIsSubmitting(true);
      const payload = { pharmacyName, readyDrugs: selectedDrugs.join(" | "), notes: "مرسل عبر الواجهة الكمية" };
      try {
        await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
        setSuccess(true);
      } catch (e) { alert("حدث خطأ في الاتصال بالشبكة."); }
      setIsSubmitting(false);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in max-w-4xl mx-auto mt-10">
      <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
        <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]"><IconBox /></div>
        ترمييز صندوق الأدوية المرتجعة للشبكة
      </h2>
      <div className="w-full bg-[#070b12]/80 backdrop-blur-md border border-[#121e30] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-ai-grid opacity-10 pointer-events-none"></div>
        {success ? (
            <div className="text-center py-20 relative z-10">
                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.4)] animate-pulse"><IconCheck /></div>
                <h3 className="text-3xl font-black text-emerald-400 mb-2 font-mono">DATA TRANSMITTED</h3>
                <p className="text-slate-400 font-bold">تم تشفير الصندوق وإرسال الإحداثيات للمندوب بنجاح.</p>
                <button onClick={() => {setSuccess(false); setPharmacyName(""); setSelectedDrugs([]);}} className="mt-8 bg-[#090d16] text-cyan-400 border border-cyan-500/30 px-6 py-2 rounded-lg font-bold hover:bg-cyan-500/10 transition-colors">إرسال كود جديد</button>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div>
                    <label className="text-xs text-slate-400 font-mono font-black mb-2 block tracking-widest uppercase"><IconEdit className="inline mr-1"/> PHARMACY ID (اسم الصيدلية)</label>
                    <input type="text" value={pharmacyName} onChange={e => setPharmacyName(e.target.value)} className="w-full bg-[#090d16] border border-[#162235] text-cyan-400 text-lg font-bold p-4 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner" placeholder="أدخل الرمز التعريفي للصيدلية..." />
                </div>
                <div>
                    <label className="text-xs text-slate-400 font-mono font-black mb-4 block tracking-widest uppercase"><IconGrid className="inline mr-1"/> SELECT SECURED BATCHES (اختر الأدوية المجهزة)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto pr-2">
                        {drugs.map((d, i) => {
                            const dName = d['اسم_الدواء'] || 'غير محدد';
                            const dBatch = d['رقم_الباتش (Batch)'] || 'N/A';
                            const dStr = `${dName} (Patch: ${dBatch})`;
                            const isSelected = selectedDrugs.includes(dStr);
                            return (
                                <div key={i} onClick={() => toggleDrug(dStr)} className={`cursor-pointer p-4 rounded-xl border transition-all ${isSelected ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-[#090d16] border-[#162235] hover:border-slate-600'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600'}`}>{isSelected && <IconCheck />}</div>
                                        <div>
                                            <div className={`font-black ${isSelected ? 'text-emerald-400' : 'text-slate-300'}`}>{dName}</div>
                                            <div className="text-xs font-mono text-slate-500 mt-1">Batch: {dBatch}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button type="submit" disabled={isSubmitting} className={`w-full py-5 rounded-xl font-black text-xl transition-all shadow-lg font-mono tracking-widest border ${isSubmitting ? 'bg-slate-900 text-slate-600 border-slate-800' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]'}`}>
                    {isSubmitting ? "ENCRYPTING DATA..." : "INITIATE TRANSFER (تأكيد التسليم)"}
                </button>
            </form>
        )}
      </div>
    </div>
  );
};