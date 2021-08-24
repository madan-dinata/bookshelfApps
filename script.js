function tambah() {
  document.getElementById("penghalang").style.display = "block";
}
function batal() {
  document.querySelector("#judul").value = "";
  document.querySelector("#penulis").value = "";
  document.querySelector("#tahun").value = "";
  document.querySelector("#sudahDibaca").checked = 0;
  document.getElementById("penghalang").style.display = "none";
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function updateDataToStorage() {
  if (isStorageExist()) {
    document.dispatchEvent(new Event("bookChanged"));
  }
}

let dataBuku = [];
const STORAGE_KEY = "BOOK_APPS";

function input(bookElement) {
  bookElement.preventDefault();
  const judul = document.querySelector("#judul");
  const penulis = document.querySelector("#penulis");
  const tahun = document.querySelector("#tahun");
  const isComplete = document.querySelector("#sudahDibaca");
  bukuBaru = {
    id: +new Date(),
    title: judul.value,
    author: penulis.value,
    year: tahun.value,
    isComplete: isComplete.checked,
  };
  serializedData.push(bukuBaru);

  updateDataToStorage();
}

function sudahSelesai(bookElement) {
  const ID = Number(bookElement.target.id);
  const FIND = serializedData.findIndex(function (element) {
    return element.id === ID;
  });
  -1 !== FIND &&
    (serializedData[FIND] = {
      ...serializedData[FIND],
      isComplete: !0,
    });
  updateDataToStorage();
}

function belumSelesai(bookElement) {
  const ID = Number(bookElement.target.id);
  const FIND = serializedData.findIndex(function (element) {
    return element.id === ID;
  });
  -1 !== FIND &&
    (serializedData[FIND] = {
      ...serializedData[FIND],
      isComplete: !1,
    });
  updateDataToStorage();
}

function simpanBuku(bookElement) {
  const BELUM_SELESAI = document.querySelector("#belumSelesai");
  const SUDAH_SELESAI = document.querySelector("#sudahSelesai");
  (BELUM_SELESAI.innerHTML = ""), (SUDAH_SELESAI.innerHTML = "");
  for (const book of bookElement) {
    const divItem = document.createElement("div");
    divItem.classList.add("item");
    const h4 = document.createElement("h4");
    h4.innerText = book.title;
    const pPenulis = document.createElement("p");
    pPenulis.innerText = "Penulis: " + book.author;
    const pTahun = document.createElement("p");
    if (((pTahun.innerText = "Tahun: " + book.year), divItem.appendChild(h4), divItem.appendChild(pPenulis), divItem.appendChild(pTahun), book.isComplete)) {
      const div = document.createElement("div");
      div.classList.add("action");
      const btnBelumSelesai = document.createElement("button");
      (btnBelumSelesai.id = book.id), (btnBelumSelesai.innerText = "Belum selesai dibaca"), btnBelumSelesai.classList.add("btn-green"), btnBelumSelesai.addEventListener("click", belumSelesai);
      const btnHapus = document.createElement("button");
      (btnHapus.id = book.id),
        (btnHapus.innerText = "Hapus"),
        btnHapus.classList.add("btn-red"),
        btnHapus.addEventListener("click", hapus),
        div.appendChild(btnBelumSelesai),
        div.appendChild(btnHapus),
        divItem.appendChild(div),
        SUDAH_SELESAI.appendChild(divItem);
      batal();
    } else {
      const div = document.createElement("div");
      div.classList.add("action");
      const btnSudahSelesai = document.createElement("button");
      (btnSudahSelesai.id = book.id), (btnSudahSelesai.innerText = "Selesai dibaca"), btnSudahSelesai.classList.add("btn-green"), btnSudahSelesai.addEventListener("click", sudahSelesai);
      const btnHapus = document.createElement("button");
      (btnHapus.id = book.id),
        (btnHapus.innerText = "Hapus"),
        btnHapus.classList.add("btn-red"),
        btnHapus.addEventListener("click", hapus),
        div.appendChild(btnSudahSelesai),
        div.appendChild(btnHapus),
        divItem.appendChild(div),
        BELUM_SELESAI.appendChild(divItem);
      batal();
    }
  }
}

function search(bookElement) {
  bookElement.preventDefault();
  const searchTitle = document.querySelector("#cariJudul");
  query = searchTitle.value;
  if (query) {
    simpanBuku(
      serializedData.filter(function (element) {
        return element.title.toLowerCase().includes(query.toLowerCase());
      })
    );
  } else {
    simpanBuku(serializedData);
  }
}

function hapus(bookElement) {
  const ID = Number(bookElement.target.id),
    FIND = serializedData.findIndex(function (element) {
      return element.id === ID;
    });
  if (window.confirm("Apakah anda yakin ingin menghapus buku ini?")) {
    -1 !== FIND && serializedData.splice(FIND, 1);
    updateDataToStorage();
  }
}

function LOCAL_STORAGE() {
  !(function (book) {
    localStorage.setItem("books", JSON.stringify(book));
  })(serializedData),
    simpanBuku(serializedData);
}

window.addEventListener("load", function () {
  (serializedData = JSON.parse(localStorage.getItem("books")) || []), simpanBuku(serializedData);
  const inputBook = document.querySelector("#inputBook");
  const searchBook = document.querySelector("#searchBook");
  inputBook.addEventListener("submit", input), searchBook.addEventListener("submit", search), document.addEventListener("bookChanged", LOCAL_STORAGE);
});
