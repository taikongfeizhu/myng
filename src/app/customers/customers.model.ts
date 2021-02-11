export class Profile {
  email: string;
}

export class Customer {
  id: number;
  name: string;
  phone: string;
  password: string;
  profile: Profile;
}
