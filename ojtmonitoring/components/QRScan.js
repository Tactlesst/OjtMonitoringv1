import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

export default function QRScan() {
  const qrRegionId = 'qr-reader';
  const scannerRef = useRef(null);
  const startedRef = useRef(false);
  const isProcessing = useRef(false); // 🔥 prevent double scan
  const [scanning, setScanning] = useState(true);
  const [logs, setLogs] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [timePeriod, setTimePeriod] = useState('');
  const [loading, setLoading] = useState(false);

  const showAlert = (title, text, icon = 'info') =>
    Swal.fire({ title, text, icon, confirmButtonText: 'OK' });

  const getTimePeriod = () => {
    const hour = dayjs().hour();
    return hour < 12 ? 'Morning' : 'Afternoon';
  };

  const addLog = (text, success = true, status = '', firstName = '', lastName = '', userId = '',student_id='') => {
    const newLog = {
      time: new Date().toLocaleString(),
      text,
      success,
      status,
      firstName,
      lastName,
      userId,
      student_id,
    };

    // Save log to local storage
    const storedLogs = JSON.parse(localStorage.getItem('qrLogs')) || [];
    storedLogs.unshift(newLog); // Add new log to the top
    localStorage.setItem('qrLogs', JSON.stringify(storedLogs));

    // Update state to show the logs in the component
    setLogs(storedLogs);
  };
  const getScanType = () => {
    const hour = dayjs().hour();
    if (hour < 11) {
      return 'Morning Check-In';
    } else if (hour < 13) { // between 11:00 AM and 1:00 PM (lunch break)
      return 'Morning Check-Out';
    } else if (hour < 16) {
      return 'Afternoon Check-In';
    } else {
      return 'Afternoon Check-Out';
    }
  };
  
  const playScanSound = () => {
    const audio = new Audio('/sounds/scan.mp3');
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
        { facingMode: "environment" }, // 🔥 Use back camera on phone
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          if (isProcessing.current) return; // 🔥 prevent double scan
          isProcessing.current = true;
          playScanSound();
          addLog(`Scanned: ${decodedText}`, true);
  
          try {
            const qrData = JSON.parse(decodedText);
  
            if (!qrData.userId || isNaN(qrData.userId)) {
              addLog('Invalid QR data: No valid userId found', false);
              await showAlert('Invalid QR', 'No valid userId found in the QR.', 'error');
              return;
            }
  
            const { userId, firstName,firstName2, lastName,student_id } = qrData; // Extract firstName, lastName, and userId
            const currentTime = dayjs();
            const checkInTime = currentTime.format('HH:mm');
            let status = 'present';
            let checkInField = 'checkin_morning';
            let statusField = 'status_morning';
  
            if (getTimePeriod() === 'Morning') {
              if (currentTime.isAfter(dayjs().hour(8).minute(0))) {
                status = 'late';
              }
            } else {
              checkInField = 'checkin_afternoon';
              statusField = 'status_afternoon';
              if (currentTime.isAfter(dayjs().hour(13).minute(0))) {
                status = 'late';
              }
            }
  
            // Check if it's a check-in or check-out
            const isCheckout = currentTime.isAfter(dayjs().hour(11).minute(0)); // Example: Check-out after 11 AM
            if (isCheckout) {
              checkInField = getTimePeriod() === 'Morning' ? 'checkout_morning' : 'checkout_afternoon';
              statusField = getTimePeriod() === 'Morning' ? 'status_morning' : 'status_afternoon';
              status = 'present'; // or 'late' depending on the time
            }

            // Fetch the current attendance record for today
            const res = await fetch('/api/attendance', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId, // Pass userId as student_id
                firstName,
                firstName2,
                lastName,
                student_id,
                [checkInField]: checkInTime,
                [statusField]: status,
                date: currentTime.format('YYYY-MM-DD'),
              }),
            });
  
            const data = await res.json();
  
// Inside the try block after a successful attendance record creation
if (res.status === 200) {
  const fullName = `${firstName} ${firstName2} ${lastName} ${student_id}`;
  addLog(`✅ ${data.message}`, true, data.message.includes('late') ? 'late' : 'present', firstName,firstName2, lastName, student_id);
  await showAlert('Success', `${data.message} - ${fullName}`, 'success');
}
 else if (res.status === 409) {
              addLog(`⚠️ ${data.message}`, false, 'duplicate', firstName,firstName2, lastName, student_id);
              await showAlert('Already Checked In', data.message, 'warning');
            } else if (res.status === 500) {
              addLog(`❌ No attendance record found`, false, 'absent', firstName,firstName2, lastName, student_id);
              await showAlert('Attendance Not Found', 'No check-in or check-out recorded for today.', 'warning');
            } else {
              addLog(`❌ ${data.message}`, false, 'error', firstName,firstName2, lastName, student_id);
              await showAlert('Error', data.message, 'error');
            }
          } catch (err) {
            console.error('Error processing QR data:', err);
            addLog('Invalid QR data', false);
            await showAlert('Invalid QR', 'Failed to process the QR data.', 'error');
          } finally {
            try {
              if (scannerRef.current) {
                await scannerRef.current.stop();
                await scannerRef.current.clear();
              }
            } catch (err) {
              console.warn('Scanner already cleared.', err);
            } finally {
              setScanning(false);
              isProcessing.current = false;
              setLoading(false);
              setTimeout(() => {
                setScanning(true);
                startScanner();
              }, 3000); // Retry after 3 seconds
            }
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

  // Load logs from localStorage on page load
  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem('qrLogs')) || [];
    setLogs(storedLogs);

    if (startedRef.current) return;
    startedRef.current = true;
    startScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
        }).catch((err) => {
          console.warn('Error during cleanup:', err);
        });
      }
    };
  }, []);

  useEffect(() => {
    const createAttendanceRecords = async () => {
      try {
        const res = await fetch('/api/attendance/create', {
          method: 'POST',
        });
  
        const data = await res.json();
        console.log(data.message); // Success message
      } catch (err) {
        console.error('Error creating attendance records:', err);
      }
    };
  
    createAttendanceRecords(); // Call the function to create missing records
  }, []);

  return (
    <div className="text-center px-4">
      <p className="text-gray-700 mb-2 text-lg font-semibold">QR Attendance Scanner</p>
      <p className="text-blue-500 font-medium">{getScanType()}</p>


      <div
        id={qrRegionId}
        className="w-full max-w-md mx-auto h-64 rounded border border-blue-500 mt-4 overflow-hidden relative"
      />

      <div className="mt-6 flex justify-center gap-4">
        {!scanning && (
          <button
            onClick={() => {
              setScanning(true);
              startScanner();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry Scan
          </button>
        )}
        <button
          onClick={() => setShowLogModal(true)}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
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
                logs.map((log, index) => (
                  <li key={index} className={`mb-2 ${log.success ? 'text-green-500' : 'text-red-500'}`}>
                    <span className="font-semibold">{log.time}</span>: {log.text} 
                    <span className="ml-2 text-sm text-gray-600">
                      ({log.firstName} {log.lastName}, ID: {log.userId})
                    </span>
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
