provider "aws" {
  region = "us-east-2"
}

provider "aws" {
  region = "us-east-1"
  alias  = "east1"
}

variable project {
  default = "REPLACE_ME"
}

variable region {
  default = "us-east-2"
}
