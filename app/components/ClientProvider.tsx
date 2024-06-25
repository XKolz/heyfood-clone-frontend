// app/components/ClientProvider.tsx
'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '../ThemeRegistry';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeRegistry>
      {children}
    </ThemeRegistry>
  );
}
