import React from "react";
import myFoto from "../../assets/sutopo.jpg";
import meFoto from "../../assets/putri.jpg";
import yuFoto from "../../assets/sulistiani.jpg";
import iFoto from "../../assets/tri.jpg";

export default function GuruTkj() {
  const guruTKJ = [
    { id: 1, name: "Sutopo, S.Kom", subject: "Produktif Teknik Jaringan Komputer", photo: myFoto },
    { id: 2, name: "Putri Siti Arifah, S.Pd", subject: "Produktif Teknik Jaringan Komputer", photo: meFoto },
    { id: 3, name: "Sulistiyani Pamungkas Jati, S.Kom", subject: "Produktif Teknik Jaringan Komputer", photo: yuFoto },
    { id: 4, name: "Tri Adi Putra Ramdani, S.Kom", subject: "Produktif Teknik Jaringan Komputer", photo: iFoto },
  ];

  return (
    <div id="guru" className="p-10 font-sans bg-blue-200 min-h-screen">
      <h1 className="text-4xl font-bold text-blue-900 text-center drop-shadow-lg mb-12 leading-snug">
        Daftar Guru <br /> Teknik Komputer dan Jaringan
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {guruTKJ.map((guru) => (
          <div
            key={guru.id}
            className="bg-white rounded-xl p-5 text-center shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={guru.photo}
              alt={guru.name}
              className="w-32 h-32 mx-auto mb-4 rounded-full object-cover object-center border-4 border-slate-200"
            />
            <h3 className="text-lg font-semibold text-slate-800">{guru.name}</h3>
            <p className="text-slate-500 text-sm">{guru.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
