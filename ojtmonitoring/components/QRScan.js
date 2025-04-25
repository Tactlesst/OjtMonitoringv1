import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export default function QRScan() {
  const qrRegionId = 'qr-reader';
  const scannerRef = useRef(null);
  const startedRef = useRef(false);
  const [scanning, setScanning] = useState(true);
  const [logs, setLogs] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState(''); // ⏰ Morning / Afternoon

  const showAlert = (title, text, icon = 'info') =>
    Swal.fire({ title, text, icon, confirmButtonText: 'OK' });

  const getTimePeriod = () => {
    const hour = dayjs().hour();
    return hour < 12 ? 'Morning' : 'Afternoon';
  };

  const addLog = (text, success = true, status = '') => {
    setLogs((prev) => [
      {
        time: new Date().toLocaleString(),
        text,
        success,
        status,
      },
      ...prev,
    ]);
  };

  const playScanSound = () => {
    const audio = new Audio('/sounds/GoodScanner.mp3');
    audio.play().catch((err) => {
      console.warn('Sound playback failed:', err);
    });
  };

  const startScanner = async () => {
    setTimePeriod(getTimePeriod());

    try {
      const devices = await Html5Qrcode.getCameras();
      if (!devices?.length) {
        showAlert('No Camera', 'No camera devices found.', 'error');
        return;
      }

      const scanner = new Html5Qrcode(qrRegionId);
      scannerRef.current = scanner;

      await scanner.start(
        devices[0].id,
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          playScanSound();
          addLog(`Scanned: ${decodedText}`, true);

          try {
            // Parse the QR data (assuming the QR contains userId)
            const qrData = JSON.parse(decodedText);

            // Check if the QR data contains a valid userId
            if (!qrData.userId || isNaN(qrData.userId)) {
              addLog('Invalid QR data: No valid userId found', false);
              await showAlert('Invalid QR', 'No valid userId found in the QR.', 'error');
              return;
            }

            // Determine check-in time (Morning or Afternoon)
            const currentTime = dayjs();
            const checkInTime = currentTime.format('HH:mm');
            let status = 'present';
            let checkInField = 'checkin_morning';
            let statusField = 'status_morning';

            // Morning Check-In logic
            if (getTimePeriod() === 'Morning') {
              if (currentTime.isAfter(dayjs().hour(8).minute(0))) {
                status = 'late';
              }
              checkInField = 'checkin_morning';
              statusField = 'status_morning';
            }
            // Afternoon Check-In logic
            else if (getTimePeriod() === 'Afternoon') {
              if (currentTime.isAfter(dayjs().hour(13).minute(0))) {
                status = 'late';
              }
              checkInField = 'checkin_afternoon';
              statusField = 'status_afternoon';
            }

            // Send the data to update the attendance in the database
            const res = await fetch('/api/attendance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                user_id: qrData.userId,  // Send the userId from the QR code
                [checkInField]: checkInTime,
                [statusField]: status,
                date: currentTime.format('YYYY-MM-DD'),
              }),
            });

            const data = await res.json();

            if (res.status === 200) {
              addLog(`✅ ${data.message}`, true, data.message.includes('late') ? 'late' : 'present');
              await showAlert('Success', data.message, 'success');
            } else if (res.status === 409) {
              addLog(`⚠️ ${data.message}`, false, 'duplicate');
              await showAlert('Already Checked In', data.message, 'warning');
            } else {
              addLog(`❌ ${data.message}`, false, 'error');
              await showAlert('Error', data.message, 'error');
            }
          } catch (err) {
            console.error('Error processing QR data:', err);
            addLog('Invalid QR data', false);
            await showAlert('Invalid QR', 'Failed to process the QR data.', 'error');
          } finally {
            await scanner.stop();
            await scanner.clear();
            setScanning(false);
          }
        },
        (errorMsg) => {
          console.warn('QR scan error:', errorMsg);
        }
      );
    } catch (err) {
      console.error('Init error:', err);
      showAlert('Scanner Error', 'Failed to start scanner.', 'error');
    }
  };

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => scannerRef.current.clear()).catch(() => {});
      }
    };
  }, []);

  return (
    <div className="text-center">
      <p className="text-gray-700 mb-2 text-lg font-semibold">QR Attendance Scanner</p>
      <p className="text-blue-500 font-medium">{timePeriod} Check-In</p>

      <div
        id={qrRegionId}
        className="w-full h-64 mx-auto rounded border border-blue-500 mt-2"
      />

      <div className="mt-4 flex justify-center gap-4">
        {!scanning && (
          <button
            onClick={() => {
              setScanning(true);
              startScanner();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Scan
          </button>
        )}

        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          View Scan Logs
        </button>
      </div>

      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Scan Logs</h2>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <ul className="max-h-64 overflow-y-auto border border-gray-300 rounded p-3 text-left text-sm">
              {logs.length === 0 ? (
                <li className="text-gray-500">No scans yet.</li>
              ) : (
                logs.map((log, idx) => (
                  <li
                    key={idx}
                    className={`mb-1 ${log.status === 'late' ? 'text-yellow-600' : log.success ? 'text-green-700' : 'text-red-600'}`}
                  >
                    [{log.time}] {log.text}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
