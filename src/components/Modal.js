import React from 'react'
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';


export const Modal = ({setModal, menu}) => {


  return (
    <div className='backshadow'>

        <div className='custom-modal'>

            <div className='delete-icon'
            onClick={()=>setModal(false)}>
              x
            </div>

            {menu !== null&&(
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer fileUrl={menu} />
              </Worker>
            )}


        </div>

    </div>
  )
}
