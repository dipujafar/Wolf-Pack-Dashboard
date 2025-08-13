import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const Success_model = (message: Record<string, string>) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message.title || "Successfully!!!",
    text: message.text || "",
    showConfirmButton: false,
    timer: 2000,
  });
};

export const Error_Modal = (message: Record<string, string>) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: message?.title || message || "Failed!!!",
    text: message?.text || "",
    showConfirmButton: false,
    timer: 2000,
  });
};
