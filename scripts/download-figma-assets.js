const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Lista de todos os assets que precisam ser baixados
const assets = [
  // CompaniesWhyChooseSection
  { url: 'http://localhost:3845/assets/543f62422d49fcf64113bbf61bb494bb197f7a7f.svg', name: 'custom-training-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg', name: 'large-scale-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg', name: 'certification-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/383cbf89aab1b130e8cb501022886c0b384a83ed.svg', name: 'roi-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/2c0f14fd6d435b16cd5f12838166e112f8d49d28.svg', name: 'assessment-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/89bbf97087f236a0511cf8ffd3e8d0fa8917aadd.svg', name: 'reports-icon.svg', folder: 'companies' },

  // CTASection
  { url: 'http://localhost:3845/assets/f4a931db8943d2536ef7cde59612791312b244c2.svg', name: 'cta-vector-1.svg', folder: 'cta' },
  { url: 'http://localhost:3845/assets/f2835f9984ecff53bb6b2034467fdfbbb835a21e.svg', name: 'cta-vector-2.svg', folder: 'cta' },
  { url: 'http://localhost:3845/assets/b19d14a6b160e2b6bff106c88829c249195e66df.svg', name: 'cta-vector-3.svg', folder: 'cta' },
  { url: 'http://localhost:3845/assets/244449c820b692dae802ff6c0bf0aca297635dbe.svg', name: 'cta-vector-4.svg', folder: 'cta' },

  // BusinessSolutions
  { url: 'http://localhost:3845/assets/dc4adee40a11709e616dd96804bcc90d81cd1c89.png', name: 'equipe-treinamento.png', folder: 'business' },
  { url: 'http://localhost:3845/assets/55ab9f1d9096d62684e713414181510df0a903ee.svg', name: 'business-icon-1.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/620d654561bd4cb5bcc129d8f21ae5d8112c718b.svg', name: 'business-icon-2.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/2f094ba6f82679ff7b99739bda20157712620294.svg', name: 'business-icon-3.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/383cbf89aab1b130e8cb501022886c0b384a83ed.svg', name: 'business-icon-4.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/5ade6605a0f5819c6cc1f7c1ba8b0cf2cd9f68d2.svg', name: 'business-vector-1.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/bf55094dc985d65ad569e2228e69066e6bd6fef4.svg', name: 'business-vector-2.svg', folder: 'business' },
  { url: 'http://localhost:3845/assets/b19d14a6b160e2b6bff106c88829c249195e66df.svg', name: 'business-vector-3.svg', folder: 'business' },

  // CompaniesCtaSection & CompaniesHeroSection
  { url: 'http://localhost:3845/assets/811a991b345bfbb5e3195c895fde4e4207bcf479.svg', name: 'phone-icon.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/5c5e1f1fd3dfde8b6ddd7abf7b83f9e4a20251c8.svg', name: 'document-icon-1.svg', folder: 'companies' },
  { url: 'http://localhost:3845/assets/783e9fad5cd70f51a37c1bd850ef00755788e8c5.svg', name: 'document-icon-2.svg', folder: 'companies' },

  // AboutValuesSection
  { url: 'http://localhost:3845/assets/1d6f58639b6f04a6cf5c40eb40e1a13a6eca6406.svg', name: 'qualidade-icon.svg', folder: 'about' },
  { url: 'http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg', name: 'experiencia-icon.svg', folder: 'about' },
  { url: 'http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg', name: 'comunidade-icon.svg', folder: 'about' },
  { url: 'http://localhost:3845/assets/799494d827f127f86c5e57007d86aea469da3089.svg', name: 'inovacao-icon.svg', folder: 'about' },

  // NewsletterSection
  { url: 'http://localhost:3845/assets/2556629e321633a383b9cdc50c0e5518c732d9f5.svg', name: 'newsletter-icon-1.svg', folder: 'newsletter' },
  { url: 'http://localhost:3845/assets/061ddfda1907bf1f6ef26c6d4044390389bbad79.svg', name: 'newsletter-icon-2.svg', folder: 'newsletter' },

  // AboutMissionSection
  { url: 'http://localhost:3845/assets/da331f6f1f93224bb02d6f187fbe747be3719910.png', name: 'porto-maritimo.png', folder: 'about' },

  // StatisticsSection
  { url: 'http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg', name: 'stats-icon-1.svg', folder: 'statistics' },
  { url: 'http://localhost:3845/assets/537135f79c9e23f7320a9785b5f58e4886273585.svg', name: 'stats-icon-2.svg', folder: 'statistics' },
  { url: 'http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg', name: 'stats-icon-3.svg', folder: 'statistics' },
  { url: 'http://localhost:3845/assets/a0457e5fe91da5061387fcedcdab415684b7914a.svg', name: 'stats-icon-4.svg', folder: 'statistics' },

  // AboutFacilitiesSection
  { url: 'http://localhost:3845/assets/04ed5fa7def09453699ee8b4ad66c64c86e35ce2.png', name: 'sala-aula-moderna.png', folder: 'facilities' },
  { url: 'http://localhost:3845/assets/a23604c60f9e6270453ebb75e8f5b6d343e1a59f.png', name: 'laboratorio-simulacao.png', folder: 'facilities' },
  { url: 'http://localhost:3845/assets/5406bb3ddeff5c339fa60bed9e15e299c4cab9fc.png', name: 'centro-estudos.png', folder: 'facilities' },

  // TestimonialsCarousel
  { url: 'http://localhost:3845/assets/9bbdfb06a5eae3ca01387e38cee556cb0ba93eb3.png', name: 'carlos-mendes.png', folder: 'testimonials' },
  { url: 'http://localhost:3845/assets/0d5da6ab018faf09b0940ac3e0ab4d6d514c431f.png', name: 'roberto-costa.png', folder: 'testimonials' },
  { url: 'http://localhost:3845/assets/4b925ba4927f944016ec1e102e0c42ddfd5012fb.svg', name: 'testimonials-icon-1.svg', folder: 'testimonials' },
  { url: 'http://localhost:3845/assets/dd4abcc08f44f451064f61de00065ebf3f13b768.svg', name: 'testimonials-icon-2.svg', folder: 'testimonials' },

  // WhyChooseVisionMarine
  { url: 'http://localhost:3845/assets/dc4adee40a11709e616dd96804bcc90d81cd1c89.png', name: 'treinamento-naval.png', folder: 'why-choose' },
  { url: 'http://localhost:3845/assets/90c3062d3b6c3fd51741d8dcca749adcbaa1ae4a.svg', name: 'why-icon-1.svg', folder: 'why-choose' },
  { url: 'http://localhost:3845/assets/99d011682e0511fb81a660ad2140a71496b4591e.svg', name: 'why-icon-2.svg', folder: 'why-choose' },
  { url: 'http://localhost:3845/assets/5915d9f2f8b925ca4f49d431c83e043ed554dd40.svg', name: 'why-icon-3.svg', folder: 'why-choose' },
  { url: 'http://localhost:3845/assets/3f47c8d5c630d6dc54572e89be3e89b15a9ea31d.svg', name: 'why-icon-4.svg', folder: 'why-choose' },
];

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function main() {
  const publicDir = path.join(__dirname, '..', 'public', 'assets', 'figma');

  console.log('📥 Starting Figma assets download...\n');
  console.log(`Target directory: ${publicDir}\n`);

  let downloaded = 0;
  let failed = 0;

  for (const asset of assets) {
    try {
      // Create folder if doesn't exist
      const folderPath = path.join(publicDir, asset.folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filepath = path.join(folderPath, asset.name);

      // Skip if already exists
      if (fs.existsSync(filepath)) {
        console.log(`⊘ Skipped (exists): ${asset.name}`);
        continue;
      }

      await downloadFile(asset.url, filepath);
      downloaded++;

      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`✗ Failed: ${asset.name} - ${error.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Download complete!`);
  console.log(`Downloaded: ${downloaded} files`);
  console.log(`Failed: ${failed} files`);
  console.log(`\nAssets saved to: ${publicDir}`);
}

main().catch(console.error);
