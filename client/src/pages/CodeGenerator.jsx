import React from "react";

export default function CodeGenerator() {
    const [sliderPosition, setSliderPosition] = React.useState(50); // Initial position of the slider
    const containerRef = React.useRef(null);

    const handleMouseDown = (event) => {
        const containerWidth = containerRef.current.offsetWidth;
        const initialPosition = event.clientX;

        const handleMouseMove = (event) => {
        const newPosition = Math.max(0, Math.min(100, sliderPosition + ((event.clientX - initialPosition) / containerWidth) * 100));
        setSliderPosition(newPosition);
        };

        const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="container" ref={containerRef}>
        <div className="left-section" style={{ width: `${sliderPosition}%` }}>
            {/* Content for the left section */}
            Left Section
        </div>
        <div className="slider" style={{ left: `${sliderPosition}%` }} onMouseDown={handleMouseDown} />
        <div className="right-section" style={{ width: `${100 - sliderPosition}%` }}>
            {/* Content for the right section */}
            Right Section
        </div>
        </div>
    );
  }
  