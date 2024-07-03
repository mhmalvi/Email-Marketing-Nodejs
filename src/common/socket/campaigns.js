const {
  campaignSearch,
  campaignSearchPagination,
} = require("../campaignUtils/fetchCampaigns");
const io = socketIo(server, {
  cors: {
    origin: " * ",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  },
});

const campaignSearchRealtime = async (socket) => {
  socket.on("campaigns", (data) => {
    const { userID, page, per_page, name } = data;
    const offset = (page - 1) * per_page;
    // users[userId] = socket.id;
    console.log("socket id", socket.id);
    const searchCampaign = async (req, res) => {
      console.log(userID);
      const campaigns = await campaignSearch(data);
      const paginated = await campaignSearchPagination(
        userID,
        per_page,
        offset,
        name
      );
      const socketId = socket.id;
      const totalPages = campaigns.length / per_page;
      const count = campaigns.length;
      const paginate = {
        paginatedData: paginated,
        current_page: page,
        count: count,
        totalPages: Math.ceil(totalPages),
      };
      io.to(socketId).emit("campaigns", paginate);
    };
    searchCampaign();
  });
};

module.exports = { campaignSearchRealtime };
