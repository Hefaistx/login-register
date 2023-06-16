const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'calowry-entry-img';

async function uploadImage(file, fileName) {
  try {
    const bucket = storage.bucket(bucketName);
    const path = `images/${fileName}`;
    const options = {
      destination: path,
      metadata: {
        contentType: 'image/jpeg', // Sesuaikan dengan tipe gambar yang diupload
      },
    };

    await file.mv(fileName); // Memindahkan file yang diunggah ke server

    await bucket.upload(fileName, options);

    const imageUrl = `https://storage.googleapis.com/${bucketName}/${path}`;

    return {
      fileName,
      imageUrl,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const uploadImgToBucket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).send('Tidak ada file yang diunggah.');
    }

    const imageFile = req.files.image;
    const imagePath = yield uploadImage(imageFile.tempFilePath, imageFile.name);
    // Lakukan hal-hal lain dengan imagePath
    res.send(`Gambar berhasil diunggah. Path: ${imagePath}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan saat mengunggah gambar.');
  }
});

