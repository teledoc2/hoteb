// app/(dashboard)/upload/page.js

import UploadPatients from '@/components/UploadPatients';

const UploadPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Patients</h1>
      <h2 className="text-xl font-bold mb-4">اكتب اسم المريض ثم اسم الأب ثم اسم العائلة فقط ولا شيء آخر</h2>
      <UploadPatients />
    </div>
  );
};

export default UploadPage;
