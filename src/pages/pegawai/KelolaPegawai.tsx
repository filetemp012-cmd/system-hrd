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
import { dataPegawai, dataDokumenPegawai, getPegawaiById } from '@/data/dummyData';
import { useToast } from '@/hooks/use-toast';
import { Plus, UserPlus, FileUp, Eye, Trash2, Pencil } from 'lucide-react';
import { Pegawai, DokumenPegawai } from '@/types';

export default function KelolaPegawai() {
  // State for Pegawai Data
  const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
  const [isAddPegawaiOpen, setIsAddPegawaiOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
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
    setFormData(initialFormState);
    setIsEditing(false);
    setIsViewOpen(false);
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
    setIsViewOpen(false);
    setIsAddPegawaiOpen(true);
  };

  const handleViewPegawai = (pegawai: Pegawai) => {
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
    setIsViewOpen(true);
    setIsEditing(false); // Ensure editing is false
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
  const [activeTab, setActiveTab] = useState('data');

  const initialDokumenForm = {
    pegawaiId: '',
    jenisDokumen: '',
    namaFile: '',
    kategori: ''
  };
  // Document Types Mapping
  const DOCUMENT_TYPES: Record<string, string[]> = {
    pribadi: ['KTP', 'Kartu Keluarga', 'NPWP', 'Buku Rekening Gaji', 'Pas Foto Resmi'],
    pendidikan: ['Ijazah', 'Transkrip Nilai', 'Sertifikat Pendukung'],
    kepegawaian: ['SK CPNS', 'SK PNS', 'SK Pangkat Terakhir', 'SK Jabatan', 'KARPEG', 'SKP', 'Daftar Riwayat Hidup', 'Pakta Integritas'],
    kesejahteraan: ['BPJS Kesehatan', 'Taspen', 'KARIS/KARSU', 'Dokumen Tunjangan Keluarga'],
    administrasi: ['Surat Tugas', 'Kontrak Kerja', 'Dokumen Cuti', 'Dokumen Pensiun', 'Prestasi Pegawai'],
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

  const handleOpenAddDokumen = (kategori: string) => {
    resetDokumenForm();
    setDokumenFormData(prev => ({ ...prev, kategori }));
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
        kategori: dokumenFormData.kategori as any // Save the category
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
      namaFile: '',
      kategori: dok.kategori || activeTab // Fallback to current tab if undefined
    });
    setCurrentDokumenId(dok.id);
    setIsEditingDokumen(true);
    setIsAddDokumenOpen(true);
  };

  const renderDokumenContent = (kategori: string, title: string) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button onClick={() => handleOpenAddDokumen(kategori)}>
          <FileUp className="h-4 w-4 mr-2" />
          Upload Dokumen
        </Button>
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
            {dokumenList
              .filter(d => d.kategori === kategori || (!d.kategori && kategori === 'pribadi')) // Default old docs to pribadi or handle migration
              .map((dok) => {
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
            {dokumenList.filter(d => d.kategori === kategori || (!d.kategori && kategori === 'pribadi')).length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Belum ada dokumen di kategori ini
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );



  return (
    <DashboardLayout>
      <PageHeader
        title="Kelola Pegawai"
        description="Kelola data, dokumen, dan prestasi pegawai"
      />

      <Tabs defaultValue="data" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="inline-flex w-full justify-start border rounded-lg bg-transparent p-0 overflow-x-auto">
          <TabsTrigger
            value="data"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Data Pegawai
          </TabsTrigger>
          <TabsTrigger
            value="pribadi"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Dokumen Pribadi
          </TabsTrigger>
          <TabsTrigger
            value="pendidikan"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Dokumen Pendidikan
          </TabsTrigger>
          <TabsTrigger
            value="kepegawaian"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Dokumen PNS
          </TabsTrigger>
          <TabsTrigger
            value="kesejahteraan"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Dokumen Kesejahteraan
          </TabsTrigger>
          <TabsTrigger
            value="administrasi"
            className="flex-1 min-w-max rounded-none border-r last:border-r-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none h-10 px-4"
          >
            Dokumen Administrasi
          </TabsTrigger>
        </TabsList>

        {/* Tab Data Pegawai - Keeping original content structure but ensuring it's wrapped correctly */}
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
              <DialogContent className={isViewOpen ? "max-w-3xl" : "max-w-md"}>
                <DialogHeader>
                  <DialogTitle>
                    {isViewOpen ? 'Detail Data Pegawai' : isEditing ? 'Edit Data Pegawai' : 'Tambah Pegawai Baru'}
                  </DialogTitle>
                  <DialogDescription>
                    {isViewOpen ? 'Informasi lengkap pegawai' : isEditing ? 'Perbarui data pegawai' : 'Masukkan data pegawai baru'}
                  </DialogDescription>
                </DialogHeader>

                {isViewOpen ? (
                  <div className="grid grid-cols-2 gap-6 py-4">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Nama Lengkap</Label>
                      <div className="font-medium text-lg">{formData.nama}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">NIP</Label>
                      <div className="font-medium text-lg font-mono">{formData.nip}</div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Jabatan</Label>
                      <div className="font-medium">{formData.jabatan}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Golongan</Label>
                      <div className="font-medium">{formData.golongan}</div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Kategori Pegawai</Label>
                      <div className="font-medium">{formData.kategori}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Status Kepegawaian</Label>
                      <div className="pt-1">
                        <StatusBadge status={formData.status === 'Aktif' ? 'selesai' : ['Nonaktif', 'Pensiun'].includes(formData.status) ? 'terlambat' : 'menunggu'} label={formData.status} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Tanggal Mulai Tugas</Label>
                      <div className="font-medium">{formData.tanggalMulaiTugas}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-muted-foreground">Tanggal Purna Tugas</Label>
                      <div className="font-medium">{formData.tanggalPurnaTugas || '-'}</div>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <Label className="text-muted-foreground">Gaji</Label>
                      <div className="font-medium text-lg">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(parseInt(formData.gaji) || 0)}
                      </div>
                    </div>

                    <div className="col-span-2 flex justify-end pt-4 border-t">
                      <Button onClick={() => setIsAddPegawaiOpen(false)}>Tutup</Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSavePegawai} className="space-y-4">
                    <fieldset disabled={isViewOpen} className="space-y-4">
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
                    </fieldset>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsAddPegawaiOpen(false)}>
                        {isViewOpen ? 'Tutup' : 'Batal'}
                      </Button>
                      {!isViewOpen && <Button type="submit">Simpan</Button>}
                    </div>
                  </form>
                )}
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
                        <Button variant="ghost" size="sm" onClick={() => handleViewPegawai(pegawai)}>
                          <Eye className="h-4 w-4" />
                        </Button>
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

        {/* Render Documents Tabs */}
        <TabsContent value="pribadi">{renderDokumenContent('pribadi', 'Dokumen Pribadi')}</TabsContent>
        <TabsContent value="pendidikan">{renderDokumenContent('pendidikan', 'Dokumen Pendidikan')}</TabsContent>
        <TabsContent value="kepegawaian">{renderDokumenContent('kepegawaian', 'Dokumen PNS')}</TabsContent>
        <TabsContent value="kesejahteraan">{renderDokumenContent('kesejahteraan', 'Dokumen Kesejahteraan')}</TabsContent>
        <TabsContent value="administrasi">{renderDokumenContent('administrasi', 'Dokumen Administrasi')}</TabsContent>

        {/* Shared Upload Dialog */}
        <Dialog open={isAddDokumenOpen} onOpenChange={(open) => {
          setIsAddDokumenOpen(open);
          if (!open) resetDokumenForm();
        }}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{isEditingDokumen ? 'Edit Dokumen' : 'Upload Dokumen'}</DialogTitle>
              <DialogDescription>
                {isEditingDokumen ? 'Perbarui informasi dokumen' : `Upload dokumen untuk kategori ${activeTab}`}
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
                    {(DOCUMENT_TYPES[activeTab] || ['Lainnya']).map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
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


      </Tabs>
    </DashboardLayout >
  );
}
