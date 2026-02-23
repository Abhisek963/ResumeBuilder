import React from 'react'
import { BookUserIcon } from 'lucide-react'
import Title from './Title';

const Testimonial = () => {

    const cardsData = [
        {
            image: '/src/assets/img4.jpeg',
            name: 'Bipin Chourasia',
            role: 'CS Student, 3rd Year',
            date: 'Feb 20, 2026',
            review: "Made my first ever resume using this. Got a reply from an internship within a week. Didn't expect it to be this easy honestly."
        },
        {
            image: '/src/assets/img3.jpeg',
            name: 'Kaushal Kishore',
            role: 'Bsc Biotech, 3rd Year',
            date: 'Feb 10, 2026',
            review: 'I had no idea how to format a resume properly. This just handled it for me. Looks way more professional than what I had before.'
        },
        {
            image: '/src/assets/img2.jpeg',
            name: 'Prakhar Piyush',
            role: 'BCA Final Year',
            date: 'Feb 15, 2026',
            review: 'Simple and clean. I was overthinking my resume for months. Built one here in maybe 20 minutes and it actually looks good.'
        },
        {
            image: '/src/assets/img1.jpeg',
            name: 'Abhik Das',
            role: 'Bsc Biotech, 3rd Year',
            date: 'Jan 28, 2026',
            review: 'The templates are really clean. My college friends kept asking me who made my resume so I just shared the link.'
        },
    ];

    // Repeat enough times so marquee never gaps
    const repeated = [...cardsData, ...cardsData, ...cardsData, ...cardsData];

    const CreateCard = ({ card }) => (
        <div className="p-5 rounded-xl mx-3 border border-zinc-200 bg-white shrink-0 flex flex-col gap-3" style={{ width: '280px' }}>
            <p className="text-sm text-zinc-600 leading-relaxed">"{card.review}"</p>
            <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-100">
                <img className="w-8 h-8 rounded-full object-cover" src={card.image} alt={card.name} />
                <div>
                    <p className="text-xs font-semibold text-zinc-800">{card.name}</p>
                    <p className="text-[10px] text-zinc-400">{card.role} · {card.date}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-200 text-slate-900 py-10">
            <div id='testimonial' className="flex flex-col items-center mt-6 mb-10 scroll-mt-12 px-4">
                <div className="flex items-center gap-2 text-sm text-white bg-gradient-to-b from-[#874ff8] to-[#380B60] rounded-full px-6 py-1.5">
                    <BookUserIcon className='size-4' />
                    <span>Testimonials</span>
                </div>
                <Title
                    title='What Our Users Say'
                    description='Hear from professionals who have transformed their careers with our resume builder.'
                />
            </div>

            <div className="w-full overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #e5e7eb, transparent)' }} />

                <div className="marquee-track flex py-4">
                    {repeated.map((card, index) => <CreateCard key={index} card={card} />)}
                </div>

                <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #e5e7eb, transparent)' }} />
            </div>

            <style>{`
                .marquee-track {
                    display: flex;
                    width: max-content;
                    animation: marqueeScroll 25s linear infinite;
                }
                .marquee-track:hover {
                    animation-play-state: paused;
                }
                @keyframes marqueeScroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

export default Testimonial;