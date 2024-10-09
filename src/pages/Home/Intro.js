import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { intro } = portfolioData;
    const { firstName, lastName, welcomeText, description, caption } = intro;

    const aboutRef = useRef(null);

    const scrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollToAbout);
        return () => {
            window.removeEventListener('scroll', scrollToAbout);
        };
    }, []);

    return (
        <div className='h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10'>
            <h1 className='text-quaternary text-xl'>{welcomeText || ''}</h1>
            <h1 className='text-secondary text-7xl font-semibold sm:text-3xl'>{firstName || ''} {lastName || ''}</h1>
            <h1 className='text-quaternary text-7xl font-semibold sm:text-3xl'>{caption || ''}</h1>
            <p className='text-quaternary w-2/3'>
                {description || ''}
            </p>
            <button className='border-2 border-tertiary text-tertiary px-10 py-3 rounded' onClick={scrollToAbout}>Get Started</button>
        </div>
    );
}

export default Intro;