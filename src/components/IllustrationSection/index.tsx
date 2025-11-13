import { Road, Water, Building } from '../illustrations';

const IllustrationSection = () => {
  return (
    <div className='relative w-full min-h-[150px] overflow-y-visible mb-5 max-h-[300px]'>
      {/* Building: bottom-right, behind the road (lower z) */}
      <div className='absolute bottom-0 right-0 z-20 pointer-events-none flex items-end w-[220px] sm:w-[280px] md:w-[340px] lg:w-[431px]'>
        <Building className='w-full h-auto' />
      </div>

      {/* Road: at the bottom and above the building */}
      <div className='absolute bottom-0 left-0 right-0 w-full h-48 object-cover z-30 flex items-end justify-start'>
        <Road />
      </div>

      {/* Water: sits above the road vertically */}
      <div className='absolute bottom-0 left-0 right-0 w-full h-48 object-cover z-10 pointer-events-none flex items-end justify-start'>
        <Water />
      </div>
    </div>
  );
};

export default IllustrationSection;
