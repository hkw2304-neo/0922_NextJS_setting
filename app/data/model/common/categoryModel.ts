export interface SubCategoryModel {
    id: string;
    title: string;
}

export interface CategoryModel {
    id: string;
    title: string;
    icon: string;
    subCategories: SubCategoryModel[];
}

export const categoryList: CategoryModel[] = [
    {
        id: 'space',
        title: '공간별',
        icon: '🏠',
        subCategories: [
            { id: 'living', title: '거실' },
            { id: 'bedroom', title: '침실' },
            { id: 'kitchen', title: '주방·다이닝' },
            { id: 'office', title: '서재·홈오피스' },
        ],
    },
    {
        id: 'style',
        title: '스타일',
        icon: '🎨',
        subCategories: [
            { id: 'modern', title: '모던' },
            { id: 'minimal', title: '미니멀' },
            { id: 'nordic', title: '북유럽' },
            { id: 'vintage', title: '빈티지' },
        ],
    },
    {
        id: 'furniture',
        title: '가구',
        icon: '🛋️',
        subCategories: [
            { id: 'sofa-chair', title: '소파·의자' },
            { id: 'table-desk', title: '테이블·책상' },
            { id: 'storage', title: '수납·선반' },
            { id: 'bed', title: '침대·매트리스' },
        ],
    },
    {
        id: 'decor',
        title: '조명·소품',
        icon: '💡',
        subCategories: [
            { id: 'lighting', title: '조명' },
            { id: 'rug-curtain', title: '러그·커튼' },
            { id: 'mirror-frame', title: '거울·액자' },
            { id: 'plant', title: '식물·화분' },
        ],
    },
    {
        id: 'custom',
        title: '맞춤 추천',
        icon: '✨',
        subCategories: [
            { id: 'size', title: '사이즈 맞춤' },
            { id: 'color', title: '색상 매칭' },
            { id: 'budget', title: '예산별' },
            { id: 'new', title: '신상품' },
        ],
    },
    {
        id: 'my-space',
        title: '내 공간',
        icon: '📷',
        subCategories: [
            { id: 'scan', title: '공간 촬영' },
            { id: 'history', title: '촬영 기록' },
            { id: 'preview', title: '배치 미리보기' },
            { id: 'wishlist', title: '찜한 가구' },
        ],
    },
];