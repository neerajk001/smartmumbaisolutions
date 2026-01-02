import { insurances } from "@/lib/products";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function InsurancePage({ params }: PageProps) {
    const { slug } = await params;
    const product = insurances.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const { icon, ...productData } = product;

    return <ProductDetailLayout product={{ ...productData, slug }} category="Insurance" />;
}

export async function generateStaticParams() {
    return insurances.map((insurance) => ({
        slug: insurance.slug,
    }));
}
