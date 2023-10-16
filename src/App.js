import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "./config/firebase";
import Image from "./logo.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
// import { Worker } from '@react-pdf-viewer/core';
// // Import the main component
// import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// Set the worker source explicitly
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PDFViewer() {
  const [menuUrl, setMenuUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const menuRef = ref(storage, "menu.pdf");
    getDownloadURL(menuRef)
      .then((url) => {
        setMenuUrl(url);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
      <div className="logo">
      <LazyLoadImage src={Image}
        width={100} height={100}
        alt="Image Alt"
      />
     </div>
        {error ? (
          <div className="custom-error">{error}</div>
        ) : (
          <>
            <div className="text-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="custom-button"
              >
                Previous Page
              </button>
              <span>
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="custom-button"
              >
                Next Page
              </button>
            </div>
            <div className="custom-border">
            <div
              className="custom-document"
            >
               <Document file={menuUrl} onLoadSuccess={onDocumentLoadSuccess}>
              <Page scale={0.70} pageNumber={currentPage} />
            </Document>
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={menuUrl} scale={0.75} pageNumber={currentPage} onLoadSuccess={onDocumentLoadSuccess}/>
              </Worker> */}
            </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
