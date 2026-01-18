import { Guru, Pegawai, Siswa, Tugas, PengumpulanTugas, DokumenPegawai, PrestasiPegawai } from '@/types';

// Data Siswa for Guru pages
export const dataSiswa: Siswa[] = [
  { id: 'siswa-1', username: 'andi.siswa', nama: 'Andi Pratama', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 1 },
  { id: 'siswa-2', username: 'bela.siswa', nama: 'Bela Safitri', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 2 },
  { id: 'siswa-3', username: 'citra.siswa', nama: 'Citra Dewi', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 3 },
  { id: 'siswa-4', username: 'dodi.siswa', nama: 'Dodi Kurniawan', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 4 },
  { id: 'siswa-5', username: 'eka.siswa', nama: 'Eka Putra', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 5 },
  { id: 'siswa-6', username: 'fani.siswa', nama: 'Fani Maharani', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 6 },
  { id: 'siswa-7', username: 'gilang.siswa', nama: 'Gilang Ramadhan', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 7 },
  { id: 'siswa-8', username: 'hana.siswa', nama: 'Hana Permata', role: 'pegawai', kelas: 'XII RPL 1', nomorAbsen: 8 },
];

export const getSiswaById = (siswaId: string): Siswa | undefined => {
  return dataSiswa.find(s => s.id === siswaId);
};

// Data Guru
export const dataGuru: Guru[] = [
  {
    id: 'guru-1',
    username: 'budi.guru',
    nama: 'Budi Santoso, S.Pd',
    role: 'guru',
    mataPelajaran: 'Pemrograman Web',
  },
];

// Data Pegawai
export const dataPegawai: Pegawai[] = [
  {
    id: 'pegawai-1',
    username: 'andi.pegawai',
    nama: 'Andi Pratama',
    role: 'pegawai',
    jabatan: 'Staff IT',
    divisi: 'Teknologi Informasi',
    nip: 'NIP-2020-001',
    tanggalMasuk: '2020-03-15',
    status: 'aktif',
  },
  {
    id: 'pegawai-2',
    username: 'bela.pegawai',
    nama: 'Bela Safitri',
    role: 'pegawai',
    jabatan: 'Admin Keuangan',
    divisi: 'Keuangan',
    nip: 'NIP-2019-015',
    tanggalMasuk: '2019-07-01',
    status: 'aktif',
  },
  {
    id: 'pegawai-3',
    username: 'citra.pegawai',
    nama: 'Citra Dewi',
    role: 'pegawai',
    jabatan: 'HRD',
    divisi: 'Sumber Daya Manusia',
    nip: 'NIP-2021-003',
    tanggalMasuk: '2021-01-10',
    status: 'aktif',
  },
  {
    id: 'pegawai-4',
    username: 'dodi.pegawai',
    nama: 'Dodi Kurniawan',
    role: 'pegawai',
    jabatan: 'Marketing',
    divisi: 'Pemasaran',
    nip: 'NIP-2022-008',
    tanggalMasuk: '2022-05-20',
    status: 'cuti',
  },
  {
    id: 'pegawai-5',
    username: 'eka.pegawai',
    nama: 'Eka Putra',
    role: 'pegawai',
    jabatan: 'Supervisor',
    divisi: 'Operasional',
    nip: 'NIP-2018-002',
    tanggalMasuk: '2018-09-01',
    status: 'aktif',
  },
  {
    id: 'pegawai-6',
    username: 'fani.pegawai',
    nama: 'Fani Maharani',
    role: 'pegawai',
    jabatan: 'Akuntan',
    divisi: 'Keuangan',
    nip: 'NIP-2020-012',
    tanggalMasuk: '2020-11-15',
    status: 'aktif',
  },
  {
    id: 'pegawai-7',
    username: 'gilang.pegawai',
    nama: 'Gilang Ramadhan',
    role: 'pegawai',
    jabatan: 'Developer',
    divisi: 'Teknologi Informasi',
    nip: 'NIP-2023-001',
    tanggalMasuk: '2023-02-01',
    status: 'aktif',
  },
  {
    id: 'pegawai-8',
    username: 'hana.pegawai',
    nama: 'Hana Permata',
    role: 'pegawai',
    jabatan: 'Sekretaris',
    divisi: 'Administrasi',
    nip: 'NIP-2019-020',
    tanggalMasuk: '2019-04-10',
    status: 'tidak-aktif',
  },
];

