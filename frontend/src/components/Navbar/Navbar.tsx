import {useState} from 'react';
import useMediaQuery from "../../hooks/useMediaQuery.tsx";
import gsap from 'gsap'
import {useGSAP} from "@gsap/react";


const Navbar = () => {
    const [navIsOpen, setNavIsOpen] = useState(false)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const smallScreen = useMediaQuery("(max-width: 640px")
    useGSAP(()=>{
        navIsOpen? gsap.from("#small_menu", {y: "-100%", duration: 1, ease: "power2.inOut" }):
            gsap.to("#small_menu", { y: "-100%", duration: 1, ease: "power2.inOut", onComplete: ()=> setShowMobileMenu(false) });
    }, [navIsOpen])

    return (
        <nav className='min-w-screen bg-amber-500 flex justify-center py-3 px-3'>
            <div className="container flex justify-between overflow-hidden">
                <div>
                    <a href="/" className="hover:text-white transition-all">Wakacje.pl</a>
                </div>
                {!smallScreen && (
                    <div className="sm:flex justify-between gap-3 hidden ">
                        <a href="/" className="hover:text-white transition-all">Wycieczki</a>
                        <a href="/" className="hover:text-white transition-all">Konto</a>
                    </div>
                )}
                {smallScreen && (
                    <>
                    {!navIsOpen && (
                        <button className="sm:hidden" onClick={() => {setNavIsOpen(true); setShowMobileMenu(true)}}>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    )}
                    {showMobileMenu && (
                        <div id="small_menu" className="absolute top-0 left-0 min-h-screen w-full bg-amber-400">
                            <div className="flex justify-end px-5">
                                <button onClick={() => setNavIsOpen(false)}>X</button>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex flex-col py-5 text-center">
                                    <a href="/" className="hover:text-white transition-all">Wycieczki</a>
                                    <a href="/" className="hover:text-white transition-all">Konto</a>
                                </div>
                            </div>
                        </div>
                    )}
                </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;