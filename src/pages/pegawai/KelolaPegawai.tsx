import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/atoms/PageHeader';
import { StatusBadge } from '@/components/atoms/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { dataPegawai, dataDokumenPegawai, dataPrestasiPegawai, getPegawaiById } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';
import { Plus, UserPlus, FileUp, Award, Eye, Trash2, Pencil } from 'lucide-react';
import { Pegawai, DokumenPegawai, PrestasiPegawai } from '@/types';

export default function KelolaPegawai() {
  // State for Pegawai Data
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [isAddPegawaiOpen, setIsAddPegawaiOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form State
  const initialFormState = {
    nama: '',
    nip: '',
    jabatan: '',
    golongan: '',
    tanggalMulaiTugas: '',
    tanggalPurnaTugas: '',
    status: 'Aktif',
    kategori: 'PNS',
    gaji: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // States for other tabs
  const [isAddDokumenOpen, setIsAddDokumenOpen] = useState(false);
  const [isAddPrestasiOpen, setIsAddPrestasiOpen] = useState(false);
  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('pegawaiData');
    if (storedData) {
      setPegawaiList(JSON.parse(storedData));
    } else {
      setPegawaiList(dataPegawai);
      localStorage.setItem('pegawaiData', JSON.stringify(dataPegawai));
    }
  }, []);

  // Update localStorage whenever data changes
  const updateLocalStorage = (newData: Pegawai[]) => {
    setPegawaiList(newData);
    localStorage.setItem('pegawaiData', JSON.stringify(newData));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddPegawaiOpen(true);
  };

  const handleEditPegawai = (pegawai: Pegawai) => {
    setFormData({
      nama: pegawai.nama,
      nip: pegawai.nip,
      jabatan: pegawai.jabatan,
      golongan: pegawai.golongan,
      tanggalMulaiTugas: pegawai.tanggalMulaiTugas,
      tanggalPurnaTugas: pegawai.tanggalPurnaTugas || '',
      status: pegawai.status || 'Aktif',
      kategori: pegawai.kategori || 'PNS',
      gaji: pegawai.gaji ? pegawai.gaji.toString() : ''
    });
    setCurrentId(pegawai.id);
    setIsEditing(true);
    setIsAddPegawaiOpen(true);
  };

  const handleDeletePegawai = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data pegawai ini?')) {
      const newData = pegawaiList.filter(p => p.id !== id);
      updateLocalStorage(newData);
      toast({
        title: "Pegawai Dihapus",
        description: "Data pegawai berhasil dihapus",
        variant: "destructive"
      });
    }
  };

  const handleSavePegawai = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jabatan || !formData.status || !formData.gaji || !formData.kategori || !formData.golongan) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon lengkapi semua data wajib (Jabatan, Status, Gaji)",
        variant: "destructive"
      });
      return;
    }

    if (isEditing && currentId) {
      // Update existing
      const updatedList = pegawaiList.map(p =>
        p.id === currentId
          ? {
            ...p,
            ...formData,
            gaji: parseInt(formData.gaji) || 0,
            status: formData.status as any,
            kategori: formData.kategori as any,
            golongan: formData.golongan,
            // Keep other fields that are not in form
          }
          : p
      );
      updateLocalStorage(updatedList as Pegawai[]);
      toast({
        title: "Berhasil Diupdate",
        description: "Data pegawai berhasil diperbarui",
      });
    } else {
      // Add new
      const newPegawai: Pegawai = {
        id: `pegawai-${Date.now()}`,
        username: formData.nama.toLowerCase().replace(/\s+/g, '.') + '.pegawai',
        role: 'pegawai',
        ...formData,
        gaji: parseInt(formData.gaji) || 0,
        status: formData.status as any,
        kategori: formData.kategori as any,
        golongan: formData.golongan,
        divisi: '', // Removed from form but required by type
      };

      updateLocalStorage([...pegawaiList, newPegawai]);
      toast({
        title: "Pegawai Ditambahkan",
        description: "Data pegawai baru berhasil disimpan",
      });
    }

    setIsAddPegawaiOpen(false);
    resetForm();
  };

  const handleAddPegawai = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pegawai Ditambahkan",
      description: "Data pegawai baru berhasil disimpan",
    });
    setIsAddPegawaiOpen(false);
  };

  // State for Dokumen Data
  const [dokumenList, setDokumenList] = useState<DokumenPegawai[]>([]);
  const [isEditingDokumen, setIsEditingDokumen] = useState(false);
  const [currentDokumenId, setCurrentDokumenId] = useState<string | null>(null);

  const initialDokumenForm = {
    pegawaiId: '',
    jenisDokumen: '',
    namaFile: ''
  };
  const [dokumenFormData, setDokumenFormData] = useState(initialDokumenForm);

  // Load Dokumen Data
  useEffect(() => {
    const storedDokumen = localStorage.getItem('dokumenData');
    if (storedDokumen) {
      setDokumenList(JSON.parse(storedDokumen));
    } else {
      setDokumenList(dataDokumenPegawai);
      localStorage.setItem('dokumenData', JSON.stringify(dataDokumenPegawai));
    }
  }, []);

  const updateDokumenLocalStorage = (newData: DokumenPegawai[]) => {
    setDokumenList(newData);
    localStorage.setItem('dokumenData', JSON.stringify(newData));
  };

  const resetDokumenForm = () => {
    setDokumenFormData(initialDokumenForm);
    setIsEditingDokumen(false);
    setCurrentDokumenId(null);
  };

  const handleOpenAddDokumen = () => {
    resetDokumenForm();
    setIsAddDokumenOpen(true);
  };

  const handleSaveDokumen = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];

    if (!dokumenFormData.pegawaiId || !dokumenFormData.jenisDokumen) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon pilih Pegawai dan Jenis Dokumen",
        variant: "destructive"
      });
      return;
    }

    // Validation for new file on create
    if (!isEditingDokumen && !dokumenFormData.namaFile) {
      toast({ title: "Gagal", description: "Mohon pilih file dokumen", variant: "destructive" });
      return;
    }

    if (isEditingDokumen && currentDokumenId) {
      const updatedList = dokumenList.map(d =>
        d.id === currentDokumenId
          ? {
            ...d,
            pegawaiId: dokumenFormData.pegawaiId,
            jenisDokumen: dokumenFormData.jenisDokumen as any,
            namaFile: dokumenFormData.namaFile || d.namaFile,
          }
          : d
      );
      updateDokumenLocalStorage(updatedList);
      toast({ title: "Berhasil Diupdate", description: "Dokumen berhasil diperbarui" });
    } else {
      const newDokumen: DokumenPegawai = {
        id: `dok-${Date.now()}`,
        fileUrl: '#',
        uploadedAt: today,
        pegawaiId: dokumenFormData.pegawaiId,
        jenisDokumen: dokumenFormData.jenisDokumen as any,
        namaFile: dokumenFormData.namaFile,
      };
      updateDokumenLocalStorage([...dokumenList, newDokumen]);
      toast({ title: "Dokumen Ditambahkan", description: "Dokumen berhasil diupload" });
    }

    setIsAddDokumenOpen(false);
    resetDokumenForm();
  };

  const handleDeleteDokumen = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
      const newData = dokumenList.filter(d => d.id !== id);
      updateDokumenLocalStorage(newData);
      toast({ title: "Dokumen Dihapus", description: "Dokumen berhasil dihapus", variant: "destructive" });
    }
  };

  const handleEditDokumen = (dok: DokumenPegawai) => {
    setDokumenFormData({
      pegawaiId: dok.pegawaiId,
      jenisDokumen: dok.jenisDokumen,
      namaFile: ''
    });
    setCurrentDokumenId(dok.id);
    setIsEditingDokumen(true);
    setIsAddDokumenOpen(true);
  };

  // State for Prestasi Data
  const [prestasiList, setPrestasiList] = useState<PrestasiPegawai[]>([]);
  const [isEditingPrestasi, setIsEditingPrestasi] = useState(false);
  const [currentPrestasiId, setCurrentPrestasiId] = useState<string | null>(null);

  const initialPrestasiForm = {
    pegawaiId: '',
    judul: '',
    kategori: '',
    tanggal: '',
    deskripsi: ''
  };
  const [prestasiFormData, setPrestasiFormData] = useState(initialPrestasiForm);

  // Load Prestasi Data
  useEffect(() => {
    const storedPrestasi = localStorage.getItem('prestasiData');
    if (storedPrestasi) {
      setPrestasiList(JSON.parse(storedPrestasi));
    } else {
      setPrestasiList(dataPrestasiPegawai);
      localStorage.setItem('prestasiData', JSON.stringify(dataPrestasiPegawai));
    }
  }, []);

  const updatePrestasiLocalStorage = (newData: PrestasiPegawai[]) => {
    setPrestasiList(newData);
    localStorage.setItem('prestasiData', JSON.stringify(newData));
  };

  const resetPrestasiForm = () => {
    setPrestasiFormData(initialPrestasiForm);
    setIsEditingPrestasi(false);
    setCurrentPrestasiId(null);
  };

  const handleOpenAddPrestasi = () => {
    resetPrestasiForm();
    setIsAddPrestasiOpen(true);
  };

  const handleSavePrestasi = (e: React.FormEvent) => {
    e.preventDefault();

    if (!prestasiFormData.pegawaiId || !prestasiFormData.kategori) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon pilih Pegawai dan Kategori Prestasi",
        variant: "destructive"
      });
      return;
    }

    if (isEditingPrestasi && currentPrestasiId) {
      const updatedList = prestasiList.map(p =>
        p.id === currentPrestasiId
          ? {
            ...p,
            pegawaiId: prestasiFormData.pegawaiId,
            judul: prestasiFormData.judul,
            kategori: prestasiFormData.kategori as any,
            tanggal: prestasiFormData.tanggal,
            deskripsi: prestasiFormData.deskripsi
          }
          : p
      );
      updatePrestasiLocalStorage(updatedList);
      toast({ title: "Berhasil Diupdate", description: "Data prestasi berhasil diperbarui" });
    } else {
      const newPrestasi: PrestasiPegawai = {
        id: `prestasi-${Date.now()}`,
        pegawaiId: prestasiFormData.pegawaiId,
        judul: prestasiFormData.judul,
        kategori: prestasiFormData.kategori as any,
        tanggal: prestasiFormData.tanggal,
        deskripsi: prestasiFormData.deskripsi
      };
      updatePrestasiLocalStorage([...prestasiList, newPrestasi]);
      toast({ title: "Prestasi Ditambahkan", description: "Data prestasi pegawai berhasil disimpan" });
    }

    setIsAddPrestasiOpen(false);
    resetPrestasiForm();
  };

  const handleDeletePrestasi = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus prestasi ini?')) {
      const newData = prestasiList.filter(p => p.id !== id);
      updatePrestasiLocalStorage(newData);
      toast({ title: "Prestasi Dihapus", description: "Data prestasi berhasil dihapus", variant: "destructive" });
    }
  };

  const handleEditPrestasi = (prestasi: PrestasiPegawai) => {
    setPrestasiFormData({
      pegawaiId: prestasi.pegawaiId,
      judul: prestasi.judul,
      kategori: prestasi.kategori,
      tanggal: prestasi.tanggal,
      deskripsi: prestasi.deskripsi
    });
    setCurrentPrestasiId(prestasi.id);
    setIsEditingPrestasi(true);
    setIsAddPrestasiOpen(true);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Kelola Pegawai"
        description="Kelola data, dokumen, dan prestasi pegawai"
      />

      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="data">Data Pegawai</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="prestasi">Prestasi</TabsTrigger>
        </TabsList>

        {/* Tab Data Pegawai */}
        <TabsContent value="data" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Daftar Pegawai</h3>
            <Dialog open={isAddPegawaiOpen} onOpenChange={(open) => {
              setIsAddPegawaiOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddModal}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Tambah Pegawai
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditing ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}</DialogTitle>
                  <DialogDescription>
                    {isEditing ? 'Perbarui data pegawai' : 'Masukkan data pegawai baru'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSavePegawai} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={formData.nama}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nip">NIP</Label>
                    <Input
                      id="nip"
                      value={formData.nip}
                      onChange={handleInputChange}
                      placeholder="NIP-XXXX-XXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gaji">Gaji (IDR)</Label>
                    <Input
                      id="gaji"
                      type="number"
                      value={formData.gaji}
                      onChange={handleInputChange}
                      placeholder="Masukkan nominal gaji"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="jabatan">Jabatan</Label>
                      <Select
                        value={formData.jabatan}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, jabatan: val }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Jabatan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Struktural">Struktural</SelectItem>
                          <SelectItem value="Fungsional">Fungsional</SelectItem>
                          <SelectItem value="Pelaksana">Pelaksana</SelectItem>
                          <SelectItem value="Pendidik">Pendidik</SelectItem>
                          <SelectItem value="Tenaga Kependidikan">Tenaga Kependidikan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="golongan">Golongan</Label>
                      <Select
                        value={formData.golongan}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, golongan: val }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Golongan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="I/a">I/a</SelectItem>
                          <SelectItem value="I/b">I/b</SelectItem>
                          <SelectItem value="I/c">I/c</SelectItem>
                          <SelectItem value="I/d">I/d</SelectItem>
                          <SelectItem value="II/a">II/a</SelectItem>
                          <SelectItem value="II/b">II/b</SelectItem>
                          <SelectItem value="II/c">II/c</SelectItem>
                          <SelectItem value="II/d">II/d</SelectItem>
                          <SelectItem value="III/a">III/a</SelectItem>
                          <SelectItem value="III/b">III/b</SelectItem>
                          <SelectItem value="III/c">III/c</SelectItem>
                          <SelectItem value="III/d">III/d</SelectItem>
                          <SelectItem value="IV/a">IV/a</SelectItem>
                          <SelectItem value="IV/b">IV/b</SelectItem>
                          <SelectItem value="IV/c">IV/c</SelectItem>
                          <SelectItem value="IV/d">IV/d</SelectItem>
                          <SelectItem value="IV/e">IV/e</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tanggalMulaiTugas">Tanggal Mulai Tugas</Label>
                      <Input
                        id="tanggalMulaiTugas"
                        type="date"
                        value={formData.tanggalMulaiTugas}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tanggalPurnaTugas">Tanggal Purna Tugas</Label>
                      <Input
                        id="tanggalPurnaTugas"
                        type="date"
                        value={formData.tanggalPurnaTugas}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status Kepegawaian</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Status Kepegawaian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                          <SelectItem value="Cuti Tahunan">Cuti Tahunan</SelectItem>
                          <SelectItem value="Cuti Sakit">Cuti Sakit</SelectItem>
                          <SelectItem value="Cuti Melahirkan">Cuti Melahirkan</SelectItem>
                          <SelectItem value="Cuti Alasan Penting">Cuti Alasan Penting</SelectItem>
                          <SelectItem value="Cuti Besar">Cuti Besar</SelectItem>
                          <SelectItem value="Cuti di Luar Tanggungan Negara">Cuti di Luar Tanggungan Negara</SelectItem>
                          <SelectItem value="Pensiun">Pensiun</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kategori">Kategori Pegawai</Label>
                      <Select
                        value={formData.kategori}
                        onValueChange={(val) => setFormData(prev => ({ ...prev, kategori: val }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori Pegawai" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CPNS">CPNS</SelectItem>
                          <SelectItem value="PNS">PNS</SelectItem>
                          <SelectItem value="PPPK">PPPK</SelectItem>
                          <SelectItem value="PNS Diperbantukan">PNS Diperbantukan</SelectItem>
                          <SelectItem value="Purna Tugas">Purna Tugas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddPegawaiOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NIP</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Golongan</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Mulai Tugas</TableHead>
                  <TableHead>Purna Tugas</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gaji</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pegawaiList.map((pegawai) => (
                  <TableRow key={pegawai.id}>
                    <TableCell className="font-mono text-sm">{pegawai.nip}</TableCell>
                    <TableCell className="font-medium">{pegawai.nama}</TableCell>
                    <TableCell>{pegawai.jabatan}</TableCell>
                    <TableCell>{pegawai.golongan}</TableCell>
                    <TableCell>{pegawai.kategori}</TableCell>
                    <TableCell>{pegawai.tanggalMulaiTugas}</TableCell>
                    <TableCell>{pegawai.tanggalPurnaTugas || '-'}</TableCell>
                    <TableCell>
                      <StatusBadge
                        status={
                          pegawai.status === 'Aktif' ? 'selesai' :
                            ['Nonaktif', 'Pensiun'].includes(pegawai.status) ? 'terlambat' : 'menunggu'
                        }
                        label={pegawai.status}
                      />
                    </TableCell>
                    <TableCell>
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(pegawai.gaji || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditPegawai(pegawai)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeletePegawai(pegawai.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Tab Dokumen */}
        <TabsContent value="dokumen" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Dokumen Pegawai</h3>
            <Dialog open={isAddDokumenOpen} onOpenChange={(open) => {
              setIsAddDokumenOpen(open);
              if (!open) resetDokumenForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddDokumen}>
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload Dokumen
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditingDokumen ? 'Edit Dokumen' : 'Upload Dokumen Pegawai'}</DialogTitle>
                  <DialogDescription>
                    {isEditingDokumen ? 'Perbarui informasi dokumen' : 'Upload dokumen untuk pegawai tertentu'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSaveDokumen} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pegawai">Pilih Pegawai</Label>
                    <Select
                      value={dokumenFormData.pegawaiId}
                      onValueChange={(val) => setDokumenFormData(prev => ({ ...prev, pegawaiId: val }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pegawai" />
                      </SelectTrigger>
                      <SelectContent>
                        {pegawaiList.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.nama}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jenisDokumen">Jenis Dokumen</Label>
                    <Select
                      value={dokumenFormData.jenisDokumen}
                      onValueChange={(val) => setDokumenFormData(prev => ({ ...prev, jenisDokumen: val }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis dokumen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KTP">KTP</SelectItem>
                        <SelectItem value="NPWP">NPWP</SelectItem>
                        <SelectItem value="Ijazah">Ijazah</SelectItem>
                        <SelectItem value="Sertifikat">Sertifikat</SelectItem>
                        <SelectItem value="Kontrak">Kontrak</SelectItem>
                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">File Dokumen (PDF)</Label>
                    <Input
                      id="file"
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setDokumenFormData(prev => ({ ...prev, namaFile: e.target.files![0].name }));
                        }
                      }}
                      required={!isEditingDokumen}
                    />
                    {isEditingDokumen && !dokumenFormData.namaFile && (
                      <p className="text-xs text-muted-foreground mt-1">Biarkan kosong jika tidak ingin mengubah file</p>
                    )}
                    {isEditingDokumen && dokumenFormData.namaFile && (
                      <p className="text-xs text-green-600 mt-1">File terpilih: {dokumenFormData.namaFile}</p>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDokumenOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pegawai</TableHead>
                  <TableHead>Jenis Dokumen</TableHead>
                  <TableHead>Nama File</TableHead>
                  <TableHead>Tanggal Upload</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dokumenList.map((dok) => {
                  const pegawai = pegawaiList.find(p => p.id === dok.pegawaiId);
                  return (
                    <TableRow key={dok.id}>
                      <TableCell className="font-medium">{pegawai?.nama || 'Pegawai Terhapus'}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-muted rounded text-sm">{dok.jenisDokumen}</span>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{dok.namaFile}</TableCell>
                      <TableCell>{dok.uploadedAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditDokumen(dok)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteDokumen(dok.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Tab Prestasi */}
        <TabsContent value="prestasi" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Prestasi Pegawai</h3>
            <Dialog open={isAddPrestasiOpen} onOpenChange={(open) => {
              setIsAddPrestasiOpen(open);
              if (!open) resetPrestasiForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleOpenAddPrestasi}>
                  <Award className="h-4 w-4 mr-2" />
                  Tambah Prestasi
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{isEditingPrestasi ? 'Edit Prestasi Pegawai' : 'Tambah Prestasi Pegawai'}</DialogTitle>
                  <DialogDescription>
                    {isEditingPrestasi ? 'Perbarui data prestasi' : 'Catat prestasi pegawai'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSavePrestasi} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pegawaiPrestasi">Pilih Pegawai</Label>
                    <Select
                      value={prestasiFormData.pegawaiId}
                      onValueChange={(val) => setPrestasiFormData(prev => ({ ...prev, pegawaiId: val }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih pegawai" />
                      </SelectTrigger>
                      <SelectContent>
                        {pegawaiList.map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.nama}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="judul">Judul Prestasi</Label>
                    <Input
                      id="judul"
                      value={prestasiFormData.judul}
                      onChange={(e) => setPrestasiFormData(prev => ({ ...prev, judul: e.target.value }))}
                      placeholder="Contoh: Karyawan Terbaik 2024"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kategori">Kategori</Label>
                    <Select
                      value={prestasiFormData.kategori}
                      onValueChange={(val) => setPrestasiFormData(prev => ({ ...prev, kategori: val }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="penghargaan">Penghargaan</SelectItem>
                        <SelectItem value="sertifikasi">Sertifikasi</SelectItem>
                        <SelectItem value="pelatihan">Pelatihan</SelectItem>
                        <SelectItem value="pencapaian">Pencapaian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <Input
                      id="tanggal"
                      type="date"
                      value={prestasiFormData.tanggal}
                      onChange={(e) => setPrestasiFormData(prev => ({ ...prev, tanggal: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea
                      id="deskripsi"
                      value={prestasiFormData.deskripsi}
                      onChange={(e) => setPrestasiFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                      placeholder="Deskripsi singkat prestasi"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddPrestasiOpen(false)}>
                      Batal
                    </Button>
                    <Button type="submit">Simpan</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-lg border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pegawai</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prestasiList.map((prestasi) => {
                  const pegawai = pegawaiList.find(p => p.id === prestasi.pegawaiId);
                  return (
                    <TableRow key={prestasi.id}>
                      <TableCell className="font-medium">{pegawai?.nama || 'Pegawai Terhapus'}</TableCell>
                      <TableCell>{prestasi.judul}</TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            prestasi.kategori === 'penghargaan' ? 'selesai' :
                              prestasi.kategori === 'sertifikasi' ? 'menunggu' : 'belum'
                          }
                          label={prestasi.kategori.charAt(0).toUpperCase() + prestasi.kategori.slice(1)}
                        />
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate" title={prestasi.deskripsi}>
                        {prestasi.deskripsi}
                      </TableCell>
                      <TableCell>{prestasi.tanggal}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleEditPrestasi(prestasi)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeletePrestasi(prestasi.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout >
  );
}
