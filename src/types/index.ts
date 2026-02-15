// Types untuk Sistem Administrasi

export type UserRole = 'guru' | 'pegawai' | 'bos';

// Siswa interface for Guru pages
export interface Siswa extends User {
  role: 'pegawai';
  kelas: string;
  nomorAbsen: number;
}

export interface User {
  id: string;
  username: string;
  nama: string;
  role: UserRole;
  avatar?: string;
}

export interface Tugas {
  id: string;
  judul: string;
  deskripsi: string;
  mataPelajaran: string;
  deadline: string;
  createdAt: string;
  createdBy: string;
}

export interface PengumpulanTugas {
  id: string;
  tugasId: string;
  siswaId: string;
  fileName: string;
  fileUrl: string;
  submittedAt: string;
  nilai?: number;
  dinilaiPada?: string;
}

// Pegawai Types
export interface Pegawai extends User {
  role: 'pegawai';
  jabatan: string;
  divisi: string;
  nip: string;
  tanggalMulaiTugas: string;
  tanggalPurnaTugas?: string;
  status: 'Aktif' | 'Nonaktif' | 'Cuti Tahunan' | 'Cuti Sakit' | 'Cuti Melahirkan' | 'Cuti Alasan Penting' | 'Cuti Besar' | 'Cuti di Luar Tanggungan Negara' | 'Pensiun';
  gaji: number;
  kategori: 'CPNS' | 'PNS' | 'PPPK' | 'PNS Diperbantukan' | 'Purna Tugas';
  golongan: string;
}

export interface DokumenPegawai {
  id: string;
  pegawaiId: string;
  jenisDokumen: 'KTP' | 'NPWP' | 'Ijazah' | 'Sertifikat' | 'Kontrak' | 'Lainnya';
  namaFile: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface PrestasiPegawai {
  id: string;
  pegawaiId: string;
  judul: string;
  deskripsi: string;
  tanggal: string;
  kategori: 'penghargaan' | 'sertifikasi' | 'pelatihan' | 'pencapaian';
}

export interface Guru extends User {
  role: 'guru';
  mataPelajaran: string;
}

export interface SummaryGuru {
  totalTugas: number;
  totalSiswa: number;
  sudahMengumpulkan: number;
  belumDinilai: number;
  rataRataNilai: number;
}

export interface SummaryPegawai {
  totalPegawai: number;
  pegawaiAktif: number;
  pegawaiCuti: number;
  totalDokumen: number;
  totalPrestasi: number;
}
