package main

import (
	"bytes"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/nickalie/go-webpbin"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	r := gin.Default()
	r.Use(enableCORS())
	// Set maximum file size (default to 8 MB if not set)
	maxFileSize, err := strconv.ParseInt(os.Getenv("MAX_FILE_SIZE_MB"), 10, 64)

	if err != nil {
		maxFileSize = 8 * 1024 * 1024
	}

	r.MaxMultipartMemory = maxFileSize * 1024 * 1024

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello world",
		})
	})
	r.POST("/upload", func(c *gin.Context) {

		form, err := c.MultipartForm()
		if err != nil {
			c.JSON(400, gin.H{"error": "Failed to parse multipart form"})
			return
		}

		files := form.File["file"]
		for _, fileHeader := range files {

			file, err := fileHeader.Open()
			if err != nil {
				c.JSON(500, gin.H{"error": "error opening fileHeader"})
				return
			}
			srcImage, _, err := image.Decode(file)
			if err != nil {
				c.JSON(500, gin.H{"error": "error decoding the image"})
				return
			}

			buffer := new(bytes.Buffer)
			err = webpbin.Encode(buffer, srcImage)
			if err != nil {
				c.JSON(500, gin.H{"error": "error converting image to webp"})
				return
			}
			c.Header("Content-Disposition", "attachment; filename=converted.webp")
			c.Data(http.StatusOK, "image/webp", buffer.Bytes())
		}

	})
	r.Run(":" + os.Getenv("PORT"))
}

func enableCORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", os.Getenv("CORS_ALLOWED_ORIGIN"))
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
