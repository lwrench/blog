package routers

import (
	"github.com/gin-gonic/gin"
	"github.com/lwrench/blog/pkg/setting"
	"github.com/lwrench/blog/routers/api/v1"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	r.Use(gin.Logger())

	r.Use(gin.Recovery())

	gin.SetMode(setting.RunMode)

	r.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "test",
		})
	})

	apiv1 := r.Group("/api/v1")
	{
		apiv1.GET("/articles", v1.GetArticles)
		apiv1.GET("/article/:id", v1.GetArticle)
		apiv1.POST("/article", v1.AddArticle)
		apiv1.PUT("/article/:id", v1.EditArticle)
		apiv1.DELETE("/article/:id", v1.DeleteArticle)

		apiv1.GET("/tags", v1.GetTags)
		apiv1.GET("/tag/:id", v1.GetTag)
		apiv1.POST("/tag", v1.AddTag)
		apiv1.PUT("/tag/:id", v1.EditTag)
		apiv1.DELETE("/tag/:id", v1.DeleteTag)
	}

	return r
}
