import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "cruds/user-profile";
import RoleManagement from "cruds/role-managament";
import UserManagement from "cruds/user-management";

// Crew Module React components
import MDAvatar from "components/MDAvatar";

const routes = [
  {
    type: "collapse",
    name: "Bruce Mars",
    key: "user-name",
    icon: <MDAvatar alt="Bruce Mars" size="sm" />,
    collapse: [
      {
        name: "My Profile",
        key: "user-profile",
        route: "/user-profile",
        component: <UserProfile />,
      },
      {
        name: "Logout",
        key: "logout",
      },
    ],
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Set Up",
    key: "setup",
    icon: <FontAwesomeIcon icon={faUser} size="sm" />,
    collapse: [
      {
        name: "Roles",
        key: "role-management",
        route: "/role-management",
        component: <RoleManagement />,
        type: "roles",
      },
      {
        name: "Users",
        key: "user-management",
        route: "/user-management",
        component: <UserManagement />,
        type: "users",
      },
    ],
  }
];

export default routes;
