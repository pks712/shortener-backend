export const getUserData = async (req, res) => {
  try {

    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default getUserData;
