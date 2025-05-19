/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Controller } from "react-hook-form";

interface FormFieldProps {
  name: string;
  control: any;
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "file";
}

const FormField: React.FC<FormFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  type,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></Controller>
  );
};

export default FormField;
