interface TeamMember {
    name: string;
    role: string;
    imageSrc: string;
    bio: string;
    socialLinks: SocialLink[];
}


interface SocialLink {
    platform: string;
    url: string;
    icon: React.JSX.Element;
}
interface tabsData {
    value: string;
    label: string;
    content: React.JSX.Element;
}[]
interface Person {
    id: number;
    name: string;
    unavailable: boolean;
  }

  interface UserData {
    name: string;
    image: string;
    accountNumber: string;
    accountName: string;
    amount: string;
  }
