import {defineConfig} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/manifest.json',
          dest: '.',
          transform: (content) => {
            const packageJsonPath = path.resolve(__dirname, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            const manifest = JSON.parse(content.toString());

            manifest.version = packageJson.version;
            manifest.description = packageJson.description;

            return JSON.stringify(manifest, null, 2);
          },
        },
        {
          src: 'src/icon.png',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      keep_fnames: true,
    },
    rollupOptions: {
      input: {
        background: 'src/background.ts',
        images: 'src/images.ts',
        text: 'src/text.ts',
        style: 'src/style.ts',
      },
      output: {
        dir: 'dist',
        entryFileNames: '[name].js',
      },
    },
  },
});