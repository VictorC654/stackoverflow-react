import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollEffect() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (location.pathname === "/home") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(false);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  return { isScrolled };
}
