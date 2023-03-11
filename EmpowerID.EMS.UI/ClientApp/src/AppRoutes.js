import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { EmployeeData } from "./components/EmployeeData";
import { Home } from "./components/Home";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/employees',
        element: <EmployeeData />
    }
];

export default AppRoutes;
