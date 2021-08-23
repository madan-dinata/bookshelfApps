function tambah() {
  document.getElementById("penghalang").style.display = "block";
}
function batal() {
  const judul = document.querySelector("#judul"),
    penulis = document.querySelector("#penulis"),
    tahun = document.querySelector("#tahun"),
    isComplete = document.querySelector("#sudahDibaca");
  judul.value = "";
  penulis.value = "";
  tahun.value = "";
  isComplete.checked = 0;
  document.getElementById("penghalang").style.display = "none";
}

if (typeof Storage !== "undefined") console.log("BERHASIL");
else console.log("GAGAL");

let dataBuku = [];
const STORAGE_KEY = "BOOK_APPS";

function input(t) {
  t.preventDefault();
  const judul = document.querySelector("#judul"),
    penulis = document.querySelector("#penulis"),
    tahun = document.querySelector("#tahun"),
    isComplete = document.querySelector("#sudahDibaca"),
    c = {
      id: +new Date(),
      title: judul.value,
      author: penulis.value,
      year: tahun.value,
      isComplete: isComplete.checked,
    };
  e.push(c), document.dispatchEvent(new Event("bookChanged"));
}

function sudahSelesai(t) {
  const n = Number(t.target.id),
    o = e.findIndex(function (e) {
      return e.id === n;
    });
  -1 !== o &&
    ((e[o] = {
      ...e[o],
      isComplete: !0,
    }),
    document.dispatchEvent(new Event("bookChanged")));
}

function belumSelesai(t) {
  const n = Number(t.target.id),
    o = e.findIndex(function (e) {
      return e.id === n;
    });
  -1 !== o &&
    ((e[o] = {
      ...e[o],
      isComplete: !1,
    }),
    document.dispatchEvent(new Event("bookChanged")));
}

function c(e) {
  const BELUM_SELESAI = document.querySelector("#belumSelesai");
  const SUDAH_SELESAI = document.querySelector("#sudahSelesai");
  (BELUM_SELESAI.innerHTML = ""), (SUDAH_SELESAI.innerHTML = "");
  for (const c of e) {
    const e = document.createElement("div");
    e.classList.add("item");
    const a = document.createElement("h4");
    a.innerText = c.title;
    const u = document.createElement("p");
    u.innerText = "Penulis: " + c.author;
    const r = document.createElement("p");
    if (((r.innerText = "Tahun: " + c.year), e.appendChild(a), e.appendChild(u), e.appendChild(r), c.isComplete)) {
      const div = document.createElement("div");
      div.classList.add("action");
      const o = document.createElement("button");
      (o.id = c.id), (o.innerText = "Belum selesai dibaca"), o.classList.add("btn-green"), o.addEventListener("click", belumSelesai);
      const a = document.createElement("button");
      (a.id = c.id), (a.innerText = "Hapus"), a.classList.add("btn-red"), a.addEventListener("click", hapus), div.appendChild(o), div.appendChild(a), e.appendChild(div), SUDAH_SELESAI.appendChild(e);
      batal();
    } else {
      const div = document.createElement("div");
      div.classList.add("action");
      const d = document.createElement("button");
      (d.id = c.id), (d.innerText = "Selesai dibaca"), d.classList.add("btn-green"), d.addEventListener("click", sudahSelesai);
      const a = document.createElement("button");
      (a.id = c.id), (a.innerText = "Hapus"), a.classList.add("btn-red"), a.addEventListener("click", hapus), div.appendChild(d), div.appendChild(a), e.appendChild(div), BELUM_SELESAI.appendChild(e);
      batal();
    }
  }
}

function search(t) {
  t.preventDefault();
  const searchTitle = document.querySelector("#cariJudul");
  (query = searchTitle.value),
    query
      ? c(
          e.filter(function (e) {
            return e.title.toLowerCase().includes(query.toLowerCase());
          })
        )
      : c(e);
}

function hapus(t) {
  const n = Number(t.target.id),
    o = e.findIndex(function (e) {
      return e.id === n;
    });
  if (window.confirm("Apakah anda yakin ingin menghapus buku ini?")) {
    -1 !== o && (e.splice(o, 1), document.dispatchEvent(new Event("bookChanged")));
  } else {
  }
}

function LOCAL_STORAGE() {
  !(function (e) {
    localStorage.setItem("books", JSON.stringify(e));
  })(e),
    c(e);
}

window.addEventListener("load", function () {
  (e = JSON.parse(localStorage.getItem("books")) || []), c(e);
  const inputBook = document.querySelector("#inputBook"),
    searchBook = document.querySelector("#searchBook");
  inputBook.addEventListener("submit", input), searchBook.addEventListener("submit", search), document.addEventListener("bookChanged", LOCAL_STORAGE);
});
