export function hitung_tarif(waktuMasuk, waktuKeluar, tarif, tarifMaksimal) {
    const masuk = new Date(waktuMasuk).getTime();
    const keluar =new Date(waktuKeluar).getTime();

    if (
        !Number.isFinite(masuk) ||
        !Number.isFinite(keluar) ||
        keluar < masuk
    ) {
        throw new Error("Waktu parkir tidak valid");
    }

    const durasiMenit = Math.ceil(
        (keluar - masuk) / (1000 * 60)
    );

    const durasiJam = Math.ceil(durasiMenit / 60);

    const tarifTotal = Math.min(
        durasiJam * Number(tarif),
        Number(tarifMaksimal)
    );

    return {
        durasi: durasiMenit,
        tarif_total: tarifTotal
    }
}