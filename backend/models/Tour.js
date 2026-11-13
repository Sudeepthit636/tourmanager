
import mongoose from 'mongoose'; 
import { Schema, model } from 'mongoose';

const tourSchema = new Schema({
    //tourId: { type: String, required: true, unique: true, trim: true},  // 
    tourId : {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        unique: true
        },
    tourName: { type: String, required: true},
    maxGroupSize: { type: Number, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true},
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true},
    inclusions: { type: String, required: true },
    exclusions: { type: String, required: true},
    pricePerPerson: { type: Number, required: true},
    //completed: { type: Boolean, default: false },           // for future development, mark tour as completed if toDate is in past
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // for future use
});

export default model('Tour', tourSchema);
