import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import 'keen-slider/keen-slider.min.css';

export default function Slider({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true);
            },
        },
        [
            (slider) => {
                let timeout;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 10000);
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('updated', nextTimeout);
            },
        ]
    );

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {images.map((image) => {
                        if (image.published) {
                            return (
                                <div key={image.id.toString()} className="keen-slider__slide">
                                    <Image
                                        src={image.imageurl}
                                        //width={992}
                                        //height={1323}
                                        fill={true}
                                        style={{ objectFit: 'contain' }}
                                        priority={false}
                                        alt={image.imageid}
                                        sizes="(max-width: 992px) 97vw, (min-width: 992px) 992px"
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(992, 1323))}`}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow left onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />

                        <Arrow onClick={(e) => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx);
                                }}
                                className={'dot' + (currentSlide === idx ? ' active' : '')}
                            ></button>
                        );
                    })}
                </div>
            )}
        </>
    );
}

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => (typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str));

function Arrow(props) {
    const disabeld = props.disabled ? ' arrow--disabled' : '';
    return (
        <svg onClick={props.onClick} className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
            {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
    );
}
