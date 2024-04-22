import Image from 'next/image'
import Logo from "@/public/Rental-Lamborghini-Revuelto.jpg"
import Link from 'next/link';


export default function Home() {
  return (
    <>
      <header>
      <div className="navbar bg-base-300">
      <div className="navbar-start">
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
            <h1 className="mb-5 text-5xl font-bold">Bonjour !</h1>
            <p className="mb-5">Bienvenue sur l'application de gestion de location de voitures de luxe. Connectez-vous pour accéder au dashboard.</p>
            <Link href="/Dashboard">
              <button className="btn btn-primary">Connexion</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
