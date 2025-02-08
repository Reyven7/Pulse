import Page from "@/components/dashboard/page"
import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"
import store from "@/Redux/store"
import { ThemeProvider } from "@/components/ui/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Page />
        <Outlet />
      </Provider>
    </ThemeProvider>
  )
}

export default App
