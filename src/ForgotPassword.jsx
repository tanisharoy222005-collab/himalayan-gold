export default function ForgotPassword() {
  return (
    <div className="container">
      <h2>Forgot Password</h2>

      <p>
        Password reset link will be
        sent to your email.
      </p>

      <input
        type="email"
        placeholder="Enter email"
      />

      <button>
        Send Reset Link
      </button>
    </div>
  );
}