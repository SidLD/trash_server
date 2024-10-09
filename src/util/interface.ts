export interface IFoodWaste {
    _id: string | undefined;
    dateOfWaste: string; // Assuming this is the type based on your zod schema
    foodCategory: string[];
    otherFoodCategory?: string;
    dishesWasted: string[];
    otherDish?: string;
    quantity: number; // Assuming quantity is a number
    cost: number;
    reasonForWaste: string[];
    otherReason?: string;
    notableIngredients?: string[];
    otherIngredient?: string;
    temperature: string;
    mealType: string;
    wasteStage: string;
    preventable: string;
    disposalMethod: string;
    otherDisposalMethod?: string;
    environmentalConditions?: string;
    relevantEvents?: string;
    otherRelevantEvents?: string;
    additionalComments?: string;
    user: IUser; // Reference back to the user
}

export interface IUser {
    _id: string | undefined;
    profile?: Iimg;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'CONTRIBUTOR';
    password: string;
    status: 'PENDING' | 'APPROVED' | 'DECLINED';
    foodWaste: IFoodWaste[]; // Array of food waste records associated with the user
}

export interface Iimg {
    _id: string | undefined;
    user: IUser; // Reference back to the user
    path: string;
    name: string;
    imageType: string;
    fullPath: string;
}
