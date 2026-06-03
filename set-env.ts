import { writeFile } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const targetPath = `./src/environments/environment.ts`;
const envConfigFile = `export const environment = {
   production: false,
   baseUrl: '${process.env['BASE_URL']}',
   yahooUrl: '${process.env['YAHOO_URL']}',
   rapidApiKey: '${process.env['RAPID_API_KEY']}',
   rapidApiHost: '${process.env['RAPID_API_HOST']}'
};`;

writeFile(targetPath, envConfigFile, (err) => {
   if (err) throw err;
   console.log(`Angular environment.ts file generated!`);
});
