import { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

const LazyVideo = ({
  src,
  poster,
  className,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = false
}: LazyVideoProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const inView = entry.isIntersecting;

          setIsInView(inView);

          if (!inView) {
            // AutoPause when leaving viewport
            videoRef.current?.pause();
          } else {
            // AutoPlay when returning to viewport
            if (autoPlay) {
              videoRef.current?.play().catch(() => {});
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoPlay]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full bg-gray-200 ${className ?? ""}`}
    >
      {!isLoaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}

      {isInView && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default LazyVideo;
