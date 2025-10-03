import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import NewsEditForm from "../NewsEditForm";

const MySwal = withReactContent(Swal);


export const openEditNewsModal = (newsData, onUpdateSuccess) => {
  let isClosing = false;

  MySwal.fire({
    html: (
      <div>
        <NewsEditForm
          newsData={newsData}
          onSuccess={() => {
            isClosing = true;
            MySwal.close();

            setTimeout(() => {
              Swal.fire({
                icon: "success",
                title: "Berhasil!",
                text: "Berita berhasil diupdate",
                timer: 2000,
                showConfirmButton: false,
              });
              if (onUpdateSuccess) onUpdateSuccess();
            }, 100);
          }}
          onCancel={async () => {
            const result = await Swal.fire({
              title: "Yakin ingin membatalkan?",
              text: "Perubahan yang belum disimpan akan hilang",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Ya, batalkan",
              cancelButtonText: "Tidak",
              confirmButtonColor: "#ef4444",
              cancelButtonColor: "#6b7280",
            });

            if (result.isConfirmed) {
              isClosing = true;
              Swal.close();
            } else {
              // Kembali ke form edit
              openEditNewsModal(newsData, onUpdateSuccess);
            }
          }}
        />
      </div>
    ),
    showConfirmButton: false,
    // showCloseButton: true,
    width: "700px",
    padding: "2.5rem",
    customClass: {
      popup: "rounded-2xl shadow-2xl",
      closeButton:
        "text-2xl text-gray-400 hover:text-gray-600 transition-colors",
    },
    backdrop: `rgba(0,0,0,0.5)`,
    allowOutsideClick: false,
    allowEscapeKey: true,
    didOpen: () => {
      const popup = Swal.getPopup();
      popup.style.animation = "fadeInDown 0.3s ease-out";
    },
    willClose: () => {
      // Cegah close jika sedang dalam proses konfirmasi
      if (!isClosing) {
        return false;
      }
    },
  });
};

// // Solusi paling simple tanpa konfirmasi cancel
// export const openEditNewsModalSimple = (newsData, onUpdateSuccess) => {
//   MySwal.fire({
//     html: (
//       <div className="w-full">
//         <NewsEditForm
//           newsData={newsData}
//           onSuccess={() => {
//             MySwal.close();

//             setTimeout(() => {
//               Swal.fire({
//                 icon: "success",
//                 title: "Berhasil!",
//                 text: "Berita berhasil diupdate",
//                 timer: 2000,
//                 showConfirmButton: false,
//               });
//               if (onUpdateSuccess) onUpdateSuccess();
//             }, 100);
//           }}
//           onCancel={() => {
//             MySwal.close();
//           }}
//         />
//       </div>
//     ),
//     showConfirmButton: false,
//     showCloseButton: true,
//     width: "700px",
//     padding: "2.5rem",
//     customClass: {
//       popup: "rounded-2xl shadow-2xl",
//       closeButton:
//         "text-2xl text-gray-400 hover:text-gray-600 transition-colors",
//     },
//     backdrop: `rgba(0,0,0,0.5)`,
//     allowOutsideClick: false,
//     allowEscapeKey: true,
//     didOpen: () => {
//       const popup = Swal.getPopup();
//       popup.style.animation = "fadeInDown 0.3s ease-out";
//     },
//   });
// };
