import { useState, useEffect } from "react";

const TypeWriter = ({ text, speed }) => {
    const [currentText, setCurrentText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
              setCurrentText(prevText => prevText + text[currentIndex])
              setCurrentIndex(prevIndex => prevIndex + 1)
            }, speed);
        
            
            return () => clearTimeout(timeout)
        }

    }, [currentIndex, speed, text])
    

  return <pre className="writer">{currentText}</pre>
}

export default TypeWriter