import { TableUsers } from "../../components/Table";
import "./style.scss";

const Admin = () => {
  return (
    <section className="sections-users__list">
      <h2>Users</h2>
      <TableUsers />
    </section>
  );
};

export default Admin;
