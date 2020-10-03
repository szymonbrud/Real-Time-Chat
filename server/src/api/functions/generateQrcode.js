import axios from 'axios';

const generateQrcodeByLink = async (link) => {
  const response = await axios.get(
    `https://api.qrserver.com/v1/create-qr-code/?data=${link}&size=150x150`,
    {
      responseType: 'arraybuffer',
    },
  );

  const bufferImageResponse = await Buffer.from(response.data, 'binary').toString('base64');

  return bufferImageResponse;
};

export default generateQrcodeByLink;
