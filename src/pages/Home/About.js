import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';
import React, { useRef } from 'react';

function About() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { about } = portfolioData;
    const { skills, lottieURL, description1, description2 } = about;
    const aboutRef = useRef(null);
    return (
        <div>
            <SectionTitle title="About" />
            <div className='flex w-full items-center sm:flex-col' ref={aboutRef} >
                <div className='h-[70vh] w-1/2 sm:w-full'>
                    <img src={lottieURL} />
                </div>
                <div className='flex flex-col gap-5 w-1/2 sm:w-full'>
                    <p className='text-quaternary'>
                        {description1 || ''}
                    </p>
                    <p className='text-quaternary'>
                        {description2 || ''}
                    </p>

                </div>
            </div>

            <div className='py-5'>
                <h1 className="text-tertiary text-xl">Here are a few technologies I've working with recently:</h1>
                <div className='flex flex-wrap gap-10 mt-5'>
                    {skills.map((skill, index) => (
                        <div className='border border-tertiary py-3 px-10'>
                            <h1 className='text-tertiary'>{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default About;