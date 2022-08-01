const jwt = require('jsonwebtoken')




  const refreshToken = jwt.sign({
    email: 'test@example.com'
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )
  const wrongRefreshToken = jwt.sign({
    email: 'tst@example.com'
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )


module.exports = {refreshToken, wrongRefreshToken}