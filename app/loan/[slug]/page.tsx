import { loans } from "@/lib/products";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function LoanPage({ params }: PageProps) {
    const { slug } = await params;
    const product = loans.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const { icon, ...productData } = product;

    return <ProductDetailLayout product={{ ...productData, slug }} category="Loan" />;
}

export async function generateStaticParams() {
    return loans.map((loan) => ({
        slug: loan.slug,
    }));
}
