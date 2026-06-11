export const id = {
  nav: {
    brand: "Prediktor ISPU Jakarta",
    github: "Repositori GitHub",
  },
  hero: {
    title: "Prediktor Kualitas Udara Jakarta",
    subtitle: "Prediksi tingkat indeks standar pencemar udara (ISPU/AQI) besok berbasis kecerdasan buatan dan data cuaca terkini",
    badge: "Jakarta, Indonesia",
    cta: "Mulai Prediksi",
    scrollHint: "Gulir ke bawah untuk prakiraan",
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
  metricDetails: {
    currentAqi: {
      meaning: "Indeks terstandarisasi untuk menunjukkan tingkat polusi udara saat ini dan risiko kesehatan yang terkait.",
      formula: "Dihitung dari konsentrasi PM2.5, PM10, O3, NO2, SO2, dan CO.",
      relation: "Bertindak sebagai tingkat polusi dasar (baseline) untuk memproyeksikan prediksi kualitas udara selanjutnya.",
    },
    temperature_mean: {
      meaning: "Suhu udara rata-rata yang dicatat pada ketinggian 2 meter di atas permukaan tanah selama periode 24 jam.",
      formula: "T_mean = 1/24 * Jumlah(T_per_jam) (°C)",
      relation: "Suhu rata-rata yang lebih tinggi mempercepat reaksi fotokimia yang membentuk ozon di permukaan tanah.",
    },
    temperature_min: {
      meaning: "Suhu udara terendah yang tercatat selama siklus 24 jam.",
      formula: "T_min = Min(T_per_jam) (°C)",
      relation: "Suhu minimum yang rendah dapat menyebabkan inversi suhu, memerangkap materi partikulat di dekat tanah.",
    },
    precipitation: {
      meaning: "Jumlah total air cair atau padat yang jatuh dari awan, diukur sebagai kedalaman akumulasi.",
      formula: "P_sum = Jumlah(P_per_jam) (mm)",
      relation: "Curah hujan membersihkan materi partikulat yang melayang di udara dan polutan gas yang larut dalam air (deposisi basah).",
    },
    windSpeed: {
      meaning: "Kecepatan angin rata-rata pada ketinggian 10 meter di atas tanah sepanjang hari.",
      formula: "WS_mean = 1/24 * Jumlah(WS_per_jam) (km/jam)",
      relation: "Angin kencang membantu menyebarkan polutan dan menurunkan konsentrasi lokal, sedangkan angin tenang memicu akumulasi.",
    },
    humidity: {
      meaning: "Rasio uap air di udara dibandingkan dengan jumlah maksimum yang dapat ditampung udara pada suhu tersebut.",
      formula: "RH_mean = 1/24 * Jumlah(RH_per_jam) (%)",
      relation: "Kelembaban relatif yang tinggi memfasilitasi konversi kimia gas menjadi partikel PM2.5 sekunder.",
    },
    pressure: {
      meaning: "Tekanan atmosfer yang dihasilkan oleh berat kolom udara di atas permukaan.",
      formula: "P_mean = 1/24 * Jumlah(P_per_jam) (hPa)",
      relation: "Sistem tekanan tinggi mengindikasikan massa udara yang stabil yang memerangkap polutan, sedangkan tekanan rendah membawa dispersi.",
    },
    cloudCover: {
      meaning: "Fraksi langit yang tertutup awan secara rata-rata sepanjang hari.",
      formula: "CC_mean = 1/24 * Jumlah(CC_per_jam) (%)",
      relation: "Tutupan awan yang lebih tebal membatasi radiasi matahari, memperlambat pembentukan polutan fotokimia.",
    },
    radiation: {
      meaning: "Energi matahari total yang mencapai permukaan dalam bentuk radiasi gelombang pendek.",
      formula: "Rad_sum = Jumlah(Rad_per_jam) (MJ/m²)",
      relation: "Radiasi gelombang pendek yang tinggi memicu proses fotokimia, meningkatkan pembentukan ozon permukaan dan kabut asap.",
    },
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
  chart: {
    title: "Analisis Tren AQI 7 Hari",
    desc: "Perbandingan tingkat AQI aktual yang diukur dengan hasil perkiraan model machine learning selama 7 hari terakhir.",
    actual: "AQI Aktual",
    predicted: "Prediksi AQI",
  },
  footer: {
    builtBy: "Dibuat dengan ❤️ untuk Proyek AI",
    credits: "Didukung oleh API Cuaca Open-Meteo & Model ML Scikit-Learn",
  }
};
