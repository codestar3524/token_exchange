import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-scanner';

// Create a wrapper to avoid defaultProps warning
const QrScannerWrapper = (props) => {
  return <QrReader {...props} />;
};

const QRCodeScanner = ({ onScan = () => {}, onClose = () => {} }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [facingMode, setFacingMode] = useState('environment');
  const [cameraPermission, setCameraPermission] = useState(null);

  // Check for camera permissions
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setCameraPermission(true);
        })
        .catch(error => {
          console.error('Camera permission error:', error);
          setCameraPermission(false);
          setErrorMessage('Camera access denied. Please enable camera access to scan QR codes.');
        });
    }
    
    return () => {
      // Clean up camera resources when component unmounts
      if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            stream.getTracks().forEach(track => track.stop());
          })
          .catch(() => {});
      }
    };
  }, []);

  const handleScan = data => {
    if (data) {
      onScan(data.text);
    }
  };

  const handleError = err => {
    console.error('QR scan error:', err);
    setErrorMessage('Error scanning QR code. Please try again.');
  };

  const toggleCamera = () => {
    setFacingMode(facingMode === 'environment' ? 'user' : 'environment');
  };

  return (
    <div className="qr-scanner-modal">
      <div className="qr-scanner-container">
        <button
          className="close-scanner"
          onClick={onClose}
        >
          ✕
        </button>
        
        {cameraPermission === false ? (
          <div className="permission-error">
            <p>{errorMessage}</p>
          </div>
        ) : (
          <>
            <div className="scanner-wrapper">
              <QrScannerWrapper
                delay={300}
                constraints={{
                  video: { 
                    facingMode: facingMode 
                  }
                }}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
              <div className="scanner-overlay">
                <div className="scanner-frame"></div>
              </div>
            </div>
            
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}
            
            <div className="scanner-controls">
              <button 
                className="toggle-camera"
                onClick={toggleCamera}
              >
                Switch Camera
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QRCodeScanner;