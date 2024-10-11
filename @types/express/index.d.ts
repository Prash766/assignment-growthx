import { User } from "../../src/models/user.model"
import { Admin } from "../../src/models/admin.models"

declare global{
    namespace Express{
        interface Request{
        user : string
        }
    }
}