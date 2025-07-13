// src/App.tsx

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, LoaderCircle } from 'lucide-react';

// ١. تعريف أنواع البيانات التي سنستخدمها
interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  high: number;
  low: number;
  icon: 'sun' | 'cloud' | 'rain' | 'snow';
}

// مكون لعرض الأيقونة المناسبة
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
  // ٢. تعريف الحالات (States)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ٣. جلب البيانات باستخدام useEffect
  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; // الحصول على مفتاح API من المتغيرات البيئية
    const city = 'Cairo'; // يمكنك تغيير المدينة هنا
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!apiKey) {
      setError("Weather API key is missing. Please add it to your .env.local file.");
      setLoading(false);
      return;
    }

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('City not found or API error.');
        }
        return res.json();
      })
      .then(data => {
        // ٤. تحويل البيانات من API إلى شكل البيانات الذي نستخدمه
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
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []); // المصفوفة الفارغة تعني أن هذا التأثير سيعمل مرة واحدة فقط

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="w-full max-w-sm rounded-2xl bg-slate-800/50 p-8 shadow-2xl backdrop-blur-lg border border-slate-700">
        
        {/* ٥. عرض المحتوى بناءً على الحالة */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-56">
            <LoaderCircle className="animate-spin text-cyan-400" size={48} />
            <p className="mt-4 text-slate-400">Loading Weather...</p>
          </div>
        )}

        {error && (
          <div className="text-center h-56">
            <h2 className="text-red-500 font-bold">Error</h2>
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
    </main>
  );
}

export default App;