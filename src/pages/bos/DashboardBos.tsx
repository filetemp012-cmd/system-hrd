import { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/atoms/PageHeader';
import { StatCard } from '@/components/atoms/StatCard';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dataPegawai, dataDokumenPegawai, dataPrestasiPegawai } from '@/data/dummyData';
import { Pegawai, DokumenPegawai, PrestasiPegawai } from '@/types';
import { Users, UserCheck, UserX, Building2, Search, FileText, Award } from 'lucide-react';

export default function DashboardBos() {
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
      pegawaiAktif: pegawaiList.filter(p => p.status === 'Aktif').length,
      pegawaiCuti: pegawaiList.filter(p => p.status.startsWith('Cuti')).length,
      totalDokumen: dokumenList.length,
      totalPrestasi: prestasiList.length
    };
  }, [pegawaiList, dokumenList, prestasiList]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterJabatan, setFilterJabatan] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Fixed jabatan list
  const ALL_JABATAN = ['Struktural', 'Fungsional', 'Pelaksana', 'Pendidik', 'Tenaga Kependidikan'];

  // Use fixed list for filtering
  const jabatanList = ALL_JABATAN;

  // Group pegawai by divisi
  const pegawaiByDivisi = useMemo(() => {
    return pegawaiList.reduce((acc, pegawai) => {
      if (!acc[pegawai.divisi]) {
        acc[pegawai.divisi] = [];
      }
      acc[pegawai.divisi].push(pegawai);
      return acc;
    }, {} as Record<string, Pegawai[]>);
  }, [pegawaiList]);

  // Filtered pegawai
  const filteredPegawai = useMemo(() => {
    return pegawaiList.filter(pegawai => {
      const matchesSearch = searchQuery === '' ||
        pegawai.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pegawai.jabatan.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesJabatan = filterJabatan === 'all' || pegawai.jabatan === filterJabatan;
      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'Cuti' ? pegawai.status.startsWith('Cuti') : pegawai.status === filterStatus);

      return matchesSearch && matchesJabatan && matchesStatus;
    });
  }, [searchQuery, filterJabatan, filterStatus, pegawaiList]);

  // Filtered documents based on filtered pegawai
  const filteredDokumen = useMemo(() => {
    const pegawaiIds = new Set(filteredPegawai.map(p => p.id));
    return dokumenList.filter(doc => pegawaiIds.has(doc.pegawaiId));
  }, [filteredPegawai, dokumenList]);

  // Filtered achievements based on filtered pegawai
  const filteredPrestasi = useMemo(() => {
    const pegawaiIds = new Set(filteredPegawai.map(p => p.id));
    return prestasiList.filter(p => pegawaiIds.has(p.pegawaiId));
  }, [filteredPegawai, prestasiList]);

  const getPegawaiNama = (pegawaiId: string) => {
    return pegawaiList.find(p => p.id === pegawaiId)?.nama || '-';
  };

  return (
    <DashboardLayout role="bos">
      <PageHeader
        title="Dashboard"
        description="Ringkasan data kepegawaian perusahaan"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Total Pegawai"
          value={summary.totalPegawai}
          icon={Users}
          iconColor="text-primary"
          iconBgColor="bg-primary/10"
        />
        <StatCard
          title="Pegawai Aktif"
          value={summary.pegawaiAktif}
          icon={UserCheck}
          iconColor="text-green-600"
          iconBgColor="bg-green-100 dark:bg-green-900/30"
        />
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

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Filter Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIP, atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterJabatan} onValueChange={setFilterJabatan}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Semua Jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jabatan</SelectItem>
                {jabatanList.map(jabatan => (
                  <SelectItem key={jabatan} value={jabatan}>{jabatan}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Cuti">Sedang Cuti</SelectItem>
                <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                <SelectItem value="Pensiun">Pensiun</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Data Tabs */}
      <Tabs defaultValue="pegawai" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pegawai" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Pegawai ({filteredPegawai.length})
          </TabsTrigger>
          <TabsTrigger value="dokumen" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Dokumen ({filteredDokumen.length})
          </TabsTrigger>
          <TabsTrigger value="prestasi" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Prestasi ({filteredPrestasi.length})
          </TabsTrigger>
        </TabsList>

        {/* Pegawai Tab */}
        <TabsContent value="pegawai">
          <Card>
            <CardHeader>
              <CardTitle>Data Pegawai</CardTitle>
            </CardHeader>
            <CardContent>
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
                          <TableCell>{pegawai.tanggalMulaiTugas}</TableCell>
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
                        <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                          Tidak ada data pegawai yang sesuai filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dokumen Tab */}
        <TabsContent value="dokumen">
          <Card>
            <CardHeader>
              <CardTitle>Data Dokumen Pegawai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Pegawai</TableHead>
                      <TableHead>Jenis Dokumen</TableHead>
                      <TableHead>Nama File</TableHead>
                      <TableHead>Tanggal Upload</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDokumen.map((doc, index) => (
                      <TableRow key={doc.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{getPegawaiNama(doc.pegawaiId)}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-sm">
                            {doc.jenisDokumen}
                          </span>
                        </TableCell>
                        <TableCell>{doc.namaFile}</TableCell>
                        <TableCell>{doc.uploadedAt}</TableCell>
                      </TableRow>
                    ))}
                    {filteredDokumen.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Tidak ada data dokumen yang sesuai filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prestasi Tab */}
        <TabsContent value="prestasi">
          <Card>
            <CardHeader>
              <CardTitle>Data Prestasi Pegawai</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>Nama Pegawai</TableHead>
                      <TableHead>Judul Prestasi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrestasi.map((prestasi, index) => (
                      <TableRow key={prestasi.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{getPegawaiNama(prestasi.pegawaiId)}</TableCell>
                        <TableCell>{prestasi.judul}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-sm ${prestasi.kategori === 'penghargaan' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                            prestasi.kategori === 'sertifikasi' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                              prestasi.kategori === 'pelatihan' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            }`}>
                            {prestasi.kategori.charAt(0).toUpperCase() + prestasi.kategori.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{prestasi.tanggal}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={prestasi.deskripsi}>
                          {prestasi.deskripsi}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredPrestasi.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Tidak ada data prestasi yang sesuai filter
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}