import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import { useSelector } from 'react-redux';

const Expriences = () => {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const { portfolioData } = useSelector((state) => state.root);
    const { exprience } = portfolioData;
    console.log(exprience);

    if (!exprience) {
        return <div>loading...</div>;
    }
    return (
        <div>
            <SectionTitle title="Exprience" />
            <div className='flex py-10 gap-20 sm:flex-col'>
                <div className='flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full'>
                    {exprience.map((expriences, index) => (
                        <div onClick={() => {
                            setSelectedItemIndex(index);
                        }} className="cursor-pointer">
                            <h1 className={`text-xl px-5 ${selectedItemIndex === index ? "text-tertiary border-tertiary border-l-4 ml-[3px] bg-[#1a7f5a31] py-3 sm:w-40" : "text-quaternary"}`}>{expriences.period}</h1>
                        </div>
                    ))}
                </div>
                <div className='flex flex-col gap-5 w-2/3'>
                    <h1 className='text-secondary text-xl'>{exprience[selectedItemIndex].title}</h1>
                    <h1 className='text-tertiary text-xl'>{exprience[selectedItemIndex].company}</h1>
                    <p className='text-quaternary'>{exprience[selectedItemIndex].description}</p>
                </div>
            </div>
        </div>
    );
};

export default Expriences;