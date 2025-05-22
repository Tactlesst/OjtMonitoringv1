// pages/qr-scan/[station].js
import { useRouter } from 'next/router';
import QRScan from '@/components/QRScan';
import Link from 'next/link';
import Image from 'next/image';

export default function QRScanByStation() {
  const router = useRouter();
  const { station } = router.query;

  const validStations = ['police', 'bfp', 'bjmp', 'barangay'];

  const formattedStation =
    station && validStations.includes(station.toLowerCase())
      ? station.charAt(0).toUpperCase() + station.slice(1).toLowerCase()
      : null;

  // Define background image paths for each station
  const backgroundImages = {
    police: '/Images/stations/police.jpg',
    bfp: '/Images/stations/bfp.jpg',
    bjmp: '/Images/stations/bjmp.jpg',
    barangay: '/Images/stations/barangay.jpg',
  };

  const bgImage = station && backgroundImages[station.toLowerCase()] ? backgroundImages[station.toLowerCase()] : null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background Image */}
      {bgImage && (
        <div className="fixed inset-0 -z-10">
          <Image
            src={bgImage}
            alt={`${formattedStation} Background`}
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      )}

      {/* Scanner Card */}
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          OJT Monitoring - QR Attendance
        </h1>

        {formattedStation ? (
          <>
            <p className="text-center text-sm text-gray-600 mb-4">
              Station: <span className="font-semibold">{formattedStation}</span>
            </p>
            <QRScan station={formattedStation} />
          </>
        ) : (
          <p className="text-center text-red-500 font-medium">Invalid or missing station.</p>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
