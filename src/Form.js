import React, { useState } from 'react';
import {QRCode} from 'react-qrcode-logo';
import html2canvas from 'html2canvas';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {storage} from './config/firebase';
import {signOut } from 'firebase/auth';
import { auth } from './config/firebase';

function App() {
  const [state, setState] = useState({
    value: 'https://lagospoloclub-menu.vercel.app/menu',
    ecLevel: 'L',
    enableCORS: false,
    size: 270,
    quietZone: 20,
    bgColor: '#ffffff',
    fgColor: '#000000',
    logoImage: './logo.jpg',
    logoWidth: 45,
    logoHeight: 45,
    logoOpacity: 1,
    qrStyle: 'squares',
    removeQrCodeBehindLogo: false,
    logoPadding: 0,
    logoPaddingStyle: 'square',
    eyeColor: [
      { outer: '#000000', inner: '#000000' },
      { outer: '#000000', inner: '#000000' },
      { outer: '#000000', inner: '#000000' },
    ],
  });
 
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const [fileUpload, setFileUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (fileUpload) {
      const fileRef = ref(storage, 'menu.pdf');
      const uploadTask = uploadBytesResumable(fileRef, fileUpload);

      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(2)); // Round to two decimal placess

        if (progress === 100) {
          setUploadComplete(true);
        }
      });

      uploadTask
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log('File uploaded successfully. Download URL:', downloadURL);
        })
        .catch((error) => {
          console.error('Error during upload:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setState((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleDownload = () => {
    html2canvas(document.querySelector('#qrcode-container')).then(function (canvas) {
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      setState((prevState) => ({ ...prevState, logoImage: e.target.result }));
    };

    reader.readAsDataURL(file);
  };
 
  

  return (
    <>
    <div className='upload-menu'>
      <div className="file-upload">
        <label><p style={{marginBottom: 20}}>Upload Menu:</p></label>
      <div><input type="file" accept=".pdf" onChange={handleFileChange} />
      <button className='download-button' onClick={handleFileUpload}>Update Menu</button>
      </div>
      
      {fileUpload && uploadProgress < 100 && (
        <div>
          <div>File: {fileUpload.name}</div>
          <div>Upload Progress: {uploadProgress}%</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        </div>
      )}
      {uploadComplete && <div>Upload complete. Success message here.</div>}
    </div>
    </div>
    <div className="qrc-editor">
       
      <div className="form">
      <label>QRC Link To:</label>
        <input
          type="text"
          name="value"
          placeholder="QR Code Value"
          value={state.value}
          onChange={handleChange}
          disabled
        />
         <label>Level:</label>
        <select name="ecLevel" value={state.ecLevel} onChange={handleChange}>
          {['L', 'M', 'Q', 'H'].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <div className='qrc-colors'>
        <label>Background Color:</label>
        <input
          type="color"
          name="bgColor"
          value={state.bgColor}
          onChange={handleChange}
        />
        <label>Foreground Color:</label>
        <input
          type="color"
          name="fgColor"
          value={state.fgColor}
          onChange={handleChange}
        />
        </div>
        <label>QRC Style:</label>
        <select name="qrStyle" value={state.qrStyle} onChange={handleChange}>
          {['squares', 'dots'].map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>

        
        <div className='qrc-logo'>
        <label>Add a Logo:</label>
       <input
        type="file"
        accept="image/*"
        name="logoImage"
        onChange={handleImageChange}
      />
      <label>Logo Opacity:</label>
        <input
          type="range"
          name="logoOpacity"
          min={0}
          max={1}
          step={0.1}
          value={state.logoOpacity}
          onChange={handleChange}
        />
         <label>
          Remove QR Code Behind Logo:
          <input
            type="checkbox"
            name="removeQrCodeBehindLogo"
            checked={state.removeQrCodeBehindLogo}
            onChange={handleChange}
          />
        </label>
        <label>Logo Padding Style:</label>
        <select name="logoPaddingStyle" value={state.logoPaddingStyle} onChange={handleChange}>
          {['square', 'circle'].map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
        </div>
        
       
     
      </div>
      <div className='qrcCode'>
      <div className='qrcode' id="qrcode-container">
        <QRCode {...state} />
      </div>
      <button type="button" onClick={handleDownload} className="download-button">
        Download QR Code
      </button>
      </div>
    
    </div>
    </>
  );
}

export default App;
