// =====================
// LOGIN DATA
// =====================
const user = {
    email: "octkhairu@gmail.com",
    password: "345678"
};


// =====================
// TOAST FUNCTION
// =====================
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const icon = type === "success" ? "✅" : "❌";

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-msg">${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// =====================
// LOGIN FUNCTION
// =====================
function login() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  if (!emailEl || !passwordEl) return;

  const email = emailEl.value;
  const password = passwordEl.value;

  if (email === user.email && password === user.password) {
    showToast("Login berhasil! Mengalihkan...", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } else {
    showToast("Email atau password salah!", "error");
  }
}



// =====================
// LOGOUT FUNCTION
// =====================
function logout() {
  showToast("Sampai jumpa! Mengalihkan...", "success");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

// =====================
// MODAL (LOGIN PAGE)
// =====================
function openModal(type) {
    const lupa = document.getElementById("lupaModal");
    const daftar = document.getElementById("daftarModal");

    if (!lupa || !daftar) return;

    if (type === "lupa") {
        lupa.style.display = "block";
    } else {
        daftar.style.display = "block";
    }
}

function closeModal() {
    const lupa = document.getElementById("lupaModal");
    const daftar = document.getElementById("daftarModal");

    if (!lupa || !daftar) return;

    lupa.style.display = "none";
    daftar.style.display = "none";
}

// =====================
// GREETING (DASHBOARD)
// =====================
const greetingEl = document.getElementById("greeting");

if (greetingEl) {
    const jam = new Date().getHours();
    let greeting;

    if (jam < 12) {
        greeting = "Selamat Pagi";
    } else if (jam < 15) {
        greeting = "Selamat Siang";
    } else if (jam < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }

    greetingEl.innerText = greeting + ", Admin UT";
}

// =====================
// DATA DELIVERY ORDER
// =====================
const dataDO = {
    "123": {
        nama: "Budi Santoso",
        status: "Sedang Dikirim",
        ekspedisi: "JNE Reguler",
        tanggal: "10 Mei 2026",
        jenis: "Reguler",
        total: "Rp 50.000",
        progress: 60
    },
    "456": {
        nama: "Siti Rahayu",
        status: "Sedang Dikirim",
        ekspedisi: "TIKI",
        tanggal: "8 Mei 2026",
        jenis: "Kilat",
        total: "Rp 75.000",
        progress: 60
    }
};

// =====================
// TRACKING FUNCTION
// =====================
function cariDO() {
    const inputEl = document.getElementById("do");
    const hasilDiv = document.getElementById("hasil");

    if (!inputEl || !hasilDiv) return;

    const input = inputEl.value.trim();
    const data = dataDO[input];

    if (data) {
        document.getElementById("r-nama").innerText = data.nama;
        document.getElementById("r-status").innerText = data.status;
        document.getElementById("r-exp").innerText = data.ekspedisi;
        document.getElementById("r-tgl").innerText = data.tanggal;
        document.getElementById("r-jenis").innerText = data.jenis;
        document.getElementById("r-total").innerText = data.total;
        document.getElementById("persen").innerText = data.progress + "%";

        const bar = document.getElementById("progressBar");

        bar.style.width = "0%";
        bar.innerText = "";

        setTimeout(() => {
            bar.style.width = data.progress + "%";
            bar.innerText = data.progress + "%";
        }, 100);

        hasilDiv.style.display = "block";
    } else {
        hasilDiv.style.display = "none";
        alert("Data DO tidak ditemukan. Coba nomor: 123 atau 456");
    }
}

// =====================
// ENTER KEY SUPPORT
// =====================
const doInput = document.getElementById("do");

if (doInput) {
    doInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") cariDO();
    });
}

// =====================
// DATA BAHAN AJAR
// =====================
const dataBahanAjar = [
    { kode: "BA001", nama: "Matematika Dasar", stok: 50 },
    { kode: "BA002", nama: "Algoritma", stok: 30 },
    { kode: "BA003", nama: "Basis Data", stok: 20 }
];

// =====================
// HELPER: WARNA STOK
// =====================
function getStokClass(stok) {
    if (stok >= 40) return "stok-high";
    if (stok >= 25) return "stok-med";
    return "stok-low";
}

// =====================
// TAMPILKAN DATA STOK
// =====================
function tampilkanStok() {
    const tabel = document.querySelector("#tabelStok tbody");

    if (!tabel) return;

    tabel.innerHTML = "";

    dataBahanAjar.forEach(item => {
        const stokClass = getStokClass(item.stok);
        let row = `
            <tr>
                <td><span class="kode-badge">${item.kode}</span></td>
                <td>${item.nama}</td>
                <td><span class="stok-pill ${stokClass}">${item.stok}</span></td>
            </tr>
        `;
        tabel.innerHTML += row;
    });
}

// =====================
// TAMBAH DATA
// =====================
function tambahData() {
    const kode = document.getElementById("kode").value;
    const nama = document.getElementById("nama").value;
    const stok = document.getElementById("stok").value;

    if (!kode || !nama || !stok) {
        alert("Semua field harus diisi!");
        return;
    }

    dataBahanAjar.push({
        kode: kode,
        nama: nama,
        stok: parseInt(stok)
    });

    tampilkanStok();

    // Reset input setelah tambah
    document.getElementById("kode").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("stok").value = "";
}

// =====================
// AUTO LOAD
// =====================
document.addEventListener("DOMContentLoaded", tampilkanStok);