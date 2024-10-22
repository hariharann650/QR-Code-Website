import React, { useState } from 'react'
import './QRcode.css';
import qr from './assets/QR image.png';
const QRcode = () => {
  const [loading, setLoading] = useState(false);
  const [img,setImg] = useState(qr);
  const [text, setText]= useState("test");
  const [size, setSize] = useState(0);
  const [downloading,setDownloading] = useState(true)

  async function generate(){    
    
    if(isNaN(size) || size<=0){
      alert("please enter the valid size");
      return;
      
    }
    try{
      setLoading(true);
      const Qr = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
      setImg(Qr);
      setDownloading(false);
    }
    catch(error){
      console.error("The error is " + error)
    }
    finally{
      setLoading(false);
    }
  }
function download(){
  fetch(img).then((response) => response.blob())
  .then((blob) =>{
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "QR.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
  .catch((error)=>console.error("error in dowload"+error));
}
  return (
    <>
    <div className='main-div'>
      <div className="headingdiv">

      <h1 className='mainheading'>Create & Customize
      Your Dynamic <span>QR code</span></h1>
      <h3 className='subheading'>Easily generate and Download</h3>
      </div>
    <div className="qr-div">
    {img && <img className='qr' src={img} alt="nothing" />}  </div>
    {loading && <p>Please Wait...</p>}
    <div className="sub-div">
      <label htmlFor="data">QR Code Content</label>
      <input type="text"  onChange={(e)=>setText(e.target.value)} id='data' placeholder='Enter Text or Link eg:" Your Name "'/>
      <br />
      <label htmlFor="image-size"  >Image Size</label>  
      <input type="text" onKeyDown={(e)=>{if(e.key === 'Enter'){  
        generate()
      }}} id='image-size' onChange={(e)=>setSize(Number(e.target.value))} placeholder='Enter Image Size eg:150' />
      <button disabled='' className='QR-button' onClick={()=> generate()} >Generate QR Code</button>
      <button disabled={downloading} className='download-buttton' onClick={()=>{
        download()
      }}>Download QR Code</button>
    </div>
  </div>
  </>
  )
}
export default QRcode;