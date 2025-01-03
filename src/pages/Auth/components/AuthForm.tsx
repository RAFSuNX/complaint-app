import { InputField } from '../../../components/ui/FormField';
import { Button } from '../../../components/ui/Button';

interface Props {
  mode: 'signin' | 'signup';
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error?: string;
}

export function AuthForm({ mode, onSubmit, loading, error }: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {mode === 'signup' && (
        <InputField
          id="name"
          name="name"
          label="Full Name"
          required
          placeholder="Enter your full name"
          helperText="Your name will be used for notifications"
        />
      )}
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="Enter your email"
        helperText="We'll never share your email with anyone else"
      />
      <InputField
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        placeholder={mode === 'signup' ? 'Create a password' : 'Enter your password'}
        helperText={mode === 'signup' ? 'Must be at least 6 characters long' : undefined}
        minLength={6}
        error={error}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading 
          ? (mode === 'signup' ? 'Creating Account...' : 'Signing in...') 
          : (mode === 'signup' ? 'Create Account' : 'Sign In')}
      </Button>
    </form>
  );
}