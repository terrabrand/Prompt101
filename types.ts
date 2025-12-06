
export enum Category {
  Coding = 'Coding',
  Writing = 'Writing',
  Marketing = 'Marketing',
  Productivity = 'Productivity',
  Design = 'Design',
  Business = 'Business'
}

export type TemplateStatus = 'approved' | 'pending' | 'rejected';
export type TemplateType = 'text' | 'image';

export interface Template {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  tags: string[];
  author: string;
  authorId: string; // ID of the user who created it
  likes: number;
  uses: number;
  createdAt: string;
  status: TemplateStatus;
  adminComment?: string; // Reason for rejection
  type?: TemplateType;
  imageUrl?: string;
}

export interface GeneratedTemplateResponse {
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
}

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  email: string;
}

// New Types for Featured Sections
export interface FeaturedMCP {
  id: string;
  name: string;
  description: string; // Short description for hover/card
  content: string; // Full content for detail page
  logo?: string; // Character or URL
  image?: string; // URL for image/icon
}

export interface FeaturedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'On-site' | 'Hybrid';
  description: string; // Short description
  content: string; // Full job details
  logo?: string;
  salary?: string; // Optional salary range
  applyLink?: string; // Optional external link
}

export type AppView = 'market' | 'admin' | 'user' | 'auth' | 'detail-mcp' | 'detail-job' | 'all-mcps' | 'all-jobs';
