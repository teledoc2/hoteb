// components/ReactMediaRecorderWrapper.jsx

"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const ReactMediaRecorder = dynamic(
  () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const ReactMediaRecorderWrapper = ({ onStop, recording, setRecording }) => (
  <ReactMediaRecorder
    audio
    onStop={onStop}
    render={({ startRecording, stopRecording, pauseRecording }) => (
      <>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setRecording(true);
            startRecording();
          }}
          disabled={recording}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={pauseRecording}
          disabled={!recording}
        >
          Pause
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setRecording(false);
            stopRecording();
          }}
          disabled={!recording}
        >
          Stop
        </button>
      </>
    )}
  />
);

export default ReactMediaRecorderWrapper;
