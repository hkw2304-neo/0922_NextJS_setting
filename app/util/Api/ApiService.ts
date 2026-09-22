import { createClient } from '@/app/util/supabase/client';

const supabase = createClient();
export async function fetchTableData<T>(
    tableName: string,
): Promise<T[]> {


    try {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error(`[${tableName}] 데이터 조회 실패:`, error.message);
            return [];
        }

        return (data as T[]) || [];
    } catch (err) {
        console.error(`[${tableName}] 예기치 않은 오류 발생:`, err);
        return [];
    }
}
export function getFilePath(filePath:string, bucketNanme:string): string {
    const { data } = supabase.storage
        .from(bucketNanme) // 버킷 이름
        .getPublicUrl(filePath);

    const filaPath = data.publicUrl;

    return filaPath;
}