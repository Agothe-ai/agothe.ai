import { useState, useEffect } from 'react';

export function useDeviceCapability(): 'high' | 'medium' | 'low' {
  const [cap, setCap] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const mobile = window.innerWidth < 768;
    if (cores < 4 || mobile) setCap('low');
    else if (cores < 8) setCap('medium');
    else setCap('high');
  }, []);

  return cap;
}
