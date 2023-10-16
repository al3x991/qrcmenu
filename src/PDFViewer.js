import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import firebase from "firebase/app";
import "firebase/storage";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyB0SlXwzuD4e6U1i8sQESX2PVCClesA1vU",
        authDomain: "lagospoloclub-6f778.firebaseapp.com",
        projectId: "lagospoloclub-6f778",
        storageBucket: "lagospoloclub-6f778.appspot.com",
        messagingSenderId: "337139075063",
        appId: "1:337139075063:web:860a247eb38746641450f2"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const storage = firebase.storage();
    const storageRef = storage.ref("menu.pdf");

    // Get the download URL for 'menu.pdf' from Firebase Storage
    storageRef
      .getDownloadURL()
      .then((url) => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}`
              );
            }
            return response.blob();
          })
          .then((blob) => {
            const reader = new FileReader();
            reader.onload = function () {
              pdfjs
                .getDocument(new Uint8Array(reader.result))
                .promise.then((pdf) => {
                  setNumPages(pdf.numPages);
                });
            };
            reader.readAsArrayBuffer(blob);
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

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
    <div className="p-2">
      <div
        className="w-full mx-auto max-w-xl p-4 border rounded-lg shadow-lg"
        style={{ height: "800px" }}
      >
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Previous Page
              </button>
              <span>
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="ml-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Next Page
              </button>
            </div>
            <div
              className="p-2 px-2 flex justify-center w-full mx-auto"
              style={{ height: "610px", overflow: "hidden" }}
            >
              <Document file={pdfUrl}>
                <Page scale={0.75} pageNumber={currentPage} />
              </Document>
            </div>
            <div className="my-4 text-center">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="mr-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Previous Page
              </button>
              <span>
                Page {currentPage} of {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === numPages}
                className="ml-2 px-3 py-2 bg-indigo-900 text-white rounded"
              >
                Next Page
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PDFViewer;
