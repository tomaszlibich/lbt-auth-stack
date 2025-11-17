import bcrypt from "bcryptjs";

export const encrypt = async (text: string) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(text, salt);

  return { hash, salt };
};
