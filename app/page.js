import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>Physician AI Assistant </h1>
          <p className='py-6 text-lg leading-loose'>
Your AI assistant for your REAL TIME health care needs.  Im-Hotep privately and securely attend the patient visit with you, 
listeing, analyzing and researching for you.  Utilizing the latest data and informaton Imhoteb generates a full medical report based on your exam.
          </p>
          <Link href='/chat' className='btn btn-secondary'>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
