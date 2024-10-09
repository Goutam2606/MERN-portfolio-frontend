import React from 'react';

function LeftSlider() {
    return (
        <div className='fixed left-0 bottom-0 px-10 sm:static'>
            <div className='flex flex-col items-center'>
                <div className="flex flex-col gap-3 sm:flex-row">
                    <a href="https://instagram.com/officialgoutamyadav/">
                        <i class="ri-instagram-line text-gray-600 text-xl "></i>
                    </a>
                    <a href="https://www.linkedin.com/in/goutam2606">
                        <i class="ri-linkedin-line text-gray-600 text-xl "></i>
                    </a>

                    <a href="mailto:goutam9301@gmail.com">
                        <i class="ri-mail-line text-gray-600 text-xl "></i>

                    </a>

                    <a href="https://medium.com/@goutam2606">
                        <i class="ri-medium-line text-gray-600 text-xl "></i>
                    </a>

                    <a href="https://github.com/Goutam2606">
                        <i class="ri-github-line text-gray-600  text-xl"></i>
                    </a>


                </div>
                <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
            </div>
        </div>
    );
}

export default LeftSlider;;

