import { Road, Water, Building } from '../illustrations';

const IllustrationSection = () => {
  return <div className='relative w-full h-96 bg-white'>
    <Water className='absolute top-0 left-0 w-full h-48 object-cover' />
    <Building className='absolute top-12 left-1/2 transform -translate-x-1/2 w-64 h-64 object-cover' />
    <Road className='absolute bottom-0 left-0 w-full h-48 object-cover' />
  </div>;
};

export default IllustrationSection;
