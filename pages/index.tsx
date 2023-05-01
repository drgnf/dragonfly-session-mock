import { Inter } from 'next/font/google'
import { ColorRing } from 'react-loader-spinner'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import qs from 'qs';

const inter = Inter({ subsets: ['latin'] })

// Example media to be passed back into Dragonfly session
const exampleMedia = [ 'https://drgnf.b-cdn.net/media-examples/mushroom.jpg', 'https://drgnf.b-cdn.net/media-examples/sky.jpg' ];

export default function Home() {

  const router = useRouter();
  const { returnUrl } = router.query;

  const [counter, setCouter] = useState<number|undefined>(5);

  useEffect(() => {
    let c = 5
    const interval = window.setInterval(() => {
      if (c > 0)
        setCouter(--c);
      else {
        if (returnUrl && typeof returnUrl === 'string') {
          const params = { media: exampleMedia.map(m => encodeURIComponent(m))}
          window.location.replace(`${decodeURIComponent(returnUrl)}?${qs.stringify(params, { encode: false })}`);
        }
        else
          window.location.reload();
      }
    }, 1000)
    return () => window.clearInterval(interval);
  }, [setCouter, returnUrl])

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />
      <p className='text-lg'>Making image – {counter ?? '...'}</p>
    </main>
  )
}
