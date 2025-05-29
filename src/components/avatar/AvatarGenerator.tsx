import  { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

interface AvatarGeneratorProps {
  username: string;
  size?: number;
  className?: string;
}

export const AvatarGenerator = ({ username, size = 100, className = '' }: AvatarGeneratorProps) => {
  const avatarSvg = useMemo(() => {
    const avatar = createAvatar(identicon, {
      seed: username,
      size: size,
      backgroundColor: ['2563eb', '7c3aed', '0891b2', 'ca8a04'],
    });
    return avatar.toDataUriSync();
  }, [username, size]);

  return (
    <img 
      src={avatarSvg} 
      alt={`${username}'s avatar`} 
      width={size} 
      height={size}
      className={`rounded-full ${className}`}
    />
  );
};
 