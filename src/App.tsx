// src/App.tsx

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import type { FC } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, LoaderCircle, Search } from 'lucide-react';

// واجهة بيانات الطقس
interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  high: number;
  low: number;
  icon: 'sun' | 'cloud' | 'rain' | 'snow';
}

// مكون أيقونة الطقس
const WeatherIcon: FC<{ icon: WeatherData['icon'], size: number }> = ({ icon, size }) => {
  const iconProps = { size, className: "text-yellow-300" };
  switch (icon) {
    case 'sun': return <Sun {...iconProps} />;
    case 'cloud': return <Cloud {...iconProps} className="text-slate-400" />;
    case 'rain': return <CloudRain {...iconProps} className="text-blue-400" />;
    case 'snow': return <CloudSnow {...iconProps} className="text-white" />;
    default: return <Sun {...iconProps} />;
  }
};

// المكون الرئيسي للتطبيق
function App() {
  // 1. تعريف الحالات (States)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState('Cairo'); // المدينة التي سيتم البحث عنها
  const [searchInput, setSearchInput] = useState('Cairo'); // النص الموجود في حقل البحث

  // 2. جلب البيانات باستخدام useEffect، يتم تشغيله الآن عند تغيير `city`
  useEffect(() => {
    // لا تبدأ بالبحث إذا لم يكن هناك مدينة محددة
    if (!city) return;

    setLoading(true);
    setError(null);
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('City not found or API error. Please try another city.');
        }
        return res.json();
      })
      .then(data => {
        const iconMapping = (apiIcon: string): WeatherData['icon'] => {
          if (apiIcon.includes('01')) return 'sun';
          if (apiIcon.includes('02') || apiIcon.includes('03') || apiIcon.includes('04')) return 'cloud';
          if (apiIcon.includes('09') || apiIcon.includes('10')) return 'rain';
          if (apiIcon.includes('13')) return 'snow';
          return 'sun';
        }
        
        setWeatherData({
          city: data.name,
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          icon: iconMapping(data.weather[0].icon),
        });
      })
      .catch(err => {
        setError(err.message);
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city]); // <-- يتم إعادة تشغيل هذا الكود كلما تغيرت قيمة `city`

  // 3. دالة للتعامل مع عملية البحث
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="w-full max-w-sm">

        {/* -- 4. فورم البحث -- */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg transition-colors disabled:opacity-50"
            disabled={!searchInput.trim()}
          >
            <Search size={20} />
          </button>
        </form>

        {/* -- بطاقة عرض الطقس -- */}
        <div className="rounded-2xl bg-slate-800/50 p-8 shadow-2xl backdrop-blur-lg border border-slate-700">
          {loading && (
            <div className="flex flex-col items-center justify-center h-56">
              <LoaderCircle className="animate-spin text-cyan-400" size={48} />
              <p className="mt-4 text-slate-400">Loading Weather...</p>
            </div>
          )}

          {error && (
            <div className="text-center h-56 flex flex-col justify-center">
              <h2 className="text-red-500 font-bold text-xl">Error</h2>
              <p className="text-slate-400 mt-2">{error}</p>
            </div>
          )}
          
          {!loading && !error && weatherData && (
            <div className="flex flex-col items-center text-center">
              <WeatherIcon icon={weatherData.icon} size={80} />
              <h1 className="text-8xl font-extrabold tracking-tighter mt-4">{weatherData.temperature}°</h1>
              <p className="text-2xl font-semibold text-slate-300 capitalize">{weatherData.description}</p>
              <p className="text-lg text-slate-400">{weatherData.city}</p>
              <hr className="my-6 border-slate-700 w-full" />
              <div className="flex justify-around text-center w-full">
                <div>
                  <p className="text-slate-400">High</p>
                  <p className="text-xl font-bold">{weatherData.high}°</p>
                </div>
                <div>
                  <p className="text-slate-400">Low</p>
                  <p className="text-xl font-bold">{weatherData.low}°</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default App;