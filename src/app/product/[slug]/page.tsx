import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found - Ehe Hair" };
  }

  return {
    title: `${product.name} | Ehe Hair Salon`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Ehe Hair`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div>
      <ProductDetailClient product={product} />

      {/* Related Products */}
      <section style={{ padding: "4rem 0 6rem", backgroundColor: "var(--color-bg-subtle)" }}>
        <div className="container">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="badge" style={{ marginBottom: "0.5rem" }}>
              Explore More
            </span>
            <h2>Related Products</h2>
          </div>
          <div className="products-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
