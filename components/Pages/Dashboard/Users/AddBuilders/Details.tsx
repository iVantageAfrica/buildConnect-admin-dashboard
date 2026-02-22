import Dropdown from "@/components/ui/Forms/Dropdown";
import InputField from "@/components/ui/Forms/InputField";
import React from "react";
import { useFormContext } from "react-hook-form";

const Details = () => {
  const { register, formState: { errors } } = useFormContext();

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "rejected", label: "Rejected" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First name *"
          placeholder="First name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <InputField
          label="Last name *"
          placeholder="Last name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>
      
      <InputField
        label="Email Address *"
        placeholder="Email Address"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />
      
      <InputField
        label="Phone Number *"
        placeholder="Phone Number"
        error={errors.phoneNumber?.message}
        {...register("phoneNumber")}
      />
      
      <Dropdown
        width="full"
        label="Verification Status"
        options={statusOptions}
        error={errors.verificationStatus?.message}
        {...register("verificationStatus")}
      />
    </div>
  );
};

export default Details;