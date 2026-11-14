import { RouterProvider, type DataRouter } from "react-router";
function App({ router }: { router: DataRouter }) {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
