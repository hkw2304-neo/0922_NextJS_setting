import {categoryList} from "@/app/data/model/common/categoryModel";

interface CategoryScreenProps {
    categoryId: string;
    subId: string;
}

export default function CategoryScreen({ categoryId, subId }: CategoryScreenProps) {
    const category = categoryList.find((c) => c.id === categoryId);
    const sub = category?.subCategories.find((s) => s.id === subId);

    return (
        <div className="main-container">
            <h2>{category?.title} &gt; {sub?.title}</h2>
        </div>
    );
}