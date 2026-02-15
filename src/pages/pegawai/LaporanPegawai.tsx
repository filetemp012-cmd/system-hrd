import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/atoms/PageHeader';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { dataPegawai, dataDokumenPegawai } from '@/data/dummyData';
import { Pegawai, DokumenPegawai } from '@/types';
import { Users, UserCheck, UserX, Building2, Search } from 'lucide-react';

export default function LaporanPegawai() {
  // State for data
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [dokumenList, setDokumenList] = useState<DokumenPegawai[]>([]);


  // Load data from localStorage on mount
  useEffect(() => {
    const getLocalData = <T,>(key: string, fallback: T): T => {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      return fallback;
    };

    setPegawaiList(getLocalData<Pegawai[]>('pegawaiData', dataPegawai));
    setDokumenList(getLocalData<DokumenPegawai[]>('dokumenData', dataDokumenPegawai));
  }, []);

  // Calculate Summary
  const summary = useMemo(() => {
    return {
      totalPegawai: pegawaiList.length,
      pegawaiAktif: pegawaiList.filter(p => p.status === 'Aktif').length,
      pegawaiCuti: pegawaiList.filter(p => p.status.startsWith('Cuti')).length,
    };
  }, [pegawaiList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterJabatan, setFilterJabatan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterKategori, setFilterKategori] = useState<string>('all');
  const [filterGolongan, setFilterGolongan] = useState<string>('all');

  // Filter Options from KelolaPegawai
  const JABATAN_OPTIONS = ['Struktural', 'Fungsional', 'Pelaksana', 'Pendidik', 'Tenaga Kependidikan'];
  const GOLONGAN_OPTIONS = ['I/a', 'I/b', 'I/c', 'I/d', 'II/a', 'II/b', 'II/c', 'II/d', 'III/a', 'III/b', 'III/c', 'III/d', 'IV/a', 'IV/b', 'IV/c', 'IV/d', 'IV/e'];
  const STATUS_OPTIONS = ['Aktif', 'Nonaktif', 'Cuti Tahunan', 'Cuti Sakit', 'Cuti Melahirkan', 'Cuti Alasan Penting', 'Cuti Besar', 'Cuti di Luar Tanggungan Negara', 'Pensiun'];
  const KATEGORI_OPTIONS = ['CPNS', 'PNS', 'PPPK', 'PNS Diperbantukan', 'Purna Tugas'];

  // Fixed jabatan list
  const ALL_JABATAN = ['Struktural', 'Fungsional', 'Pelaksana', 'Pendidik', 'Tenaga Kependidikan'];

  // Filtered pegawai
  const filteredPegawai = useMemo(() => {
    return pegawaiList.filter(pegawai => {
      const matchesSearch = searchQuery === '' ||
        pegawai.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.jabatan.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJabatan = filterJabatan === 'all' || pegawai.jabatan === filterJabatan;
      const matchesStatus = filterStatus === 'all' || pegawai.status === filterStatus;
      const matchesKategori = filterKategori === 'all' || pegawai.kategori === filterKategori;
      const matchesGolongan = filterGolongan === 'all' || pegawai.golongan === filterGolongan;

      return matchesSearch && matchesJabatan && matchesStatus && matchesKategori && matchesGolongan;
    });
  }, [searchQuery, filterJabatan, filterStatus, filterKategori, filterGolongan, pegawaiList]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Laporan Pegawai"
        description="Rekap data pegawai secara lengkap"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Pegawai</p>
                <p className="text-2xl font-bold">{summary.totalPegawai}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pegawai Aktif</p>
                <p className="text-2xl font-bold">{summary.pegawaiAktif}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pegawai by Jabatan */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Pegawai per Jabatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ALL_JABATAN.map((jabatan) => {
              const count = pegawaiList.filter(p => p.jabatan === jabatan).length;
              return (
                <div key={jabatan} className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-primary">{count}</p>
                  <p className="text-sm text-muted-foreground truncate" title={jabatan}>{jabatan}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rekap Data Lengkap Pegawai</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIP, atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            {/* Filters Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <Select value={filterJabatan} onValueChange={setFilterJabatan}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Jabatan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jabatan</SelectItem>
                  {JABATAN_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  {STATUS_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterKategori} onValueChange={setFilterKategori}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {KATEGORI_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterGolongan} onValueChange={setFilterGolongan}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua Golongan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Golongan</SelectItem>
                  {GOLONGAN_OPTIONS.map(opt => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            Menampilkan {filteredPegawai.length} dari {pegawaiList.length} pegawai
          </div>

          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>NIP</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Tanggal Mulai Tugas</TableHead>
                  <TableHead className="text-center">Dokumen</TableHead>

                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPegawai.map((pegawai, index) => {
                  const dokumenCount = dokumenList.filter(d => d.pegawaiId === pegawai.id).length;

                  return (
                    <TableRow key={pegawai.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm">{pegawai.nip}</TableCell>
                      <TableCell className="font-medium">{pegawai.nama}</TableCell>
                      <TableCell>{pegawai.jabatan}</TableCell>
                      <TableCell>{pegawai.tanggalMulaiTugas}</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-muted rounded text-sm font-medium">
                          {dokumenCount}
                        </span>
                      </TableCell>

                      <TableCell>
                        <StatusBadge
                          status={
                            pegawai.status === 'Aktif' ? 'selesai' :
                              ['Nonaktif', 'Pensiun'].includes(pegawai.status) ? 'terlambat' : 'menunggu'
                          }
                          label={pegawai.status}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredPegawai.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tidak ada data pegawai yang sesuai filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
