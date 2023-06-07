import bcrypt from "bcrypt";

const passwordHashing = async (password: string): Promise<string> => {
    const result = await bcrypt.hash(password, 10);
    return result;
};

const passwordCompare = async (password: string, passwordHashed: string): Promise<boolean> => {
    const matched = await bcrypt.compare(password, passwordHashed);
    return matched;
};

export default { passwordHashing, passwordCompare };