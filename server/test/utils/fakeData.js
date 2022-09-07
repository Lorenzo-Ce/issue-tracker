const jwt = require('jsonwebtoken')

  const refreshToken = jwt.sign({
    username: 'test'
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )
  const wrongRefreshToken = jwt.sign({
    username: 'tst'
    },
    process.env.SECRET_REFRESH_TOKEN,
    {expiresIn: '30m'}
  )


module.exports = {refreshToken, wrongRefreshToken}