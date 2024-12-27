## Instalasi

1. Clone repositori
2. Jalankan `npm install` untuk menginstal semua dependensi yang diperlukan.

## Menjalankan Tes

Menjalankan tes, gunakan perintah berikut:

```sh
npx cypress open
```

atau dengan

```sh
npx cypress run
```

## Implementasi Tugas QA

Berikut adalah deskripsi singkat dari tugas QA yang telah diimplementasikan:

1. Intercept
   Intercept digunakan untuk menguji alur login dengan memanipulasi atau memantau request API. File terkait berada di:

   Path: cypress/e2e/orangeHRM/login-page/intercept/login-intercept.cy.js
   
3. Page Object Model (POM)
   Page Object Model (POM) digunakan untuk memisahkan logika pengujian dari representasi halaman aplikasi. Struktur file:

   Test File: cypress/e2e/orangeHRM/login-page/tests/login-pom.cy.js
   Page Object File: cypress/e2e/orangeHRM/login-page/pages/loginPage.js
