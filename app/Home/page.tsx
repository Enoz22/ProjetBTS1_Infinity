import Image from 'next/image'
import Logo from "@/public/Rental-Lamborghini-Revuelto.jpg"
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <header>
      <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="/Dashboard">Dashboard Admin</Link>
            </li>
          </ul>
        </div>
      </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">Infinity</a>
        </div>
      </div>
      </header>
      
      {/* <div className="artboard artboard-horizontal phone-6">
        <Image src={Logo} alt="Elsa" priority={true} />
      </div> */}
      <div className="hero min-h-screen" style={{backgroundImage: 'url(https://static.wixstatic.com/media/9fe157_d9cb038b0eac4f889eb5d90ad0d0e56a~mv2.jpg/v1/fill/w_1276,h_850,al_c/9fe157_d9cb038b0eac4f889eb5d90ad0d0e56a~mv2.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  )
}
