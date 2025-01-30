import { successRes, errorRes } from "../helpers/index.js";
import OpenAI from "openai";
import config from "../config/config.js";
import Validator from "validatorjs";
import db from "../config/db.config.js";

const Users = db.Users;
const Chats = db.Chats;
const Category = db.Category;

const chatCompletions = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const validation = new Validator(req.body, {
      message: "required",
      UID: "required",
      category_id: "required",
    });

    if (validation.fails()) {
      const firstMessage = Object.keys(validation.errors.all())[0];
      return errorRes(res, 1000, validation.errors.first(firstMessage));
    }
    const { message, category_id } = req.body;

    const openai = new OpenAI({ apiKey: config.openAI.apiKey });

    const findExistUser = await Users.findOne({
      where: { UID: req.body.UID },
    });

    if (!findExistUser) {
      return errorRes(res, 1002);
    }

    const findExistCategory = await Category.findOne({
      where: { id: category_id },
    });

    if (!findExistCategory) {
      return errorRes(res, 3002);
    }

    const chatStreamCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${findExistCategory.propmt_message.replace(
            "${message}",
            message
          )}`,
        },
      ],
      //   model: "gpt-4o-mini",
      model: "gpt-4o",
      stream: false,
    });

    await Chats.create(
      {
        user_id: findExistUser.id,
        message: message,
        ai_chat: chatStreamCompletion.choices[0].message.content,
        token: chatStreamCompletion.usage.total_tokens,
        category_id: category_id,
      },
      { transaction: t }
    );

    await Users.update(
      {
        total_token:
          findExistUser.total_token + chatStreamCompletion.usage.total_tokens,
      },
      { where: { UID: req.body.UID }, transaction: t }
    );
    await t.commit();
    return successRes(res, 1001, chatStreamCompletion.choices[0]);
  } catch (error) {
    t.rollback();
    console.log("error", error);
    return errorRes(res, 9000, error);
  }
};

export { chatCompletions };
