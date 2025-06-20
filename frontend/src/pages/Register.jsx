import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../features/auth/authSlice";
import { Navigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  if (token) return <Navigate to="/dashboard" replace />;

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          required
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
