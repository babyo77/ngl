
import { Dashboard } from '..'
import { ThemeProvider } from '../Themeprovider'

function Account() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <Dashboard/>
        </ThemeProvider>
  )
}

export default Account