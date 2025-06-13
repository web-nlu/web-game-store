type Review = {
  id: number,
  email: string,
  rating: number,
  comment: string,
  createdAt: number
}

type BodySetReview = {
  rating: number,
  comment: string,
  accountId: string,
}