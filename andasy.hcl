# andasy.hcl app configuration file generated for hrhub on Wednesday, 01-Apr-26 15:39:12 SAST
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "hrhub"

app {

  env = {}

  port = 8000

  primary_region = "fsn"

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "hrhub"
  }

}
