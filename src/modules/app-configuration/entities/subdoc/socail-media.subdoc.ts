import { Schema } from "mongoose"
import { ISocialMedia } from "../../interface"

export const SocialMediaSchema = new Schema<ISocialMedia>({
    facebook: { type: String },
    intstagram: { type: String },
    tweeter: { type: String },
    linkedIn: { type: String },
    youtube: { type: String },
    pinterest: { type: String },
})
