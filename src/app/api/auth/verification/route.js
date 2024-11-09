import User from "../../../../models/user.models"

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    try {
      const user = await User.findOne({ verificationToken: token });

      if (!user || user.verificationExpires < Date.now()) {
        return new Response("Verification link expired or invalid.", { status: 400 });
      }

      user.isVerified = true;
      user.verificationToken = undefined;
      user.verificationExpires = undefined;
      await user.save();

      return new Response("Email successfully verified!", { status: 200 });
    } catch (error) {
      return new Response("Verification failed", { status: 500 });
    }
  };
