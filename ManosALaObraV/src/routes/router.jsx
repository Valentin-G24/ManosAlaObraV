import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Projects from "../pages/Projects/projects";
import StoriesGral from "../pages/StoriesGral/storiesGral";
import Project from "../pages/Project/project";
import Epic from "../pages/Epic/epic";
import StoriesOfEpic from "../pages/StoriesOfEpic/storiesOfEpic";
import Login from "../pages/Login/login";
import ProtectedRoute from "../components/molecules/ProtectedRoute/protectedRoute";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "my-projects",
                element: <Projects />,
            },
            {
                path: "my-stories",
                element: <StoriesGral />,
            },
            {
                path: "my-projects/:projectId",
                element: <Project />,
            },
            {
                path: "my-projects/:projectId/:epicId",
                element: <Epic />,
            },
            {
                path: "my-projects/:projectId/:epicId/:storyId",
                element: <StoriesOfEpic />,
            },
            {
                path: "settings",
                element: <h1>Settings</h1>,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Navigate to="/" />,
    },
    {
        path: "*", // Manejo de rutas no existentes
        element: <Navigate to="/login" />,
    },
]);
