import pdf from 'html-pdf';
import fs from 'fs';
import crypto from 'crypto';
import handlebars from 'handlebars';
import { resolve } from 'path';

class GeneratePDFController {
  async create(req, res) {
    // Handlebars biblioteca para manipular arquivos html na parte servidor

    // Pego os dados enviados do front-end;
    const { tableData, confrontations } = req.body;

    // Leitura do arquivo .hbs
    const html = fs.readFileSync(
      resolve(__dirname, '..', 'views', 'templates', 'matchTemplate.hbs'),
      'utf-8'
    );

    const template = handlebars.compile(html);
    const pdfHtml = template({ tableData, confrontations }); // Passo as variáveis para o template html

    const hashNamePdf = crypto.randomBytes(8).toString('hex'); // Nomes aleatórios para nao substituir o pdf atual

    await new Promise(() => {
      pdf
        .create(pdfHtml) // Crio o pdf
        .toFile(
          // Defino o caminho que vai ser salvo
          resolve(
            __dirname,
            '..',
            'reports',
            `${hashNamePdf}-reportsmatch.pdf`
          ),
          (err, _) => {
            if (err) {
              console.log('Error');
              return res.json('Error', err);
            }
            // Retorna a rota
            const urlPDF = `http://localhost:3333/pdf/${hashNamePdf}-reportsmatch.pdf`;
            return res.json(urlPDF);
          }
        );
    });
  }
}

export default new GeneratePDFController();
