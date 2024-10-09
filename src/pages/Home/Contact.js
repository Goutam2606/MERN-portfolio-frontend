import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

function Contact() {
    const { portfolioData } = useSelector((state) => state.root);
    const { contact } = portfolioData;

    return (
        <div>
            <SectionTitle title='Say Hello' />
            <div className="flex sm:flex-col items-center  justify-between">
                <div className="flex flex-col gap-1">
                    <p className='text-tertiary '>{'{'}</p>
                    {
                        Object.keys(contact).map((key) => (
                            key !== "_id" && (<p className='ml-5'>
                                <span className='text-tertiary'>
                                    {key} :
                                </span>
                                <span className='text-tertiary'> {contact[key]}</span>
                            </p>)
                        ))
                    }
                    <p className='text-tertiary'>{'}'}</p>
                </div>
                <div className='h-[500px]'>
                    <img src='https://res.cloudinary.com/dwpb6cu9x/image/upload/v1727775334/contact_b6o0bs.png' width={"400px"} />
                </div>
            </div>
        </div>
    );
}

export default Contact;
