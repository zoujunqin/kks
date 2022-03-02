import { envIsDev } from '@/utils/env'
const DEV_INFO = require('./.env.dev')
const PROD_INFO = require('./.env.prod')

export default envIsDev ? DEV_INFO : PROD_INFO
