const envIsDev = process.env.NODE_ENV === 'development'
const envIsProd = process.env.NODE_ENV === 'production'
module.exports = {
  envIsDev,
  envIsProd
}
