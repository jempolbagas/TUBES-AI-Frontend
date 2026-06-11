export const id = {
  nav: {
    brand: "Prediktor ISPU Jakarta",
    github: "Repositori GitHub",
  },
  hero: {
    title: "Prediktor Kualitas Udara Jakarta",
    subtitle: "Prediksi tingkat indeks standar pencemar udara (ISPU/AQI) besok berbasis kecerdasan buatan dan data cuaca terkini",
    badge: "Jakarta, Indonesia",
  },
  tabs: {
    predict: "Prediksi Esok Hari",
    manual: "Simulasi Skenario",
    history: "Cek Riwayat",
  },
  metrics: {
    temperature_mean: "Suhu Rata-rata",
    temperature_min: "Suhu Minimum",
    precipitation: "Jumlah Curah Hujan",
    windSpeed: "Kecepatan Angin",
    humidity: "Kelembaban Relatif",
    pressure: "Tekanan Permukaan",
    cloudCover: "Tutupan Awan",
    radiation: "Radiasi Gelombang Pendek",
    currentAqi: "AQI Saat Ini",
  },
  predictTab: {
    title: "Prediksi Kualitas Udara Esok Hari",
    subtitle: "Mengambil data meteorologi hari ini secara real-time untuk memproyeksikan estimasi AQI esok hari.",
    btnText: "Ambil Data & Prediksi Besok",
    loadingText: "Mengambil data cuaca dan menjalankan model prediksi...",
    lastUpdated: "Terakhir diperbarui hari ini pukul",
    referenceDate: "Tanggal Referensi (Hari Ini)",
    predictionDate: "Tanggal Prediksi (Besok)",
  },
  manualTab: {
    title: "Simulasi Skenario Kustom",
    subtitle: "Masukkan parameter cuaca secara manual untuk mensimulasikan bagaimana cuaca memengaruhi kualitas udara Jakarta.",
    btnText: "Simulasikan & Prediksi",
    validationError: "Harap periksa kembali apakah nilai berada dalam batas yang wajar.",
    fields: {
      aqi: "AQI Saat Ini (0 - 500)",
      tempMean: "Suhu Rata-rata (°C)",
      tempMin: "Suhu Minimum (°C)",
      precip: "Curah Hujan (mm)",
      wind: "Kecepatan Angin (km/jam)",
      humidity: "Kelembaban Rata-rata (%)",
      pressure: "Tekanan Permukaan Rata-rata (hPa)",
      cloud: "Tutupan Awan Rata-rata (%)",
      radiation: "Radiasi Gelombang Pendek (MJ/m²)",
    },
  },
  historyTab: {
    title: "Analisis Data Meteorologi Historis",
    subtitle: "Pilih tanggal masa lalu untuk mengambil data cuaca sebenarnya dan memprediksi AQI pada hari berikutnya.",
    btnText: "Analisis Tanggal Historis",
    dateLabel: "Pilih Tanggal",
    loadingText: "Mengambil rekaman cuaca historis...",
    noData: "Tidak ada data untuk tanggal ini. Data Open-Meteo tersedia dari 1940 hingga 2-3 hari yang lalu.",
  },
  results: {
    title: "Hasil Prediksi",
    waiting: "Menunggu Input",
    waitingDesc: "Pilih salah satu mode prakiraan di atas lalu klik tombol untuk melihat hasil prediksi.",
    predictedAqi: "Hasil Prediksi AQI",
    categoryLabel: "Kategori Kualitas Udara",
    recommendations: "Rekomendasi Kesehatan",
    error: "Terjadi kesalahan",
    details: "Detail",
  },
  categories: {
    good: "Baik",
    moderate: "Sedang",
    unhealthySensitive: "Tidak Sehat bagi Kelompok Sensitif",
    unhealthy: "Tidak Sehat",
    veryUnhealthy: "Sangat Tidak Sehat",
    hazardous: "Berbahaya",
  },
  healthTips: {
    good: [
      "Hari yang sempurna untuk kegiatan di luar ruangan.",
      "Buka jendela untuk sirkulasi udara bersih di dalam ruangan.",
      "Sangat cocok untuk olahraga outdoor dan rekreasi."
    ],
    moderate: [
      "Orang yang sangat sensitif sebaiknya mengurangi aktivitas fisik berat di luar ruangan.",
      "Masyarakat umum aman untuk beraktivitas di luar ruangan.",
      "Awasi kondisi pernapasan jika Anda memiliki asma atau alergi."
    ],
    unhealthySensitive: [
      "Kelompok sensitif (lansia, anak-anak, penderita asma/jantung) sebaiknya mengurangi aktivitas fisik di luar.",
      "Gunakan masker (minimal N95/KF94) jika harus berada di luar ruangan dalam waktu lama.",
      "Nyalakan penyaring udara (air purifier) di dalam ruangan."
    ],
    unhealthy: [
      "Setiap orang sebaiknya mulai membatasi aktivitas fisik yang lama di luar ruangan.",
      "Gunakan masker N95/KF94 untuk semua aktivitas luar ruangan.",
      "Tutup jendela rapat-rapat dan gunakan penyaring udara di dalam ruangan."
    ],
    veryUnhealthy: [
      "Hindari aktivitas luar ruangan. Kelompok rentan sebaiknya tetap di dalam rumah.",
      "Gunakan masker standar medis/respirator tinggi jika terpaksa keluar rumah.",
      "Tutup semua celah ventilasi udara dan nyalakan air purifier dengan kecepatan tinggi."
    ],
    hazardous: [
      "PERINGATAN KESEHATAN: Semua orang harus menghindari aktivitas fisik di luar ruangan.",
      "Tetap berada di dalam ruangan yang bersih dan tertutup rapat.",
      "Jalankan sistem penyaringan udara efisiensi tinggi (HEPA) secara terus-menerus."
    ]
  },
  legend: {
    title: "Referensi Skala AQI",
    good: "0-50 (Baik)",
    moderate: "51-100 (Sedang)",
    sensitive: "101-150 (Tidak Sehat - Sensitif)",
    unhealthy: "151-200 (Tidak Sehat)",
    veryUnhealthy: "201-300 (Sangat Tidak Sehat)",
    hazardous: "300+ (Berbahaya)",
  },
  footer: {
    builtBy: "Dibuat dengan ❤️ untuk Proyek AI",
    credits: "Didukung oleh API Cuaca Open-Meteo & Model ML Scikit-Learn",
  }
};
