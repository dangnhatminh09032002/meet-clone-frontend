import React, { useState } from "react";

export function WaittingPage() {
  const [toggleMic, setToggleMic] = useState(true);
  const [toggleCamera, setToggleCamera] = useState(true);

  function onMic() {
    setToggleMic(!toggleMic);
  }

  function onCamera() {
    setToggleCamera(!toggleCamera);
  }
  return (
    <div className='flex flex-col h-full w-full'>
      <div className='flex min-h-[40px] px-[16px] pt-[16px] text-right'>
        <div className='flex flex-1'>
          <div className='flex text-left'>
            <img
              className='h-[40px]'
              src='https://www.gstatic.com/meet/google_meet_primary_horizontal_2020q4_logo_be3f8c43950bd1e313525ada2ce0df44.svg'
              alt=''
            />
          </div>
          <div className='flex flex-1 flex-row-reverse'>
            <img
              className='rounded-[50%] w-[32px] h-[32px]'
              src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
              alt=''
            />
          </div>
        </div>
      </div>

      <div className='flex w-full h-[500px] mt-[10%]'>
        <div className='bg-black h-full w-[60%] mx-16 rounded-[10px] relative'>
          <div className='absolute top-[85%] left-[45%]'>
            <button onClick={() => onMic()}>
              {toggleMic ? (
                <i className='bx bx-microphone text-white text-[28px] mx-2'></i>
              ) : (
                <i className='bx bx-microphone-off text-white text-[28px] mx-2'></i>
              )}
            </button>
            <button onClick={() => onCamera()}>
              {toggleCamera ? (
                <i className='bx bx-video text-white text-[28px] mx-2'></i>
              ) : (
                <i className='bx bx-video-off text-white text-[28px] mx-2'></i>
              )}
            </button>
          </div>
        </div>
        <div className='h-full w-[40%] mt-[4%] pl-12'>
          <div className=''>
            <h3 className='text-[32px] flex-center'>Sẵn sàng tham gia</h3>
            <span className='text-[16px] flex-center'>
              Những người khác ở đây
            </span>
            <div className='flex-center mt-4'>
              <i className='bx bx-user text-[20px]'></i>
              <i className='bx bx-user text-[20px]'></i>
              <i className='bx bx-user text-[20px]'></i>
            </div>
            <div className='flex-center mt-6'>
              <button className='w-36 h-12 bg-[#1a73e8] rounded-[24px] text-white hover:scale-[1.01]'>
                Tham gia ngay
              </button>
            </div>
            <h3 className='text-center mt-2 hidden'>Đang chờ tham gia...</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
