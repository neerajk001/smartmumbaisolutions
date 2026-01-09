import { loans } from "@/lib/products";
import ProductDetailLayout from "@/components/ProductDetailLayout";
import { notFound } from "next/navigation";
import { getLoanProducts } from "@/lib/api";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function LoanPage({ params }: PageProps) {
    const { slug } = await params;
    const product = loans.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    // Fetch ROI percentage from backend (only the number)
    let roiPercentage = product.metric?.replace(/\s*ROI/i, '').trim() || ''; // Fallback to static metric (remove ROI if present)
    try {
        const response = await getLoanProducts(slug);
        if (response.success && response.product) {
            // Extract only the percentage number (e.g., "8.75%")
            const match = response.product.interestRate.match(/(\d+\.?\d*)%/);
            if (match) {
                roiPercentage = `${match[1]}%`;
            }
        }
    } catch (error) {
        console.error('Error fetching ROI:', error);
        // Use static metric if API fails
        if (!roiPercentage && product.metric) {
            roiPercentage = product.metric.replace(/\s*ROI/i, '').trim();
        }
    }

    const { icon, metric, ...productData } = product;

    return <ProductDetailLayout product={{ ...productData, slug, metric: roiPercentage }} category="Loan" />;
}

export async function generateStaticParams() {
    return loans.map((loan) => ({
        slug: loan.slug,
    }));
}
