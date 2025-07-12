import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flow Method™ - Plataforma de Avaliação de Valor Intangível',
  description: 'Descubra, desenvolva e maximize seu valor intangível através dos pilares de Identidade, Influência e Legado. Desenvolvido por Tami Saito.',
  keywords: ['flow method', 'valor intangível', 'desenvolvimento pessoal', 'liderança', 'propósito', 'tami saito'],
  authors: [{ name: 'Tami Saito' }],
  creator: 'Tami Saito',
  publisher: 'Flow Method™',
  robots: 'index, follow',
  openGraph: {
    title: 'Flow Method™ - Plataforma de Avaliação de Valor Intangível',
    description: 'Descubra, desenvolva e maximize seu valor intangível através dos pilares de Identidade, Influência e Legado.',
    url: 'https://flow-method.vercel.app',
    siteName: 'Flow Method™',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flow Method™ - Plataforma de Avaliação de Valor Intangível',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow Method™ - Plataforma de Avaliação de Valor Intangível',
    description: 'Descubra, desenvolva e maximize seu valor intangível através dos pilares de Identidade, Influência e Legado.',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#9333ea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
        
        {/* Analytics - adicione seu código do Google Analytics aqui */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics 4
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />
      </body>
    </html>
  )
}