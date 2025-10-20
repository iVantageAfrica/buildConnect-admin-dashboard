import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

interface OTPInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  onChange?: (code: string) => void;
  className?: string;
}

export interface OTPInputRef {
  clear: () => void;
  focus: () => void;
  getValue: () => string;
}

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(
  ({ length = 6, onComplete, onChange, className = '' }, ref) => {
    const [code, setCode] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

 
    useImperativeHandle(ref, () => ({
      clear: () => {
        setCode(Array(length).fill(''));
        inputRefs.current[0]?.focus();
      },
      focus: () => {
        inputRefs.current[0]?.focus();
      },
      getValue: () => {
        return code.join('');
      },
    }));


    const handleChange = (index: number, value: string): void => {
     
      if (value.length > 1) return;

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

   
      if (onChange) {
        onChange(newCode.join(''));
      }

     
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if all inputs are filled
      if (newCode.every((digit) => digit !== '') && onComplete) {
        onComplete(newCode.join(''));
      }
    };

    // Handle backspace
    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ): void => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    // Handle paste
    const handlePaste = (
      e: React.ClipboardEvent<HTMLInputElement>
    ): void => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').slice(0, length);
      const newCode = [...code];

      for (let i = 0; i < pastedData.length; i++) {
        newCode[i] = pastedData[i];
      }
      setCode(newCode);

      // Notify parent component
      if (onChange) {
        onChange(newCode.join(''));
      }

      // Focus last filled input
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();

      // Check if complete
      if (newCode.every((digit) => digit !== '') && onComplete) {
        onComplete(newCode.join(''));
      }
    };

    return (
      <div className={`flex gap-2 justify-center ${className}`}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-14 h-14 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
    );
  }
);

OTPInput.displayName = 'OTPInput';