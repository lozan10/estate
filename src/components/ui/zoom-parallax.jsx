'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function ZoomParallax({ images = [] }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[210vh] sm:h-[240vh] md:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.slice(0, 7).map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={`${src}-${index}`}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${
                index === 1 ? '[&>div]:!-top-[24vh] md:[&>div]:!-top-[30vh] [&>div]:!left-[6vw] [&>div]:!h-[24vh] md:[&>div]:!h-[30vh] [&>div]:!w-[42vw] md:[&>div]:!w-[35vw]' : ''
              } ${
                index === 2 ? '[&>div]:!-top-[8vh] md:[&>div]:!-top-[10vh] [&>div]:!-left-[18vw] md:[&>div]:!-left-[25vw] [&>div]:!h-[32vh] md:[&>div]:!h-[45vh] [&>div]:!w-[30vw] md:[&>div]:!w-[20vw]' : ''
              } ${
                index === 3 ? '[&>div]:!left-[18vw] md:[&>div]:!left-[27.5vw] [&>div]:!h-[22vh] md:[&>div]:!h-[25vh] [&>div]:!w-[34vw] md:[&>div]:!w-[25vw]' : ''
              } ${
                index === 4 ? '[&>div]:!top-[24vh] md:[&>div]:!top-[27.5vh] [&>div]:!left-[6vw] [&>div]:!h-[22vh] md:[&>div]:!h-[25vh] [&>div]:!w-[28vw] md:[&>div]:!w-[20vw]' : ''
              } ${
                index === 5 ? '[&>div]:!top-[26vh] md:[&>div]:!top-[27.5vh] [&>div]:!-left-[18vw] md:[&>div]:!-left-[22.5vw] [&>div]:!h-[22vh] md:[&>div]:!h-[25vh] [&>div]:!w-[36vw] md:[&>div]:!w-[30vw]' : ''
              } ${
                index === 6 ? '[&>div]:!top-[20vh] md:[&>div]:!top-[22.5vh] [&>div]:!left-[20vw] md:[&>div]:!left-[25vw] [&>div]:!h-[14vh] md:[&>div]:!h-[15vh] [&>div]:!w-[18vw] md:[&>div]:!w-[15vw]' : ''
              }`}
            >
              <div className="relative h-[18vh] w-[42vw] min-w-[108px] sm:h-[22vh] sm:w-[38vw] sm:min-w-[140px] md:h-[25vh] md:w-[25vw]">
                <img
                  src={src || '/placeholder.svg'}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full rounded-[1.1rem] object-cover shadow-2xl shadow-black/20 sm:rounded-[1.75rem]"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
