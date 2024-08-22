import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // mkcert() added to generate ssl certificate to run on https to access camera on ip
        mkcert()
    ],
})
