export interface PostDto {
    id?: number;
    title: string;
    content: string;
    createdAt: Date;
    CategoryName? : string;
    Tags?: Tag[];
}

export interface Tag {
    id: number;
    name: string | null;
}