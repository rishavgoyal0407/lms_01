import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonials = () => {
    return (
        <div>
            <div>
                <h2 className='text-xl font font-semibold text-center p-3'>Testimonials</h2>
                <p className='px-3 text-center text-gray-500'>Hear from our learners as they share their journeys of transformation success, and how our <br />platform has made a difference in their lives.</p>
                <div className="flex flex-wrap items-center justify-center p-3 gap-7 w-full mb-7 mt-3 px-6 text-center">
                    {dummyTestimonial.map((testimonial, index) => (
                        <div
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex items-center justify-center"
                            key={index}
                        >
                            <div className="w-full h-auto gap-3 rounded border border-gray-500/30 shadow-xl p-4 items-center flex flex-col overflow-auto pb-4">
                                <img
                                    className="object-cover w-16 h-16 rounded-full"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div>
                                    <h1 className="font-semibold">{testimonial.name}</h1>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                                <div>
                                    <div className="flex gap-1 items-center justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <img
                                                key={i}
                                                className="w-4 h-4"
                                                src={
                                                    i < Math.floor(testimonial.rating)
                                                        ? assets.star
                                                        : assets.star_blank
                                                }
                                                alt=""
                                            />
                                        ))}
                                    </div>
                                    <div className="pt-2 pb-3 text-sm text-gray-700">
                                        {testimonial.feedback}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Testimonials
