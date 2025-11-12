import Dropdown from "@/components/ui/Forms/Dropdown";
import InputField from "@/components/ui/Forms/InputField";
import React from "react";

const Details = () => {
     const packages = [
    { value: "Premium package", label: "Premium Package" },
    { value: "Starplus package", label: "Starplus Package" },
  ];
 const packageselected = 'package';
  
  return (
    <div className="space-y-4">
      <div className="">
  
        <InputField label="First name" placeholder="First name" />
      </div>
      <div>
   
        <InputField label="Last name" placeholder="Last name" />
      </div>
      <div>
 
        <InputField label="Phone Number" placeholder="Phone Number" />
      </div>
      <div>
 
        <InputField  label="Email Address" placeholder="Email Address" />
      </div>
      <div>
    <Dropdown
             width="xl"
          label="Project Type"
          id="package"
          value={packageselected}
        //   onChange={(e) =>
        //     setValue("package", e.target.value, { shouldValidate: true })
        //   }
          options={packages}
        />
      </div>

      <div>
    <Dropdown
             width="xl"
          label="Status"
          id="package"
          value={packageselected}
        //   onChange={(e) =>
        //     setValue("package", e.target.value, { shouldValidate: true })
        //   }
          options={packages}
        />
      </div>
    </div>
  );
};

export default Details;
