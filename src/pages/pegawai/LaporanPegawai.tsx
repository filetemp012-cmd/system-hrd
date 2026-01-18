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
import { dataPegawai, dataDokumenPegawai, dataPrestasiPegawai } from '@/data/dummyData';
import { Pegawai, DokumenPegawai, PrestasiPegawai } from '@/types';
import { Users, UserCheck, UserX, Building2, Search } from 'lucide-react';

export default function LaporanPegawai() {
  // State for data
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [dokumenList, setDokumenList] = useState<DokumenPegawai[]>([]);
  const [prestasiList, setPrestasiList] = useState<PrestasiPegawai[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const getLocalData = <T,>(key: string, fallback: T): T => {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      return fallback;
    };

    setPegawaiList(getLocalData<Pegawai[]>('pegawaiData', dataPegawai));
    setDokumenList(getLocalData<DokumenPegawai[]>('dokumenData', dataDokumenPegawai));
    setPrestasiList(getLocalData<PrestasiPegawai[]>('prestasiData', dataPrestasiPegawai));
  }, []);

  // Calculate Summary
  const summary = useMemo(() => {
    return {
      totalPegawai: pegawaiList.length,
      pegawaiAktif: pegawaiList.filter(p => p.status === 'aktif').length,
      pegawaiCuti: pegawaiList.filter(p => p.status === 'cuti').length,
    };
  }, [pegawaiList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDivisi, setFilterDivisi] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Fixed division list
  const ALL_DIVISI = ['Administrasi', 'Keuangan', 'HR', 'Operasional', 'Pemasaran', 'IT', 'Riset & Pengembangan', 'Humas', 'Hukum'];

  // Use fixed list for filtering
  const divisiList = ALL_DIVISI;

  // Filtered pegawai
  // Filtered pegawai
  const filteredPegawai = useMemo(() => {
    return pegawaiList.filter(pegawai => {
      const matchesSearch = searchQuery === '' ||
        pegawai.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.jabatan.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDivisi = filterDivisi === 'all' || pegawai.divisi === filterDivisi;
      const matchesStatus = filterStatus === 'all' || pegawai.status === filterStatus;

      return matchesSearch && matchesDivisi && matchesStatus;
    });
  }, [searchQuery, filterDivisi, filterStatus, pegawaiList]);

  return (
    <DashboardLayout>
      <PageHeader
        title="Laporan Pegawai"
        description="Rekap data pegawai secara lengkap"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                <UserX className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pegawai Cuti</p>
                <p className="text-2xl font-bold">{summary.pegawaiCuti}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Divisi</p>
                <p className="text-2xl font-bold">{ALL_DIVISI.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pegawai by Divisi */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Pegawai per Divisi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ALL_DIVISI.map((divisi) => {
              const count = pegawaiList.filter(p => p.divisi === divisi).length;
              return (
                <div key={divisi} className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-2xl font-bold text-primary">{count}</p>
                  <p className="text-sm text-muted-foreground truncate" title={divisi}>{divisi}</p>
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
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIP, atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterDivisi} onValueChange={setFilterDivisi}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                {divisiList.map(divisi => (
                  <SelectItem key={divisi} value={divisi}>{divisi}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="cuti">Cuti</SelectItem>
                <SelectItem value="tidak-aktif">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
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
                  <TableHead>Divisi</TableHead>
                  <TableHead>Tanggal Masuk</TableHead>
                  <TableHead className="text-center">Dokumen</TableHead>
                  <TableHead className="text-center">Prestasi</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPegawai.map((pegawai, index) => {
                  const dokumenCount = dokumenList.filter(d => d.pegawaiId === pegawai.id).length;
                  const prestasiCount = prestasiList.filter(p => p.pegawaiId === pegawai.id).length;

                  return (
                    <TableRow key={pegawai.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm">{pegawai.nip}</TableCell>
                      <TableCell className="font-medium">{pegawai.nama}</TableCell>
                      <TableCell>{pegawai.jabatan}</TableCell>
                      <TableCell>{pegawai.divisi}</TableCell>
                      <TableCell>{pegawai.tanggalMasuk}</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-muted rounded text-sm font-medium">
                          {dokumenCount}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-muted rounded text-sm font-medium">
                          {prestasiCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            pegawai.status === 'aktif' ? 'selesai' :
                              pegawai.status === 'cuti' ? 'menunggu' : 'terlambat'
                          }
                          label={
                            pegawai.status === 'aktif' ? 'Aktif' :
                              pegawai.status === 'cuti' ? 'Cuti' : 'Tidak Aktif'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredPegawai.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
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
