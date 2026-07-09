import React from 'react'
import Header from '@/components/Header'
import Image from 'next/image'
export default function page() {
    return (
        <>
            <Header />

            <div className="mx-auto relative    overflow-hidden rounded-sm  ">
                <Image
                    src="/blogtest.jpg"
                    alt="Community discussion"
                    width={700}
                    height={450}
                    className="h-[340] w-full object-cover sm:h-[460] md:h-[450] lg:h-svh"
                />
                <div className=' absolute bottom-10 left-10 md:bottom-50 md:left-50'>
                    <h1 className=' Title1 text-white '>Health & Longevity</h1>
                    <p className=' Note2 text-white '>18.03.2026 . California</p>
                </div>
            </div>

            <div className=' container mx-auto max-w-7xl py-12 md:py-24 gap-4 flex flex-col px-4'>
                <p className='Title4'>
                    A strong thread throughout the evening was around authenticity, purpose, and looking inward. Questions emerged about how we know when we are being authentic, how we discover what is truly ours, and how we shed the labels and roles we may have taken on over time.
                </p>
                <p className=' body2'>Authenticity was described as something that is rarely immediate or perfect — often messy and evolving. The deeper question was not whether we wear masks, but whether we know when we are wearing them, and whether we have spaces in our lives where we can safely take them off. Many felt that an authentic life, along with a sense of purpose, is foundational to health and longevity. The happiest and healthiest older individuals tend to live on their own terms, with joy in daily life and resilience in the face of change.
                </p>
                <p className=' body2'>Community and relationships came up just as strongly. Deep friendships over long periods, a strong sense of belonging, and the environment we create with family and close circles were all described as central to living well. There was also a reflection that wisdom about how to live well can come from any age — from grandparents, from peers, and sometimes even
                    from a six-year-old.
                </p>
                <p className=' body2'>Another theme centered on personal responsibility for health and well-being. Taking care of oneself was seen not as selfish but as necessary — like putting on your own oxygen mask before helping others. This felt especially true for those who tend to prioritize family and loved ones over their own health, something many observed happens often, particularly with women across cultures. Listening to the body, staying open to different ways of healing, and being willing to experiment were all part of this conversation.
                </p>
                <p className=' Note2 text-[#B54323] max-w-4xl mx-auto  uppercase'>One idea that stayed with people was that not all stress is bad. Some things break under pressure, some survive it, and some actually get stronger because of it. The body seems to work the same way — the right kinds of stress, like exercise, fasting, or pushing ourselves a little, can make us stronger over time instead of weaker.
                </p>
                <p className=' body2'>There was also discussion about the value of bringing together different approaches to health — combining holistic Eastern perspectives with the strengths of Western medicine — and the possibility that better systems, including the use of AI, could make good care universally accessible.
                </p>
                <p className=' Note2 uppercase text-[#B54323] max-w-4xl mx-auto'>Growth, reinvention, and orientation toward life appeared in many forms. One idea that resonated was the importance of continuing to evolve, experiment, and stay open through every stage of life — captured in the line, “Always be happy, but never be satisfied.”
                </p>
                <p className=' body2'>At the same time, contentment was seen as essential, with the belief that it can be a foundation for happiness. Rather than a contradiction, the two together reflected the balance between acceptance and growth. There was also the thought that longevity should not only be considered later in life, but designed early — even for children — so that the habits and environments we create today shape the outcomes we live with later.</p>
                <p className=' body2'>Presence was another recurring insight. Approaching each day as “unwritten” was seen as a way to increase engagement, action, and a sense of wonder. Living in the present — truly inhabiting the moment instead of rushing past it — felt closely connected to feeling alive, with the journey itself becoming the reward. Go for a walk with a deliberate sense of “ahhh” — to fill yourself with appreciation for the ordinary things around you. A traffic light isn’t just a traffic light, but a quiet marvel of engineering and coordination that keeps thousands of people safe every day. The practice is to slow down enough to notice, and to let the nervous system remember how to feel wonder in things we usually move past without
                    seeing.
                </p>
                <p className='Note2 text-[#B54232]  max-w-4xl mx-auto  uppercase' >There were also lighter but thought-provoking observations along the way — including the comment that politicians seem to live the longest, perhaps because their lives are filled with movement, social engagement, and a strong sense of purpose through serving others.
                </p>
                <p className=' body2'>In the end, the conversation kept returning to a few simple anchors — authenticity, purpose, community, care for the body, and the willingness to stay present. And perhaps the most powerful realization was this:

                </p>
                <p className='Note2 text-[#B54232]  max-w-4xl mx-auto  uppercase' > The question is not only how long we live, but what kind of life we are building for the person we are becoming.               </p>


                <p className='Note3'>Collective Insights by Table One</p>
            </div>

        </>
    )
}
