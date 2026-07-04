import React, { useState, useEffect } from 'react';

const API_URL =
  'https://script.google.com/macros/s/AKfycbxd_dLjUh72_oZreQKIyPpfkCofq8lmkvP1JMj6t656KEV3Y1gGTBmjMWUYsGhUWdPWUQ/exec';

function App() {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات الطلب
  const [pharmacyName, setPharmacyName] = useState('');
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // الساعة الحية
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // تشغيل الساعة
    const timer = setInterval(() => setTime(new Date()), 1000);
    // جلب الأدوية تلقائياً عند فتح الموقع
    fetchDrugs();
    return () => clearInterval(timer);
  }, []);

  const fetchDrugs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
    setLoading(false);
  };

  const handleToggleDrug = (drug) => {
    const drugString = `${drug['اسم_الدواء']} (الباتش: ${drug['رقم_الباتش (Batch)']})`;
    if (selectedDrugs.includes(drugString)) {
      setSelectedDrugs(selectedDrugs.filter((d) => d !== drugString));
    } else {
      setSelectedDrugs([...selectedDrugs, drugString]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pharmacyName) return alert('الرجاء إدخال اسم الصيدلية المعتمد.');
    if (selectedDrugs.length === 0)
      return alert('يجب تحديد دواء واحد على الأقل لتجهيز الصندوق.');

    setIsSubmitting(true);
    const payload = {
      pharmacyName,
      readyDrugs: selectedDrugs.join(' | '),
      notes,
    };

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      setSuccess(true);
    } catch (error) {
      alert('فشل الاتصال بالخادم المركزي، يرجى المحاولة لاحقاً.');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen select-none" dir="rtl">
      {/* الهيدر الزجاجي الفخم */}
      <header className="bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40">
        <div className="px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center bg-slate-950 rounded-xl border border-slate-700 shadow-[0_0_15px_rgba(56,189,248,0.15)] text-sky-400 text-2xl">
              ⚕️
            </div>
            <div>
              <h1 className="font-black text-white text-2xl leading-tight tracking-wide">
                PHARMA CLOUD
              </h1>
              <p className="text-xs font-mono text-sky-400 mt-1 tracking-widest">
                ENTERPRISE WAREHOUSE OS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm" dir="ltr">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl shadow-inner">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
              <span className="font-mono text-slate-300 font-bold tracking-wider">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* القسم الأيمن: لوحة الأدوية (يأخذ ثلثي الشاشة) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
              قائمة السحب الفوري النشطة
            </h2>
            <span className="bg-slate-800 text-slate-300 px-4 py-1 border border-slate-700 rounded-lg text-sm font-bold">
              الإجمالي: {drugs.length} أصناف
            </span>
          </div>

          {loading ? (
            <div className="text-center py-20 text-sky-400 text-lg font-mono tracking-widest animate-pulse font-bold">
              CONNECTING TO SECURE DB... ⚡
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drugs.map((drug, idx) => {
                // تحديد الإضاءة بناءً على خطورة السحب
                const isCritical = drug['سبب_السحب'].includes('وزارة الصحة');
                const cardStyle = isCritical ? 'flash-red' : 'flash-amber';
                const badgeStyle = isCritical
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/30';
                const isSelected = selectedDrugs.includes(
                  `${drug['اسم_الدواء']} (الباتش: ${drug['رقم_الباتش (Batch)']})`
                );

                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleDrug(drug)}
                    className={`bg-[#0b1018] border-2 rounded-3xl p-6 flex flex-col cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'border-sky-500 shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)]'
                        : `border-slate-800 hover:border-slate-600 ${cardStyle}`
                    }`}
                  >
                    {/* علامة الاختيار الزرقاء */}
                    {isSelected && (
                      <div className="absolute top-0 right-0 bg-sky-500 text-white p-2 rounded-bl-2xl font-bold">
                        ✓ محدد
                      </div>
                    )}

                    <div className="flex justify-between items-center mb-5">
                      <span className="font-mono text-sm text-slate-400 font-bold tracking-widest bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                        BATCH #{drug['رقم_الباتش (Batch)']}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-xl border font-black tracking-wide ${badgeStyle}`}
                      >
                        {drug['سبب_السحب']}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3
                        className="font-black text-white text-2xl tracking-wide leading-tight mb-1"
                        dir="ltr"
                      >
                        {drug['اسم_الدواء']}
                      </h3>
                      <div className="text-slate-500 text-sm font-bold tracking-widest">
                        كود المرجع: ID-{drug['ID']}
                      </div>
                    </div>

                    <div className="bg-black/40 border border-slate-800/80 p-3 rounded-2xl flex items-center justify-between mt-auto">
                      <span className="text-[11px] text-slate-500 font-black uppercase tracking-wider">
                        تاريخ الانتهاء
                      </span>
                      <span className="text-sm text-slate-200 font-bold font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-700">
                        {drug['تاريخ_الانتهاء'].substring(0, 10)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* القسم الأيسر: لوحة التحكم والاعتماد */}
        <div className="relative">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 shadow-2xl sticky top-32">
            <h3 className="text-xl font-black text-sky-400 mb-6 border-b border-slate-800 pb-4">
              تأكيد صندوق السحب 📦
            </h3>

            {success ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <span className="text-4xl">✓</span>
                </div>
                <h4 className="text-white font-black text-2xl mb-2">
                  تم اعتماد الصندوق!
                </h4>
                <p className="text-slate-400 text-sm mb-6">
                  تم إرسال الإشعار للمندوب بنجاح للتوجه إليكم.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-slate-800 text-slate-300 px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors"
                >
                  إرسال طلب جديد
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-[12px] text-slate-400 block font-black mb-2 tracking-wider">
                    اسم الصيدلية المعتمد
                  </label>
                  <input
                    type="text"
                    value={pharmacyName}
                    onChange={(e) => setPharmacyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-bold"
                    placeholder="مثال: صيدلية الشفاء الكبرى"
                  />
                </div>

                <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                  <label className="text-[12px] text-slate-400 block font-black mb-2 tracking-wider">
                    الأصناف المحددة للتسليم
                  </label>
                  <div className="text-3xl font-black text-white font-mono">
                    {selectedDrugs.length}
                  </div>
                </div>

                <div>
                  <label className="text-[12px] text-slate-400 block font-black mb-2 tracking-wider">
                    ملاحظات للمندوب (اختياري)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-all font-bold resize-none"
                    placeholder="أضف أي تفاصيل تهم المندوب..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-black text-lg transition-all shadow-lg ${
                    isSubmitting
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-sky-600 hover:bg-sky-500 text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                  }`}
                >
                  {isSubmitting
                    ? 'جاري التشفير والإرسال...'
                    : 'اعتماد الصندوق وطلب المندوب'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
