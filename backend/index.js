import express from "express";
import cors from "cors";
import RouterPengguna from "./routes/pengguna_router.js";
import RouterTarif from "./routes/tarif_router.js"
import RouterArea from "./routes/area_router.js"
import RouterKendaraan from "./routes/kendaraan_router.js"
import RouterTransaksi from "./routes/transaksi_router.js"
import RouterLog from "./routes/log_router.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(RouterPengguna);
app.use(RouterTarif);
app.use(RouterArea);
app.use(RouterKendaraan);
app.use(RouterTransaksi);
app.use(RouterLog);

app.listen(5000, ()=> console.log('Server Aplikasi ParkirPK Berjalan.'));