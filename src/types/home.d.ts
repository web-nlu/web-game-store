type HomeData = {
  newAccounts: Account[]
  topAccountAllGames: AccountHomeData[]
}

type AccountHomeData = {
  gameId: number
  gameName: string
  categoryId: number
  accounts: Account[]
}