// Data Dokumen Pegawai
export const dataDokumenPegawai: DokumenPegawai[] = [
  {
    id: 'dok-1',
    pegawaiId: 'pegawai-1',
    jenisDokumen: 'KTP',
    namaFile: 'ktp_andi.pdf',
    fileUrl: '#',
    uploadedAt: '2020-03-15',
  },
  {
    id: 'dok-2',
    pegawaiId: 'pegawai-1',
    jenisDokumen: 'NPWP',
    namaFile: 'npwp_andi.pdf',
    fileUrl: '#',
    uploadedAt: '2020-03-15',
  },
  {
    id: 'dok-3',
    pegawaiId: 'pegawai-1',
    jenisDokumen: 'Ijazah',
    namaFile: 'ijazah_andi.pdf',
    fileUrl: '#',
    uploadedAt: '2020-03-16',
  },
  {
    id: 'dok-4',
    pegawaiId: 'pegawai-2',
    jenisDokumen: 'KTP',
    namaFile: 'ktp_bela.pdf',
    fileUrl: '#',
    uploadedAt: '2019-07-01',
  },
  {
    id: 'dok-5',
    pegawaiId: 'pegawai-2',
    jenisDokumen: 'Sertifikat',
    namaFile: 'sertifikat_akuntansi_bela.pdf',
    fileUrl: '#',
    uploadedAt: '2019-08-10',
  },
  {
    id: 'dok-6',
    pegawaiId: 'pegawai-3',
    jenisDokumen: 'Kontrak',
    namaFile: 'kontrak_citra.pdf',
    fileUrl: '#',
    uploadedAt: '2021-01-10',
  },
  {
    id: 'dok-7',
    pegawaiId: 'pegawai-5',
    jenisDokumen: 'Ijazah',
    namaFile: 'ijazah_s1_eka.pdf',
    fileUrl: '#',
    uploadedAt: '2018-09-01',
  },
  {
    id: 'dok-8',
    pegawaiId: 'pegawai-6',
    jenisDokumen: 'Sertifikat',
    namaFile: 'sertifikat_cpa_fani.pdf',
    fileUrl: '#',
    uploadedAt: '2021-03-20',
  },
  {
    id: 'dok-9',
    pegawaiId: 'pegawai-7',
    jenisDokumen: 'NPWP',
    namaFile: 'npwp_gilang.pdf',
    fileUrl: '#',
    uploadedAt: '2023-02-01',
  },
];

// Data Prestasi Pegawai
export const dataPrestasiPegawai: PrestasiPegawai[] = [
  {
    id: 'prestasi-1',
    pegawaiId: 'pegawai-1',
    judul: 'Sertifikasi AWS Cloud Practitioner',
    deskripsi: 'Berhasil mendapatkan sertifikasi AWS Cloud Practitioner',
    tanggal: '2023-06-15',
    kategori: 'sertifikasi',
  },
  {
    id: 'prestasi-2',
    pegawaiId: 'pegawai-1',
    judul: 'Karyawan Terbaik Q3 2023',
    deskripsi: 'Dinobatkan sebagai karyawan terbaik divisi IT pada kuartal 3 tahun 2023',
    tanggal: '2023-10-01',
    kategori: 'penghargaan',
  },
  {
    id: 'prestasi-3',
    pegawaiId: 'pegawai-2',
    judul: 'Pelatihan SAP Finance',
    deskripsi: 'Menyelesaikan pelatihan SAP Finance Module selama 2 minggu',
    tanggal: '2022-08-20',
    kategori: 'pelatihan',
  },
  {
    id: 'prestasi-4',
    pegawaiId: 'pegawai-3',
    judul: 'Implementasi Sistem HR Baru',
    deskripsi: 'Berhasil mengimplementasikan sistem HRIS baru dengan sukses',
    tanggal: '2023-03-15',
    kategori: 'pencapaian',
  },
  {
    id: 'prestasi-5',
    pegawaiId: 'pegawai-5',
    judul: 'Penghargaan 5 Tahun Masa Kerja',
    deskripsi: 'Menerima penghargaan atas dedikasi 5 tahun bekerja di perusahaan',
    tanggal: '2023-09-01',
    kategori: 'penghargaan',
  },
  {
    id: 'prestasi-6',
    pegawaiId: 'pegawai-6',
    judul: 'Sertifikasi CPA',
    deskripsi: 'Berhasil lulus ujian sertifikasi CPA (Certified Public Accountant)',
    tanggal: '2021-03-10',
    kategori: 'sertifikasi',
  },
  {
    id: 'prestasi-7',
    pegawaiId: 'pegawai-7',
    judul: 'Hackathon Winner',
    deskripsi: 'Juara 1 Internal Hackathon 2023',
    tanggal: '2023-11-20',
    kategori: 'penghargaan',
  },
];

