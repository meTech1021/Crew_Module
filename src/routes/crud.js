import EditRole from "cruds/role-managament/edit-role";
import NewRole from "cruds/role-managament/new-role";
import EditUser from "cruds/user-management/edit-user";
import NewUser from "cruds/user-management/new-user";

const crudRoutes = [
  {
    key: "new-role",
    route: "/role-management/new-role",
    component: <NewRole />,
    type: "roles",
  },
  {
    key: "edit-role",
    route: "/role-management/edit-role/:id",
    component: <EditRole />,
    type: "roles",
  },
  {
    key: "new-user",
    route: "/user-management/new-user",
    component: <NewUser />,
    type: "users",
  },
  {
    key: "edit-user",
    route: "/user-management/edit-user/:id",
    component: <EditUser />,
    type: "users",
  },
];

export default crudRoutes;
