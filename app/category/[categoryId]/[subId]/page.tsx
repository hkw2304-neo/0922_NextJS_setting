import CategoryScreen from "@/app/ui/screen/category/categoryScreen";

export default async function CategoryPage({
                                               params,
                                           }: {
    params: Promise<{ categoryId: string; subId: string }>;
}) {
    const { categoryId, subId } = await params;
    return <CategoryScreen categoryId={categoryId} subId={subId} />;
}