import React, { useEffect, useRef, useState } from "react";

const IntersectionObserverComponent = ({ children, animationClass }) => {
  const [isVisible, setIsVisible] = useState(false); // Estado inicial como invisível
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Ativa a classe de animação e torna visível
            observer.disconnect(); // Desconecta o observer para não observar mais após a primeira vez
          }
        });
      },
      {
        threshold: 0.3, // Quando 30% do elemento está visível
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ visibility: isVisible ? "visible" : "hidden" }} // Invisível até ser observado
      className={isVisible ? `animate__animated ${animationClass}` : ""}
    >
      {children}
    </div>
  );
};

export default IntersectionObserverComponent;
