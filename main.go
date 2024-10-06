package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// TODO configure port as env var
	// TODO if we have a proxy set up, use it here
	// router.SetTrustedProxies([]string{"192.168.1.2"})

	router.Static("/", "./frontend")

	router.Run()
}