// Data Tugas (untuk sisi Guru)
export const dataTugas: Tugas[] = [
  {
    id: 'tugas-1',
    judul: 'Membuat Landing Page',
    deskripsi: 'Buatlah landing page responsive menggunakan HTML, CSS, dan JavaScript. Tema bebas namun harus memiliki minimal 3 section.',
    mataPelajaran: 'Pemrograman Web',
    deadline: '2024-02-15',
    createdAt: '2024-02-01',
    createdBy: 'guru-1',
  },
  {
    id: 'tugas-2',
    judul: 'CRUD dengan PHP',
    deskripsi: 'Implementasikan operasi Create, Read, Update, Delete untuk sistem inventory sederhana menggunakan PHP dan MySQL.',
    mataPelajaran: 'Pemrograman Web',
    deadline: '2024-02-20',
    createdAt: '2024-02-05',
    createdBy: 'guru-1',
  },
  {
    id: 'tugas-3',
    judul: 'API RESTful',
    deskripsi: 'Buatlah API RESTful sederhana untuk aplikasi todo list menggunakan Node.js dan Express.',
    mataPelajaran: 'Pemrograman Web',
    deadline: '2024-02-28',
    createdAt: '2024-02-10',
    createdBy: 'guru-1',
  },
];

// Data Pengumpulan Tugas (untuk sisi Guru)
export const dataPengumpulan: PengumpulanTugas[] = [
  {
    id: 'pengumpulan-1',
    tugasId: 'tugas-1',
    siswaId: 'siswa-1',
    fileName: 'landing_page_andi.pdf',
    fileUrl: '#',
    submittedAt: '2024-02-14',
    nilai: 85,
    dinilaiPada: '2024-02-16',
  },
  {
    id: 'pengumpulan-2',
    tugasId: 'tugas-1',
    siswaId: 'siswa-2',
    fileName: 'tugas1_bela.pdf',
    fileUrl: '#',
    submittedAt: '2024-02-13',
    nilai: 90,
    dinilaiPada: '2024-02-16',
  },
  {
    id: 'pengumpulan-3',
    tugasId: 'tugas-1',
    siswaId: 'siswa-3',
    fileName: 'landing_citra.pdf',
    fileUrl: '#',
    submittedAt: '2024-02-15',
    nilai: 78,
    dinilaiPada: '2024-02-17',
  },
];

// Helper functions untuk Pegawai
export const getPegawaiById = (pegawaiId: string): Pegawai | undefined => {
  return dataPegawai.find(p => p.id === pegawaiId);
};

export const getDokumenByPegawai = (pegawaiId: string): DokumenPegawai[] => {
  return dataDokumenPegawai.filter(d => d.pegawaiId === pegawaiId);
};

export const getPrestasiByPegawai = (pegawaiId: string): PrestasiPegawai[] => {
  return dataPrestasiPegawai.filter(p => p.pegawaiId === pegawaiId);
};

export const getSummaryPegawai = () => {
  const totalPegawai = dataPegawai.length;
  const pegawaiAktif = dataPegawai.filter(p => p.status === 'aktif').length;
  const pegawaiCuti = dataPegawai.filter(p => p.status === 'cuti').length;
  const totalDokumen = dataDokumenPegawai.length;
  const totalPrestasi = dataPrestasiPegawai.length;

  return { totalPegawai, pegawaiAktif, pegawaiCuti, totalDokumen, totalPrestasi };
};

// Helper functions untuk Guru
export const getTugasByGuru = (guruId: string): Tugas[] => {
  return dataTugas.filter(t => t.createdBy === guruId);
};

export const getPengumpulanByTugas = (tugasId: string): PengumpulanTugas[] => {
  return dataPengumpulan.filter(p => p.tugasId === tugasId);
};

export const getTugasById = (tugasId: string): Tugas | undefined => {
  return dataTugas.find(t => t.id === tugasId);
};

export const getSummaryGuru = (): {
  totalTugas: number;
  totalSiswa: number;
  sudahMengumpulkan: number;
  belumDinilai: number;
  rataRataNilai: number;
} => {
  const totalTugas = dataTugas.length;
  const totalSiswa = 8; // Fixed for now
  const sudahMengumpulkan = dataPengumpulan.length;
  const belumDinilai = dataPengumpulan.filter(p => p.nilai === undefined).length;
  
  const nilaiList = dataPengumpulan.filter(p => p.nilai !== undefined).map(p => p.nilai as number);
  const rataRataNilai = nilaiList.length > 0 
    ? Math.round(nilaiList.reduce((a, b) => a + b, 0) / nilaiList.length) 
    : 0;

  return { totalTugas, totalSiswa, sudahMengumpulkan, belumDinilai, rataRataNilai };
};
