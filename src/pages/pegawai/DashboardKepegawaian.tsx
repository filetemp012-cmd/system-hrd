import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { PageHeader } from '@/components/atoms/PageHeader';
import { StatCard } from '@/components/atoms/StatCard';
import { MenuCard } from '@/components/molecules/MenuCard';
import { useState, useEffect } from 'react';
import { dataPegawai, dataDokumenPegawai } from '@/data/dummyData';
import { Pegawai, DokumenPegawai } from '@/types';
import {
  Users,
  UserCheck,
  UserX,
  FileText,
  BarChart3
} from 'lucide-react';

export default function DashboardKepegawaian() {
  const [summary, setSummary] = useState({
    totalPegawai: 0,
    pegawaiAktif: 0,
    pegawaiCuti: 0,
    totalDokumen: 0
  });

  useEffect(() => {
    // Helper to get data from local storage or fallback to dummy data
    const getLocalData = <T,>(key: string, fallback: T): T => {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
      // Initialize if not present (optional, but consistent with KelolaPegawai)
      // We won't write to storage here to avoid side effects if KelolaPegawai handles initialization,
      // but we will use the fallback for display.
      return fallback;
    };

    const pegawaiList = getLocalData<Pegawai[]>('pegawaiData', dataPegawai);
    const dokumenList = getLocalData<DokumenPegawai[]>('dokumenData', dataDokumenPegawai);


    setSummary({
      totalPegawai: pegawaiList.length,
      pegawaiAktif: pegawaiList.filter(p => p.status === 'Aktif').length,
      pegawaiCuti: pegawaiList.filter(p => p.status.startsWith('Cuti')).length,
      totalDokumen: dokumenList.length
    });
  }, []);

  return (
    <DashboardLayout>
      <PageHeader
        title="Dashboard Kepegawaian"
        description="Ringkasan data dan informasi kepegawaian"
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Pegawai"
          value={summary.totalPegawai}
          icon={Users}
          description="Seluruh pegawai"
        />
        <StatCard
          title="Pegawai Aktif"
          value={summary.pegawaiAktif}
          icon={UserCheck}
          description="Status aktif"
        />
        <StatCard
          title="Pegawai Cuti"
          value={summary.pegawaiCuti}
          icon={UserX}
          description="Sedang cuti"
        />
        <StatCard
          title="Total Dokumen"
          value={summary.totalDokumen}
          icon={FileText}
          description="Dokumen tersimpan"
        />
      </div>

      {/* Quick Stats */}
      <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-xl border border-primary/20">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/20">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Tingkat Pegawai Aktif</p>
            <p className="text-3xl font-bold text-primary">
              {Math.round((summary.pegawaiAktif / summary.totalPegawai) * 100)}%
            </p>
          </div>
        </div>
      </div>

      {/* Menu Cards */}
      <h3 className="text-lg font-semibold text-foreground mb-4">Menu Utama</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MenuCard
          title="Kelola Pegawai"
          description="Input data, dan dokumen pegawai."
          icon={Users}
          to="/pegawai/kelola"
          color="primary"
        />
        <MenuCard
          title="Laporan"
          description="Lihat rekap data pegawai secara lengkap."
          icon={BarChart3}
          to="/pegawai/laporan"
          color="secondary"
        />
      </div>
    </DashboardLayout>
  );
}
