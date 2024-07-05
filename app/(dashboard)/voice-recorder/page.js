// app/(dashboard)/voice-recorder/page.js
// app/(dashboard)/voice-recorder/page.js

import dynamic from 'next/dynamic';

const VoiceRecorder = dynamic(() => import('@/components/VoiceRecorder'), {
  ssr: false,
});

const VoiceRecorderPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Voice Recorder</h1>
      <VoiceRecorder />
    </div>
  );
};

export default VoiceRecorderPage;



// app/(dashboard)/voice-recorder/page.js

// import dynamic from 'next/dynamic';
// import DashboardLayout from '@/components/DashboardLayout';

// const VoiceRecorder = dynamic(() => import('@/components/VoiceRecorder'), {
//   ssr: false,
// });

// const VoiceRecorderPage = () => {
//   return (
//     <DashboardLayout>
//       <h1 className="text-2xl font-bold mb-4">Voice Recorder</h1>
//       <VoiceRecorder />
//     </DashboardLayout>
//   );
// };

// export default VoiceRecorderPage;
