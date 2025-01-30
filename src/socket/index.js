import db from "../config/db.config.js";

const Users = db.Users;
const socketIO = async (io) => {
  io.on("connection", (socket) => {
    socket.on("storeUID", async (data) => {
      const findExistUser = await Users.findOne({ where: { UID: data.UID } });

      if (findExistUser) {
        await Users.update(
          { socketID: socket.id },
          { where: { UID: data.UID } }
        );
      } else {
        await Users.create({ UID: data.UID, socketID: socket.id });
      }

      socket.emit("responseStoreUID", data);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

export default { socketIO };
