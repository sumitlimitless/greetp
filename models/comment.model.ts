import mongoose, { Model } from "mongoose";
import { IUser } from "./user.model";
export interface IComment {
    textMessage: string,
    user: IUser
}
export interface ICommentsDocument extends IComment, Document {
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new mongoose.Schema<ICommentsDocument>({
    textMessage: {
        type: String,
        required: true
    },
    user: {
        userId: {
            type: String,
            required: true
        },
        profilePhoto: {
            type: String,
            rewuired: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName:{
            type:String,
            required:true
        }
    }
},{timestamps:true});

export const Comment : Model<ICommentsDocument> = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);