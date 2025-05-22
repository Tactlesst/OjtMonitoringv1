// pages/qr-scan.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function QRScanPicker() {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState('');

  const stations = ['Police', 'BFP', 'BJMP', 'Barangay'];

  const handleProceed = () => {
    if (selectedStation) {
      router.push(`/qr-scan/${selectedStation.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Choose Station for QR Scan
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {stations.map((station) => (
            <button
              key={station}
              onClick={() => setSelectedStation(station)}
              className={`px-4 py-2 rounded-lg font-medium text-sm border transition ${
                selectedStation === station
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {station}
            </button>
          ))}
        </div>

        <button
          onClick={handleProceed}
          disabled={!selectedStation}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            selectedStation
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Proceed to Scanner
        </button>
      </div>
    </div>
  );
}
