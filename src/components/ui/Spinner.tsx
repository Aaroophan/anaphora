import  { motion } from 'framer-motion';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner = ({ size = 24, color = 'currentColor' }: SpinnerProps) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        borderTopColor: 'transparent',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
};
 