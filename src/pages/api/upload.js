import Formidable from "formidable-serverless";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function uploadFormFiles(
  req,
  res
) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });
    
    let fileName = '';

    form
      .on("file", (name, file) => {
        const data = fs.readFileSync(file.path);
        fs.writeFileSync(`public/uploads/${file.name}`, data);
        fs.unlinkSync(file.path);
        fileName = file.name;
      })
      .on("aborted", () => {
        reject(res.status(500).send('Aborted'))  
      })
      .on("end", () => {
        resolve(res.send({
          status: 'ok',
          fileName: fileName
        }));
        // res.status(200).send('done');
      });

    await form.parse(req)
  });
}