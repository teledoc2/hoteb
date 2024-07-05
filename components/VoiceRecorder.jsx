"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ReactMediaRecorder = dynamic(
  () => import('react-media-recorder').then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

const VoiceRecorder = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);

  useEffect(() => {
    setIsBrowser(typeof window !== 'undefined');
  }, []);

  const fetchPatientId = async (name) => {
    try {
      const response = await axios.get(`/api/patient?name=${name}&companyId=${companyId}`);
      setPatientId(response.data.id);
    } catch (error) {
      console.error('Error fetching patient ID:', error);
    }
  };

  const saveRecording = async () => {
    if (mediaBlobUrl && patientId) {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      const date = new Date();
      const fileName = `${uuidv4()}_${date.toISOString()}.wav`;
      const file = new File([blob], fileName, { type: 'audio/wav' });
      const data = new FormData();
      data.append('file', file);
      data.append('patientId', patientId);
      data.append('companyId', companyId);

      await fetch('/api/voice', {
        method: 'POST',
        body: data,
      });
    }
  };

  if (!isBrowser) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter patient's name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter company ID"
        value={companyId}
        onChange={(e) => setCompanyId(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={() => fetchPatientId(patientName)}
      >
        Fetch Patient ID
      </button>
      <ReactMediaRecorder
        audio
        onStop={(blobUrl) => {
          setMediaBlobUrl(blobUrl);
          saveRecording();
        }}
        render={({ startRecording, stopRecording, pauseRecording }) => (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                startRecording();
              }}
              disabled={!patientId}
            >
              Start
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={pauseRecording}
            >
              Pause
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={stopRecording}
            >
              Stop
            </button>
            <audio src={mediaBlobUrl} controls className="mt-4" />
          </>
        )}
      />
    </div>
  );
};

export default VoiceRecorder;
