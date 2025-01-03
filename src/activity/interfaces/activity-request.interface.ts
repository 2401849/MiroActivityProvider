export interface ActivityReqInterface {
  activityID: string
  "Inven!RAstdID": string
  json_params: {
    name: string
    instructions: string
    board_id: string
    team_id: string
    [k: string]: unknown
  }
  [k: string]: unknown
}

