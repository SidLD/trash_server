import mongoose, { Schema, Document } from 'mongoose';

interface IFoodWaste extends Document {
  dateOfWaste: string;
  foodCategory: string[];
  otherFoodCategory?: string;
  dishesWasted: string[];
  otherDish?: string;
  quantity: number;
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
  status: string,
  userId: mongoose.Schema.Types.ObjectId; 
}

const foodWasteSchema = new Schema<IFoodWaste>(
  {
    dateOfWaste: { type: String, required: true },
    foodCategory: [{ type: String, required: true }],
    otherFoodCategory: { type: String },
    dishesWasted: [{ type: String, required: true }],
    otherDish: { type: String },
    quantity: { type: Number, required: true, min: 0.1 },
    cost: { type: Number, required: true, min: 1 },
    reasonForWaste: [{ type: String, required: true }],
    otherReason: { type: String },
    notableIngredients: [{ type: String }],
    otherIngredient: { type: String },
    temperature: { type: String, required: true },
    mealType: { type: String, required: true },
    wasteStage: { type: String, required: true },
    preventable: { type: String, required: true },
    disposalMethod: { type: String, required: true },
    otherDisposalMethod: { type: String },
    environmentalConditions: { type: String },
    relevantEvents: { type: String },
    otherRelevantEvents: { type: String },
    additionalComments: { type: String },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'DECLINED'], 
        required: true,
        default: 'PENDING'
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const FoodWaste = mongoose.model<IFoodWaste>('FoodWaste', foodWasteSchema);
export default FoodWaste;
