import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// Serves api/contact.js during `npm run dev`, mirroring how a host like Vercel runs it.
function contactApi() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        try {
          req.body = raw ? JSON.parse(raw) : {}
        } catch {
          req.body = {}
        }
        res.status = (code) => ((res.statusCode = code), res)
        res.json = (obj) => {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(obj))
        }
        // load fresh each request so edits to the handler apply without a restart
        const { default: handler } = await server.ssrLoadModule('/api/contact.js')
        await handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // expose RESEND_API_KEY (from .env.local) to the server-side handler only
  Object.assign(process.env, loadEnv(mode, process.cwd(), 'RESEND_'))
  return {
    plugins: [react(), tailwindcss(), contactApi()],
  }
})
