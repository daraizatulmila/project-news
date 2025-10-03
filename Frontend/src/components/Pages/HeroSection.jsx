import React from 'react'

const Home = () => {
  const author = {
    name: "Jurusan TKJ",
    imageUrl: "/images/bg.jpg"
  }

  return (
    <div id="home" className="overflow-hidden bg-blue-200 pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">
              JURUSAN
            </h1>
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-900 mt-2 drop-shadow-md">
              TEKNIK KOMPUTER DAN JARINGAN
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-gray-700">
              Teknik Komputer & Jaringan (TKJ) merupakan salah satu program keahlian di SMKN 8 Jember yang mempelajari dan mengenal seluk-beluk komponen hardware yang ada di dalam komputer.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">Tujuan</h3>
                <p className="text-gray-700">
                  Program keahlian ini bertujuan membekali peserta didik dengan keterampilan dan pengetahuan tersebut agar kompeten sehingga mampu bekerja sebagai teknisi komputer atau administrator jaringan di berbagai perusahaan.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">Kegiatan</h3>
                <p className="text-gray-700">
                  Belajar merakit, memperbaiki, dan mengoptimalkan perangkat keras komputer.
                </p>
              </div>
            </div>
          </div>

          
          <div className="flex justify-center lg:justify-end">
            <img
             src={author.imageUrl}
             alt={author.name}
             className="w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-xl shadow-xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
