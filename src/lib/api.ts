const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  link?: string;
}

export interface Video {
  id: number;
  title: string;
  category: string;
  embed_url: string;
  video_file: string;
  thumbnail: string;
  description: string;
}

export interface Skill {
  id: number;
  name: string;
  proficiency: number;
  icon?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ClientReview {
  id: number;
  client_name: string;
  review_text: string;
  client_image: string;
  rating: number;
}

export interface Organization {
  id: number;
  name: string;
  logo: string;
  youtube_link: string;
}

export interface ExpertiseItem {
  id: number;
  title: string;
  description: string;
  icon_name: string;
}

export interface SiteSettings {
  profile_image: string | null;
  cv_file: string | null;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  stat1_value: string;
  stat1_label: string;
  stat2_value: string;
  stat2_label: string;
  about_bio: string;
  email: string;
  phone: string;
  location: string;
  youtube_url: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
  facebook_url: string;
  whatsapp_number: string;
}

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  return fetchAPI<Project[]>("/projects/");
}

export async function getVideos(): Promise<Video[]> {
  return fetchAPI<Video[]>("/videos/");
}

export async function getSkills(): Promise<Skill[]> {
  return fetchAPI<Skill[]>("/skills/");
}

export async function getReviews(): Promise<ClientReview[]> {
  return fetchAPI<ClientReview[]>("/reviews/");
}

export async function getOrganizations(): Promise<Organization[]> {
  return fetchAPI<Organization[]>("/organizations/");
}

export async function getExpertise(): Promise<ExpertiseItem[]> {
  return fetchAPI<ExpertiseItem[]>("/expertise/");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchAPI<SiteSettings>("/settings/");
}

export async function submitContact(data: ContactMessage): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
}
