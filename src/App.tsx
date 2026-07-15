import { RouterProvider } from "react-router";
import { router } from "@components/menu/router";
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;