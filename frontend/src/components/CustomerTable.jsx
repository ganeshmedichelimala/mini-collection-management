import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  deleteCustomer,
} from "../features/customers/customerSlice";

const CustomerTable = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.customers);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-bold mb-4">Customers</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Outstanding</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.contact_info}</td>
              <td className="p-2">{c.outstanding_amount}</td>
              <td className="p-2">{c.due_date}</td>
              <td className="p-2">{c.status}</td>
              <td className="p-2 space-x-2">
                <button className="text-blue-600" onClick={() => onEdit(c)}>
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => dispatch(deleteCustomer(c.id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
