// user.model.js
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Por favor, insira um e-mail válido.",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return typeof v === 'string' && v.trim().length >= 3;
        },
        message: "A senha deve ter ao menos 3 caracteres.",
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMINISTRATOR"],
      default: "USER",
    },
    age: {
      type: Number,
      default: null,
      min: 0,
      max: 150,
    },
    status: {
    type: String,
    enum: ['ativo', 'inativo'],
    default: 'ativo'
    },
    permissions: {
      type: [String],
      default: ['read']
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
