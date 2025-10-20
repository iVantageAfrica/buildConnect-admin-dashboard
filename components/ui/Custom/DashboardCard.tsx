"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface DashboardCardProps {
  type: "current" | "investment" | "saving" | "investment-action";
  title: string;
  accountName?: string;
  balance?: string;
  maturityAmount?: string;
  principalAmount?: string;
  interestRate?: string;
  className?: string;
}

export const DashboardCard = ({
  type,
  title,
  accountName,
  balance,
  maturityAmount,
  principalAmount,
  interestRate,
  className = "",
}: DashboardCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const getCardBackground = () => {
    const backgrounds = {
      current: "/Card-1.png",
      investment: "/Card-2.png",
      saving: "/Card-3.png",
      "investment-action": "/Card-4.png",
    };
    return backgrounds[type];
  };

  return (
    <div
      className={`relative h-60 w-[90%] mb-5 bg-red-200 rounded-2xl overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${getCardBackground()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium bg-white backdrop-blur-sm px-3 py-2 text-black rounded-full">
            {title}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-10">
          {accountName && (
            <div>
              <p className="text-sm opacity-80 mb-1">Account Name</p>
              <p className="text-lg font-semibold">{accountName}</p>
            </div>
          )}

          {balance && (
            <div>
              <p className="text-sm opacity-80 mb-1">Account Balance</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">
                  {showBalance ? balance : "****"}
                </p>
                {showBalance ? (
                  <EyeOff
                    size={18}
                    className="opacity-70 cursor-pointer"
                    onClick={() => setShowBalance(false)}
                  />
                ) : (
                  <Eye
                    size={18}
                    className="opacity-70 cursor-pointer"
                    onClick={() => setShowBalance(true)}
                  />
                )}
              </div>
            </div>
          )}

          {maturityAmount && (
            <div>
              <p className="text-sm opacity-80 mb-1">Maturity Amount</p>
              <p className="text-xl font-bold">{maturityAmount}</p>
            </div>
          )}

          {principalAmount && (
            <div>
              <p className="text-sm opacity-80 mb-1">Principal Amount</p>
              <p className="text-xl font-bold">{principalAmount}</p>
            </div>
          )}

          {interestRate && (
            <div className="col-span-2">
              <p className="text-sm opacity-80 mb-1">Interest Rate</p>
              <p className="text-xl font-bold">{interestRate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
