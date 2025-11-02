import toast from "react-hot-toast";

const isValid: Record<string, Function> = {
  email(value: FormDataEntryValue): boolean {
    const email = value.toString().trim();
    if (!email || email.length < 14 || email.length > 35) {
      toast.error("Email must be between 9 to 30 characters");
      return false;
    }
    return true;
  },
  password(value: FormDataEntryValue): boolean {
    const password = value.toString().trim();
    if (!password || password.length < 7 || password.length > 15) {
      toast.error("Password must be between 7 to 15 characters");
      return false;
    }
    return true;
  },
  username(value: FormDataEntryValue): boolean {
    const username = value.toString().trim();
    if (!username || username.length < 5 || username.length > 20) {
      toast.error("username must be between 5 to 20 characters");
      return false;
    }
    return true;
  },
};

export default isValid;
