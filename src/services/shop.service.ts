import shopModel from "~/models/shop.model"

export const findByEmail = async ({ email, select = { email: 1, password: 2, name: 1, status: 1, roles: 1 } }: { email: string, select?: { email: number, password: number, name: number, status: number, roles: number } }) => {
  return await shopModel.findOne({ email }).select(select)
}