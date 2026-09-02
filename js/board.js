// ===================================================================
// Moment & Co. — custom board & checkout logic
// ===================================================================

const WHATSAPP_NUMBER = "6285839807758"; // TODO: ganti dengan nomor WhatsApp toko

initNavToggle();

// ---------- Resolve selected design from ?id= ----------
const params = new URLSearchParams(window.location.search);
const requestedId = parseInt(params.get("id"), 10);
const selectedDesign = DESIGNS.find(d => d.id === requestedId) || DESIGNS[0];

document.getElementById("selDesignName").textContent = selectedDesign.name;
document.getElementById("selDesignPrice").textContent =
  selectedDesign.occasion + " · " + formatRupiah(selectedDesign.price) + " / acara";
document.getElementById("sumDesign").textContent = selectedDesign.name;
document.getElementById("sumPrice").textContent = formatRupiah(selectedDesign.price) + " / acara";

// ---------- Field refs ----------
const fCongrats  = document.getElementById("fCongrats");
const fNote      = document.getElementById("fNote");
const fOccasion  = document.getElementById("fOccasion");
const fName      = document.getElementById("fName");
const fMessage   = document.getElementById("fMessage");
const fFrom      = document.getElementById("fFrom");

const cName      = document.getElementById("cName");
const cPhone     = document.getElementById("cPhone");
const cEventDate = document.getElementById("cEventDate");
const cAddress   = document.getElementById("cAddress");
const cNotes     = document.getElementById("cNotes");

const pvCongrats = document.getElementById("pvCongrats");
const pvNote     = document.getElementById("pvNote");
const pvName     = document.getElementById("pvName");
const pvMessage  = document.getElementById("pvMessage");
const pvFrom     = document.getElementById("pvFrom");

const sumOccasion  = document.getElementById("sumOccasion");
const sumEventDate = document.getElementById("sumEventDate");
const sumName      = document.getElementById("sumName");
const sumCustomer  = document.getElementById("sumCustomer");
const sumAddress   = document.getElementById("sumAddress");
const sumPayment   = document.getElementById("sumPayment");

// ---------- Live preview + summary ----------
function updatePreview(){
  pvCongrats.textContent = fCongrats.value.trim() || "Selamat";
  pvNote.textContent = fNote.value.trim();
  pvName.textContent = fName.value.trim() || "Nama Anda";
  pvMessage.textContent = fMessage.value.trim() || "Pesan Anda akan muncul di sini.";
  pvFrom.textContent = fFrom.value.trim() ? ("— " + fFrom.value.trim()) : "";

  sumOccasion.textContent = fOccasion.value;
  sumName.textContent = fName.value.trim() || "—";
}

function formatEventDate(value){
  if (!value) return "—";
  const d = new Date(value + "T00:00:00");
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

function updateCustomerSummary(){
  sumCustomer.textContent = cName.value.trim() || "—";
  sumEventDate.textContent = formatEventDate(cEventDate.value);
  sumAddress.textContent = cAddress.value.trim() || "—";
}

[fCongrats, fNote, fOccasion, fName, fMessage, fFrom].forEach(el => {
  el.addEventListener("input", updatePreview);
  el.addEventListener("change", updatePreview);
});
[cName, cEventDate, cAddress].forEach(el => {
  el.addEventListener("input", updateCustomerSummary);
  el.addEventListener("change", updateCustomerSummary);
});

document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".payment-option").forEach(label => label.classList.remove("selected"));
    radio.closest(".payment-option").classList.add("selected");
    sumPayment.textContent = radio.value;
    document.getElementById("paymentError").style.display = "none";
  });
});

updatePreview();
updateCustomerSummary();

// ---------- Validation ----------
// Semua section (kustomisasi, info, pembayaran, ringkasan) kini tampil sekaligus
// dalam satu halaman yang di-scroll, jadi saat validasi gagal kita cukup
// scroll & fokus langsung ke field bermasalah — tidak perlu pindah tab lagi.
function setFieldError(fieldWrapper, hasError){
  if (!fieldWrapper) return;
  fieldWrapper.classList.toggle("has-error", hasError);
}

function validate(){
  let valid = true;

  const requiredTextFields = [
    { wrapId: "fieldName", input: fName },
    { wrapId: "fieldMessage", input: fMessage },
    { wrapId: "fieldCustName", input: cName },
    { wrapId: "fieldCustPhone", input: cPhone },
    { wrapId: "fieldEventDate", input: cEventDate },
    { wrapId: "fieldCustAddress", input: cAddress },
  ];

  let firstInvalid = null;
  let firstInvalidWrapId = null;

  requiredTextFields.forEach(({ wrapId, input }) => {
    const wrapper = document.getElementById(wrapId);
    const empty = input.value.trim() === "";
    setFieldError(wrapper, empty);
    if (empty){
      valid = false;
      if (!firstInvalid){
        firstInvalid = input;
        firstInvalidWrapId = wrapId;
      }
    }
  });

  const paymentChosen = document.querySelector('input[name="payment"]:checked');
  const paymentError = document.getElementById("paymentError");
  if (!paymentChosen){
    paymentError.style.display = "block";
    valid = false;
    if (!firstInvalid){
      firstInvalid = document.getElementById("paymentOptions");
      firstInvalidWrapId = "paymentOptions";
    }
  } else {
    paymentError.style.display = "none";
  }

  return { valid, firstInvalid, firstInvalidWrapId };
}

// ---------- Build WhatsApp message ----------
function buildMessage(paymentValue){
  const lines = [
    "Halo, saya mau sewa papan ucapan.",
    "=== DETAIL SEWA ===",
    "Design: " + selectedDesign.name,
    "Occasion: " + fOccasion.value,
    "Tanggal Acara: " + formatEventDate(cEventDate.value),
    "Congratulations: " + (fCongrats.value.trim() || "Selamat"),
    "Note: " + (fNote.value.trim() || "-"),
    "Name: " + fName.value.trim(),
    "Message: " + fMessage.value.trim(),
    "From: " + (fFrom.value.trim() || "-"),
    "",
    "=== DATA PENYEWA ===",
    "Nama: " + cName.value.trim(),
    "WhatsApp: " + cPhone.value.trim(),
    "Alamat Pengantaran: " + cAddress.value.trim(),
    "Catatan Pengantaran & Pengambilan: " + (cNotes.value.trim() || "-"),
    "Metode Pembayaran: " + paymentValue,
    "Harga Sewa: " + formatRupiah(selectedDesign.price) + " / acara",
    "",
    "Terima kasih.",
  ];
  return lines.join("\n");
}

// ---------- Submit ----------
document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();

  const { valid, firstInvalid } = validate();
  const banner = document.getElementById("formErrorBanner");

  if (!valid){
    banner.style.display = "block";

    if (firstInvalid && typeof firstInvalid.focus === "function"){
      firstInvalid.focus({ preventScroll: false });
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  banner.style.display = "none";
  const paymentValue = document.querySelector('input[name="payment"]:checked').value;
  const message = buildMessage(paymentValue);
  const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
});
