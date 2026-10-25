const reviewForm = document.getElementById('reviewForm');
const feedbackMsg = document.getElementById('feedback-msg');

reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('namaPembuat').value.trim();
    const rating = document.getElementById('ratingProduk').value.trim();
    const ulasan = document.getElementById('ulasanTeks').value.trim();

    feedbackMsg.style.display = 'block';

    if (!nama || !rating || !ulasan) {
        feedbackMsg.className = 'msg-error';
        feedbackMsg.textContent = 'Gagal! Semua kolom wajib diisi sebelum mengirim ulasan.';
        return;
    }

    if (rating < 1 || rating > 5) {
        feedbackMsg.className = 'msg-error';
        feedbackMsg.textContent = 'Gagal! Rating harus berupa angka dari 1 hingga 5.';
        return;
    }

    feedbackMsg.className = 'msg-success';
    feedbackMsg.innerHTML = `
        Nama : ${nama}<br>
        Rating: ${rating}<br>
        Pesan Ulasan: ${ulasan}<br><br>
        Terima kasih, ${nama}! Ulasan bintang ${rating} Anda berhasil disimpan.
    `;

    reviewForm.reset();
});