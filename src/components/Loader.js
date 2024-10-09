import React from 'react';

function Loader() {
    return (
        <div className='flex h-screen items-center justify-center fixed inset-0 bg-primary' >
            <div className='flex gap-5 text-4xl font-semibold'>
                <div class="loader"></div>
            </div>        </div>
    );
}

export default Loader;