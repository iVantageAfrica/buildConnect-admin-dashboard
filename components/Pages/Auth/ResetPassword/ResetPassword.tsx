import { OTPInput, OTPInputRef } from '@/components/ui/Forms/InputOtp';
import React, { useRef, useState } from 'react';
import Authlayout from '../Authlayout';
import { Capandcaculator } from '@/libs/constants/image';


const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const otpInputRef = useRef<OTPInputRef>(null);


  const handleCodeComplete = (code: string) => {
    setVerificationCode(code);
  };


  const handleCodeChange = (code: string) => {
    setVerificationCode(code);
  };

  const handleSubmit = async () => {
    if (verificationCode.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    
    try {
 
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: verificationCode,
          email: 'buildconnect@gmail.com' 
        })
      });
      
      if (response.ok) {
        window.location.href = '/set-new-password';
      } else {
        alert('Invalid code. Please try again.');
        otpInputRef.current?.clear();
        setVerificationCode('');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await fetch('/api/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'buildconnect@gmail.com' })
      });
      alert('Code resent! Check your email.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Authlayout image={Capandcaculator}>
   
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Reset Your Password
        </h1>
        
        <p className="text-center text-gray-600 mb-8">
          we sent a code to{' '}
          <span className="text-blue-600 font-medium">
            buildconnect@gmail.com
          </span>
        </p>

        {/* OTP Input Component */}
        <div className="mb-8">
          <OTPInput
            ref={otpInputRef}
            length={6}
            onComplete={handleCodeComplete}
            onChange={handleCodeChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || verificationCode.length !== 6}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? 'Verifying...' : 'Reset Password'}
        </button>

        <p className="text-center text-gray-600 mb-6">
          Didn't receive any email?{' '}
          <button
            onClick={handleResend}
            className="text-blue-600 font-medium hover:underline"
          >
            Resend
          </button>
        </p>

        <button
          onClick={() => window.location.href = '/login'}
          className="flex items-center justify-center w-full text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="mr-2">←</span>
          Back to log in
        </button>
    </Authlayout>
   
  );
};

export default ResetPassword;