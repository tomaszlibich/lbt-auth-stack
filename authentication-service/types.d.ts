declare type RegisterBody = {
  username: string;
  password: string;
};

declare type User = {
  id: string;
  username: string;
  password_hash: string;
  password_salt: string;
  registered_at: string;
  ip_addresses: string[];
  user_agents: string[];
};
