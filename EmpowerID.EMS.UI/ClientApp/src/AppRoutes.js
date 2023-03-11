//import { Counter } from "./components/Counter";
//import { FetchData } from "./components/FetchData";
import { Employee } from "./components/Employee";
import { Department } from "./components/Department";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/employees',
        element: <Employee />
    },
    {
        path: '/departments',
        element: <Department />
    }
];

export default AppRoutes;
