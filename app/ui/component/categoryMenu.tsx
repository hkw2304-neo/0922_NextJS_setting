'use client';

import {categoryList, SubCategoryModel} from "@/app/data/model/common/categoryModel";
import {useState} from "react";

interface CategoryMenuProps {
    onSelect?: (categoryId: string, subCategory: SubCategoryModel) => void;
}

export default function CategoryMenu({ onSelect }: CategoryMenuProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const openCategory = categoryList.find((c) => c.id === openId);

    const handleToggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <nav className="category-menu" aria-label="카테고리">
            {/* 대메뉴 */}
            <ul className="category-list">
                {categoryList.map((category) => (
                    <li key={category.id}>
                        <button
                            type="button"
                            className={`category-item ${openId === category.id ? 'active' : ''}`}
                            onClick={() => handleToggle(category.id)}
                            aria-expanded={openId === category.id}
                        >
                            <span className="category-icon" aria-hidden="true">{category.icon}</span>
                            <span className="category-title">{category.title}</span>
                        </button>
                    </li>
                ))}
            </ul>

            {/* 하위메뉴 */}
            {openCategory && (
                <ul className="sub-category-list">
                    {openCategory.subCategories.map((sub) => (
                        <li key={sub.id}>
                            <button
                                type="button"
                                className="sub-category-item"
                                onClick={() => {
                                    onSelect?.(openCategory.id, sub);
                                    setOpenId(null);
                                }}
                            >
                                {sub.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}