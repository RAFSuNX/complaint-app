import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { TextField } from '../ui/TextField';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: FormData) => Promise<void>;
  error?: string;
  loading?: boolean;
}

export function AuthForm({ type, onSubmit, error, loading }: AuthFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold text-gray-900">
          {type === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          {type === 'login' 
            ? 'Sign in to your account to continue'
            : 'Fill in your details to get started'
          }
        </p>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <TextField
              label="Full Name"
              name="fullName"
              type="text"
              icon={<User className="w-5 h-5" />}
              required
              autoComplete="name"
              placeholder="John Doe"
            />
          )}
          <TextField
            label="Email Address"
            name="email"
            type="email"
            icon={<Mail className="w-5 h-5" />}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            icon={<Lock className="w-5 h-5" />}
            required
            autoComplete={type === 'login' ? 'current-password' : 'new-password'}
            minLength={6}
            placeholder="••••••••"
          />
          <Button
            type="submit"
            className="w-full"
            isLoading={loading}
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}