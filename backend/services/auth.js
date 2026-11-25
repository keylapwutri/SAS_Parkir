import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                msg: "Token tidak ditemukan."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            "SECRET KEY"
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: "Token tidak valid atau sudah kedaluwarsa."
        });
    }
};

export const allowRole = (...roles) => {
    return (req, res, next) => {
        // Pastikan pengguna sudah terautentikasi
        if (!req.user) {
            return res.status(401).json({
                msg: "Silakan login terlebih dahulu."
            });
        }

        // Periksa role pengguna
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                msg: "Kamu tidak memiliki izin untuk mengakses fitur ini."
            });
        }

        next();
    };
};