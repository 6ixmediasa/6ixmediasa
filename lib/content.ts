import snapshot from './cms-content.json';
import { projects as seedProjects, type Project } from './projects';

const asArray = <T>(value: unknown, fallback: T[] = []): T[] => Array.isArray(value) ? value as T[] : fallback;

export const projects: Project[] = snapshot.projects.length ? snapshot.projects.map((p: any) => ({
  slug: p.slug,
  name: p.title,
  category: p.category || 'Web Design',
  tagline: p.tagline || '',
  about: p.about || '',
  services: asArray<string>(p.services_json),
  tech: asArray<string>(p.tech_json),
  year: p.year || '',
  industry: p.industry || '',
  cover: p.cover_image || undefined,
  shots: asArray<string>(p.shots_json),
  docs: asArray<CmsDoc>(p.docs_json),
  seoTitle: p.seo_title || undefined,
  seoDescription: p.seo_description || undefined,
})) : seedProjects;

export const categories = Array.from(new Set(projects.map((p) => p.category)));
export function getProject(slug: string) { return projects.find((p) => p.slug === slug); }
export function relatedProjects(p: Project, n = 3) { return projects.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0,n); }

export type CmsDoc = { label: string; file: string; note?: string };
export type PlatformContent = {
  slug: string; name: string; what: string; h1: string; lead: string;
  metaTitle: string; metaDescription: string; price?: string; priceNote?: string;
  features: string[]; audience: string; deliverables: string[];
  faqs: {q:string;a:string}[]; docs: CmsDoc[];
};
export const platforms: PlatformContent[] = snapshot.platforms.map((p: any) => ({
  slug:p.slug,name:p.name,what:p.what_label||'',h1:p.h1||p.name,lead:p.lead||'',
  metaTitle:p.meta_title||p.name,metaDescription:p.meta_description||p.lead||'',
  price:p.price||undefined,priceNote:p.price_note||undefined,
  features:asArray<string>(p.features_json),audience:p.audience||'',
  deliverables:asArray<string>(p.deliverables_json),faqs:asArray<{q:string;a:string}>(p.faqs_json),docs:asArray<CmsDoc>(p.docs_json),
}));
export function getPlatform(slug:string){return platforms.find((p)=>p.slug===slug);}

export type BlogPost = { title:string; slug:string; excerpt:string; content:string; coverImage?:string; publishedAt?:string; seoTitle?:string; seoDescription?:string };
export const posts: BlogPost[] = snapshot.posts.map((p:any)=>({title:p.title,slug:p.slug,excerpt:p.excerpt||'',content:p.content||'',coverImage:p.cover_image||undefined,publishedAt:p.published_at||undefined,seoTitle:p.seo_title||undefined,seoDescription:p.seo_description||undefined}));
export function getPost(slug:string){return posts.find((p)=>p.slug===slug);}
