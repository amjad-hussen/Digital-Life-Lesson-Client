import React from 'react';

const LifeMetters = () => {

    const benefits = [
        {
            title: "Gain Real Insights",
            description: "Life lessons give you practical understanding that books alone cannot provide."
        },
        {
            title: "Boost Personal Growth",
            description: "Every challenge you face teaches resilience, patience, and emotional intelligence."
        },
        {
            title: "Make Better Decisions",
            description: "Learning from past experiences helps you avoid mistakes and make wiser choices."
        },
        {
            title: "Improve Relationships",
            description: "Life lessons teach empathy, understanding, and how to build meaningful connections."
        }
    ];

    return (
        <div className='px-10 '>
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">
                        Why Learning From Life Matters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform"
                            >
                                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LifeMetters;