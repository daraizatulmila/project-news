import React from 'react'
import logoInstagram from "../assets/instagram.png"
import logoTiktok from "../assets/tiktok.png"
import logoYoutube from "../assets/youtube.png"



const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h3 className="text-lg font-bold mb-2">SMKN 8 Jember</h3>
          <p>Jl. Pelita no 27 Sidomekar - Semboro - Jember</p>
          <p>Jawa Timur, Indonesia</p>
        </div>

        
        <div>
          <h3 className="text-lg font-bold mb-2">Kontak</h3>
          <p>Email: smknegeri08jember@gmail.com</p>
          <p>Telepon: (0336)444112</p>
        </div>

        
        <div>
          <h3 className="text-lg font-bold mb-2">Media Sosial</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://instagram.com/smkn8_official" className="flex items-center gap-2 hover:underline">
              <img src={logoInstagram} alt="Instagram" className="w-5 h-5" />smkn8_official</a></li>
            <li>
              <a href="https://www.tiktok.com/@smkn.8.jember.off" className="flex items-center gap-2 hover:underline">
              <img src={logoTiktok} alt="Tiktok" className="w-5 h-5" />smkn.8.jember.off</a></li>
            <li>
              <a href="https://youtube.com/@smkn8jemberofficial" className="flex items-center gap-2 hover:underline">
              <img src={logoYoutube} alt="Youtube" className="w-5 h-5" />SMKN 8 JEMBER</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-300 mt-8 text-sm">
        &copy; {new Date().getFullYear()} SMKN 8 Jember. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
