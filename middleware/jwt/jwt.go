package jwt

import (
	"errors"
	"github.com/gin-gonic/gin"
	jwt "github.com/golang-jwt/jwt/v5"
	"github.com/lwrench/blog/pkg/e"
	"github.com/lwrench/blog/pkg/util"
	"net/http"
	"strings"
)

func JWT() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int
		var data interface{}
		var token string

		code = e.SUCCESS
		authHeader := c.Request.Header.Get("Authorization")
		if authHeader == "" {
			code = e.ERROR_AUTH_CHECK_TOKEN_FAIL
		} else {
			splitToken := strings.Split(authHeader, " ")
			if len(splitToken) == 2 && strings.ToLower(splitToken[0]) == "bearer" {
				token = splitToken[1]
			} else {
				code = e.ERROR_AUTH_CHECK_TOKEN_FAIL
			}
		}
		if token == "" {
			code = e.ERROR_AUTH_CHECK_TOKEN_FAIL
		} else {
			_, err := util.ParseToken(token)
			if err != nil {
				if errors.Is(err, jwt.ErrTokenExpired) {
					code = e.ERROR_AUTH_CHECK_TOKEN_TIMEOUT
				} else {

					code = e.ERROR_AUTH_CHECK_TOKEN_FAIL
				}
			}
		}

		if code != e.SUCCESS {
			c.JSON(http.StatusUnauthorized, gin.H{
				"code": code,
				"msg":  e.GetMsg(code),
				"data": data,
			})

			c.Abort()
			return
		}

		c.Next()
	}
}
