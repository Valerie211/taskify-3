import React from 'react';
import Latest from '../Cards/Latest';

const LatestProject = () => {
  return (
    <div className='w-1/3 bg-white h-auto overflow-y-scroll'>
        <div className='flex justify-between text-sm mb-4 p-4'>
            <h2>Latest Project</h2>
            <button>view all</button>
        </div>
        <Latest/>
        <Latest/>
        <Latest/>
    </div>
  );
}

export default LatestProject;
