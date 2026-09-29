import {
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/icons";
import type { IconProps } from "@/components/icons/icon.types";

export type SocialProfile = {
  name: string;
  handle: string;
  href: string;
  Icon: (props: IconProps) => React.ReactNode;
  tag: string;
};

export const CONTACT_NAME = "Ahmed Wael";
export const PHONE_NUMBER = "+20 109 167 3132";
export const RAW_PHONE = "201091673132";
export const EMAIL = "contactahmedwael@gmail.com";
export const GITHUB_PROFILE_HREF = "https://github.com/contactahmedwael-hub";

export const socialLinks: SocialProfile[] = [
  {
    name: "LinkedIn",
    handle: "ahmed-wael-a37546401",
    href: "https://www.linkedin.com/in/ahmed-wael-a37546401",
    Icon: LinkedInIcon,
    tag: "Professional",
  },
  {
    name: "GitHub",
    handle: "contactahmedwael-hub",
    href: GITHUB_PROFILE_HREF,
    Icon: GitHubIcon,
    tag: "Source Code",
  },
  {
    name: "Instagram",
    handle: "@ahmedxwaell",
    href: "https://www.instagram.com/ahmedxwaell/",
    Icon: InstagramIcon,
    tag: "Personal Profile",
  },
  {
    name: "TikTok",
    handle: "@ahmedxwaell",
    href: "https://www.tiktok.com/@ahmedxwaell",
    Icon: TikTokIcon,
    tag: "Daily Clips",
  },
  {
    name: "Facebook",
    handle: "Ahmed Wael",
    href: "https://www.facebook.com/share/1E2DZU9mA7/?mibextid=wwXIfr",
    Icon: FacebookIcon,
    tag: "Social",
  },
];
