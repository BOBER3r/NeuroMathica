export default function SignInPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-nm-bg-primary">
      <div className="w-full max-w-md p-6">
        <h1 className="mb-6 text-center text-2xl font-bold text-nm-text-primary">
          Sign In
        </h1>
        {/* Clerk SignIn component will be integrated in T014 */}
        <p className="text-center text-nm-text-secondary">
          Sign in to continue learning
        </p>
      </div>
    </div>
  );
}
