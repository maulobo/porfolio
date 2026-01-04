import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { text, curve, translate } from './anim';
import './stylesCurve.css';

const routes: Record<string, string> = {
    "/": "Home",
    "/work": "Work",
    "/about": "About",
    "/contact": "Contact"
};

const anim = (variants: any) => {
    return {
        variants,
        initial: "initial",
        animate: "enter",
        exit: "exit"
    };
};

interface TransitionAnimateProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

const SVG = ({ height, width }: { height: number, width: number }) => {

    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `;

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `;

    return (
        <motion.svg {...anim(translate)} className="svgAnimate">
            <motion.path {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    );
};

const TransitionAnimate = ({ children, backgroundColor }: TransitionAnimateProps) => {
    const location = useLocation();
    const [dimensions, setDimensions] = useState<{ width: number | null, height: number | null }>({
        width: null,
        height: null
    });

    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        resize();
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <div className='page curve' style={{ backgroundColor }}>
            <div style={{ opacity: dimensions.width == null ? 1 : 0 }} className='background' />
            <motion.p className='route' {...anim(text)}>
                {routes[location.pathname] || "Scland"}
            </motion.p>
            {dimensions.width != null && dimensions.height != null && <SVG height={dimensions.height} width={dimensions.width} />}
            {children}
        </div>
    );
};

export default TransitionAnimate;