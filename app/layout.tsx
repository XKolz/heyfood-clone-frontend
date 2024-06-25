// 'use client'
// import { ReactNode } from 'react';
// import Head from 'next/head';
// import { ContentContainer } from './styles'; // Import custom styles
// import dynamic from 'next/dynamic';
// import './globals.css';

// // Dynamically import ClientProvider to ensure it's only used client-side
// const ClientProvider = dynamic(() => import('@/app/components/ClientProvider'), { ssr: false });

// export default function Layout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <Head>
//         <title>HeyFood Clone</title>
//         <meta name="viewport" content="initial-scale=1, width=device-width" />
//       </Head>
//       <body>
//         <ClientProvider>
//           <ContentContainer>
//             {children}
//           </ContentContainer>
//         </ClientProvider>
//       </body>
//     </html>
//   );
// }
'use client';
import { ReactNode } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import './globals.css'; // Ensure this is correctly referenced
import { ContentContainer } from './styles'; // Adjust the import based on your actual path

// Dynamically import ClientProvider to ensure it's only used client-side
const ClientProvider = dynamic(() => import('@/app/components/ClientProvider'), { ssr: false });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>HeyFood Clone</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <ClientProvider>
          <ContentContainer>
            {children}
          </ContentContainer>
        </ClientProvider>
      </body>
    </html>
  );
}
