import { Document, Schema, model } from "mongoose";

// Define interface for the document sub-schema
interface IDocument {
  name: string;
}

// Define interface for the chatbot schema
interface IChatbot extends Document {
  owner: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  documents: IDocument[];
  multilingual: boolean;
  model: string;
}

const documentSubSchema = new Schema<IDocument>({
  name: {
    type: String,
    required: true,
  },
});

const chatbotSchema = new Schema<IChatbot>({
  owner: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  documents: {
    type: [documentSubSchema],
    required: true,
  },
  multilingual: {
    type: Boolean,
    required: true,
  },
  model: {
    type: String,
    enum: ["gpt-3.5-turbo", "gpt-4"],
    required: true,
  },
});

const Chatbot = model<IChatbot>("Chatbot", chatbotSchema);

// Exporting functions to find, update and create new chatbot
export const findChatbot = (owner: string): Promise<IChatbot | null> => {
  return Chatbot.findOne({ owner }).exec();
};

export const updateChatbot = (
  owner: string,
  update: Partial<IChatbot>
): Promise<IChatbot | null> => {
  return Chatbot.findOneAndUpdate({ owner }, update, { new: true }).exec();
};

export const createChatbot = (chatbot: IChatbot): Promise<IChatbot> => {
  return new Chatbot(chatbot).save();
};

https://lgdhades-0701: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@github.com/neebdev/rafiq-api.git
