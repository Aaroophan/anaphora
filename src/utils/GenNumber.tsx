import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

export default function GenNumber(Number: number, Class: string, Duration: number) {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))

    useEffect(() => {
        const controls = animate(count, Number, { duration: Duration })
        return () => controls.stop()
    }, [])

    return (
        <motion.pre 
            // style={{
            //     fontSize: Font,
            //     color: Color,
            // }}
            className={Class}
        >
            {rounded}
        </motion.pre>
    )
}
