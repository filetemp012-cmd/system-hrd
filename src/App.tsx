import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Login from "./pages/login/Login";
import DashboardKepegawaian from "./pages/pegawai/DashboardKepegawaian";
import KelolaPegawai from "./pages/pegawai/KelolaPegawai";
import LaporanPegawai from "./pages/pegawai/LaporanPegawai";
import DashboardBos from "./pages/bos/DashboardBos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Pegawai Routes */}
            <Route path="/pegawai/dashboard" element={<DashboardKepegawaian />} />
            <Route path="/pegawai/kelola" element={<KelolaPegawai />} />
            <Route path="/pegawai/laporan" element={<LaporanPegawai />} />
            
            {/* Bos Routes */}
            <Route path="/bos/dashboard" element={<DashboardBos />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
