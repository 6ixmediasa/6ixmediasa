import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTA from '@/components/CTA';
import { posts, getPost } from '@/lib/content';

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return posts.length?posts.map(p=>({slug:p.slug})):[{slug:'_empty'}];}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const p=getPost(slug);if(!p)return{};return{title:p.seoTitle||`${p.title} | 6ixMedia SA`,description:p.seoDescription||p.excerpt,alternates:{canonical:`/blog/${p.slug}`},openGraph:{title:p.seoTitle||p.title,description:p.seoDescription||p.excerpt,type:'article'}};}
export default async function BlogPostPage({params}:Props){const {slug}=await params;const p=getPost(slug);if(!p)notFound();const paragraphs=p.content.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean);return <><section className="on-dark bg-ink"><div className="shell py-14 lg:py-20"><nav className="mb-6 text-[13px] text-ink-mute"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link></nav><p className="eyebrow-dark">Blog</p><h1 className="mt-4 max-w-4xl font-display text-[36px] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-[48px]">{p.title}</h1><p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-dim">{p.excerpt}</p>{p.publishedAt&&<p className="mt-5 font-mono text-[12px] text-azure-400">{new Date(p.publishedAt).toLocaleDateString('en-ZA',{year:'numeric',month:'long',day:'numeric'})}</p>}</div></section><article className="shell py-12 lg:py-16"><div className="mx-auto max-w-3xl">{p.coverImage&&<div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl"><Image src={p.coverImage} alt={p.title} fill priority className="object-cover" sizes="100vw"/></div>}<div className="space-y-6 text-[17px] leading-8 text-ink/80">{paragraphs.map((x,i)=><p key={i}>{x}</p>)}</div></div></article><CTA/></>}
