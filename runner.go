package main

import (
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	result := api.Build(api.BuildOptions{
		EntryPoints:       []string{"src/app.tsx"},
		Outdir:            "dist",
		Bundle:            true,
		Write:             true,
		LogLevel:          api.LogLevelInfo,
		ChunkNames:        "chunks/[name]-[hash]",
		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		Splitting:         true,
		Format:            api.FormatESModule,
		Color:             api.ColorAlways,
		Define: map[string]string{
			"process.env.NODE_ENV": `"dev"`,
		},
		AssetNames: "assets/[name]-[hash]",
		Loader: map[string]api.Loader{
			".png": api.LoaderFile,
		},
		Engines: []api.Engine{
			{api.EngineChrome, "58"},
			{api.EngineFirefox, "57"},
			{api.EngineSafari, "11"},
			{api.EngineEdge, "16"},
		},
	})
	if len(result.Errors) > 0 {
		os.Exit(1)
	}
}
