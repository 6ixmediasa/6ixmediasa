import snapshot from './cms-content.json';
import { projects as seedProjects, type Project } from './projects';

const asArray = <T>(value: unknown, fallback: T[] = []): T[] => Array.isArray(value) ? value as T[] : fallback;
export type CmsDoc = { label: string; file: string; note?: string };
export type CmsProject = Project & { docs?: CmsDoc[]; seoTitle?: string; seoDescription?: string };

export const projects: CmsProject[] = snapshot.projects.length ? snapshot.projects.map((p: any) => ({
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

export type PlatformContent = {
  slug: string; name: string; what: string; h1: string; lead: string;
  metaTitle: string; metaDescription: string; price?: string; priceNote?: string;
  features: string[]; audience: string; deliverables: string[];
  faqs: {q:string;a:string}[]; docs: CmsDoc[];
};
const platformFallback: PlatformContent[] = [
  ['vendra','Vendra','Multi-vendor ecommerce','Vendra — multi-vendor marketplace platform','Let other businesses sell on your platform while you take a commission on every order.'],
  ['freshlane','Freshlane','Online grocery marketplace','Freshlane — online grocery marketplace platform','Multi-store grocery ordering with delivery slots, substitutions and picker workflows.'],
  ['tablo','Tablo','Restaurant ordering and delivery','Tablo — restaurant ordering and delivery platform','Multi-restaurant food ordering with kitchen displays, driver dispatch and live tracking.'],
  ['chalkline','Chalkline','Tutoring marketplace','Chalkline — online tutoring marketplace platform','Connect tutors and students, with scheduling, video lessons and payments in one place.'],
  ['lendo','Lendo','Rental marketplace','Lendo — rental marketplace platform','Rent out anything by the hour, day or week, with deposits and availability handled automatically.'],
  ['callout','Callout','On-demand services','Callout — on-demand services marketplace platform','Match customers with plumbers, cleaners, electricians and trades, with quotes and job tracking.'],
  ['waypoint','Waypoint','Ride hailing and taxi','Waypoint — ride hailing and taxi platform','A turnkey ride hailing system with driver and rider apps, fare rules and live dispatch.'],
  ['dispatch','Dispatch','Delivery and logistics','Dispatch — delivery and logistics platform','Manage a delivery fleet with route assignment, proof of delivery and live customer tracking.'],
].map(([slug,name,what,h1,lead]) => ({
  slug,name,what,h1,lead,
  metaTitle:`${name} | 6ixMedia SA`,metaDescription:lead,
  price:'From R18,000',priceNote:'Configured, branded and launched under your name.',
  features:[],audience:'',deliverables:['Platform configured to your rules','Your branding applied throughout','Payment gateway connected','Admin training and documentation','Launch support','Optional mobile apps'],faqs:[],
  docs:[{label:'Technical specifications',file:`/docs/${slug}-technical-specifications.pdf`,note:'Full platform specification'}],
}));
export const platforms: PlatformContent[] = snapshot.platforms.length ? snapshot.platforms.map((p: any) => ({
  slug:p.slug,name:p.name,what:p.what_label||'',h1:p.h1||p.name,lead:p.lead||'',
  metaTitle:p.meta_title||p.name,metaDescription:p.meta_description||p.lead||'',
  price:p.price||undefined,priceNote:p.price_note||undefined,
  features:asArray<string>(p.features_json),audience:p.audience||'',
  deliverables:asArray<string>(p.deliverables_json),faqs:asArray<{q:string;a:string}>(p.faqs_json),docs:asArray<CmsDoc>(p.docs_json),
})) : platformFallback;
export function getPlatform(slug:string){return platforms.find((p)=>p.slug===slug);}

export type BlogPost = { title:string; slug:string; excerpt:string; content:string; coverImage?:string; publishedAt?:string; seoTitle?:string; seoDescription?:string };
export const posts: BlogPost[] = snapshot.posts.map((p:any)=>({title:p.title,slug:p.slug,excerpt:p.excerpt||'',content:p.content||'',coverImage:p.cover_image||undefined,publishedAt:p.published_at||undefined,seoTitle:p.seo_title||undefined,seoDescription:p.seo_description||undefined}));
export function getPost(slug:string){return posts.find((p)=>p.slug===slug);}
